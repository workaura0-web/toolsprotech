import { SITE_NAME } from "@/lib/constant";
import { Zap, Shield, Code, FileArchiveIcon as Compress, Type, User, FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<footer className='bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4 mt-16'>
			<div className='container mx-auto'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					<div>
						<Link
							href='/'
							className='flex items-center space-x-2 mb-4'>
							<div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg'>
								<Zap className='w-6 h-6 text-white' />
							</div>
							<span className='text-2xl font-bold'>
								{SITE_NAME}
							</span>
						</Link>
						<p className='text-gray-300 mb-4'>
							Your one-stop destination for powerful online tools.
						</p>
					</div>
					<div>
						<h4 className='font-semibold mb-4 text-lg'>Popular Tools</h4>
						<ul className='space-y-2 text-gray-300 text-sm'>
							<li>
								<Link
									href='/tools/password-generator'
									className='hover:text-blue-400 transition-colors flex items-center'>
									<Shield className='w-4 h-4 mr-2' />
									Password Generator
								</Link>
							</li>
							<li>
								<Link
									href='/tools/qr-generator'
									className='hover:text-blue-400 transition-colors flex items-center'>
									<Code className='w-4 h-4 mr-2' />
									QR Code Generator
								</Link>
							</li>
							<li>
								<Link
									href='/tools/image-compressor'
									className='hover:text-blue-400 transition-colors flex items-center'>
									<Compress className='w-4 h-4 mr-2' />
									Image Compressor
								</Link>
							</li>
							<li>
								<Link
									href='/tools/word-counter'
									className='hover:text-blue-400 transition-colors flex items-center'>
									<Type className='w-4 h-4 mr-2' />
									Word Counter
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className='font-semibold mb-4 text-lg'>Company</h4>
						<ul className='space-y-2 text-gray-300 text-sm'>
							<li>
								<Link
									href='/about'
									className='hover:text-blue-400 transition-colors flex items-center'>
									<Zap className='w-4 h-4 mr-2' />
									About Us
								</Link>
							</li>
							<li>
								<Link									href='/blog'
									className='hover:text-blue-400 transition-colors flex items-center'>
										<FileText className='w-4 h-4 mr-2' />
										Blog & Guides
									</Link>
							</li>
							<li>
								<Link									href='/contact'
									className='hover:text-blue-400 transition-colors flex items-center'>
									<User className='w-4 h-4 mr-2' />
									Contact
								</Link>
							</li>
							<li>
								<Link
									href='/privacy'
									className='hover:text-blue-400 transition-colors flex items-center'>
									<Shield className='w-4 h-4 mr-2' />
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href='/terms'
									className='hover:text-blue-400 transition-colors flex items-center'>
									<FileText className='w-4 h-4 mr-2' />
									Terms of Service
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h4 className='font-semibold mb-4 text-lg'>Legal</h4>
						<ul className='space-y-2 text-gray-300 text-sm'>
							<li>
								<Link
									href='/cookies'
									className='hover:text-blue-400 transition-colors flex items-center'>
									<Shield className='w-4 h-4 mr-2' />
									Cookie Policy
								</Link>
							</li>
							<li>
								<Link
									href='/disclaimer'
									className='hover:text-blue-400 transition-colors flex items-center'>
									<FileText className='w-4 h-4 mr-2' />
									Disclaimer
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className='border-t border-gray-700 mt-12 pt-8 text-center text-gray-400'>
					<div className='flex flex-col md:flex-row justify-between items-center'>
						<p>&copy; 2026 {SITE_NAME}. All rights reserved.</p>
						<div className='mt-4 md:mt-0'>
							<Link href='/privacy' className='mx-3 hover:text-blue-400 transition-colors text-sm'>Privacy</Link>
							<Link href='/terms' className='mx-3 hover:text-blue-400 transition-colors text-sm'>Terms</Link>
							<Link href='/disclaimer' className='mx-3 hover:text-blue-400 transition-colors text-sm'>Disclaimer</Link>
						</div>
					</div>
					<p className='mt-4 text-center text-sm text-gray-400'>
						Made with <span className='text-red-400 text-base align-middle'>♥</span> by <span className='font-semibold text-blue-300'>ABM</span>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
