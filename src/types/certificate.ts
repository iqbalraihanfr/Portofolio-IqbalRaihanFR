// src/types/certificate.ts
export type Certificate = {
  slug: string
  title: string
  issuer: string
  issuedAt: string       // ISO: '2024-07-15'
  tags: string[]         // ['nextjs','self']
  cover: string          // '/certificates/sic-cover.jpg'
  summary: string
  views?: number         // buat stats
  readTime?: string      // biar mirip "3 min read" (opsional, bisa static)
  gallery?: string[]
  body?: string
}