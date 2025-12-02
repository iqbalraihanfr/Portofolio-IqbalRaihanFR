import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Blog } from '@/types/blog';

const root = process.cwd();
const contentDir = path.join(root, 'src/contents/blog');

export function getBlogPosts(): Blog[] {
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir);

  const posts = files
    .filter((file) => path.extname(file) === '.mdx')
    .map((file) => {
      const source = fs.readFileSync(path.join(contentDir, file), 'utf-8');
      const { data, content } = matter(source);
      const readTime = readingTime(content).text;

      return {
        ...data,
        slug: file.replace('.mdx', ''),
        title: data.title,
        publishedAt: data.publishedAt,
        description: data.summary,
        banner: data.image,
        tags: Array.isArray(data.tags) ? data.tags.join(',') : (data.tags || ''),
        readTime,
      } as Blog;
    })
    .sort((a, b) => {
      return (
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
      );
    });

  return posts;
}

export function getBlogPost(slug: string): (Blog & { content: string }) | undefined {
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  const source = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(source);
  const readTime = readingTime(content).text;

  return {
    ...data,
    slug,
    title: data.title,
    publishedAt: data.publishedAt,
    description: data.summary,
    banner: data.image,
    tags: Array.isArray(data.tags) ? data.tags.join(',') : (data.tags || ''),
    readTime,
    content,
  } as Blog & { content: string };
}
