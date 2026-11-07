import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Rule-based transformation fallback when AI API key is not present
function fallbackRewrite(text: string, mode: string): string {
	const formalMap: Record<string, string> = {
		"don't": "do not",
		"can't": "cannot",
		"won't": "will not",
		"it's": "it is",
		"that's": "that is",
		"there's": "there is",
		"i'm": "I am",
		"you're": "you are",
		"we're": "we are",
		"they're": "they are",
		"get": "obtain",
		"make": "produce",
		"use": "utilize",
		"help": "assist",
		"show": "demonstrate",
		"find": "discover",
		"start": "commence",
		"end": "conclude",
		"big": "substantial",
		"small": "compact",
		"good": "favorable",
		"bad": "unfavorable",
		"fast": "rapid",
		"slow": "gradual",
		"look at": "examine",
		"lots of": "numerous",
	};

	const simpleMap: Record<string, string> = {
		"utilize": "use",
		"demonstrate": "show",
		"facilitate": "help",
		"commence": "start",
		"terminate": "end",
		"consequently": "so",
		"furthermore": "also",
		"nevertheless": "still",
		"approximately": "about",
		"subsequent to": "after",
		"prior to": "before",
		"in order to": "to",
		"due to the fact that": "because",
		"in the event that": "if",
		"substantial": "big",
		"numerous": "many",
	};

	const creativeTransitions = [
		"Notably,",
		"In particular,",
		"Remarkably,",
		"From a broader perspective,",
		"Interestingly,",
		"Significantly,",
	];

	const sentences = text
		.split(/(?<=[.!?])\s+/)
		.map((s) => s.trim())
		.filter(Boolean);

	if (sentences.length === 0) return text;

	const transformed = sentences.map((sentence, idx) => {
		let s = sentence;
		if (mode === "formal") {
			for (const [k, v] of Object.entries(formalMap)) {
				const regex = new RegExp(`\\b${k}\\b`, "gi");
				s = s.replace(regex, v);
			}
		} else if (mode === "simple") {
			for (const [k, v] of Object.entries(simpleMap)) {
				const regex = new RegExp(`\\b${k}\\b`, "gi");
				s = s.replace(regex, v);
			}
		} else if (mode === "creative") {
			if (idx % 3 === 0 && !s.match(/^(However|Therefore|Moreover|In addition|Notably|Interestingly)/i)) {
				const starter = creativeTransitions[idx % creativeTransitions.length];
				s = `${starter} ${s.charAt(0).toLowerCase() + s.slice(1)}`;
			}
		} else {
			// Standard mode: gentle synonyms
			const stdMap: Record<string, string> = {
				"help": "assist",
				"make": "create",
				"show": "illustrate",
				"start": "begin",
				"find": "locate",
				"big": "large",
				"easy": "straightforward",
			};
			for (const [k, v] of Object.entries(stdMap)) {
				const regex = new RegExp(`\\b${k}\\b`, "gi");
				s = s.replace(regex, v);
			}
		}
		return s;
	});

	return transformed.join(" ");
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { text, mode = "standard" } = body;

		if (!text || typeof text !== "string" || !text.trim()) {
			return NextResponse.json(
				{ error: "Text content is required for rewriting." },
				{ status: 400 }
			);
		}

		if (text.length > 15000) {
			return NextResponse.json(
				{ error: "Content exceeds maximum length of 15,000 characters." },
				{ status: 400 }
			);
		}

		// Check for GEMINI_API_KEY
		const apiKey = process.env.GEMINI_API_KEY;

		if (apiKey) {
			try {
				const ai = new GoogleGenAI({
					apiKey,
					httpOptions: {
						headers: {
							"User-Agent": "aistudio-build",
						},
					},
				});

				const modeInstructions: Record<string, string> = {
					standard: "Paraphrase smoothly with natural vocabulary while keeping exact meaning intact.",
					creative: "Rewrite with engaging prose, vivid expression, and dynamic sentence flow.",
					formal: "Rewrite into professional, publication-ready academic or business prose.",
					simple: "Rewrite in clear, accessible plain language, eliminating jargon and complex sentence structures.",
				};

				const instruction = modeInstructions[mode] || modeInstructions.standard;

				const prompt = `You are a professional linguistic rewriter. Rewrite the following text according to this style: ${instruction}
Preserve the factual meaning, key entities, numbers, and intended message. Output ONLY the rewritten text without preambles or notes.

Text to rewrite:
${text}`;

				const response = await ai.models.generateContent({
					model: "gemini-3.8-flash",
					contents: prompt,
				});

				const rewritten = response.text?.trim();
				if (rewritten) {
					return NextResponse.json({
						rewrittenText: rewritten,
						mode,
						engine: "Gemini AI Neural Engine",
					});
				}
			} catch (aiErr) {
				console.warn("Gemini rewriting failed, falling back to rule-based engine:", aiErr);
			}
		}

		// Fallback deterministic rewriter
		const rewritten = fallbackRewrite(text, mode);
		return NextResponse.json({
			rewrittenText: rewritten,
			mode,
			engine: "Linguistic Transformation Engine",
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to rewrite article. Please try again." },
			{ status: 500 }
		);
	}
}
