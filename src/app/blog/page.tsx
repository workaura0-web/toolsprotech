import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";

export const metadata = {
  title: "Blog | ToolsProTech",
  description: "Helpful guides and practical tips for using online tools more effectively.",
};

export default function BlogPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4'>
      <div className='container mx-auto max-w-6xl'>
        <div className='mb-10 text-center'>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-blue-600'>Blog & Guides</p>
          <h1 className='mt-4 text-4xl font-bold text-slate-900'>Helpful content for better digital productivity</h1>
          <p className='mt-4 mx-auto max-w-2xl text-base leading-7 text-slate-600'>
            Explore practical tutorials, SEO tips, productivity advice, and simple guides for using online tools more effectively.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className='group block h-full'>
              <article className='h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg'>
                <div className='mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700'>
                  {post.category}
                </div>
                <h2 className='text-xl font-bold text-slate-900 group-hover:text-blue-700'>
                  {post.title}
                </h2>
                <p className='mt-3 text-sm leading-6 text-slate-600'>{post.description}</p>
                <div className='mt-5 flex items-center justify-between text-xs font-medium text-slate-500'>
                  <span>{post.publishedAt}</span>
                  <span>{post.readTime}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
