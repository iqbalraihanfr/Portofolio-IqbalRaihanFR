import { notFound } from 'next/navigation'
import ArticleLayout from '@/components/layout/article-layout'
import { certificates } from '@/features/certificates/lib/data'
import { formatDate } from '@/lib/format'

export async function generateStaticParams() {
  return certificates.map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = certificates.find((x) => x.slug === params.slug)
  if (!c) return {}
  return { title: `${c.title} — Certificate`, description: c.summary, openGraph: { images: [c.cover] } }
}

export default function Page({ params }: { params: { slug: string } }) {
  const c = certificates.find((x) => x.slug === params.slug)
  if (!c) return notFound()

  return (
    <ArticleLayout
      meta={{
        title: c.title,
        description: c.summary,
        issuedAt: formatDate(c.issuedAt),
        issuer: c.issuer,
        tags: c.tags,
        banner: c.cover,
        bannerAlt: c.title,
        // optional: c.bannerLink
      }}
    >
      {/* ——— isi konten bebas (tanpa MDX) ——— */}
      {c.body ? <p>{c.body}</p> : null}

      {/* contoh section mirip artikel */}
      <h2>What I learned</h2>
      <ul>
        <li>Built real projects with Next.js / React</li>
        <li>Understood fundamentals of {c.tags.join(', ')}</li>
        <li>Collaborated in team environment</li>
      </ul>

      {/* optional: gallery/cue-card stack kamu */}
      {/* <CardStack images={c.gallery ?? []} /> */}
    </ArticleLayout>
  )
}