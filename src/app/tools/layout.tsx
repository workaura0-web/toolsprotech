import type { Metadata } from "next";
import { headers } from "next/headers";
import ToolGuide from "@/components/tool-guide";
import { getToolData } from "@/lib/tools-data";
import { SITE_NAME, SITE_URL } from "@/lib/constant";

export async function generateMetadata(): Promise<Metadata> {
	const requestHeaders = await headers();
	const slug = requestHeaders.get("x-toolsprotech-tool-slug") || null;

	if (!slug) {
		return {
			title: `Free Online Tools for SEO, Dev & Calculations – ${SITE_NAME}`,
			description:
				"Explore 50+ free online tools for SEO, calculations, text formatting, image compression, PDF operations, and web development. No signup required.",
			alternates: { canonical: `${SITE_URL}/tools` },
		};
	}

	const tool = getToolData(slug);
	const url = `${SITE_URL}/tools/${slug}`;

	return {
		title: tool.metaTitle,
		description: tool.metaDescription,
		keywords: tool.keywords,
		alternates: { canonical: url },
		openGraph: {
			type: "website",
			url,
			title: tool.metaTitle,
			description: tool.metaDescription,
			siteName: SITE_NAME,
			images: [
				{
					url: `${SITE_URL}/favicon.ico`,
					width: 1200,
					height: 630,
					alt: tool.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: tool.metaTitle,
			description: tool.metaDescription,
		},
	};
}

export default function ToolsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			{children}
			<ToolGuide />
		</>
	);
}