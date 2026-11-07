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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Search,
	Shield,
	AlertTriangle,
	CheckCircle,
	FileText,
	Sparkles,
	BookOpen,
} from "lucide-react";
import { toast } from "sonner";

interface LexicalAnalysis {
	wordCount: number;
	uniqueWordCount: number;
	lexicalDiversity: number; // TTR
	sentenceCount: number;
	repeatedPhrases: { phrase: string; count: number }[];
	duplicateSentences: string[];
	readabilityScore: number;
}

interface ComparisonResult {
	similarityPercentage: number;
	sharedWordCount: number;
	exactMatchingPhrases: string[];
}

export default function PlagiarismChecker() {
	const [activeTab, setActiveTab] = useState("originality");
	const [text, setText] = useState("");
	const [referenceText, setReferenceText] = useState("");
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const [lexicalResult, setLexicalResult] = useState<LexicalAnalysis | null>(null);
	const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);

	// Mode 1: Analyze text originality and repetition
	const analyzeOriginality = () => {
		const trimmed = text.trim();
		if (!trimmed) {
			toast.error("Please enter some text to analyze");
			return;
		}

		const words = trimmed.toLowerCase().match(/\b[a-z0-9']+\b/g) || [];
		if (words.length < 15) {
			toast.error("Please enter at least 15 words for a meaningful lexical analysis");
			return;
		}

		setIsAnalyzing(true);

		setTimeout(() => {
			const uniqueWords = new Set(words);
			const ttr = Math.round((uniqueWords.size / words.length) * 100);

			// Sentence analysis
			const rawSentences = trimmed.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
			const sentenceMap = new Map<string, number>();
			const duplicateSentences: string[] = [];

			for (const s of rawSentences) {
				const lower = s.toLowerCase();
				const count = (sentenceMap.get(lower) || 0) + 1;
				sentenceMap.set(lower, count);
				if (count === 2) {
					duplicateSentences.push(s);
				}
			}

			// Find repeated 3-word n-grams
			const nGramMap = new Map<string, number>();
			for (let i = 0; i < words.length - 2; i++) {
				const phrase = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
				nGramMap.set(phrase, (nGramMap.get(phrase) || 0) + 1);
			}

			const repeatedPhrases: { phrase: string; count: number }[] = [];
			nGramMap.forEach((count, phrase) => {
				if (count > 1) {
					repeatedPhrases.push({ phrase, count });
				}
			});
			repeatedPhrases.sort((a, b) => b.count - a.count);

			// Reading ease heuristic
			const avgSentenceLen = words.length / (rawSentences.length || 1);
			const readability = Math.max(0, Math.min(100, Math.round(100 - avgSentenceLen * 1.5)));

			setLexicalResult({
				wordCount: words.length,
				uniqueWordCount: uniqueWords.size,
				lexicalDiversity: ttr,
				sentenceCount: rawSentences.length,
				repeatedPhrases: repeatedPhrases.slice(0, 5),
				duplicateSentences,
				readabilityScore: readability,
			});

			setIsAnalyzing(false);
			toast.success("Text originality and repetition analysis complete!");
		}, 600);
	};

	// Mode 2: Direct comparative plagiarism matching between two documents
	const compareTexts = () => {
		const doc1 = text.trim();
		const doc2 = referenceText.trim();

		if (!doc1 || !doc2) {
			toast.error("Please enter both the inquiry text and the reference document");
			return;
		}

		const words1 = doc1.toLowerCase().match(/\b[a-z0-9']+\b/g) || [];
		const words2 = doc2.toLowerCase().match(/\b[a-z0-9']+\b/g) || [];

		if (words1.length < 5 || words2.length < 5) {
			toast.error("Both texts must contain at least 5 words");
			return;
		}

		setIsAnalyzing(true);

		setTimeout(() => {
			const set1 = new Set(words1);
			const set2 = new Set(words2);

			let sharedCount = 0;
			set1.forEach((w) => {
				if (set2.has(w)) sharedCount++;
			});

			const unionSize = new Set([...words1, ...words2]).size;
			const jaccard = unionSize > 0 ? (sharedCount / unionSize) * 100 : 0;

			// Exact 4-word phrase matching
			const phrases2 = new Set<string>();
			for (let i = 0; i < words2.length - 3; i++) {
				phrases2.add(`${words2[i]} ${words2[i + 1]} ${words2[i + 2]} ${words2[i + 3]}`);
			}

			const exactMatches: string[] = [];
			for (let i = 0; i < words1.length - 3; i++) {
				const candidate = `${words1[i]} ${words1[i + 1]} ${words1[i + 2]} ${words1[i + 3]}`;
				if (phrases2.has(candidate) && !exactMatches.includes(candidate)) {
					exactMatches.push(candidate);
				}
			}

			setComparisonResult({
				similarityPercentage: Math.round(jaccard),
				sharedWordCount: sharedCount,
				exactMatchingPhrases: exactMatches.slice(0, 8),
			});

			setIsAnalyzing(false);
			toast.success("Document comparison complete!");
		}, 600);
	};

	const clearAll = () => {
		setText("");
		setReferenceText("");
		setLexicalResult(null);
		setComparisonResult(null);
		toast.success("Content cleared");
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='max-w-5xl mx-auto'>
				<div className='text-center mb-8'>
					<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-3'>
						<Shield className='h-3.5 w-3.5' />
						Authentic Text Analysis & Matcher
					</div>
					<h1 className='text-3xl md:text-4xl font-bold mb-3 text-slate-900'>
						Plagiarism & Originality Checker
					</h1>
					<p className='text-muted-foreground text-sm md:text-base max-w-2xl mx-auto'>
						Evaluate vocabulary uniqueness, detect repetitive phrasing, or run side-by-side comparison against reference content with zero fabricated metrics.
					</p>
				</div>

				<Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
					<TabsList className='grid grid-cols-2 max-w-md mx-auto mb-6'>
						<TabsTrigger value='originality' className='text-xs md:text-sm font-semibold'>
							Originality & Repetition
						</TabsTrigger>
						<TabsTrigger value='compare' className='text-xs md:text-sm font-semibold'>
							Two-Document Comparison
						</TabsTrigger>
					</TabsList>

					<TabsContent value='originality'>
						<div className='grid gap-6 lg:grid-cols-2'>
							<Card className='shadow-xs'>
								<CardHeader>
									<CardTitle className='flex items-center justify-between text-base'>
										<span className='flex items-center gap-2'>
											<FileText className='h-4 w-4 text-blue-600' />
											Text to Inspect
										</span>
										<span className='text-xs text-muted-foreground'>
											{text.trim().split(/\s+/).filter(Boolean).length} words
										</span>
									</CardTitle>
									<CardDescription>
										Paste your draft to analyze lexical richness and detect duplicated phrases
									</CardDescription>
								</CardHeader>
								<CardContent className='space-y-4'>
									<Textarea
										placeholder='Paste your essay, article, or content here for originality verification...'
										value={text}
										onChange={(e) => setText(e.target.value)}
										rows={12}
										className='resize-none text-sm'
									/>
									<div className='flex gap-2'>
										<Button
											onClick={analyzeOriginality}
											disabled={isAnalyzing || !text.trim()}
											className='flex-1 bg-blue-600 hover:bg-blue-700 text-white'>
											<Search className='h-4 w-4 mr-2' />
											{isAnalyzing ? "Analyzing Text..." : "Analyze Originality"}
										</Button>
										<Button onClick={clearAll} variant='outline'>
											Clear
										</Button>
									</div>
								</CardContent>
							</Card>

							<Card className='shadow-xs'>
								<CardHeader>
									<CardTitle className='flex items-center gap-2 text-base'>
										<Sparkles className='h-4 w-4 text-emerald-600' />
										Originality & Lexical Report
									</CardTitle>
									<CardDescription>
										Genuine mathematical breakdown of lexical variety and phrasing
									</CardDescription>
								</CardHeader>
								<CardContent>
									{lexicalResult ? (
										<div className='space-y-5'>
											<div className='grid grid-cols-2 gap-3 text-center'>
												<div className='rounded-xl border border-blue-100 bg-blue-50/70 p-3'>
													<span className='text-xs text-slate-500 font-medium'>Lexical Diversity (TTR)</span>
													<p className='text-2xl font-bold text-blue-700'>{lexicalResult.lexicalDiversity}%</p>
													<span className='text-2xs text-slate-500'>Type-Token Ratio</span>
												</div>
												<div className='rounded-xl border border-emerald-100 bg-emerald-50/70 p-3'>
													<span className='text-xs text-slate-500 font-medium'>Unique Vocabulary</span>
													<p className='text-2xl font-bold text-emerald-700'>{lexicalResult.uniqueWordCount}</p>
													<span className='text-2xs text-slate-500'>of {lexicalResult.wordCount} words</span>
												</div>
											</div>

											<div className='space-y-2 border-t border-slate-100 pt-3'>
												<h4 className='text-xs font-semibold text-slate-700 uppercase tracking-wider'>
													Repetitive 3-Word Sequences
												</h4>
												{lexicalResult.repeatedPhrases.length > 0 ? (
													<div className='space-y-1.5'>
														{lexicalResult.repeatedPhrases.map((item, idx) => (
															<div key={idx} className='flex items-center justify-between text-xs bg-slate-50 p-2 rounded-lg border border-slate-100'>
																<span className='font-mono text-slate-700 truncate max-w-[200px]'>&quot;{item.phrase}&quot;</span>
																<Badge variant='outline' className='text-2xs font-semibold'>
																	Appears {item.count}x
																</Badge>
															</div>
														))}
													</div>
												) : (
													<p className='text-xs text-emerald-600 flex items-center gap-1.5'>
														<CheckCircle className='h-4 w-4' /> No excessive repetitive phrases detected.
													</p>
												)}
											</div>

											{lexicalResult.duplicateSentences.length > 0 && (
												<div className='space-y-2 border-t border-slate-100 pt-3'>
													<h4 className='text-xs font-semibold text-amber-700 uppercase tracking-wider flex items-center gap-1'>
														<AlertTriangle className='h-3.5 w-3.5' /> Duplicate Sentences Found ({lexicalResult.duplicateSentences.length})
													</h4>
													<ul className='space-y-1 text-xs text-slate-600'>
														{lexicalResult.duplicateSentences.map((s, idx) => (
															<li key={idx} className='p-2 bg-amber-50/60 rounded-md border border-amber-200/50 truncate'>
																&quot;{s}&quot;
															</li>
														))}
													</ul>
												</div>
											)}
										</div>
									) : (
										<div className='py-16 text-center text-muted-foreground'>
											<Shield className='h-10 w-10 mx-auto mb-2 text-slate-300' />
											<p className='text-sm font-medium'>Originality report will appear here</p>
										</div>
									)}
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					<TabsContent value='compare'>
						<div className='space-y-6'>
							<div className='grid gap-6 lg:grid-cols-2'>
								<Card className='shadow-xs'>
									<CardHeader className='pb-3'>
										<CardTitle className='text-sm flex items-center gap-2'>
											<FileText className='h-4 w-4 text-blue-600' />
											Document A (Your Content)
										</CardTitle>
									</CardHeader>
									<CardContent>
										<Textarea
											placeholder='Paste first document here...'
											value={text}
											onChange={(e) => setText(e.target.value)}
											rows={10}
											className='resize-none text-sm'
										/>
									</CardContent>
								</Card>

								<Card className='shadow-xs'>
									<CardHeader className='pb-3'>
										<CardTitle className='text-sm flex items-center gap-2'>
											<BookOpen className='h-4 w-4 text-indigo-600' />
											Document B (Source or Reference)
										</CardTitle>
									</CardHeader>
									<CardContent>
										<Textarea
											placeholder='Paste reference or suspected source document here...'
											value={referenceText}
											onChange={(e) => setReferenceText(e.target.value)}
											rows={10}
											className='resize-none text-sm'
										/>
									</CardContent>
								</Card>
							</div>

							<div className='flex justify-center gap-3'>
								<Button
									onClick={compareTexts}
									disabled={isAnalyzing || !text.trim() || !referenceText.trim()}
									className='bg-blue-600 hover:bg-blue-700 text-white min-w-[200px]'>
									<Search className='h-4 w-4 mr-2' />
									{isAnalyzing ? "Comparing Texts..." : "Compare Documents"}
								</Button>
								<Button onClick={clearAll} variant='outline'>
									Clear Both
								</Button>
							</div>

							{comparisonResult && (
								<Card className='shadow-xs border-blue-200'>
									<CardHeader>
										<CardTitle className='text-base flex items-center justify-between'>
											<span>Comparative Analysis Results</span>
											<Badge
												variant={comparisonResult.similarityPercentage > 25 ? "destructive" : "secondary"}>
												{comparisonResult.similarityPercentage}% Similarity Index
											</Badge>
										</CardTitle>
									</CardHeader>
									<CardContent className='space-y-4'>
										<Progress value={comparisonResult.similarityPercentage} className='h-2.5' />

										<div className='grid sm:grid-cols-2 gap-4 text-xs pt-2'>
											<div className='p-3 bg-slate-50 rounded-xl border border-slate-100'>
												<span className='text-slate-500 font-medium'>Common Unique Vocabulary</span>
												<p className='text-lg font-bold text-slate-800 mt-1'>{comparisonResult.sharedWordCount} shared words</p>
											</div>
											<div className='p-3 bg-slate-50 rounded-xl border border-slate-100'>
												<span className='text-slate-500 font-medium'>Identical 4-Word Sequences</span>
												<p className='text-lg font-bold text-slate-800 mt-1'>{comparisonResult.exactMatchingPhrases.length} matching phrases</p>
											</div>
										</div>

										{comparisonResult.exactMatchingPhrases.length > 0 && (
											<div className='border-t border-slate-100 pt-3'>
												<h4 className='text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2'>
													Verbatim Overlapping Sequences
												</h4>
												<div className='flex flex-wrap gap-2'>
													{comparisonResult.exactMatchingPhrases.map((phrase, idx) => (
														<span key={idx} className='text-xs font-mono bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 rounded-md'>
															&quot;{phrase}&quot;
														</span>
													))}
												</div>
											</div>
										)}
									</CardContent>
								</Card>
							)}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
