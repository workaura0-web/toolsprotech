import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_EMAIL, SITE_NAME, SITE_PHONE, SITE_URL } from "@/lib/constant";

export default function SiteStructuredData() {
	const graph = [
		{
			"@type": "Organization",
			"@id": `${SITE_URL}/#organization`,
			name: SITE_NAME,
			url: SITE_URL,
			logo: {
				"@type": "ImageObject",
				url: `${SITE_URL}/favicon.ico`,
				caption: SITE_NAME,
			},
			founder: {
				"@type": "Person",
				name: SITE_AUTHOR,
				url: "https://abmcodespace.vercel.app/",
			},
			contactPoint: [
				{
					"@type": "ContactPoint",
					email: SITE_EMAIL,
					telephone: SITE_PHONE,
					contactType: "customer service",
					availableLanguage: ["English", "Urdu"],
				},
			],
			sameAs: [
				"https://abmcodespace.vercel.app/",
				"https://wa.me/923253229649",
			],
		},
		{
			"@type": "WebSite",
			"@id": `${SITE_URL}/#website`,
			url: SITE_URL,
			name: SITE_NAME,
			description: SITE_DESCRIPTION,
			publisher: { "@id": `${SITE_URL}/#organization` },
			inLanguage: "en-US",
			potentialAction: {
				"@type": "SearchAction",
				target: {
					"@type": "EntryPoint",
					urlTemplate: `${SITE_URL}/?q={search_term_string}`,
				},
				"query-input": "required name=search_term_string",
			},
		},
	];

	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{
				__html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
			}}
		/>
	);
}