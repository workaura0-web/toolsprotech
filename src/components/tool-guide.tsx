"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SITE_NAME, SITE_URL } from "@/lib/constant";
import { getToolData } from "@/lib/tools-data";
import {
	CheckCircle,
	Sparkles,
	ShieldCheck,
	HelpCircle,
	BookOpen,
	ArrowRight,
	Share2,
	Code2,
	Cpu,
	Lock,
} from "lucide-react";

const categoryLinks: Record<string, { slug: string; name: string }[]> = {
	SEO: [
		{ slug: "robots-generator", name: "Robots.txt Generator" },
		{ slug: "meta-tag-generator", name: "Meta Tag Generator" },
		{ slug: "sitemap-generator", name: "Sitemap Generator" },
		{ slug: "domain-age-checker", name: "Domain Age Checker" },
		{ slug: "domain-authority-checker", name: "Domain Authority Checker" },
		{ slug: "keyword-density-checker", name: "Keyword Density Checker" },
	],
	Calculator: [
		{ slug: "adsense-calculator", name: "AdSense Calculator" },
		{ slug: "percentage-calculator", name: "Percentage Calculator" },
		{ slug: "bmi-calculator", name: "BMI Calculator" },
		{ slug: "emi-calculator", name: "EMI Calculator" },
		{ slug: "currency-converter", name: "Currency Converter" },
		{ slug: "age-calculator", name: "Age Calculator" },
	],
	Text: [
		{ slug: "word-counter", name: "Word Counter" },
		{ slug: "case-converter", name: "Case Converter" },
		{ slug: "text-diff-checker", name: "Text Diff Checker" },
		{ slug: "article-rewriter", name: "Article Rewriter" },
		{ slug: "typing-test", name: "Typing Test" },
	],
	Image: [
		{ slug: "image-compressor", name: "Image Compressor" },
		{ slug: "image-resizer", name: "Image Resizer" },
		{ slug: "jpg-to-png", name: "JPG to PNG" },
		{ slug: "png-to-jpg", name: "PNG to JPG" },
		{ slug: "png-to-webp", name: "PNG to WebP" },
	],
	PDF: [
		{ slug: "pdf-merger", name: "PDF Merger" },
		{ slug: "pdf-compressor", name: "PDF Compressor" },
		{ slug: "pdf-splitter", name: "PDF Splitter" },
	],
	Security: [
		{ slug: "password-generator", name: "Password Generator" },
		{ slug: "password-strength-checker", name: "Password Strength Checker" },
		{ slug: "url-safety-checker", name: "URL Safety Checker" },
	],
	Developer: [
		{ slug: "json-formatter", name: "JSON Formatter" },
		{ slug: "base64", name: "Base64 Encoder/Decoder" },
		{ slug: "uuid-generator", name: "UUID Generator" },
		{ slug: "fake-data-generator", name: "Fake Data Generator" },
	],
	Generator: [
		{ slug: "qr-generator", name: "QR Code Generator" },
		{ slug: "username-generator", name: "Username Generator" },
		{ slug: "hashtag-generator", name: "Hashtag Generator" },
		{ slug: "lorem-generator", name: "Lorem Ipsum Generator" },
		{ slug: "whatsapp-link-generator", name: "WhatsApp Link Generator" },
	],
};

