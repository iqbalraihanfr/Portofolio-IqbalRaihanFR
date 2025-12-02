import { getBlogPost, getBlogPosts } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { formatDate } from '@/lib/format';
import { BlogStats } from '@/components/blog/blog-stats';
import { BlogCard } from '@/components/blog/blog-card';
import { Accent } from '@/components/ui/accent';
import { CustomLink } from '@/components/link/custom-link';
import { CustomPre } from '@/components/content/custom-pre';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const components = {
  a: CustomLink,
  pre: CustomPre,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [
        {
          url: post.banner,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getBlogPosts();
  const suggestedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  return (
    <main className='min-h-screen py-10 container mx-auto max-w-4xl px-4'>
      <div className='mb-8'>
        <Link href='/blog' className='text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white'>
          ← Back to blog
        </Link>
      </div>

      <article>
        <div className='mb-8 grid gap-4'>
          <h1 className='text-3xl font-bold md:text-5xl'>{post.title}</h1>
          <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
            <p>Written on {formatDate(post.publishedAt)} by Risal Amin</p>
            <BlogStats slug={slug} readTime={post.readTime} increment />
          </div>
        </div>

        <div className='relative mb-8 aspect-video w-full overflow-hidden rounded-lg'>
          <Image
            src={post.banner}
            alt={post.bannerAlt || post.title}
            fill
            className='object-cover'
            priority
          />
        </div>

        <div className='prose prose-lg dark:prose-invert max-w-none'>
          <MDXRemote source={post.content} components={components} />
        </div>
      </article>

      <hr className='my-12 border-gray-200 dark:border-gray-800' />

      <section>
        <h2 className='mb-6 text-2xl font-bold'>
          <Accent>Other posts you might like</Accent>
        </h2>
        <div className='grid gap-6 sm:grid-cols-2'>
          {suggestedPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </section>
    </main>
  );
}
