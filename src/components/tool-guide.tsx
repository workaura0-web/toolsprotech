"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type ToolDetail = {
	title: string;
	intro: string;
	bestFor: string;
	category: string;
};

const toolDetails: Record<string, ToolDetail> = {
	"age-calculator": { title: "Age Calculator", intro: "Calculate a person's exact age between two dates, including years, months, days, and useful time totals.", bestFor: "birthdays, forms, personal records, and date planning", category: "calculator" },
	"bmi-calculator": { title: "BMI Calculator", intro: "Estimate body mass index from height and weight and understand the standard BMI ranges used for general guidance.", bestFor: "quick health estimates and fitness planning", category: "calculator" },
	"percentage-calculator": { title: "Percentage Calculator", intro: "Solve common percentage problems such as finding a percentage of a number, percentage change, and the difference between two values.", bestFor: "discounts, grades, budgets, and everyday calculations", category: "calculator" },
	"emi-calculator": { title: "EMI Calculator", intro: "Estimate monthly loan payments using the principal, interest rate, and repayment period so you can compare borrowing options.", bestFor: "loan planning and repayment comparisons", category: "calculator" },
	"unit-converter": { title: "Unit Converter", intro: "Convert measurements between common units with clear results for length, weight, temperature, area, volume, and more.", bestFor: "schoolwork, engineering, travel, cooking, and daily tasks", category: "calculator" },
	"gpa-converter": { title: "GPA Converter", intro: "Convert grades into an estimated GPA using a consistent scale and review the result before submitting an application.", bestFor: "students comparing academic results", category: "calculator" },
	"currency-converter": { title: "Currency Converter", intro: "Convert an amount between currencies using the latest available exchange-rate data from the service behind the tool.", bestFor: "travel budgets, invoices, shopping, and quick estimates", category: "calculator" },
	"adsense-calculator": { title: "AdSense Revenue Calculator", intro: "Create a rough advertising revenue estimate from page views, impressions, and expected cost-per-click values.", bestFor: "publishers planning content and traffic goals", category: "calculator" },
	"meta-tag-generator": { title: "Meta Tag Generator", intro: "Create a useful starting set of title, description, robots, Open Graph, and Twitter metadata for a webpage.", bestFor: "bloggers, developers, and website owners", category: "seo" },
	"favicon-generator": { title: "Favicon Generator", intro: "Prepare a favicon from an image so your website has a recognizable browser-tab and bookmark icon.", bestFor: "new websites, blogs, and web applications", category: "seo" },
	"domain-age-checker": { title: "Domain Age Checker", intro: "Check when a domain was first registered and understand how domain age can be used as one research signal.", bestFor: "domain research and website due diligence", category: "seo" },
	"domain-ip-lookup": { title: "Domain IP Lookup", intro: "Look up the IP address and basic network details associated with a domain name.", bestFor: "technical checks, hosting research, and troubleshooting", category: "seo" },
	"domain-authority-checker": { title: "Domain Authority Checker", intro: "Review available authority information for a domain and use it as one part of a broader SEO analysis.", bestFor: "competitor research and link-building planning", category: "seo" },
	"page-authority-checker": { title: "Page Authority Checker", intro: "Inspect page-level authority information to help compare pages and prioritize SEO research.", bestFor: "content audits and backlink research", category: "seo" },
	"wordpress-detector": { title: "WordPress Detector", intro: "Check whether a website appears to use WordPress by reviewing publicly visible technical signals.", bestFor: "technology research and site troubleshooting", category: "seo" },
	"my-ip-address": { title: "My IP Address", intro: "View the public IP address detected for your current connection and understand what it represents.", bestFor: "network troubleshooting and support requests", category: "seo" },
	"keyword-density-checker": { title: "Keyword Density Checker", intro: "Analyze how often words and phrases occur in text without relying on outdated keyword-stuffing practices.", bestFor: "content editing and on-page SEO reviews", category: "seo" },
	"robots-generator": { title: "Robots.txt Generator", intro: "Create a robots.txt starting point that communicates crawl preferences to well-behaved search engines.", bestFor: "technical SEO setup and crawl management", category: "seo" },
	"sitemap-generator": { title: "Sitemap Generator", intro: "Build an XML sitemap from your URLs to help search engines discover important pages on a website.", bestFor: "new sites, migrations, and SEO maintenance", category: "seo" },
	"url-safety-checker": { title: "URL Safety Checker", intro: "Review a URL carefully before visiting it and use the result as one signal alongside browser and security warnings.", bestFor: "link checking and safer browsing habits", category: "seo" },
	"hashtag-generator": { title: "Hashtag Generator", intro: "Generate relevant hashtag ideas from a topic and refine them for the audience and platform you use.", bestFor: "social posts, campaigns, and content planning", category: "generator" },
	"whatsapp-link-generator": { title: "WhatsApp Link Generator", intro: "Create a shareable WhatsApp chat link with an optional pre-filled message and phone number.", bestFor: "business contact pages, support, and campaigns", category: "generator" },
	"password-generator": { title: "Password Generator", intro: "Generate random passwords with configurable length and character choices for stronger account security.", bestFor: "new accounts, testing, and credential management", category: "security" },
	"password-strength-checker": { title: "Password Strength Checker", intro: "Evaluate password length and composition locally in your browser and learn how to make it harder to guess.", bestFor: "improving account security before saving a password", category: "security" },
	"qr-generator": { title: "QR Code Generator", intro: "Turn text, a URL, or contact information into a QR code that can be scanned from a phone.", bestFor: "menus, events, packaging, payments, and sharing links", category: "generator" },
	"username-generator": { title: "Username Generator", intro: "Create username ideas from a topic, style, or set of preferences for social and project accounts.", bestFor: "branding, communities, and creator profiles", category: "generator" },
	"lorem-generator": { title: "Lorem Ipsum Generator", intro: "Generate placeholder paragraphs, sentences, or words while designing a page before final copy is ready.", bestFor: "wireframes, prototypes, and layout testing", category: "generator" },
	"uuid-generator": { title: "UUID Generator", intro: "Generate universally unique identifier values for records, test data, and development workflows.", bestFor: "developers building APIs, databases, and test fixtures", category: "developer" },
	"fake-data-generator": { title: "Fake Data Generator", intro: "Create realistic-looking sample values for development and testing without using real people's private information.", bestFor: "mockups, demos, QA, and local development", category: "developer" },
	"caption-generator": { title: "Caption Generator", intro: "Create caption ideas from a topic and tone, then edit the result so it matches your own voice.", bestFor: "social media planning and creator workflows", category: "generator" },
	"color-generator": { title: "Color Palette Generator", intro: "Explore coordinated color values for interfaces, branding, illustrations, and visual experiments.", bestFor: "design systems, websites, and presentations", category: "generator" },
	"base64": { title: "Base64 Encoder and Decoder", intro: "Encode text as Base64 or decode Base64 text when working with compatible data formats and development tools.", bestFor: "API testing, debugging, and data inspection", category: "developer" },
	"json-formatter": { title: "JSON Formatter", intro: "Format, validate, and inspect JSON so nested data is easier to read and debug.", bestFor: "API responses, configuration files, and development", category: "developer" },
	"word-counter": { title: "Word Counter", intro: "Count words, characters, sentences, and paragraphs in text with quick feedback as you edit.", bestFor: "essays, SEO briefs, applications, and social copy", category: "text" },
	"case-converter": { title: "Case Converter", intro: "Change text between uppercase, lowercase, title case, sentence case, and other common formats.", bestFor: "editing, data cleanup, and content formatting", category: "text" },
	"text-diff-checker": { title: "Text Difference Checker", intro: "Compare two text versions and identify additions, removals, and changed sections.", bestFor: "editing, code review, contracts, and document QA", category: "text" },
	"plagiarism-checker": { title: "Plagiarism Checker", intro: "Review submitted text for repeated phrases and potential overlap so you can edit responsibly and verify sources before publishing.", bestFor: "students, editors, and content quality checks", category: "text" },
	"article-rewriter": { title: "Article Rewriter", intro: "Create an alternative draft from supplied text, then review and rewrite it so the final work is accurate and genuinely yours.", bestFor: "brainstorming and first-draft editing", category: "text" },
	"typing-test": { title: "Typing Test", intro: "Measure typing speed and accuracy with a short timed exercise and use the result to track practice.", bestFor: "students, office work, and keyboard practice", category: "text" },
	"image-compressor": { title: "Image Compressor", intro: "Reduce image file size while balancing visual quality, page speed, and upload limits.", bestFor: "websites, ecommerce, email, and social media", category: "image" },
	"image-resizer": { title: "Image Resizer", intro: "Resize an image to exact dimensions for a website, profile, document, or social platform.", bestFor: "responsive content and upload requirements", category: "image" },
	"jpg-to-png": { title: "JPG to PNG Converter", intro: "Convert JPG images to PNG format when you need lossless output or transparency support.", bestFor: "graphics, screenshots, logos, and web assets", category: "image" },
	"png-to-jpg": { title: "PNG to JPG Converter", intro: "Convert PNG images to smaller JPG files when transparency is not required.", bestFor: "photos, uploads, and sharing", category: "image" },
	"png-to-webp": { title: "PNG to WebP Converter", intro: "Convert PNG images to modern WebP files for smaller web downloads and faster pages.", bestFor: "website performance and image delivery", category: "image" },
	"pdf-compressor": { title: "PDF Compressor", intro: "Reduce PDF file size for easier emailing, uploading, and storage while keeping the document usable.", bestFor: "forms, reports, applications, and sharing", category: "pdf" },
	"pdf-merger": { title: "PDF Merger", intro: "Combine multiple PDF files into one ordered document directly in the browser.", bestFor: "reports, applications, scanned records, and packets", category: "pdf" },
	"pdf-splitter": { title: "PDF Splitter", intro: "Extract selected pages from a PDF or divide a large document into smaller files.", bestFor: "sharing selected pages and organizing records", category: "pdf" },
	"privacy-policy-generator": { title: "Privacy Policy Generator", intro: "Draft a starting privacy policy based on your website's data practices, then review it for accuracy and legal requirements.", bestFor: "small websites and early policy drafts", category: "generator" },
	"terms-conditions-generator": { title: "Terms and Conditions Generator", intro: "Create a starting terms document for a website or service and customize it to reflect your actual rules.", bestFor: "website owners preparing basic site terms", category: "generator" },
	"disclaimer-generator": { title: "Disclaimer Generator", intro: "Prepare a customizable disclaimer draft for common website content, links, services, and informational use cases.", bestFor: "blogs, tool sites, and informational projects", category: "generator" },
};

