import { blogPosts } from "@/lib/blog-posts";
import { SITE_NAME, SITE_URL } from "@/lib/constant";

function escapeXml(value: string) {
	return value.replace(/[<>&'\"]/g, (character) => ({
		"<": "&lt;",
		">": "&gt;",
		"&": "&amp;",
		"'": "&apos;",
		'"': "&quot;",
	}[character] ?? character));
}

export function GET() {
	const items = blogPosts.map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`).join("");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_NAME} Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Practical guides for online tools, SEO, productivity, and digital work.</description>
    <language>en-us</language>${items}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
	});
}