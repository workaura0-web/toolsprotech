import { NextRequest, NextResponse } from "next/server";
import { validateSafeOutboundUrl } from "@/lib/security";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const rawUrl = searchParams.get("url");

	if (!rawUrl) {
		return NextResponse.json(
			{ error: "Missing url parameter" },
			{ status: 400 }
		);
	}

	// Validate URL against SSRF and private networks
	const validation = await validateSafeOutboundUrl(rawUrl);
	if (!validation.safe || !validation.url) {
		return NextResponse.json(
			{ error: validation.error || "Target URL is not permitted or unreachable" },
			{ status: 400 }
		);
	}

	const safeUrl = validation.url.toString();

	try {
		// Fetch with strict timeout and headers
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 6000);

		const res = await fetch(safeUrl, {
			headers: {
				"User-Agent": "Mozilla/5.0 (compatible; ToolsProTech-Detector/1.0)",
				"Accept": "text/html,application/xhtml+xml",
			},
			signal: controller.signal,
			redirect: "follow",
		});
		clearTimeout(timeoutId);

		if (!res.ok) {
			return NextResponse.json(
				{ error: `Target website returned HTTP status ${res.status}` },
				{ status: 422 }
			);
		}

		// Read up to 512KB to avoid memory exhaustion
		const reader = res.body?.getReader();
		let html = "";
		if (reader) {
			const decoder = new TextDecoder("utf-8");
			let bytesRead = 0;
			const maxBytes = 512 * 1024; // 512 KB
			while (bytesRead < maxBytes) {
				const { done, value } = await reader.read();
				if (done) break;
				bytesRead += value.byteLength;
				html += decoder.decode(value, { stream: true });
			}
			reader.cancel();
		} else {
			html = await res.text();
		}

		// Detect WordPress markers
		const isWordPress =
			/\/wp-content\//.test(html) ||
			/\/wp-includes\//.test(html) ||
			/generator\s*content=["']WordPress/i.test(html) ||
			/<meta[^>]+name=["']generator["'][^>]+WordPress/i.test(html);

		let version = "";
		// Extract version from meta tag
		const metaMatch = html.match(
			/<meta[^>]+name=["']generator["'][^>]+content=["']WordPress\s*([\d.]+)["']/i
		);
		if (metaMatch) {
			version = metaMatch[1];
		}

		// Theme detection from HTML
		const theme = {
			name: "",
			version: "",
			author: "",
			description: "",
			url: "",
		};
		const themeMatch = html.match(/\/wp-content\/themes\/([a-zA-Z0-9_-]+)/);
		if (themeMatch) {
			theme.name = themeMatch[1];
			const baseUrl = safeUrl.replace(/\/$/, "");
			theme.url = `${baseUrl}/wp-content/themes/${theme.name}/`;
		}

		// Plugin detection from HTML
		const pluginRegex = /\/wp-content\/plugins\/([a-zA-Z0-9_-]+)/g;
		const pluginsSet = new Set<string>();
		let match;
		while ((match = pluginRegex.exec(html))) {
			pluginsSet.add(match[1]);
		}
		const plugins = Array.from(pluginsSet).map((name) => ({
			name,
			version: "",
			description: "",
			active: true,
		}));

		// Server info
		const server = res.headers.get("server") || "Unknown";

		return NextResponse.json({
			url: safeUrl,
			isWordPress,
			version: version || (isWordPress ? "Detected (Hidden for security)" : "N/A"),
			theme,
			plugins,
			server,
			lastUpdated: new Date().toISOString().split("T")[0],
		});
	} catch (error: unknown) {
		const isAbort = error instanceof Error && error.name === "AbortError";
		return NextResponse.json(
			{ error: isAbort ? "Connection timed out while analyzing the target site" : "Failed to analyze target website" },
			{ status: 504 }
		);
	}
}