export default function ToolGuide() {
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);
	const slug = segments.length >= 2 && segments[0] === "tools" ? segments[1] : null;

	const tool = getToolData(slug || "tools");
	const pageUrl = `${SITE_URL}/tools/${tool.slug}`;

	const relatedList =
		categoryLinks[tool.category] ||
		categoryLinks.SEO;

	useEffect(() => {
		if (slug) {
			document.title = tool.metaTitle;
			const metaDesc = document.querySelector('meta[name="description"]');
			if (metaDesc) {
				metaDesc.setAttribute("content", tool.metaDescription);
			}
		}
	}, [slug, tool.metaDescription, tool.metaTitle]);

	if (!slug || pathname === "/tools") return null;

	// Structured Data for Google Rich Results, AIO and GEO
	const webAppSchema = {
		"@context": "https://schema.org",
		"@type": "WebApplication",
		"@id": `${pageUrl}#webapp`,
		name: tool.title,
		url: pageUrl,
		description: tool.metaDescription,
		applicationCategory: `${tool.category}Application`,
		operatingSystem: "All",
		browserRequirements: "Requires modern web browser with JavaScript enabled",
		isAccessibleForFree: true,
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
			availability: "https://schema.org/InStock",
		},
		publisher: {
			"@type": "Organization",
			name: SITE_NAME,
			url: SITE_URL,
		},
	};

	const howToSchema = {
		"@context": "https://schema.org",
		"@type": "HowTo",
		name: `How to use ${tool.title}`,
		description: `Step-by-step instructions on how to use the free ${tool.title} on ${SITE_NAME}.`,
		step: tool.howToSteps.map((s, index) => ({
			"@type": "HowToStep",
			position: index + 1,
			name: s.title,
			text: s.text,
		})),
	};

	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: tool.faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer,
			},
		})),
	};

	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
			{ "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
			{ "@type": "ListItem", position: 3, name: tool.category, item: `${SITE_URL}/tools#${tool.category.toLowerCase()}` },
			{ "@type": "ListItem", position: 4, name: tool.title, item: pageUrl },
		],
	};

	return (
		<section
			className='border-t border-slate-200 bg-gradient-to-b from-slate-50/80 via-white to-slate-50 px-4 py-16'
			aria-labelledby='tool-guide-heading'>
			{/* JSON-LD Schema.org Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
			/>

			<div className='mx-auto max-w-5xl space-y-12'>
				{/* Breadcrumb Navigation for SEO & Crawlers */}
				<nav aria-label='Breadcrumb' className='text-xs text-slate-500'>
					<ol className='flex items-center space-x-2'>
						<li>
							<Link href='/' className='hover:text-blue-600 transition-colors'>
								Home
							</Link>
						</li>
						<li>/</li>
						<li>
							<Link href='/' className='hover:text-blue-600 transition-colors'>
								Tools
							</Link>
						</li>
						<li>/</li>
						<li>
							<span className='text-blue-600 font-semibold'>{tool.category}</span>
						</li>
						<li>/</li>
						<li className='text-slate-800 font-medium truncate max-w-xs'>
							{tool.title}
						</li>
					</ol>
				</nav>

				{/* AI Overview / GEO Direct Answer Box */}
				<div className='rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-white p-6 shadow-sm md:p-8'>
					<div className='flex items-center gap-2 mb-3'>
						<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm'>
							<Sparkles className='h-4 w-4' />
						</div>
						<span className='text-xs font-bold uppercase tracking-wider text-blue-700'>
							AI Overview & Quick Reference
						</span>
					</div>
					<h2
						id='tool-guide-heading'
						className='text-2xl font-bold tracking-tight text-slate-900 md:text-3xl'>
						What is {tool.title}?
					</h2>
					<p className='mt-3 text-base leading-relaxed text-slate-700 md:text-lg'>
						{tool.quickDefinition}
					</p>

					{/* Fast Facts Grid */}
					<div className='mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-blue-100 pt-5 text-sm'>
						<div className='rounded-xl bg-white/80 p-3 shadow-xs border border-blue-100/60'>
							<p className='text-xs text-slate-500 font-medium'>Cost</p>
							<p className='text-sm font-bold text-emerald-600'>100% Free</p>
						</div>
						<div className='rounded-xl bg-white/80 p-3 shadow-xs border border-blue-100/60'>
							<p className='text-xs text-slate-500 font-medium'>Registration</p>
							<p className='text-sm font-bold text-slate-800'>Not Required</p>
						</div>
						<div className='rounded-xl bg-white/80 p-3 shadow-xs border border-blue-100/60'>
							<p className='text-xs text-slate-500 font-medium'>Privacy</p>
							<p className='text-sm font-bold text-blue-700'>
								{tool.clientSide ? "Client-Side Safe" : "Encrypted Lookup"}
							</p>
						</div>
						<div className='rounded-xl bg-white/80 p-3 shadow-xs border border-blue-100/60'>
							<p className='text-xs text-slate-500 font-medium'>Category</p>
							<p className='text-sm font-bold text-purple-700'>{tool.category}</p>
						</div>
					</div>
				</div>

				{/* Syntax / Formula Section (Critical for AIO & Technical EEAT) */}
				{tool.syntaxOrFormula && (
					<div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8'>
						<div className='flex items-center gap-2 mb-3'>
							<Code2 className='h-5 w-5 text-indigo-600' />
							<h3 className='text-lg font-bold text-slate-900'>
								{tool.formulaTitle || "Standard Technical Specifications"}
							</h3>
						</div>
						<p className='text-sm text-slate-600 mb-4'>
							Below is the underlying syntax, formula, or protocol standard applied by this tool for accurate calculations and compliant outputs:
						</p>
						<pre className='overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs md:text-sm text-emerald-400 font-mono leading-relaxed shadow-inner'>
							<code>{tool.syntaxOrFormula}</code>
						</pre>
					</div>
				)}

				{/* Key Features & Capabilities */}
				<div className='grid gap-6 md:grid-cols-2'>
					<div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
						<div className='flex items-center gap-2 mb-4'>
							<Cpu className='h-5 w-5 text-blue-600' />
							<h3 className='text-lg font-bold text-slate-900'>
								Key Features & Capabilities
							</h3>
						</div>
						<ul className='space-y-3'>
							{tool.keyFeatures.map((feat, idx) => (
								<li key={idx} className='flex items-start gap-3 text-sm text-slate-700'>
									<CheckCircle className='h-4 w-4 text-emerald-600 mt-0.5 shrink-0' />
									<span>{feat}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Industry Use Cases */}
					<div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
						<div className='flex items-center gap-2 mb-4'>
							<BookOpen className='h-5 w-5 text-purple-600' />
							<h3 className='text-lg font-bold text-slate-900'>
								Practical Industry Use Cases
							</h3>
						</div>
						<ul className='space-y-3'>
							{tool.industryUseCases.map((useCase, idx) => (
								<li key={idx} className='flex items-start gap-3 text-sm text-slate-700'>
									<ArrowRight className='h-4 w-4 text-blue-600 mt-0.5 shrink-0' />
									<span>{useCase}</span>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Step-by-Step How-To Guide */}
				<div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8'>
					<div className='flex items-center gap-2 mb-6'>
						<div className='flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700'>
							<CheckCircle className='h-4 w-4' />
						</div>
						<h3 className='text-xl font-bold text-slate-900'>
							Step-by-Step Guide: How to Use {tool.title}
						</h3>
					</div>

					<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
						{tool.howToSteps.map((step, idx) => (
							<div
								key={idx}
								className='relative rounded-xl border border-slate-100 bg-slate-50/70 p-5'>
								<span className='absolute -top-3 left-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-xs'>
									{idx + 1}
								</span>
								<h4 className='mt-1 text-sm font-bold text-slate-900 mb-2'>
									{step.title}
								</h4>
								<p className='text-xs leading-relaxed text-slate-600'>
									{step.text}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Comprehensive FAQs (Schema.org compliant) */}
				<div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8'>
					<div className='flex items-center gap-2 mb-6'>
						<HelpCircle className='h-5 w-5 text-blue-600' />
						<h3 className='text-xl font-bold text-slate-900'>
							Frequently Asked Questions
						</h3>
					</div>

					<div className='space-y-4'>
						{tool.faqs.map((faq, idx) => (
							<details
								key={idx}
								className='group rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-colors hover:bg-slate-50 open:bg-white open:shadow-xs'>
								<summary className='cursor-pointer font-semibold text-slate-800 list-none flex items-center justify-between text-sm md:text-base'>
									<span>{faq.question}</span>
									<span className='ml-2 text-blue-600 group-open:rotate-180 transition-transform'>
										▼
									</span>
								</summary>
								<p className='mt-3 text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-3'>
									{faq.answer}
								</p>
							</details>
						))}
					</div>
				</div>

				{/* E-E-A-T Quality and Privacy Guarantee Banner */}
				<div className='rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 flex flex-col md:flex-row items-center gap-4 text-center md:text-left'>
					<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md'>
						<ShieldCheck className='h-6 w-6' />
					</div>
					<div className='flex-1'>
						<h4 className='text-base font-bold text-emerald-950'>
							ToolsProTech Quality & Editorial Standard
						</h4>
						<p className='text-xs md:text-sm text-emerald-800 mt-1 leading-normal'>
							Every tool on {SITE_NAME} is tested against industry standards. Calculations adhere to published financial and mathematical formulas. Files and sensitive user inputs are processed client-side in memory wherever possible, maintaining zero-knowledge data security.
						</p>
					</div>
					<div className='shrink-0 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-white px-3 py-2 rounded-lg border border-emerald-200 shadow-2xs'>
						<Lock className='h-3.5 w-3.5 text-emerald-600' />
						<span>256-Bit SSL Safe</span>
					</div>
				</div>

				{/* Related Tools Directory */}
				<div className='border-t border-slate-200 pt-8'>
					<h3 className='text-lg font-bold text-slate-900 mb-4'>
						More {tool.category} & Productivity Tools
					</h3>
					<div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
						{relatedList
							.filter((rel) => rel.slug !== tool.slug)
							.map((rel) => (
								<Link
									key={rel.slug}
									href={`/tools/${rel.slug}`}
									className='group block rounded-xl border border-slate-200 bg-white p-3 text-center transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md'>
									<p className='text-xs font-semibold text-slate-800 group-hover:text-blue-600 truncate'>
										{rel.name}
									</p>
								</Link>
							))}
					</div>
				</div>

				{/* Social Share & Attribution */}
				<div className='border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500'>
					<div className='flex items-center gap-2'>
						<Share2 className='h-4 w-4 text-slate-400' />
						<span>Share this free tool with your network:</span>
					</div>
					<div className='flex items-center gap-3 font-medium'>
						<a
							href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(tool.metaTitle)}`}
							target='_blank'
							rel='noreferrer'
							className='hover:text-blue-600 transition-colors'>
							X (Twitter)
						</a>
						<span>•</span>
						<a
							href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
							target='_blank'
							rel='noreferrer'
							className='hover:text-blue-600 transition-colors'>
							LinkedIn
						</a>
						<span>•</span>
						<a
							href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
							target='_blank'
							rel='noreferrer'
							className='hover:text-blue-600 transition-colors'>
							Facebook
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}