import { SITE_URL } from "@/lib/constant";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/private/"],
			},
			{
				userAgent: [
					"Googlebot",
					"Bingbot",
					"Google-Extended",
					"GPTBot",
					"ChatGPT-User",
					"ClaudeBot",
					"PerplexityBot",
					"Applebot",
				],
				allow: "/",
				disallow: ["/api/"],
			},
		],
		sitemap: `${SITE_URL}/sitemap.xml`,
	};
}