"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "toolsprotech-cookie-consent";

export default function CookieConsent() {
	const [visible, setVisible] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const consent = localStorage.getItem(STORAGE_KEY);
		if (!consent) {
			setVisible(true);
		}
	}, []);

	const saveConsent = (value: "accepted" | "declined") => {
		localStorage.setItem(STORAGE_KEY, value);
		setVisible(false);
	};

	if (!mounted || !visible) {
		return null;
	}

	return (
		<div className='fixed inset-x-0 bottom-0 z-50 px-4 pb-4'>
			<div className='mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md'>
				<div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
					<div className='max-w-3xl'>
						<p className='text-sm font-semibold text-slate-900'>Cookie Notice</p>
						<p className='mt-1 text-sm text-slate-600'>
							This site may use cookies or similar technologies for ad
							measurement and general site functionality. You can accept or
							decline cookies. You can also change this preference later in
							the privacy policy and cookie policy pages.
						</p>
					</div>
					<div className='flex flex-wrap items-center gap-2'>
						<Button
							variant='outline'
							size='sm'
							onClick={() => saveConsent("declined")}
							className='border-slate-300 text-slate-700 hover:bg-slate-100'
						>
							Decline
						</Button>
						<Button
							size='sm'
							onClick={() => saveConsent("accepted")}
							className='bg-blue-600 text-white hover:bg-blue-700'
						>
							Accept
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
