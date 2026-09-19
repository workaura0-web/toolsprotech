import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const portalId = process.env.HUBSPOT_PORTAL_ID;
	const formGuid = process.env.HUBSPOT_FORM_GUID;

	if (!portalId || !formGuid) {
		return NextResponse.json(
			{ error: "Hiring form is not configured" },
			{ status: 503 },
		);
	}

	try {
		const body = await request.json();
		const response = await fetch(
			`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			},
		);

		const result = await response.json().catch(() => null);
		return NextResponse.json(result, { status: response.status });
	} catch {
		return NextResponse.json(
			{ error: "Unable to submit hiring application" },
			{ status: 500 },
		);
	}
}