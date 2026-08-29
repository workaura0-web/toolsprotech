import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Clock, MapPin, MessageCircleMore } from "lucide-react";
import { SITE_EMAIL, SITE_NAME, SITE_PHONE } from "@/lib/constant";

export const metadata = {
	title: `Contact Us - ${SITE_NAME}`,
	description:
		"Need help or want to contact ToolsProTech? Reach out through email or WhatsApp.",
};

export default function ContactPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4'>
			<div className='container mx-auto max-w-5xl'>
				<div className='text-center mb-12'>
					<h1 className='text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
						Contact Us
					</h1>
					<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
						Have a question, suggestion, or need help? We&apos;ll love to hear from you.
					</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start'>
					<div className='space-y-6'>
						<Card className='shadow-xl border-0'>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<Mail className='w-5 h-5' />
									Get in Touch
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-5'>
								<div className='flex items-start gap-3'>
									<Mail className='w-5 h-5 text-blue-600 mt-1' />
									<div>
										<p className='font-medium'>Email</p>
										<p className='text-gray-600 break-all'>{SITE_EMAIL}</p>
									</div>
								</div>
								<div className='flex items-start gap-3'>
									<MessageCircleMore className='w-5 h-5 text-green-600 mt-1' />
									<div>
										<p className='font-medium'>WhatsApp</p>
										<p className='text-gray-600'>{03253229649
									</div>
								</div>
								<div className='flex items-start gap-3'>
									<Clock className='w-5 h-5 text-emerald-600 mt-1' />
									<div>
										<p className='font-medium'>Response Time</p>
										<p className='text-gray-600'>Usually within 24 hours</p>
									</div>
								</div>
								<div className='flex items-start gap-3'>
									<MapPin className='w-5 h-5 text-purple-600 mt-1' />
									<div>
										<p className='font-medium'>Location</p>
										<p className='text-gray-600'>Lahore, Pakistan</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<Card className='shadow-xl border-0 bg-gradient-to-br from-blue-50 to-purple-50'>
						<CardHeader>
							<CardTitle>Frequently Asked</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div>
								<p className='font-medium text-sm'>Are the tools really free?</p>
								<p className='text-sm text-gray-600'>Yes, all tools are completely free to use with no hidden charges.</p>
							</div>
							<div>
								<p className='font-medium text-sm'>Do you store my data?</p>
								<p className='text-sm text-gray-600'>No. Most tool work happens in your browser, and we do not store your input data.</p>
							</div>
							<div>
								<p className='font-medium text-sm'>Can I suggest a new tool?</p>
								<p className='text-sm text-gray-600'>Yes, we welcome suggestions and feature requests from our users.</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
