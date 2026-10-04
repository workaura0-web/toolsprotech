import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Database } from "lucide-react";
import { SITE_EMAIL, SITE_NAME } from "@/lib/constant";

export const metadata = {
	title: `Privacy Policy - ${SITE_NAME}`,
	description: `Your privacy is our priority. Learn how we protect your data on ${SITE_NAME}.`,
};

export default function PrivacyPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4'>
			<div className='container mx-auto max-w-4xl'>
				<div className='text-center mb-12'>
					<div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4'>
						<Shield className='w-8 h-8 text-white' />
					</div>
					<h1 className='text-4xl font-bold mb-4 text-gray-800'>
						Privacy Policy
					</h1>
					<p className='text-xl text-gray-600'>
						Your privacy is our priority. Learn how we protect your
						data.
					</p>
				</div>

				<div className='space-y-8'>
					<Card className='shadow-xl border-0'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2'>
								<Eye className='w-5 h-5 text-blue-600' />
								Information We Collect
							</CardTitle>
						</CardHeader>
						<CardContent className='prose prose-gray max-w-none'>
							<p className='text-gray-600 mb-4'>
								Information handled depends on the tool you use. Many
								text, image, PDF, and calculator tools process input in
								your browser. Domain, IP, WordPress, and currency
								lookups send the submitted domain, URL, IP address, or
								currency details to a ToolsProTech server route so it
								can return a result.
							</p>
							<ul className='text-gray-600 space-y-2'>
								<li>
									<strong>Lookup requests:</strong> The requested
									domain, URL, IP address, currency pair, and amount
									may be included in a request to our server. The
									server may query third-party data providers to
									complete domain, network, or exchange-rate lookups.
								</li>
								<li>
									<strong>Contact Information:</strong> When
									you contact us, we collect the information
									you provide in your message.
								</li>
							</ul>
							<p className='text-gray-600 mt-4'>
								Do not submit passwords, private keys, or other
								confidential information. Lookup providers and our
								hosting infrastructure may process request data under
								their own terms and retention practices.
							</p>
						</CardContent>
					</Card>

					<Card className='shadow-xl border-0'>
						<CardHeader>
							<CardTitle>Advertising and Google AdSense</CardTitle>
						</CardHeader>
						<CardContent className='prose prose-gray max-w-none'>
							<p className='text-gray-600 mb-4'>
								We may display advertisements through Google AdSense. Google and
								its partners may use cookies or similar technologies to show and
								measure relevant ads, subject to your choices and applicable law.
							</p>
							<p className='text-gray-600'>
								Google&apos;s advertising script is loaded on the site.
								When Google services are used, Google and its partners
								may process device, browser, IP, cookie, and ad interaction
								information under Google&apos;s policies and your settings.
								The site does not currently provide its own cookie
								preference control. Use Google&apos;s available ad and
								privacy settings to manage personalization.
							</p>
						</CardContent>
					</Card>

					<Card className='shadow-xl border-0'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2'>
								<Database className='w-5 h-5 text-green-600' />
								How We Use Your Information
							</CardTitle>
						</CardHeader>
						<CardContent className='prose prose-gray max-w-none'>
							<p className='text-gray-600 mb-4'>
								Information described above is used to:
							</p>
							<ul className='text-gray-600 space-y-2'>
								<li>Improving our tools and user experience</li>
								<li>Return results for requested lookups</li>
								<li>Operate and protect the website</li>
								<li>
									Responding to your inquiries and support
									requests
								</li>
								<li>Complying with legal obligations</li>
							</ul>
							<p className='text-gray-600 mt-4'>
								We never sell, rent, or share your personal
								information with third parties for marketing
								purposes.
							</p>
						</CardContent>
					</Card>

					<Card className='shadow-xl border-0'>
						<CardHeader>
							<CardTitle className='flex items-center gap-2'>
								<Lock className='w-5 h-5 text-purple-600' />
								Data Security
							</CardTitle>
						</CardHeader>
						<CardContent className='prose prose-gray max-w-none'>
							<p className='text-gray-600 mb-4'>
								Use HTTPS when accessing the site. Browser-based
								processing and server-based lookups work differently:
								lookups require sending the requested details to our
								server and may involve an external provider.
							</p>
							<ul className='text-gray-600 space-y-2'>
								<li>
									<strong>Connection:</strong> Site requests use
									HTTPS when served over the secure site address.
								</li>
								<li>
									<strong>Tool inputs:</strong> Many tools run in
									your browser; lookup tools send required values
									to server routes.
								</li>
								<li>
									<strong>Third parties:</strong> Lookup providers
									may receive query data needed to return results.
								</li>
							</ul>
						</CardContent>
					</Card>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<Card className='shadow-xl border-0'>
							<CardHeader>
								<CardTitle>Cookies and Tracking</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-gray-600 mb-3'>
									The site loads Google&apos;s advertising script. Google
									may use cookies or similar technologies when its
									services are active. We do not currently operate a
									separate analytics product or first-party preference
									cookie system.
								</p>
								<ul className='text-gray-600 space-y-1 text-sm'>
									<li>• Google advertising cookies and similar technologies</li>
									<li>
										• You can disable cookies in your
										browser
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card className='shadow-xl border-0'>
							<CardHeader>
								<CardTitle>Your Rights</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-gray-600 mb-3'>
									You have the right to:
								</p>
								<ul className='text-gray-600 space-y-1 text-sm'>
									<li>• Access your personal information</li>
									<li>• Request deletion of your data</li>
									<li>• Manage ad personalization in Google&apos;s settings</li>
									<li>• Contact us about privacy concerns</li>
								</ul>
							</CardContent>
						</Card>
					</div>

					<Card className='shadow-xl border-0 bg-gradient-to-br from-blue-50 to-purple-50'>
						<CardHeader>
							<CardTitle>Contact Us About Privacy</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600 mb-4'>
								If you have any questions about this Privacy
								Policy or our data practices, please contact us:
							</p>
							<div className='text-gray-600'>
								<p>
									<strong>Email:</strong> {SITE_EMAIL}
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
