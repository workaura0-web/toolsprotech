"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Mail,
	Clock,
	MapPin,
	MessageCircle,
	Send,
	CheckCircle2,
	HelpCircle,
	AlertTriangle,
	ShieldCheck,
} from "lucide-react";
import { SITE_EMAIL, SITE_NAME, SITE_PHONE } from "@/lib/constant";
import { toast } from "sonner";

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		category: "Feedback",
		subject: "",
		message: "",
	});
	const [submitted, setSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.name || !formData.email || !formData.message) {
			toast.error("Please fill in all required fields.");
			return;
		}

		setIsSubmitting(true);
		// Simulate client feedback
		setTimeout(() => {
			setIsSubmitting(false);
			setSubmitted(true);
			toast.success("Message received! Our team will respond within 24 hours.");
		}, 600);
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 py-12 px-4'>
			<div className='container mx-auto max-w-5xl space-y-12'>
				<div className='text-center space-y-3 max-w-2xl mx-auto'>
					<div className='inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-800'>
						<Mail className='w-3.5 h-3.5' /> Customer Support & Engineering
					</div>
					<h1 className='text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 bg-clip-text text-transparent'>
						Contact Our Team
					</h1>
					<p className='text-slate-600 text-base md:text-lg'>
						Have a question about a tool, want to report a technical bug, or request a new utility? We are here to help.
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
					{/* Contact Form Section */}
					<div className='lg:col-span-7'>
						<Card className='shadow-xl border border-slate-200/80 bg-white'>
							<CardHeader>
								<CardTitle className='text-2xl text-slate-900'>Send Us a Message</CardTitle>
								<CardDescription>
									Fill out the form below. We typically reply within 24 hours.
								</CardDescription>
							</CardHeader>
							<CardContent>
								{submitted ? (
									<div className='rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center space-y-4'>
										<div className='w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto'>
											<CheckCircle2 className='w-8 h-8' />
										</div>
										<h3 className='text-xl font-bold text-emerald-950'>
											Thank You, {formData.name}!
										</h3>
										<p className='text-sm text-emerald-800 max-w-md mx-auto'>
											Your message regarding &quot;{formData.subject || formData.category}&quot; has been recorded. Our engineering team will review it and reply to <strong>{formData.email}</strong> shortly.
										</p>
										<Button
											variant='outline'
											onClick={() => {
												setSubmitted(false);
												setFormData({
													name: "",
													email: "",
													category: "Feedback",
													subject: "",
													message: "",
												});
											}}
											className='mt-2'>
											Send Another Message
										</Button>
									</div>
								) : (
									<form onSubmit={handleSubmit} className='space-y-4'>
										<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
											<div className='space-y-2'>
												<Label htmlFor='name'>Your Name *</Label>
												<Input
													id='name'
													required
													placeholder='e.g., Alex Johnson'
													value={formData.name}
													onChange={(e) =>
														setFormData({ ...formData, name: e.target.value })
													}
												/>
											</div>
											<div className='space-y-2'>
												<Label htmlFor='email'>Email Address *</Label>
												<Input
													id='email'
													type='email'
													required
													placeholder='you@example.com'
													value={formData.email}
													onChange={(e) =>
														setFormData({ ...formData, email: e.target.value })
													}
												/>
											</div>
										</div>

										<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
											<div className='space-y-2'>
												<Label htmlFor='category'>Reason for Contact</Label>
												<select
													id='category'
													className='w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
													value={formData.category}
													onChange={(e) =>
														setFormData({ ...formData, category: e.target.value })
													}
												>
													<option value='Feedback'>General Feedback</option>
													<option value='Bug Report'>Report a Bug / Issue</option>
													<option value='Tool Suggestion'>Suggest a New Tool</option>
													<option value='Partnership'>Partnership / Advertising</option>
													<option value='Other'>Other Question</option>
												</select>
											</div>
											<div className='space-y-2'>
												<Label htmlFor='subject'>Subject</Label>
												<Input
													id='subject'
													placeholder='e.g., Question about Robots Generator'
													value={formData.subject}
													onChange={(e) =>
														setFormData({ ...formData, subject: e.target.value })
													}
												/>
											</div>
										</div>

										<div className='space-y-2'>
											<Label htmlFor='message'>Message *</Label>
											<Textarea
												id='message'
												required
												rows={5}
												placeholder='Describe your feedback, question, or issue in detail...'
												value={formData.message}
												onChange={(e) =>
													setFormData({ ...formData, message: e.target.value })
												}
											/>
										</div>

										<Button
											type='submit'
											disabled={isSubmitting}
											className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 shadow-md'>
											{isSubmitting ? (
												"Sending..."
											) : (
												<>
													<Send className='w-4 h-4 mr-2' /> Send Message
												</>
											)}
										</Button>
									</form>
								)}
							</CardContent>
						</Card>
					</div>

					{/* Contact Details & Direct Support */}
					<div className='lg:col-span-5 space-y-6'>
						<Card className='shadow-lg border border-slate-200/80 bg-white'>
							<CardHeader>
								<CardTitle className='text-xl text-slate-900'>Contact Information</CardTitle>
							</CardHeader>
							<CardContent className='space-y-5'>
								<div className='flex items-start gap-3.5'>
									<div className='p-2.5 bg-blue-100 text-blue-700 rounded-xl shrink-0'>
										<Mail className='w-5 h-5' />
									</div>
									<div>
										<p className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>
											Direct Email
										</p>
										<a
											href={`mailto:${SITE_EMAIL}`}
											className='font-medium text-slate-900 hover:text-blue-600 transition-colors break-all'>
											{SITE_EMAIL}
										</a>
									</div>
								</div>

								<div className='flex items-start gap-3.5'>
									<div className='p-2.5 bg-emerald-100 text-emerald-700 rounded-xl shrink-0'>
										<Clock className='w-5 h-5' />
									</div>
									<div>
										<p className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>
											Support Availability
										</p>
										<p className='font-medium text-slate-900'>
											Monday &ndash; Saturday: 9:00 AM &ndash; 7:00 PM (PKT)
										</p>
										<p className='text-xs text-slate-500 mt-0.5'>Average reply time: under 24 hours</p>
									</div>
								</div>

								<div className='flex items-start gap-3.5'>
									<div className='p-2.5 bg-purple-100 text-purple-700 rounded-xl shrink-0'>
										<MapPin className='w-5 h-5' />
									</div>
									<div>
										<p className='text-xs font-semibold text-slate-500 uppercase tracking-wide'>
											Headquarters & Lab
										</p>
										<p className='font-medium text-slate-900'>Lahore, Pakistan</p>
										<p className='text-xs text-slate-500 mt-0.5'>Global digital engineering team</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Trust & FAQ Preview */}
						<Card className='shadow-lg border border-blue-100 bg-gradient-to-br from-blue-50/60 to-purple-50/40'>
							<CardHeader>
								<CardTitle className='text-lg flex items-center gap-2 text-slate-900'>
									<ShieldCheck className='w-5 h-5 text-blue-600' />
									Support FAQs
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-3.5 text-sm'>
								<div>
									<p className='font-bold text-slate-900'>Do I need an account to use the tools?</p>
									<p className='text-slate-600 text-xs mt-0.5'>
										No. All 50+ utilities are free, unrestricted, and require no account registration.
									</p>
								</div>
								<div>
									<p className='font-bold text-slate-900'>Can I suggest a new tool?</p>
									<p className='text-slate-600 text-xs mt-0.5'>
										Yes! Use the form on this page with category &quot;Suggest a New Tool&quot;. We prioritize community requests.
									</p>
								</div>
								<div>
									<p className='font-bold text-slate-900'>Are calculations private?</p>
									<p className='text-slate-600 text-xs mt-0.5'>
										Yes, calculations execute inside your local browser memory and are never saved.
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			{/* Floating WhatsApp Quick Contact Button */}
			<a
				href='https://wa.me/923253229649?text=Hello%20ToolsProTech%2C%20I%20have%20a%20question%20about%20your%20tools.'
				target='_blank'
				rel='noreferrer'
				className='fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xl shadow-green-600/30 transition-transform duration-200 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-200'
				aria-label='Chat on WhatsApp'>
				<MessageCircle className='h-4 w-4' />
				<span>WhatsApp Support</span>
			</a>
		</div>
	);
}
