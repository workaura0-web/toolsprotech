import type { Metadata } from "next";
import { headers } from "next/headers";
import ToolGuide from "@/components/tool-guide";

const baseDescription =
	"Use practical free online tools for SEO, calculations, text, images, PDFs, and everyday digital tasks.";

function titleFromSlug(slug: string) {
	const specialWords: Record<string, string> = {
		adsense: "AdSense",
		base64: "Base64",
		bmi: "BMI",
		emi: "EMI",
		gpa: "GPA",
		ip: "IP",
		jpg: "JPG",
		json: "JSON",
		pdf: "PDF",
		png: "PNG",
		qr: "QR",
		seo: "SEO",
		url: "URL",
		uuid: "UUID",
		whatsapp: "WhatsApp",
		wordpress: "WordPress",
	};

	return slug
		.split("-")
		.map((word) => specialWords[word] ?? word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export async function generateMetadata(): Promise<Metadata> {
	const requestHeaders = await headers();
	const slug = requestHeaders.get("x-toolsprotech-tool-slug") || null;

	if (!slug) {
		return {
			title: "Free Online Tools | ToolsProTech",
			description: baseDescription,
		};
	}

	const title = titleFromSlug(slug);
	const description = `Use the free ${title.toLowerCase()} from ToolsProTech. Learn what it does, how to use it, practical benefits, limitations, and answers to common questions.`;
	const url = `https://toolsprotech.com/tools/${slug}`;
	return {
		title: `${title} | ToolsProTech`,
		description,
		keywords: [title, `free ${title.toLowerCase()}`, `${title} online`, "ToolsProTech"],
		alternates: { canonical: url },
		openGraph: {
			type: "website",
			url,
			title: `${title} | ToolsProTech`,
			description,
			siteName: "ToolsProTech",
		},
		twitter: {
			card: "summary",
			title: `${title} | ToolsProTech`,
			description,
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