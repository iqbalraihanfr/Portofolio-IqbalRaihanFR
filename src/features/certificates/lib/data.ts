// src/features/certificates/lib/data.ts
import { Certificate } from '@/types/certificate'

export const certificates: Certificate[] = [
  {
    slug: 'creating-custom-layouts',
    title: 'Creating Custom Layouts in Next.js',
    issuer: 'Ketik Academy',
    issuedAt: '2022-12-26',
    tags: ['nextjs'],
    cover: '/certificates/layout-cover.jpg',
    summary: 'Learn how to create Single Shared Layouts and Per-Page Layouts in Next.js.',
    views: 1482,
    readTime: '3 min read',
  },
  {
    slug: 'data-fetching-in-nextjs',
    title: 'Data Fetching in Next.js',
    issuer: 'Ketik Academy',
    issuedAt: '2022-12-26',
    tags: ['nextjs'],
    cover: '/certificates/data-cover.jpg',
    summary: 'Different methods for fetching data incl. SSG, SSR, and client rendering.',
    views: 1016,
    readTime: '5 min read',
  },
  {
    slug: 'hello-world',
    title: '"Hello World" - A New Beginning',
    issuer: 'Self',
    issuedAt: '2022-12-24',
    tags: ['self'],
    cover: '/certificates/hello-cover.jpg',
    summary: 'Intro about me, what to expect from my blog/certificates & personal notes.',
    views: 565,
    readTime: '2 min read',
  },
]