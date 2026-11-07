import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog-posts";
import { SITE_NAME, SITE_URL } from "@/lib/constant";
import { ArrowRight, Wrench } from "lucide-react";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  return post
    ? {
          title: `${post.title} – ${SITE_NAME}`,
          description: post.description,
          alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
          openGraph: {
            type: "article",
            url: `${SITE_URL}/blog/${post.slug}`,
            title: post.title,
            description: post.description,
            siteName: SITE_NAME,
          },
          twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
          },
        }
    : { title: `Blog Post | ${SITE_NAME}` };
}

const categoryToolLinks: Record<string, Array<{ name: string; slug: string }>> = {
  SEO: [
    { name: "Robots.txt Generator", slug: "robots-generator" },
    { name: "XML Sitemap Generator", slug: "sitemap-generator" },
    { name: "Domain Age Checker", slug: "domain-age-checker" },
    { name: "Meta Tag Generator", slug: "meta-tag-generator" },
  ],
  Adsense: [
    { name: "AdSense Revenue Calculator", slug: "adsense-calculator" },
    { name: "Percentage Calculator", slug: "percentage-calculator" },
    { name: "Word Counter", slug: "word-counter" },
    { name: "Privacy Policy Generator", slug: "privacy-policy-generator" },
  ],
  UX: [
    { name: "Favicon Generator", slug: "favicon-generator" },
    { name: "Color Palette Generator", slug: "color-generator" },
    { name: "Image Compressor", slug: "image-compressor" },
    { name: "QR Code Generator", slug: "qr-generator" },
  ],
  Productivity: [
    { name: "Article Rewriter", slug: "article-rewriter" },
    { name: "Word Counter", slug: "word-counter" },
    { name: "Text Diff Checker", slug: "text-diff-checker" },
    { name: "JSON Formatter", slug: "json-formatter" },
  ],
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const suggestedTools = categoryToolLinks[post.category] || categoryToolLinks.SEO;

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4'>
      <div className='container mx-auto max-w-3xl'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.description,
              datePublished: post.publishedAt,
              author: { "@type": "Person", name: SITE_NAME },
              publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
              mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
            }),
          }}
        />
        <Link href='/blog' className='mb-6 inline-flex text-sm font-medium text-blue-700 hover:text-blue-800'>
          ← Back to all articles
        </Link>

        <article className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8'>
          <div className='mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700'>
            {post.category}
          </div>

          <h1 className='text-3xl font-bold tracking-tight text-slate-900 md:text-4xl'>
            {post.title}
          </h1>

          <div className='mt-4 flex items-center gap-4 text-sm text-slate-500'>
            <span>{post.publishedAt}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <p className='mt-6 text-base leading-7 text-slate-600 font-medium'>{post.description}</p>

          <div className='mt-8 space-y-8'>
            {post.content.map((section) => (
              <section key={section.heading}>
                <h2 className='text-2xl font-bold text-slate-900'>{section.heading}</h2>
                <div className='mt-4 space-y-4 text-base leading-7 text-slate-600'>
                  {section.text.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Internal Tool Recommendations for SEO & Visitors */}
          <div className='mt-10 border-t border-slate-200 pt-8'>
            <div className='flex items-center gap-2 mb-4'>
              <Wrench className='h-4 w-4 text-blue-600' />
              <h3 className='text-lg font-bold text-slate-900'>
                Recommended Free Tools for this Topic
              </h3>
            </div>
            <div className='grid sm:grid-cols-2 gap-3'>
              {suggestedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className='group flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 hover:shadow-xs transition-all'>
                  <span className='text-sm font-medium text-slate-800 group-hover:text-blue-600'>
                    {tool.name}
                  </span>
                  <ArrowRight className='h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all' />
                </Link>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
