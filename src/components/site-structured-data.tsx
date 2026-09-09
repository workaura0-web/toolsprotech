import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constant";

export default function SiteStructuredData() {
	const graph = [
		{
			"@type": "Organization",
			"@id": `${SITE_URL}/#organization`,
			name: SITE_NAME,
			url: SITE_URL,
			founder: { "@type": "Person", name: SITE_AUTHOR },
		},
		{
			"@type": "WebSite",
			"@id": `${SITE_URL}/#website`,
			url: SITE_URL,
			name: SITE_NAME,
			description: SITE_DESCRIPTION,
			publisher: { "@id": `${SITE_URL}/#organization` },
		},
	];

	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
		/>
	);
}