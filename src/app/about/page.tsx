import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Zap, Shield, CheckCircle2, Lock, Cpu, Globe2, Award, HeartHandshake } from "lucide-react";
import { SITE_NAME, SITE_TITLE, SITE_URL, SITE_AUTHOR, SITE_EMAIL } from "@/lib/constant";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: `About ${SITE_NAME} – Our Mission, Technology & Editorial Standards`,
	description:
		`Learn about ${SITE_NAME}, our privacy-first digital engineering lab, mathematical accuracy standards, and mission to deliver 50+ free, instant online tools.`,
	alternates: { canonical: `${SITE_URL}/about` },
	openGraph: {
		title: `About ${SITE_NAME} – Our Mission, Technology & Standards`,
		description: `Learn about ${SITE_NAME}, our privacy-first digital engineering lab, mathematical accuracy standards, and mission to deliver 50+ free, instant online tools.`,
		url: `${SITE_URL}/about`,
		siteName: SITE_NAME,
		type: "website",
	},
};

export default function AboutPage() {
	const aboutSchema = {
		"@context": "https://schema.org",
		"@type": "AboutPage",
		mainEntity: {
			"@type": "Organization",
			name: SITE_NAME,
			url: SITE_URL,
			founder: {
				"@type": "Person",
				name: SITE_AUTHOR,
				jobTitle: "Founder & Lead Software Engineer",
			},
			description:
				"ToolsProTech is a specialized digital utility laboratory providing free, high-performance, privacy-focused browser tools for SEO, financial planning, development, and everyday productivity.",
			contactPoint: {
				"@type": "ContactPoint",
				email: SITE_EMAIL,
				contactType: "customer support",
			},
		},
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 py-12 px-4'>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
			/>

			<div className='container mx-auto max-w-5xl space-y-12'>
				{/* Hero Section */}
				<div className='text-center space-y-4 max-w-3xl mx-auto'>
					<div className='inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold tracking-wider text-blue-800 uppercase'>
						<SparklesIcon className='w-3.5 h-3.5' /> Engineering Everyday Utilities
					</div>
					<h1 className='text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 bg-clip-text text-transparent'>
						About {SITE_NAME}
					</h1>
					<p className='text-lg md:text-xl text-slate-600 leading-relaxed'>
						We build fast, privacy-first web utilities designed to solve real calculations, SEO analyses, and media formatting tasks — with zero subscription fees and zero signups required.
					</p>
				</div>

				{/* Mission and Principles */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<Card className='shadow-lg border border-slate-200/80 bg-white'>
						<CardHeader>
							<div className='flex items-center gap-3'>
								<div className='p-3 bg-blue-100 text-blue-700 rounded-xl'>
									<Target className='w-6 h-6' />
								</div>
								<CardTitle className='text-xl'>Our Core Mission</CardTitle>
							</div>
						</CardHeader>
						<CardContent className='text-slate-600 leading-relaxed space-y-3'>
							<p>
								The modern web is cluttered with heavy, paywalled tools that force users to register or hand over personal data for simple tasks like calculating percentages, resizing an image, or generating a robots.txt file.
							</p>
							<p>
								<strong>{SITE_NAME} was founded to change that:</strong> to provide direct, clean, and instant utilities that work in seconds, directly inside your web browser.
							</p>
						</CardContent>
					</Card>

					<Card className='shadow-lg border border-slate-200/80 bg-white'>
						<CardHeader>
							<div className='flex items-center gap-3'>
								<div className='p-3 bg-purple-100 text-purple-700 rounded-xl'>
									<Lock className='w-6 h-6' />
								</div>
								<CardTitle className='text-xl'>Zero-Knowledge Privacy</CardTitle>
							</div>
						</CardHeader>
						<CardContent className='text-slate-600 leading-relaxed space-y-3'>
							<p>
								Over 90% of our utilities execute 100% on the client side using modern HTML5 Canvas, WebAssembly, and the native Web Crypto API.
							</p>
							<p>
								Your PDF files, uploaded images, custom passwords, and confidential text strings are processed in your computer’s local sandbox memory. They are <strong>never uploaded to our servers or stored</strong>.
							</p>
						</CardContent>
					</Card>
				</div>

				{/* 4 Pillars Grid */}
				<div className='space-y-6'>
					<div className='text-center'>
						<h2 className='text-2xl md:text-3xl font-bold text-slate-900'>
							Why Millions Trust {SITE_NAME}
						</h2>
						<p className='text-slate-600 mt-2 max-w-2xl mx-auto text-sm md:text-base'>
							Our engineering guidelines emphasize speed, mathematical verification, and transparent data handling.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow'>
							<div className='w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4'>
								<Zap className='w-6 h-6' />
							</div>
							<h3 className='text-lg font-bold text-slate-900 mb-2'>
								Lightning Fast Execution
							</h3>
							<p className='text-sm text-slate-600 leading-relaxed'>
								Built on Next.js 15, our tools avoid bloated remote round-trips. Conversions and calculations render immediately in your viewport.
							</p>
						</div>

						<div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow'>
							<div className='w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4'>
								<Award className='w-6 h-6' />
							</div>
							<h3 className='text-lg font-bold text-slate-900 mb-2'>
								Formula Verification
							</h3>
							<p className='text-sm text-slate-600 leading-relaxed'>
								Our financial calculators (EMI, AdSense, Currency) and health models (BMI) strictly conform to verified formulas from international regulatory standards.
							</p>
						</div>

						<div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow'>
							<div className='w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4'>
								<HeartHandshake className='w-6 h-6' />
							</div>
							<h3 className='text-lg font-bold text-slate-900 mb-2'>
								Community Focused
							</h3>
							<p className='text-sm text-slate-600 leading-relaxed'>
								We continuously refine our platform based on community feedback, adding support for the latest SEO crawler standards and file formats.
							</p>
						</div>
					</div>
				</div>

				{/* Editorial & Testing Standards (E-E-A-T) */}
				<Card className='shadow-lg border border-blue-100 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20'>
					<CardHeader>
						<CardTitle className='text-2xl text-slate-900 flex items-center gap-2'>
							<CheckCircle2 className='w-6 h-6 text-blue-600' />
							Our Technical & Editorial Standards
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4 text-slate-700 leading-relaxed text-sm md:text-base'>
						<p>
							To ensure accuracy and user safety, all tools published on {SITE_NAME} pass a three-stage quality review:
						</p>
						<ul className='grid gap-3 pl-4 md:grid-cols-2'>
							<li className='flex items-start gap-2'>
								<span className='font-bold text-blue-600'>1.</span>
								<span><strong>Unit Testing:</strong> Edge-case mathematical stress testing against known control values.</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='font-bold text-blue-600'>2.</span>
								<span><strong>Browser Compatibility:</strong> Cross-platform testing across Chromium, Safari, Firefox, and mobile touch devices.</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='font-bold text-blue-600'>3.</span>
								<span><strong>Security Auditing:</strong> Sanitizing all user inputs to block XSS and malicious payloads.</span>
							</li>
							<li className='flex items-start gap-2'>
								<span className='font-bold text-blue-600'>4.</span>
								<span><strong>Clear Disclaimers:</strong> Transparently describing limitations so users make informed real-world decisions.</span>
							</li>
						</ul>
					</CardContent>
				</Card>

				{/* Team & Leadership */}
				<div className='rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6'>
					<div className='flex items-center gap-3'>
						<div className='p-3 bg-indigo-100 text-indigo-700 rounded-xl'>
							<Users className='w-6 h-6' />
						</div>
						<div>
							<h3 className='text-xl font-bold text-slate-900'>Platform Engineering Team</h3>
							<p className='text-xs text-slate-500'>Dedicated software engineers, mathematicians, and SEO researchers</p>
						</div>
					</div>
					<p className='text-slate-600 leading-relaxed text-sm md:text-base'>
						{SITE_NAME} is developed and maintained by <strong>{SITE_AUTHOR}</strong> and our team of digital product engineers. We combine backgrounds in web performance optimization, full-stack JavaScript systems, and search algorithm research to maintain a library of 50+ indispensable daily tools.
					</p>
					<div className='border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between gap-4 text-sm'>
						<span className='text-slate-500'>
							Have a suggestion or need a custom utility?
						</span>
						<a
							href='/contact'
							className='inline-flex items-center font-semibold text-blue-600 hover:text-blue-800 transition-colors'>
							Contact our engineering team &rarr;
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z' />
		</svg>
	);
}
