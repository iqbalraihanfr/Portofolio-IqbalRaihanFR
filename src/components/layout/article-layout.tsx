import Image from 'next/image'
import Link from 'next/link'
import { Accent } from '@/components/ui/accent'

type ArticleMeta = {
  title: string
  description?: string
  issuedAt?: string
  issuer?: string
  tags?: string[]
  banner?: string
  bannerAlt?: string
  bannerLink?: string
}

export default function ArticleLayout({
  meta,
  children,
}: {
  meta: ArticleMeta
  children: React.ReactNode
}) {
  const { title, description, issuedAt, issuer, tags = [], banner, bannerAlt, bannerLink } = meta

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      {/* Banner */}
      {banner ? (
        <div className="relative mb-6 h-56 w-full overflow-hidden rounded-xl">
          {bannerLink ? (
            <Link href={bannerLink} target="_blank" rel="noreferrer">
              <Image src={banner} alt={bannerAlt ?? title} fill className="object-cover" />
            </Link>
          ) : (
            <Image src={banner} alt={bannerAlt ?? title} fill className="object-cover" />
          )}
        </div>
      ) : null}

      {/* Title */}
      <h1 className="text-3xl font-bold">{title}</h1>

      {/* Meta line */}
      {(issuer || issuedAt) && (
        <p className="mt-1 text-sm text-neutral-500">
          {[issuer, issuedAt].filter(Boolean).join(' • ')}
        </p>
      )}

      {/* Desc */}
      {description ? (
        <p className="mt-3 text-base text-neutral-700 dark:text-neutral-300">{description}</p>
      ) : null}

      {/* Tags */}
      {tags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            >
              <Accent plain>{t}</Accent>
            </span>
          ))}
        </div>
      ) : null}

      {/* Content */}
      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">{children}</div>
    </article>
  )
}