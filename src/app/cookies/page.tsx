import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cookie, Settings, Shield, Info } from "lucide-react";
import { SITE_NAME, SITE_EMAIL } from "@/lib/constant";

export const metadata = {
	title: `Cookie Policy | ${SITE_NAME}`,
	description: "Learn about how we use cookies and similar technologies.",
};

export default function CookiesPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4'>
			<div className='container mx-auto max-w-4xl'>
				<div className='text-center mb-12'>
					<div className='w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4'>
						<Cookie className='w-8 h-8 text-white' />
					</div>
					<h1 className='text-4xl font-bold mb-4 text-gray-800'>
						Cookie Policy
					</h1>
					<p className='text-xl text-gray-600'>
						Learn about how we use cookies and similar technologies on {SITE_NAME}.
					</p>
				</div>

				<div className='space-y-8'>
					<Card className='shadow-xl border-0'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2'>
								<Info className='w-5 h-5 text-blue-600' />
								What Are Cookies?
							</CardTitle>
						</CardHeader>
						<CardContent className='prose prose-gray max-w-none'>
							<p className='text-gray-600 mb-4'>
								Cookies are small text files that are stored on
								your computer or mobile device when you visit a
								website. They help websites remember information
								about your visit, which can make it easier to
								visit the site again and make the site more
								useful to you.
							</p>
							<p className='text-gray-600'>
								This site loads Google&apos;s advertising script. Google
								may use cookies or similar technologies when its
								advertising services are active. Cookie behavior can
								depend on your browser, region, and Google settings.
							</p>
						</CardContent>
					</Card>

					<Card className='shadow-xl border-0'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2'>
								<Settings className='w-5 h-5 text-green-600' />
								Types of Cookies We Use
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-6'>
								<div className='border-l-4 border-blue-500 pl-4'>
									<h3 className='font-semibold text-gray-800 mb-2'>
										Site functionality
									</h3>
									<p className='text-gray-600 text-sm'>
										The site does not currently use a separate
										first-party preference or analytics cookie
										system. Browser storage used by an individual
										tool, if any, is described on that tool page.
									</p>
								</div>

								<div className='border-l-4 border-green-500 pl-4'>
									<h3 className='font-semibold text-gray-800 mb-2'>
										Analytics Cookies
									</h3>
									<p className='text-gray-600 text-sm mb-2'>
										These cookies help us understand how
										visitors interact with our website by
										collecting and reporting information
										anonymously.
									</p>
									<ul className='text-gray-600 text-sm space-y-1'>
										<li>
											• Page views and traffic sources
										</li>
										<li>• Popular tools and features</li>
										<li>
											• User behavior patterns (anonymous)
										</li>
									</ul>
								</div>

								<div className='border-l-4 border-amber-500 pl-4'>
									<h3 className='font-semibold text-gray-800 mb-2'>
										Advertising Cookies
									</h3>
										<p className='text-gray-600 text-sm'>
											Google&apos;s advertising script is loaded on the site.
											Google may use cookies or similar technologies to
											provide and measure advertising, subject to its
											policies and available user settings.
									</p>
								</div>

							</div>
						</CardContent>
					</Card>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<Card className='shadow-xl border-0'>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<Shield className='w-5 h-5 text-blue-600' />
									Third-Party Cookies
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-gray-600 mb-3'>
									Google&apos;s advertising services may use cookies
									and similar technologies when active:
								</p>
								<ul className='text-gray-600 space-y-2 text-sm'>
										<li>
											<strong>Google AdSense:</strong> Advertising
											and measurement, subject to Google&apos;s
											policies and settings
										</li>
								</ul>
								<p className='text-gray-600 text-sm mt-3'>
									Please review Google&apos;s privacy information for
									its data handling and available controls.
								</p>
							</CardContent>
						</Card>

						<Card className='shadow-xl border-0'>
							<CardHeader>
								<CardTitle>Managing Cookies</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-gray-600 mb-3'>
									You have control over cookies:
								</p>
								<ul className='text-gray-600 space-y-2 text-sm'>
									<li>
										<strong>Browser Settings:</strong>{" "}
										Disable cookies in your browser
									</li>
									<li>
										<strong>Selective Blocking:</strong>{" "}
										Block specific types of cookies
									</li>
									<li>
										<strong>Clear Cookies:</strong> Delete
										existing cookies anytime
									</li>
									<li>
										<strong>Opt-out Tools:</strong> Use
										browser extensions for privacy
									</li>
								</ul>
								<p className='text-gray-600 text-sm mt-3'>
									Google&apos;s ad personalization controls are managed
									through Google where available. The site does not
									currently provide its own cookie preference panel.
								</p>
							</CardContent>
						</Card>
					</div>

					<Card className='shadow-xl border-0'>
						<CardHeader>
							<CardTitle>Cookie Retention</CardTitle>
						</CardHeader>
						<CardContent className='prose prose-gray max-w-none'>
									<p className='text-gray-600 mb-4'>
										Cookie types and retention periods are determined
										by the service that sets them and by your browser
										settings. We do not set fixed expiry periods for
										Google advertising cookies.
									</p>
						</CardContent>
					</Card>

					<Card className='shadow-xl border-0 bg-gradient-to-br from-blue-50 to-purple-50'>
						<CardHeader>
							<CardTitle>Contact Us About Cookies</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600 mb-4'>
								If you have any questions about our use of
								cookies, please contact us:
							</p>
							<div className='text-gray-600'>
								<p>
									<strong>Email:</strong> {SITE_EMAIL}
								</p>
								<p>
									<strong>Subject:</strong> Cookie Policy
									Inquiry
								</p>
								<p>
									<strong>Last Updated:</strong> October 2026
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
