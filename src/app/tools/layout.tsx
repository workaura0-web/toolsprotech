import type { Metadata } from "next";
import ToolGuide from "@/components/tool-guide";

export const metadata: Metadata = {
	title: {
		default: "Free Online Tools | ToolsProTech",
		template: "%s | ToolsProTech",
	},
	description:
		"Use practical free online tools for SEO, calculations, text, images, PDFs, and everyday digital tasks.",
};

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