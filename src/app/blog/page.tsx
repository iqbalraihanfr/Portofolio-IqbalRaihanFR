import { getAllContents } from '@/lib/mdx';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = await getAllContents('blog');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post.slug} className="border p-4 rounded-lg">
            <h2 className="text-2xl font-semibold">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mt-2">{post.description}</p>
            <div className="mt-2 text-sm text-gray-500">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
