import { NextRequest, NextResponse } from "next/server";

interface ExchangeRateApiResponse {
	rates: Record<string, number>;
	base: string;
	date: string;
}
interface OpenErApiResponse {
	rates: Record<string, number>;
	base_code: string;
	time_last_update_utc: string;
}
interface FrankfurterApiResponse {
	rates: Record<string, number>;
	base: string;
	date: string;
}

type ExchangeData = {
	rate: number;
	base: string;
	target: string;
	date: string;
	lastUpdated: string;
	provider: string;
};

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	let from = searchParams.get("from");
	let to = searchParams.get("to");
	const amount = searchParams.get("amount");

	if (!from || !to) {
		return NextResponse.json(
			{ error: "From and To currency symbols are required. Example: ?from=USD&to=EUR" },
			{ status: 400 }
		);
	}

	from = from.toUpperCase().trim();
	to = to.toUpperCase().trim();

	const currencyRegex = /^[A-Z]{3}$/;
	if (!currencyRegex.test(from) || !currencyRegex.test(to)) {
		return NextResponse.json(
			{ error: "Invalid ISO 4217 currency code format. Must be 3 letters (e.g. USD, EUR, GBP)." },
			{ status: 400 }
		);
	}

	if (from === to) {
		const amt = amount ? parseFloat(amount) : 1;
		return NextResponse.json({
			from,
			to,
			rate: 1,
			amount: amt,
			convertedAmount: amt,
			date: new Date().toISOString().split("T")[0],
			lastUpdated: new Date().toISOString(),
			provider: "Direct Parity",
		});
	}

	try {
		// Try multiple free real-time currency APIs
		const apis = [
			{
				url: `https://api.frankfurter.app/latest?from=${from}&to=${to}`,
				name: "Frankfurter / European Central Bank",
				timeout: 4000,
			},
			{
				url: `https://open.er-api.com/v6/latest/${from}`,
				name: "Open Exchange Rates Feed",
				timeout: 4000,
			},
			{
				url: `https://api.exchangerate-api.com/v4/latest/${from}`,
				name: "ExchangeRate API",
				timeout: 4000,
			},
		];

		let exchangeData: ExchangeData | null = null;

		for (const api of apis) {
			try {
				const response = await fetch(api.url, {
					method: "GET",
					headers: {
						Accept: "application/json",
						"User-Agent": "ToolsProTech-Currency/1.0",
					},
					signal: AbortSignal.timeout(api.timeout),
				});

				if (!response.ok) continue;

				if (api.name.includes("Frankfurter")) {
					const data: FrankfurterApiResponse = await response.json();
					if (data.rates && data.rates[to]) {
						exchangeData = {
							rate: data.rates[to],
							base: data.base,
							target: to,
							date: data.date,
							lastUpdated: new Date().toISOString(),
							provider: api.name,
						};
						break;
					}
				} else if (api.name.includes("Open Exchange")) {
					const data: OpenErApiResponse = await response.json();
					if (data.rates && data.rates[to]) {
						exchangeData = {
							rate: data.rates[to],
							base: data.base_code,
							target: to,
							date: data.time_last_update_utc,
							lastUpdated: new Date().toISOString(),
							provider: api.name,
						};
						break;
					}
				} else if (api.name.includes("ExchangeRate")) {
					const data: ExchangeRateApiResponse = await response.json();
					if (data.rates && data.rates[to]) {
						exchangeData = {
							rate: data.rates[to],
							base: data.base,
							target: to,
							date: data.date,
							lastUpdated: new Date().toISOString(),
							provider: api.name,
						};
						break;
					}
				}
			} catch {
				continue;
			}
		}

		if (!exchangeData) {
			return NextResponse.json(
				{
					error: `Real-time exchange rate for ${from} to ${to} is currently unavailable.`,
				},
				{ status: 502 }
			);
		}

		let convertedAmount: number | null = null;
		if (amount) {
			const amountNum = parseFloat(amount);
			if (!isNaN(amountNum) && amountNum >= 0 && Number.isFinite(amountNum)) {
				convertedAmount = parseFloat((amountNum * exchangeData.rate).toFixed(4));
			}
		}

		return NextResponse.json({
			from: exchangeData.base,
			to: exchangeData.target,
			rate: exchangeData.rate,
			amount: amount ? parseFloat(amount) : null,
			convertedAmount: convertedAmount,
			date: exchangeData.date,
			lastUpdated: exchangeData.lastUpdated,
			provider: exchangeData.provider,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Currency conversion server error. Please try again." },
			{ status: 500 }
		);
	}
}
