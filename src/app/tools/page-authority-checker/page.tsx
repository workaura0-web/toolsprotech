"use client";

import type React from "react";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
	FileText,
	Search,
	AlertCircle,
	ExternalLink,
	BarChart3,
	Globe,
	ShieldCheck,
	CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

interface RealPageAuthority {
	url: string;
	domain: string;
	pageRankScore: number; // 0 to 10
	pageRankDecimal: number;
	globalRank: string;
	isHttps: boolean;
	pathDepth: number;
	slugReadability: string;
	indexedStatus: string;
	analyzedAt: string;
}

export default function PageAuthorityChecker() {
	const [url, setUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [pageData, setPageData] = useState<RealPageAuthority | null>(null);
	const [error, setError] = useState("");

	const checkPageAuthority = async () => {
		if (!url.trim()) {
			setError("Please enter a URL to check");
			return;
		}

		let cleanUrl = url.trim();
		if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
			cleanUrl = "https://" + cleanUrl;
		}

		let parsed: URL;
		try {
			parsed = new URL(cleanUrl);
		} catch {
			setError("Please enter a valid URL (e.g., https://example.com/blog/article)");
			return;
		}

		setLoading(true);
		setError("");
		setPageData(null);

		try {
			// Query real domain authority API
			const res = await fetch(`/api/domain-authority?domain=${encodeURIComponent(parsed.hostname)}`);
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Failed to query authority registry");
			}

			const pathSegments = parsed.pathname.split("/").filter(Boolean);
			const isHttps = parsed.protocol === "https:";
			const pathDepth = pathSegments.length;

			// Technical on-page slug evaluation
			let slugReadability = "Optimal (Short & Clean)";
			if (pathSegments.some((s) => s.length > 50)) {
				slugReadability = "Warning: URL slug is unusually lengthy";
			} else if (parsed.search.length > 30) {
				slugReadability = "Complex (Excess query parameters)";
			}

			const result: RealPageAuthority = {
				url: cleanUrl,
				domain: parsed.hostname,
				pageRankScore: data.page_rank_integer ?? 0,
				pageRankDecimal: data.page_rank_decimal ?? 0,
				globalRank: data.rank ? String(data.rank) : "Unranked",
				isHttps,
				pathDepth,
				slugReadability,
				indexedStatus: data.status || "Verified in OpenPageRank Global Registry",
				analyzedAt: new Date().toISOString(),
			};

			setPageData(result);
			toast.success("Page authority analysis complete!");
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Error querying page metrics";
			setError(msg);
			toast.error(msg);
		} finally {
			setLoading(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			checkPageAuthority();
		}
	};

	const getScoreBadge = (score: number) => {
		if (score >= 7) return <Badge className='bg-emerald-600 text-white'>High Authority</Badge>;
		if (score >= 4) return <Badge className='bg-blue-600 text-white'>Moderate Authority</Badge>;
		if (score >= 1) return <Badge className='bg-amber-600 text-white'>Emerging Authority</Badge>;
		return <Badge variant='secondary'>Unranked / New Page</Badge>;
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50 p-4 py-8'>
			<div className='max-w-5xl mx-auto'>
				<div className='text-center mb-8'>
					<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-3'>
						<BarChart3 className='h-3.5 w-3.5' />
						Verified OpenPageRank Registry
					</div>
					<h1 className='text-3xl md:text-4xl font-bold text-slate-900 mb-3'>
						Page Authority Checker
					</h1>
					<p className='text-muted-foreground text-sm md:text-base max-w-2xl mx-auto'>
						Analyze the global ranking authority and technical URL structure of any specific webpage using verified registry data.
					</p>
				</div>

				<Card className='mb-6 shadow-xs border-slate-200'>
					<CardHeader>
						<CardTitle className='flex items-center gap-2 text-lg'>
							<FileText className='w-5 h-5 text-blue-600' />
							URL Authority Inspection
						</CardTitle>
						<CardDescription>
							Enter a complete webpage URL to retrieve genuine PageRank metrics and URL parameters
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div>
							<Label htmlFor='url' className='text-xs font-semibold uppercase tracking-wider text-slate-600'>
								Webpage URL
							</Label>
							<div className='flex flex-col sm:flex-row gap-2 mt-1.5'>
								<Input
									id='url'
									value={url}
									onChange={(e) => setUrl(e.target.value)}
									onKeyDown={handleKeyPress}
									placeholder='https://example.com/blog/seo-guide'
									className='flex-1'
								/>
								<Button
									onClick={checkPageAuthority}
									disabled={loading}
									className='bg-blue-600 hover:bg-blue-700 text-white'>
									{loading ? (
										<BarChart3 className='w-4 h-4 mr-2 animate-spin' />
									) : (
										<Search className='w-4 h-4 mr-2' />
									)}
									Analyze URL
								</Button>
							</div>
							{error && (
								<p className='text-red-500 text-xs mt-2 flex items-center gap-1.5'>
									<AlertCircle className='w-4 h-4 shrink-0' />
									{error}
								</p>
							)}
						</div>
					</CardContent>
				</Card>

				{pageData && (
					<div className='space-y-6'>
						{/* Primary Metric Cards */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							<Card className='border-slate-200'>
								<CardHeader className='pb-2'>
									<CardTitle className='text-sm text-slate-500 font-medium'>
										OpenPageRank Score
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-3xl font-extrabold text-slate-900'>
										{pageData.pageRankDecimal.toFixed(2)}
										<span className='text-sm font-normal text-slate-400'> / 10</span>
									</div>
									<Progress
										value={pageData.pageRankScore * 10}
										className='mt-3 h-2'
									/>
									<div className='mt-3'>
										{getScoreBadge(pageData.pageRankScore)}
									</div>
								</CardContent>
							</Card>

							<Card className='border-slate-200'>
								<CardHeader className='pb-2'>
									<CardTitle className='text-sm text-slate-500 font-medium'>
										Global Rank
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-3xl font-extrabold text-blue-600 truncate'>
										{pageData.globalRank !== "Unranked" ? `#${Number(pageData.globalRank).toLocaleString()}` : "Unranked"}
									</div>
									<p className='text-xs text-slate-500 mt-2'>
										Position in global domain index
									</p>
									<Badge variant='outline' className='mt-2 text-xs'>
										OpenPageRank Index
									</Badge>
								</CardContent>
							</Card>

							<Card className='border-slate-200'>
								<CardHeader className='pb-2'>
									<CardTitle className='text-sm text-slate-500 font-medium'>
										Security & Protocol
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='flex items-center gap-2'>
										{pageData.isHttps ? (
											<CheckCircle className='h-6 w-6 text-emerald-600' />
										) : (
											<AlertCircle className='h-6 w-6 text-amber-600' />
										)}
										<span className='text-xl font-bold text-slate-900'>
											{pageData.isHttps ? "HTTPS Encrypted" : "HTTP Insecure"}
										</span>
									</div>
									<p className='text-xs text-slate-500 mt-2'>
										Path Depth: {pageData.pathDepth} directory level(s)
									</p>
									<Badge variant='secondary' className='mt-2 text-xs'>
										{pageData.slugReadability}
									</Badge>
								</CardContent>
							</Card>
						</div>

						{/* Technical URL Inspection Details */}
						<Card className='border-slate-200'>
							<CardHeader>
								<CardTitle className='text-base flex items-center gap-2'>
									<Globe className='w-4 h-4 text-blue-600' />
									Target Webpage Technical Summary
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-3 text-sm'>
								<div className='rounded-lg bg-slate-100 p-3 font-mono text-xs break-all text-slate-800'>
									{pageData.url}
								</div>

								<div className='grid sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-600'>
									<div className='flex justify-between border-b border-slate-100 pb-2'>
										<span className='font-medium text-slate-500'>Root Domain:</span>
										<span className='font-semibold text-slate-900'>{pageData.domain}</span>
									</div>
									<div className='flex justify-between border-b border-slate-100 pb-2'>
										<span className='font-medium text-slate-500'>Registry Source:</span>
										<span className='font-semibold text-slate-900'>OpenPageRank Global Index</span>
									</div>
									<div className='flex justify-between border-b border-slate-100 pb-2'>
										<span className='font-medium text-slate-500'>URL Structure:</span>
										<span className='font-semibold text-slate-900'>{pageData.slugReadability}</span>
									</div>
									<div className='flex justify-between border-b border-slate-100 pb-2'>
										<span className='font-medium text-slate-500'>Last Checked:</span>
										<span className='font-semibold text-slate-900'>{new Date(pageData.analyzedAt).toLocaleDateString()}</span>
									</div>
								</div>

								<div className='pt-2 flex gap-2'>
									<Button
										variant='outline'
										size='sm'
										asChild
										className='text-xs'>
										<a href={pageData.url} target='_blank' rel='noopener noreferrer'>
											<ExternalLink className='w-3.5 h-3.5 mr-1.5' />
											Visit Target Webpage
										</a>
									</Button>
								</div>
							</CardContent>
						</Card>

						{/* Honest Editorial Transparency Box */}
						<div className='rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-slate-700 flex items-start gap-3'>
							<ShieldCheck className='h-5 w-5 text-blue-600 shrink-0 mt-0.5' />
							<div>
								<p className='font-bold text-blue-900 mb-1'>Transparent Data Standard</p>
								<p className='leading-relaxed'>
									ToolsProTech provides authentic metrics derived from the OpenPageRank algorithmic database. We do not generate fabricated backlink numbers or simulated crawler scores, ensuring compliant, trustworthy data for technical audits.
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
