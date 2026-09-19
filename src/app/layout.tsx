import type React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import {
	SITE_AUTHOR,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_TITLE,
	SITE_URL,
} from "@/lib/constant";
import SiteStructuredData from "@/components/site-structured-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	keywords:
		"free online tools, SEO tools, calculators, text tools, image tools, PDF tools, developer tools",
	authors: [{ name: SITE_AUTHOR }],
	creator: SITE_AUTHOR,
	publisher: SITE_AUTHOR,
	metadataBase: new URL(SITE_URL),
	alternates: { canonical: SITE_URL },
	robots: "index, follow",
	category: "technology",
	formatDetection: { telephone: false },
	openGraph: {
		type: "website",
		locale: "en_US",
		url: SITE_URL,
		title: SITE_TITLE,
		description:
			"Boost your productivity with our collection of powerful, free online tools.",
		siteName: SITE_NAME,
	},
	twitter: {
		card: "summary_large_image",
		title: SITE_TITLE,
		description:
			"Boost your productivity with our collection of powerful, free online tools.",
		creator: `@${SITE_AUTHOR}`,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head suppressHydrationWarning>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, maximum-scale=5'
				/>
			</head>
			<body className={inter.className} suppressHydrationWarning>
				<Script
					async
					src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6193096344573365'
					crossOrigin='anonymous'
					strategy='afterInteractive'
				/>
				<SiteStructuredData />
				<Header />
				{children}
				<Toaster />
				<Footer />
			</body>
		</html>
	);
}
