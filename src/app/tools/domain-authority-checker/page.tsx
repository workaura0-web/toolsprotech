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
	TrendingUp,
	Search,
	AlertCircle,
	ExternalLink,
	BarChart3,
	Globe,
	ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { isValidDomain } from "@/lib/validation";

interface DomainAuthorityResponse {
	domain: string;
	page_rank_integer: number;
	page_rank_decimal: number;
	rank: string | number;
	provider?: string;
	status?: string;
	updated_at?: string;
}

export default function DomainAuthorityChecker() {
	const [domain, setDomain] = useState("");
	const [loading, setLoading] = useState(false);
	const [authorityData, setAuthorityData] = useState<DomainAuthorityResponse | null>(null);
	const [error, setError] = useState("");

	const checkDomainAuthority = async () => {
		if (!domain.trim()) {
			setError("Please enter a domain name");
			return;
		}

		const cleanDomain = domain
			.trim()
			.toLowerCase()
			.replace(/^https?:\/\//, "")
			.replace(/^www\./, "")
			.split("/")[0];

		if (!isValidDomain(cleanDomain)) {
			setError("Please enter a valid domain name (e.g., example.com)");
			return;
		}

		setLoading(true);
		setError("");
		setAuthorityData(null);

		try {
			const res = await fetch(`/api/domain-authority?domain=${encodeURIComponent(cleanDomain)}`);
			const data = await res.json();
			if (!res.ok) {
				setError(data.error || "Failed to fetch domain authority");
				return;
			}
			setAuthorityData(data);
			toast.success(`Domain PageRank analysis complete for ${cleanDomain}`);
		} catch {
			setError("Failed to check domain authority. Please check your network or try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			checkDomainAuthority();
		}
	};

	const getScoreBadge = (score: number) => {
		if (score >= 8) return <Badge className='bg-emerald-600 text-white'>Tier 1 Global Authority</Badge>;
		if (score >= 5) return <Badge className='bg-blue-600 text-white'>High Domain Authority</Badge>;
		if (score >= 2) return <Badge className='bg-indigo-600 text-white'>Moderate Authority</Badge>;
		return <Badge variant='secondary'>Emerging / Unranked</Badge>;
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50 p-4 py-8'>
			<div className='max-w-5xl mx-auto'>
				<div className='text-center mb-8'>
					<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-3'>
						<TrendingUp className='h-3.5 w-3.5' />
						Global Domain Intelligence
					</div>
					<h1 className='text-3xl md:text-4xl font-bold text-slate-900 mb-3'>
						Domain Authority Checker
					</h1>
					<p className='text-muted-foreground text-sm md:text-base max-w-2xl mx-auto'>
						Check authentic domain PageRank, global position, and web authority scores using the independent OpenPageRank index.
					</p>
				</div>

				<Card className='mb-6 shadow-xs border-slate-200'>
					<CardHeader>
						<CardTitle className='flex items-center gap-2 text-lg'>
							<Globe className='w-5 h-5 text-blue-600' />
							Domain Authority Analysis
						</CardTitle>
						<CardDescription>
							Enter a domain name to check its authority metrics from global crawl registries
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div>
							<Label htmlFor='domain' className='text-xs font-semibold uppercase tracking-wider text-slate-600'>
								Domain Name
							</Label>
							<div className='flex flex-col sm:flex-row gap-2 mt-1.5'>
								<Input
									id='domain'
									value={domain}
									onChange={(e) => setDomain(e.target.value)}
									onKeyDown={handleKeyPress}
									placeholder='example.com'
									className='flex-1'
								/>
								<Button
									onClick={checkDomainAuthority}
									disabled={loading}
									className='bg-blue-600 hover:bg-blue-700 text-white'>
									{loading ? (
										<BarChart3 className='w-4 h-4 mr-2 animate-spin' />
									) : (
										<Search className='w-4 h-4 mr-2' />
									)}
									Check Authority
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

				{authorityData && (
					<div className='space-y-6'>
						{/* Key Authority Cards */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							<Card className='border-slate-200'>
								<CardHeader className='pb-2'>
									<CardTitle className='text-sm text-slate-500 font-medium'>
										OpenPageRank Score
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-3xl font-extrabold text-slate-900'>
										{authorityData.page_rank_decimal.toFixed(2)}
										<span className='text-sm font-normal text-slate-400'> / 10</span>
									</div>
									<Progress
										value={authorityData.page_rank_integer * 10}
										className='mt-3 h-2'
									/>
									<div className='mt-3'>
										{getScoreBadge(authorityData.page_rank_integer)}
									</div>
								</CardContent>
							</Card>

							<Card className='border-slate-200'>
								<CardHeader className='pb-2'>
									<CardTitle className='text-sm text-slate-500 font-medium'>
										Global Web Rank
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-3xl font-extrabold text-blue-600 truncate'>
										{authorityData.rank !== "Unranked"
											? `#${Number(authorityData.rank).toLocaleString()}`
											: "Unranked"}
									</div>
									<p className='text-xs text-slate-500 mt-2'>
										Relative position across millions of active domains
									</p>
									<Badge variant='outline' className='mt-2 text-xs'>
										Independent Registry
									</Badge>
								</CardContent>
							</Card>

							<Card className='border-slate-200'>
								<CardHeader className='pb-2'>
									<CardTitle className='text-sm text-slate-500 font-medium'>
										Index Status
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-xl font-bold text-slate-900'>
										{authorityData.page_rank_integer > 0 ? "Indexed & Active" : "New / Low Citation"}
									</div>
									<p className='text-xs text-slate-500 mt-2'>
										{authorityData.status || "Global crawl record verified"}
									</p>
									<Badge variant='secondary' className='mt-2 text-xs'>
										Domain Verified
									</Badge>
								</CardContent>
							</Card>
						</div>

						{/* Domain Meta Details */}
						<Card className='border-slate-200'>
							<CardHeader>
								<CardTitle className='text-base flex items-center justify-between'>
									<span>Domain Registry Report</span>
									<span className='font-mono text-xs text-slate-500 font-normal'>{authorityData.domain}</span>
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-3 text-sm'>
								<div className='grid sm:grid-cols-2 gap-3 text-xs text-slate-600'>
									<div className='flex justify-between border-b border-slate-100 pb-2'>
										<span className='font-medium text-slate-500'>Domain Name:</span>
										<span className='font-semibold text-slate-900 font-mono'>{authorityData.domain}</span>
									</div>
									<div className='flex justify-between border-b border-slate-100 pb-2'>
										<span className='font-medium text-slate-500'>Data Source:</span>
										<span className='font-semibold text-slate-900'>OpenPageRank API</span>
									</div>
									<div className='flex justify-between border-b border-slate-100 pb-2'>
										<span className='font-medium text-slate-500'>Integer Rank:</span>
										<span className='font-semibold text-slate-900'>{authorityData.page_rank_integer} / 10</span>
									</div>
									<div className='flex justify-between border-b border-slate-100 pb-2'>
										<span className='font-medium text-slate-500'>Calculation Method:</span>
										<span className='font-semibold text-slate-900'>Logarithmic PageRank Algorithm</span>
									</div>
								</div>

								<div className='pt-2 flex gap-2'>
									<Button
										variant='outline'
										size='sm'
										asChild
										className='text-xs'>
										<a
											href={`https://${authorityData.domain}`}
											target='_blank'
											rel='noopener noreferrer'>
											<ExternalLink className='w-3.5 h-3.5 mr-1.5' />
											Visit Website
										</a>
									</Button>
								</div>
							</CardContent>
						</Card>

						{/* Editorial Quality Box */}
						<div className='rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-slate-700 flex items-start gap-3'>
							<ShieldCheck className='h-5 w-5 text-blue-600 shrink-0 mt-0.5' />
							<div>
								<p className='font-bold text-blue-900 mb-1'>About OpenPageRank Metrics</p>
								<p className='leading-relaxed'>
									PageRank measures the relative importance and citation authority of a domain based on the global web graph. It is an algorithmic representation of internet-wide connectivity, unaffected by paid sponsorship or private backlink manipulation.
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
