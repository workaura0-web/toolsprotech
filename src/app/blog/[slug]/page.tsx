import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog-posts";
import { SITE_NAME, SITE_URL } from "@/lib/constant";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  return post
    ? {
          title: post.title,
          description: post.description,
          alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
          openGraph: {
            type: "article",
            url: `${SITE_URL}/blog/${post.slug}`,
            title: post.title,
            description: post.description,
            siteName: SITE_NAME,
          },
        }
      : { title: "Blog Post | ToolsProTech" };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

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
          ← Back to blog
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

          <p className='mt-6 text-base leading-7 text-slate-600'>{post.description}</p>

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
        </article>
      </div>
    </div>
  );
}
