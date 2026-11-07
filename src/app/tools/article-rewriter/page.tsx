"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Copy, RefreshCw, FileText, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";

export default function ArticleRewriter() {
	const [originalText, setOriginalText] = useState("");
	const [rewrittenText, setRewrittenText] = useState("");
	const [rewriteMode, setRewriteMode] = useState("standard");
	const [isProcessing, setIsProcessing] = useState(false);
	const [engineUsed, setEngineUsed] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	const rewriteText = async () => {
		if (!originalText.trim()) {
			toast.error("Please enter some text to rewrite");
			return;
		}

		setIsProcessing(true);
		setEngineUsed(null);

		try {
			const res = await fetch("/api/article-rewrite", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					text: originalText,
					mode: rewriteMode,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Failed to rewrite article");
			}

			setRewrittenText(data.rewrittenText);
			setEngineUsed(data.engine || "Enhanced Paraphraser");
			toast.success("Article rewritten successfully!");
		} catch (error) {
			const msg = error instanceof Error ? error.message : "Error rewriting text.";
			toast.error(msg);
		} finally {
			setIsProcessing(false);
		}
	};

	const copyRewritten = () => {
		if (!rewrittenText) {
			toast.error("No rewritten text to copy");
			return;
		}
		navigator.clipboard.writeText(rewrittenText);
		setCopied(true);
		toast.success("Rewritten text copied to clipboard!");
		setTimeout(() => setCopied(false), 2500);
	};

	const clearAll = () => {
		setOriginalText("");
		setRewrittenText("");
		setEngineUsed(null);
		toast.success("Text fields cleared");
	};

	const getWordCount = (text: string) => {
		return text
			.trim()
			.split(/\s+/)
			.filter((word) => word.length > 0).length;
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='max-w-6xl mx-auto'>
				<div className='text-center mb-8'>
					<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-3'>
						<Sparkles className='h-3.5 w-3.5' />
						Natural Paraphrasing Engine
					</div>
					<h1 className='text-3xl md:text-4xl font-bold mb-3'>
						Article Rewriter & Paraphraser
					</h1>
					<p className='text-muted-foreground max-w-2xl mx-auto text-sm md:text-base'>
						Rephrase sentences and articles while preserving technical meaning, flow, and context.
					</p>
				</div>

				<div className='grid gap-6 lg:grid-cols-2'>
					<Card className='shadow-xs'>
						<CardHeader>
							<CardTitle className='flex items-center justify-between'>
								<span className='flex items-center gap-2 text-lg'>
									<FileText className='h-5 w-5 text-blue-600' />
									Original Text
								</span>
								<span className='text-xs font-normal text-muted-foreground'>
									{getWordCount(originalText)} words · {originalText.length} chars
								</span>
							</CardTitle>
							<CardDescription>
								Paste your content below to generate a natural rewrite
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div>
								<Label htmlFor='rewrite-mode' className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
									Rewriting Tone / Mode
								</Label>
								<Select
									value={rewriteMode}
									onValueChange={setRewriteMode}>
									<SelectTrigger id='rewrite-mode' className='mt-1.5'>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='standard'>
											Standard (Natural Flow & Synonym Balance)
										</SelectItem>
										<SelectItem value='creative'>
											Creative (Engaging & Dynamic Phrasing)
										</SelectItem>
										<SelectItem value='formal'>
											Formal (Academic & Professional Business)
										</SelectItem>
										<SelectItem value='simple'>
											Simple (Concise & High Readability)
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div>
								<Label htmlFor='original' className='sr-only'>Original Text</Label>
								<Textarea
									id='original'
									placeholder='Paste your draft or article here (up to 15,000 characters)...'
									value={originalText}
									onChange={(e) => setOriginalText(e.target.value)}
									rows={14}
									className='resize-none font-sans text-sm leading-relaxed'
								/>
							</div>

							<div className='flex gap-2 pt-1'>
								<Button
									onClick={rewriteText}
									disabled={isProcessing || !originalText.trim()}
									className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium'>
									{isProcessing ? (
										<>
											<RefreshCw className='h-4 w-4 mr-2 animate-spin' />
											Processing Natural Rewrite...
										</>
									) : (
										<>
											<Sparkles className='h-4 w-4 mr-2' />
											Rewrite Article
										</>
									)}
								</Button>
								<Button onClick={clearAll} variant='outline' disabled={isProcessing}>
									Clear
								</Button>
							</div>
						</CardContent>
					</Card>

					<Card className='shadow-xs'>
						<CardHeader>
							<CardTitle className='flex items-center justify-between'>
								<span className='flex items-center gap-2 text-lg'>
									<Sparkles className='h-5 w-5 text-emerald-600' />
									Rewritten Output
								</span>
								{rewrittenText && (
									<span className='text-xs font-normal text-muted-foreground'>
										{getWordCount(rewrittenText)} words · {rewrittenText.length} chars
									</span>
								)}
							</CardTitle>
							<CardDescription>
								{engineUsed ? `Rewritten via ${engineUsed}` : "Your paraphrased article appears below"}
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							{rewrittenText ? (
								<>
									<Textarea
										value={rewrittenText}
										onChange={(e) => setRewrittenText(e.target.value)}
										rows={14}
										className='resize-none font-sans text-sm leading-relaxed bg-slate-50/50'
									/>
									<div className='flex items-center justify-between gap-3 pt-1'>
										<Button
											onClick={copyRewritten}
											className='flex-1'
											variant={copied ? "default" : "outline"}>
											{copied ? (
												<>
													<Check className='h-4 w-4 mr-2 text-emerald-500' />
													Copied to Clipboard!
												</>
											) : (
												<>
													<Copy className='h-4 w-4 mr-2' />
													Copy Rewritten Article
												</>
											)}
										</Button>
									</div>
								</>
							) : (
								<div className='flex flex-col items-center justify-center py-20 text-center text-muted-foreground border-2 border-dashed border-slate-200 rounded-xl'>
									<FileText className='h-10 w-10 mb-3 text-slate-300' />
									<p className='text-sm font-medium'>No rewritten text generated yet</p>
									<p className='text-xs text-slate-400 mt-1 max-w-xs'>
										Enter your text on the left and select &quot;Rewrite Article&quot; to begin.
									</p>
								</div>
							)}
						</CardContent>
					</Card>
				</div>

				<div className='mt-8 grid md:grid-cols-2 gap-4 text-xs text-slate-600 bg-white p-5 rounded-2xl border border-slate-200'>
					<div>
						<h4 className='font-bold text-slate-800 text-sm mb-2'>Quality & Originality Guidelines</h4>
						<p className='leading-relaxed'>
							Unlike legacy article spinners that randomly replace keywords with out-of-context synonyms, this rewriter focuses on grammatical continuity and meaning retention.
						</p>
					</div>
					<div>
						<h4 className='font-bold text-slate-800 text-sm mb-2'>Editorial Recommendation</h4>
						<p className='leading-relaxed'>
							Always perform a final human review before publishing to verify domain-specific nomenclature, citations, and proprietary product names.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
