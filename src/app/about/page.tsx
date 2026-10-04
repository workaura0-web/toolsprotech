import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Zap, Shield } from "lucide-react";
import { SITE_NAME, SITE_TITLE } from "@/lib/constant";

export const metadata = {
	title: `About ${SITE_NAME} - ${SITE_TITLE}`,
	description:
		"We're on a mission to provide the most comprehensive collection of free online tools to boost productivity and simplify digital tasks.",
};

export default function AboutPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4'>
			<div className='container mx-auto max-w-4xl'>
				<div className='text-center mb-12'>
					<h1 className='text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
						About {SITE_NAME}
					</h1>
					<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
						ToolsProTech brings together browser utilities for common
						SEO, text, calculation, image, PDF, and developer tasks.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
					<Card className='shadow-xl border-0'>
						<CardHeader>
							<Target className='w-12 h-12 text-blue-600 mb-4' />
							<CardTitle>Our Mission</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600'>
								Our goal is to make everyday digital tasks easier to
								complete by keeping each utility focused, accessible,
								and free to use.
							</p>
						</CardContent>
					</Card>

					<Card className='shadow-xl border-0'>
						<CardHeader>
							<Users className='w-12 h-12 text-purple-600 mb-4' />
							<CardTitle>Our Team</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600'>
								ToolsProTech is maintained by its site owner. Tool
								pages describe what each utility does, the information
								it uses, and limitations visitors should keep in mind.
							</p>
						</CardContent>
					</Card>
				</div>

				<div className='mb-12'>
					<h2 className='text-3xl font-bold text-center mb-8 text-gray-800'>
						Why Choose {SITE_NAME}?
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<div className='text-center'>
							<div className='w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Zap className='w-8 h-8 text-white' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>
								Lightning Fast
							</h3>
							<p className='text-gray-600'>
								All our tools are optimized for speed and
								performance, ensuring you get results instantly.
							</p>
						</div>
						<div className='text-center'>
							<div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Shield className='w-8 h-8 text-white' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>
								Privacy First
							</h3>
							<p className='text-gray-600'>
								Many tools run in your browser. Domain, IP, and
								currency lookups send the requested details to our
								server and, where needed, external data providers.
							</p>
						</div>
						<div className='text-center'>
							<div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4'>
								<Users className='w-8 h-8 text-white' />
							</div>
							<h3 className='text-xl font-semibold mb-2'>
								User-Centric
							</h3>
							<p className='text-gray-600'>
								Every tool is designed with user experience in
								mind, making complex tasks simple and intuitive.
							</p>
						</div>
					</div>
				</div>

				<Card className='shadow-xl border-0 bg-gradient-to-br from-blue-50 to-purple-50'>
					<CardHeader>
						<CardTitle className='text-center'>Our Story</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='prose prose-gray max-w-none'>
							<p className='text-gray-600 mb-4'>
								{SITE_NAME} is a collection of focused utilities for
								common tasks such as formatting text, converting
								files, checking public domain information, and
								performing calculations.
							</p>
							<p className='text-gray-600 mb-4'>
								Some utilities process information in the browser;
								others rely on server routes or external data
								providers. The Privacy Policy explains these
								differences and what information is involved.
							</p>
							<p className='text-gray-600'>
								The site includes tools across several categories.
								If you find an issue or have a suggestion, please
								use the Contact page so it can be reviewed.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