const relatedTools: Record<string, string[]> = {
	calculator: ["percentage-calculator", "unit-converter", "currency-converter"],
	seo: ["meta-tag-generator", "sitemap-generator", "robots-generator"],
	text: ["word-counter", "case-converter", "text-diff-checker"],
	image: ["image-compressor", "image-resizer", "png-to-webp"],
	pdf: ["pdf-compressor", "pdf-merger", "pdf-splitter"],
	generator: ["password-generator", "qr-generator", "username-generator"],
	security: ["password-generator", "password-strength-checker", "url-safety-checker"],
	developer: ["json-formatter", "base64", "uuid-generator"],
};

function titleFromSlug(slug: string) {
	return slug
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export default function ToolGuide() {
	const pathname = usePathname();
	const slug = pathname.split("/").filter(Boolean).at(-1);
	const activeSlug = slug ?? "tool";
	const detail = toolDetails[activeSlug] ?? {
		title: titleFromSlug(activeSlug),
		intro: `Use this free ${titleFromSlug(activeSlug).toLowerCase()} to complete a focused digital task quickly and understand the result before you use it.`,
		bestFor: "everyday digital work, study, and small business tasks",
		category: "tool",
	};
	const links = relatedTools[detail.category] ?? ["word-counter", "password-generator", "json-formatter"];
	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: [
			{
				"@type": "Question",
				name: "Is this tool free to use?",
				acceptedAnswer: { "@type": "Answer", text: "Yes. You can use the tool without creating an account. Avoid entering confidential information unless the page explains how it is handled." },
			},
			{
				"@type": "Question",
				name: "Can I rely on the result for an important decision?",
				acceptedAnswer: { "@type": "Answer", text: "Use the output as practical assistance and verify important results against an appropriate official, professional, or primary source." },
			},
			{
				"@type": "Question",
				name: "What should I do if the result looks wrong?",
				acceptedAnswer: { "@type": "Answer", text: "Check the input format, units, dates, and options first. Run the tool again with a simple test value, then contact us if the problem continues." },
			},
		],
	};

	useEffect(() => {
		const syncMetadata = () => {
			document.title = `${detail.title} | ToolsProTech`;
			const description = document.querySelector('meta[name="description"]');
			if (description) {
				description.setAttribute("content", detail.intro);
			}
		};

		syncMetadata();
		const timer = window.setTimeout(syncMetadata, 0);
		return () => window.clearTimeout(timer);
	}, [detail.intro, detail.title]);

	if (!slug || pathname === "/tools") return null;

	return (
		<section className='border-t bg-slate-50/70 px-4 py-12' aria-labelledby='tool-guide-heading'>
			<div className='mx-auto max-w-4xl space-y-8'>
				<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
				<div className='space-y-3'>
					<p className='text-sm font-semibold uppercase tracking-wide text-blue-700'>
						{detail.category} guide
					</p>
					<h2 id='tool-guide-heading' className='text-2xl font-bold tracking-tight text-slate-900'>
						{detail.title}: how it works and when to use it
					</h2>
					<p className='max-w-3xl leading-7 text-slate-600'>{detail.intro}</p>
				</div>

				<div className='grid gap-6 md:grid-cols-2'>
					<article className='rounded-lg border bg-white p-6'>
						<h3 className='mb-3 text-lg font-semibold text-slate-900'>How to use this tool</h3>
						<ol className='list-decimal space-y-2 pl-5 leading-7 text-slate-600'>
							<li>Enter or upload the information requested by the tool.</li>
							<li>Review your options carefully, then run the tool.</li>
							<li>Check the result and copy, download, or apply it to your workflow.</li>
						</ol>
					</article>
					<article className='rounded-lg border bg-white p-6'>
						<h3 className='mb-3 text-lg font-semibold text-slate-900'>Who can benefit?</h3>
						<p className='leading-7 text-slate-600'>This tool is useful for {detail.bestFor}. It is designed to remove repetitive work while keeping the inputs and results visible so you can make the final decision.</p>
					</article>
				</div>

				<div className='space-y-4'>
					<h3 className='text-xl font-semibold text-slate-900'>Frequently asked questions</h3>
					<details className='rounded-lg border bg-white p-4'>
						<summary className='cursor-pointer font-medium text-slate-900'>Is this tool free to use?</summary>
						<p className='mt-3 leading-7 text-slate-600'>Yes. You can use the tool without creating an account. Avoid entering confidential information unless the page specifically explains how it is handled.</p>
					</details>
					<details className='rounded-lg border bg-white p-4'>
						<summary className='cursor-pointer font-medium text-slate-900'>Can I rely on the result for an important decision?</summary>
						<p className='mt-3 leading-7 text-slate-600'>Use the output as practical assistance and verify important results against an appropriate official, professional, or primary source. Calculators and generators can simplify work but do not replace expert advice.</p>
					</details>
					<details className='rounded-lg border bg-white p-4'>
						<summary className='cursor-pointer font-medium text-slate-900'>What should I do if the result looks wrong?</summary>
						<p className='mt-3 leading-7 text-slate-600'>Check the input format, units, dates, and options first. Run the tool again with a simple test value, then contact us if the problem continues.</p>
					</details>
				</div>

				<nav aria-label='Related tools' className='border-t pt-6'>
					<h3 className='mb-3 text-lg font-semibold text-slate-900'>Related tools</h3>
					<div className='flex flex-wrap gap-3'>
						{links.filter((link) => link !== slug).map((link) => (
							<Link key={link} href={`/tools/${link}`} className='text-sm font-medium text-blue-700 underline underline-offset-4 hover:text-blue-900'>
								{toolDetails[link]?.title ?? titleFromSlug(link)}
							</Link>
						))}
					</div>
				</nav>
			</div>
		</section>
	);
}