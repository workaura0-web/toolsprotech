import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { SITE_URL } from "@/lib/constant";

const toolSlugs = [
	"meta-tag-generator", "favicon-generator", "domain-age-checker", "domain-ip-lookup",
	"domain-authority-checker", "page-authority-checker", "wordpress-detector", "my-ip-address",
	"keyword-density-checker", "robots-generator", "sitemap-generator", "hashtag-generator",
	"whatsapp-link-generator", "percentage-calculator", "bmi-calculator", "emi-calculator",
	"age-calculator", "unit-converter", "gpa-converter", "currency-converter", "adsense-calculator",
	"password-generator", "qr-generator", "username-generator", "lorem-generator", "uuid-generator",
	"fake-data-generator", "caption-generator", "color-generator", "privacy-policy-generator",
	"terms-conditions-generator", "disclaimer-generator", "word-counter", "article-rewriter",
	"case-converter", "text-diff-checker", "plagiarism-checker", "password-strength-checker", "typing-test",
	"url-safety-checker", "image-compressor", "image-resizer", "jpg-to-png", "png-to-jpg",
	"png-to-webp", "json-formatter", "base64", "pdf-compressor", "pdf-merger", "pdf-splitter",
];

export default function sitemap(): MetadataRoute.Sitemap {
	const staticRoutes = ["", "/about", "/blog", "/contact", "/terms", "/privacy", "/disclaimer", "/cookies", "/hiring", "/tools"];

	return [
		...staticRoutes.map((route) => ({
			url: `${SITE_URL}${route}`,
			lastModified: new Date(),
			changeFrequency: route === "/blog" ? "weekly" as const : "monthly" as const,
			priority: route === "" ? 1 : route === "/tools" || route === "/blog" ? 0.9 : 0.5,
		})),
		...toolSlugs.map((slug) => ({
			url: `${SITE_URL}/tools/${slug}`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.7,
		})),
		...blogPosts.map((post) => ({
			url: `${SITE_URL}/blog/${post.slug}`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		})),
	];
}
