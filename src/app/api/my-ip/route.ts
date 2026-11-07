import { NextRequest, NextResponse } from "next/server";
import { isPrivateIPv4, isPrivateIPv6, isValidIP } from "@/lib/security";

export async function GET(request: NextRequest) {
	try {
		const forwarded = request.headers.get("x-forwarded-for");
		const realIP = request.headers.get("x-real-ip");
		const cfConnectingIP = request.headers.get("cf-connecting-ip");
		const xClientIP = request.headers.get("x-client-ip");

		// Pick the first candidate
		let rawCandidate = cfConnectingIP || realIP || xClientIP;
		if (!rawCandidate && forwarded) {
			const ips = forwarded.split(",").map((s) => s.trim());
			// Find first public IP if possible
			for (const ip of ips) {
				if (isValidIP(ip) && !isPrivateIPv4(ip) && !isPrivateIPv6(ip)) {
					rawCandidate = ip;
					break;
				}
			}
			if (!rawCandidate) rawCandidate = ips[0];
		}

		const clientIP = (rawCandidate || "127.0.0.1").trim();

		// Check if it's private or local
		const isLocal =
			clientIP === "127.0.0.1" ||
			clientIP === "::1" ||
			clientIP === "localhost" ||
			isPrivateIPv4(clientIP) ||
			isPrivateIPv6(clientIP);

		if (isLocal) {
			return NextResponse.json({
				ip: clientIP,
				type: clientIP.includes(":") ? "IPv6" : "IPv4",
				isLocal: true,
				location: {
					country: "Local / Private Network",
					region: "Internal Subnet",
					city: "Localhost",
					latitude: 0,
					longitude: 0,
					timezone: "UTC",
				},
				isp: "Private Loopback / Intranet",
				organization: "Local Network Interface",
				asn: "N/A",
				continent: "Local",
				countryCode: "LOC",
				regionCode: "LOC",
				zip: "00000",
				proxy: false,
				vpn: false,
				tor: false,
				hosting: false,
				note: "Connected via local loopback or private network environment.",
			});
		}

		const ipApiKey = process.env.IPAPI_KEY || "2119b2e037fe5f867dbeef865e4830fb";

		interface MyIpGeoRecord {
			country: string;
			region: string;
			city: string;
			latitude: number;
			longitude: number;
			timezone: string;
			isp: string;
			organization: string;
			asn: string;
			countryCode: string;
			regionCode: string;
			zip: string;
			continent?: string;
		}

		// Try geolocation providers
		const providers = [
			{
				url: `https://ipapi.co/${clientIP}/json/`,
				type: "ipapi.co",
			},
			{
				url: `https://api.ipapi.com/${clientIP}?access_key=${ipApiKey}`,
				type: "ipapi.com",
			},
			{
				url: `https://ipwho.is/${clientIP}`,
				type: "ipwhois",
			},
		];

		let geoData: MyIpGeoRecord | null = null;

		for (const provider of providers) {
			try {
				const res = await fetch(provider.url, {
					headers: { Accept: "application/json", "User-Agent": "ToolsProTech-IPLookup/1.0" },
					signal: AbortSignal.timeout(4000),
				});
				if (res.ok) {
					const data = await res.json();
					if (data && (data.country_name || data.country)) {
						geoData = {
							country: String(data.country_name || data.country || "Unknown"),
							region: String(data.region_name || data.region || "Unknown"),
							city: String(data.city || "Unknown"),
							latitude: Number(data.latitude || data.lat || 0),
							longitude: Number(data.longitude || data.lon || 0),
							timezone: String(data.timezone || data.time_zone || "UTC"),
							isp: String(data.org || data.isp || data.connection?.isp || "Standard ISP"),
							organization: String(data.org || data.organization || "Internet Provider"),
							asn: String(data.asn || data.connection?.asn || "Unknown"),
							countryCode: String(data.country_code || data.countryCode || "UN"),
							regionCode: String(data.region_code || data.regionCode || ""),
							zip: String(data.postal || data.zip || ""),
							continent: data.continent_name || data.continent ? String(data.continent_name || data.continent) : undefined,
						};
						break;
					}
				}
			} catch {
				// Continue to next provider
			}
		}

		const resolvedGeo = geoData || {
			country: "Unknown",
			region: "Unknown",
			city: "Unknown",
			latitude: 0,
			longitude: 0,
			timezone: "UTC",
			isp: "Standard ISP",
			organization: "Internet Service Provider",
			asn: "N/A",
			countryCode: "UN",
			regionCode: "",
			zip: "",
		};

		return NextResponse.json({
			ip: clientIP,
			type: clientIP.includes(":") ? "IPv6" : "IPv4",
			isLocal: false,
			location: {
				country: resolvedGeo.country,
				region: resolvedGeo.region,
				city: resolvedGeo.city,
				latitude: resolvedGeo.latitude,
				longitude: resolvedGeo.longitude,
				timezone: resolvedGeo.timezone,
			},
			isp: resolvedGeo.isp,
			organization: resolvedGeo.organization,
			asn: resolvedGeo.asn,
			continent: resolvedGeo.continent || "Global",
			countryCode: resolvedGeo.countryCode,
			regionCode: resolvedGeo.regionCode,
			zip: resolvedGeo.zip,
			proxy: false,
			vpn: false,
			tor: false,
			hosting: false,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to determine IP address. Please check connection." },
			{ status: 500 }
		);
	}
}
