import { NextRequest, NextResponse } from "next/server";
import { isValidDomain } from "@/lib/security";

const OPENPAGERANK_API_KEY =
	process.env.OPENPAGERANK_API_KEY || "wk0c8000oo08o0c0ggcwo80oow0sgcgg8s8gc8gc";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	let domain = searchParams.get("domain");

	if (!domain) {
		return NextResponse.json(
			{ error: "Domain parameter is required" },
			{ status: 400 }
		);
	}

	// Clean and normalize domain
	domain = domain.toLowerCase().trim();
	domain = domain.replace(/^https?:\/\//, "");
	domain = domain.replace(/^www\./, "");
	domain = domain.split("/")[0].split("?")[0].split("#")[0];

	if (!isValidDomain(domain)) {
		return NextResponse.json(
			{ error: "Invalid domain name syntax. Example: example.com" },
			{ status: 400 }
		);
	}

	try {
		const response = await fetch(
			`https://openpagerank.com/api/v1.0/getPageRank?domains%5B0%5D=${encodeURIComponent(
				domain
			)}`,
			{
				headers: {
					"API-OPR": OPENPAGERANK_API_KEY,
				},
				signal: AbortSignal.timeout(6000),
			}
		);

		if (!response.ok) {
			try {
				const errJson = await response.json();
				if (response.status === 401) {
					return NextResponse.json(
						{
							error: "OpenPageRank API key requires renewal. Please configure a free OPENPAGERANK_API_KEY from openpagerank.keywordseverywhere.com in your environment settings.",
							docs: "https://openpagerank.keywordseverywhere.com/dashboard",
						},
						{ status: 401 }
					);
				}
				return NextResponse.json(
					{ error: errJson.message || "OpenPageRank query failed" },
					{ status: response.status }
				);
			} catch {
				return NextResponse.json(
					{ error: "OpenPageRank query error" },
					{ status: response.status }
				);
			}
		}

		const data = await response.json();
		const result = data.response?.[0];

		if (!result || result.status_code === 404) {
			return NextResponse.json(
				{
					domain,
					page_rank_integer: 0,
					page_rank_decimal: 0,
					rank: "Unranked",
					status: "Domain not yet indexed in global PageRank registry",
				},
				{ status: 200 }
			);
		}

		return NextResponse.json({
			domain: result.domain,
			page_rank_integer: result.page_rank_integer ?? 0,
			page_rank_decimal: result.page_rank_decimal ?? 0,
			rank: result.rank ?? "Unranked",
			provider: "OpenPageRank (Independent Global Index)",
			updated_at: new Date().toISOString(),
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to connect to PageRank provider. Please verify network or try again." },
			{ status: 502 }
		);
	}
}
