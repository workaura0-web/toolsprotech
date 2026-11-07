// IP regexes for IPv4 and IPv6
const IPV4_REGEX = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
const IPV6_REGEX = /^(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}$|^::(?:[a-fA-F0-9]{1,4}:){0,6}[a-fA-F0-9]{1,4}$|^(?:[a-fA-F0-9]{1,4}:){1,7}:$/;

/**
 * Checks whether an IPv4 address is in a private, loopback, or link-local range.
 */
export function isPrivateIPv4(ip: string): boolean {
	const parts = ip.split(".").map(Number);
	if (parts.length !== 4) return false;

	// 127.0.0.0/8 (Loopback)
	if (parts[0] === 127) return true;
	// 10.0.0.0/8 (Private)
	if (parts[0] === 10) return true;
	// 172.16.0.0/12 (Private)
	if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
	// 192.168.0.0/16 (Private)
	if (parts[0] === 192 && parts[1] === 168) return true;
	// 169.254.0.0/16 (Link-local / Cloud metadata: 169.254.169.254)
	if (parts[0] === 169 && parts[1] === 254) return true;
	// 0.0.0.0/8 (Current network)
	if (parts[0] === 0) return true;
	// 224.0.0.0/4 (Multicast)
	if (parts[0] >= 224 && parts[0] <= 239) return true;
	// 240.0.0.0/4 (Reserved)
	if (parts[0] >= 240) return true;

	return false;
}

/**
 * Checks whether an IPv6 address is in a private, loopback, or link-local range.
 */
export function isPrivateIPv6(ip: string): boolean {
	const lower = ip.toLowerCase();
	// Loopback ::1
	if (lower === "::1" || lower === "0:0:0:0:0:0:0:1") return true;
	// Unspecified ::
	if (lower === "::") return true;
	// Link-local fe80::/10
	if (lower.startsWith("fe8") || lower.startsWith("fe9") || lower.startsWith("fea") || lower.startsWith("feb")) return true;
	// Unique Local Address fc00::/7
	if (lower.startsWith("fc") || lower.startsWith("fd")) return true;

	return false;
}

/**
 * Validates whether an IP address is valid (IPv4 or IPv6).
 */
export function isValidIP(ip: string): boolean {
	return IPV4_REGEX.test(ip) || IPV6_REGEX.test(ip);
}

/**
 * Validates whether a domain name follows standard hostname syntax.
 */
export function isValidDomain(domain: string): boolean {
	if (!domain || domain.length > 253) return false;
	const domainRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
	return domainRegex.test(domain);
}
