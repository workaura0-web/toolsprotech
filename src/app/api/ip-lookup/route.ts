import { NextRequest, NextResponse } from "next/server";
import { isPrivateIPv4, isPrivateIPv6, isValidDomain, isValidIP } from "@/lib/security";
import dns from "node:dns/promises";

interface DNSAnswer {
	name: string;
	type: number;
	TTL: number;
	data: string;
}

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	let target = searchParams.get("domain") || searchParams.get("ip");

	if (!target) {
		return NextResponse.json(
			{ error: "Domain or IP parameter is required" },
			{ status: 400 }
		);
	}

	// Clean input
	target = target.toLowerCase().trim();
	target = target.replace(/^https?:\/\//, "");
	target = target.replace(/^www\./, "");
	target = target.split("/")[0].split("?")[0].split("#")[0];

	let resolvedIp = "";
	let isDomain = false;
	const dnsRecords: Array<{ type: number; data: string; ttl: number }> = [];

	if (isValidIP(target)) {
		if (isPrivateIPv4(target) || isPrivateIPv6(target)) {
			return NextResponse.json(
				{ error: "Target address belongs to a private or restricted network range" },
				{ status: 403 }
			);
		}
		resolvedIp = target;
	} else if (isValidDomain(target)) {
		isDomain = true;
		try {
			// Resolve domain using node dns
			const addresses = await dns.resolve4(target);
			if (!addresses || addresses.length === 0) {
				return NextResponse.json(
					{ error: "Domain does not have an active A record" },
					{ status: 404 }
				);
			}
			// SSRF protection: ensure resolved IP is public
			for (const addr of addresses) {
				if (isPrivateIPv4(addr) || isPrivateIPv6(addr)) {
					return NextResponse.json(
						{ error: "Domain resolves to a restricted or private internal address" },
						{ status: 403 }
					);
				}
				dnsRecords.push({ type: 1, data: addr, ttl: 300 });
			}
			resolvedIp = addresses[0];
		} catch (dnsErr) {
			// Try DNS over HTTPS fallback
			try {
				const dohRes = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(target)}&type=A`, {
					signal: AbortSignal.timeout(4000),
				});
				if (dohRes.ok) {
					const dohData = await dohRes.json();
					if (dohData.Answer && dohData.Answer.length > 0) {
						for (const ans of dohData.Answer as DNSAnswer[]) {
							if (ans.type === 1) {
								if (isPrivateIPv4(ans.data) || isPrivateIPv6(ans.data)) {
									return NextResponse.json(
										{ error: "Domain resolves to a restricted internal address" },
										{ status: 403 }
									);
								}
								dnsRecords.push({ type: ans.type, data: ans.data, ttl: ans.TTL });
								if (!resolvedIp) resolvedIp = ans.data;
							}
						}
					}
				}
			} catch {
				// Ignore
			}

			if (!resolvedIp) {
				return NextResponse.json(
					{ error: "Unable to resolve host name. Verify spelling and DNS status." },
					{ status: 404 }
				);
			}
		}
	} else {
		return NextResponse.json(
			{ error: "Invalid domain or IP format" },
			{ status: 400 }
		);
	}

	const ipApiKey = process.env.IPAPI_KEY || "2119b2e037fe5f867dbeef865e4830fb";

	interface GeoRecord {
		country: string;
		region: string;
		city: string;
		latitude: number;
		longitude: number;
		isp: string;
		asn: string;
		timezone: string;
		hosting: string;
	}

	// Geolocation lookups
	let geoData: GeoRecord | null = null;
	const providers = [
		`https://ipapi.co/${resolvedIp}/json/`,
		`https://api.ipapi.com/${resolvedIp}?access_key=${ipApiKey}`,
		`https://ipwho.is/${resolvedIp}`,
	];

	for (const url of providers) {
		try {
			const res = await fetch(url, {
				headers: { Accept: "application/json" },
				signal: AbortSignal.timeout(4000),
			});
			if (res.ok) {
				const d = await res.json();
				if (d && (d.country_name || d.country)) {
					geoData = {
						country: String(d.country_name || d.country || "Unknown"),
						region: String(d.region_name || d.region || "Unknown"),
						city: String(d.city || "Unknown"),
						latitude: Number(d.latitude || d.lat || 0),
						longitude: Number(d.longitude || d.lon || 0),
						isp: String(d.org || d.isp || d.connection?.isp || "Standard ISP"),
						asn: String(d.asn || d.connection?.asn || "N/A"),
						timezone: String(d.timezone || d.time_zone || "UTC"),
						hosting: String(d.org || d.isp || "Web Host"),
					};
					break;
				}
			}
		} catch {
			// Continue
		}
	}

	const finalGeo = geoData || {
		country: "Unknown",
		region: "Unknown",
		city: "Unknown",
		latitude: 0,
		longitude: 0,
		isp: "Standard ISP",
		asn: "N/A",
		timezone: "UTC",
		hosting: "Unknown Host",
	};

	return NextResponse.json({
		domain: isDomain ? target : undefined,
		ipAddress: resolvedIp,
		ipVersion: resolvedIp.includes(":") ? "IPv6" : "IPv4",
		location: {
			country: finalGeo.country,
			region: finalGeo.region,
			city: finalGeo.city,
			latitude: finalGeo.latitude,
			longitude: finalGeo.longitude,
		},
		isp: finalGeo.isp,
		organization: finalGeo.hosting,
		asn: finalGeo.asn,
		timezone: finalGeo.timezone,
		hostingProvider: finalGeo.hosting,
		serverType: "Web Server",
		dnsRecords: dnsRecords.length > 0 ? dnsRecords : [{ type: 1, data: resolvedIp, ttl: 300 }],
	});
}
