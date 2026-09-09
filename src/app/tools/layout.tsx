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
	const pathname = (await headers()).get("x-toolsprotech-pathname") ?? "/tools";
	const segments = pathname.split("/").filter(Boolean);
	const slug = segments[0] === "tools" && segments.length === 2 ? segments[1] : null;

	if (!slug) {
		return {
			title: "Free Online Tools | ToolsProTech",
			description: baseDescription,
		};
	}

	const title = titleFromSlug(slug);
	return {
		title: `${title} | ToolsProTech`,
		description: `Use the free ${title.toLowerCase()} from ToolsProTech. Learn how it works, follow the usage steps, and review practical answers before using the result.`,
		alternates: { canonical: `https://toolsprotech.com/tools/${slug}` },
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