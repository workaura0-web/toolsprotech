import dns from "node:dns/promises";
import { isPrivateIPv4, isPrivateIPv6, isValidIP } from "./validation";

export * from "./validation";

/**
 * Validates a target URL for Server-Side Request Forgery (SSRF) vulnerabilities.
 * Resolves DNS to ensure the destination IP is public and not an internal network or cloud metadata endpoint.
 */
export async function validateSafeOutboundUrl(rawUrl: string): Promise<{ safe: boolean; url?: URL; error?: string }> {
	try {
		let parsedUrl: URL;
		try {
			parsedUrl = new URL(rawUrl.startsWith("http://") || rawUrl.startsWith("https://") ? rawUrl : `https://${rawUrl}`);
		} catch {
			return { safe: false, error: "Invalid URL format" };
		}

		// Only allow http and https protocols
		if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
			return { safe: false, error: "Only HTTP and HTTPS protocols are permitted" };
		}

		const hostname = parsedUrl.hostname.toLowerCase();

		// Block localhost, cloud metadata, and internal hostnames
		const blockedHostnames = [
			"localhost",
			"metadata.google.internal",
			"169.254.169.254",
			"instance-data",
			"metadata",
			"kubernetes.default",
		];
		if (blockedHostnames.includes(hostname) || hostname.endsWith(".local") || hostname.endsWith(".internal")) {
			return { safe: false, error: "Access to internal or loopback hosts is restricted" };
		}

		// If hostname is directly an IP
		if (isValidIP(hostname)) {
			if (isPrivateIPv4(hostname) || isPrivateIPv6(hostname)) {
				return { safe: false, error: "Access to private or local IP ranges is blocked" };
			}
			return { safe: true, url: parsedUrl };
		}

		// Resolve DNS to verify resolved addresses are public
		try {
			const addresses = await dns.resolve(hostname);
			for (const addr of addresses) {
				if (isPrivateIPv4(addr) || isPrivateIPv6(addr)) {
					return { safe: false, error: "Target domain resolves to a private or restricted network address" };
				}
			}
		} catch {
			// If DNS lookup fails, treat as inaccessible
			return { safe: false, error: "Unable to resolve target domain DNS" };
		}

		return { safe: true, url: parsedUrl };
	} catch {
		return { safe: false, error: "Failed to validate outbound URL safety" };
	}
}
