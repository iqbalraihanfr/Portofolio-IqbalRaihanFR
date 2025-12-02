import { getBlogPosts } from '@/lib/mdx';
import { BlogList } from '@/components/blog/blog-list';
import { getTags } from '@/lib/helper';
import { Accent } from '@/components/ui/accent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'My thoughts on the web, tech, and everything in between.',
};

export default function BlogPage() {
  const posts = getBlogPosts();
  const tags = getTags(posts);

  return (
    <main className='min-h-screen py-10 container mx-auto max-w-5xl px-4'>
      <section className='grid gap-2'>
        <h1 className='text-3xl font-bold md:text-5xl'>
          <Accent>Blog</Accent>
        </h1>
        <p className='text-gray-600 dark:text-gray-300'>
          My thoughts on the web, tech, and everything in between.
        </p>
      </section>
      <BlogList posts={posts} tags={tags} />
    </main>
  );
}
