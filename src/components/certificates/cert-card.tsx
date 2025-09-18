// src/components/certificates/cert-card.tsx
import Link from "next/link";
import Image from "next/image";
import { HiEye, HiClock } from "react-icons/hi2";
import { Certificate } from "@/types/certificate";
import { formatDate, formatNumber } from "@/lib/format";
import { Accent } from "@/components/ui/accent";

export default function CertCard({ c }: { c: Certificate }) {
  const tag = c.tags?.[0];

  return (
    <Link
      href={`/certificates/${c.slug}`}
      className="group overflow-hidden rounded-xl border border-gray-200 bg-white/80 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-black/60"
    >
      <div className="relative h-52 w-full bg-gray-50 dark:bg-gray-900">
        <Image
          src={c.cover}
          alt={c.title}
          fill
          className="object-contain p-2"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        {tag && (
          <span className="absolute right-2 top-2 rounded-md bg-gray-900/60 px-2 py-1 text-xs text-white backdrop-blur dark:bg-white/15 dark:text-white">
            {tag}
          </span>
        )}
      </div>

      <div className="space-y-2 p-4">
        <h3 className="text-[17px] font-semibold leading-snug text-gray-900 transition-colors group-hover:text-fuchsia-600 dark:text-white">
          {c.shortTitle}
        </h3>

        <div className="flex gap-4 text-sm font-medium text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <HiClock className="h-4 w-4" />
            <Accent>{c.readTime ?? "3 min read"}</Accent>
          </div>
          <div className="flex items-center gap-1">
            <HiEye className="h-4 w-4" />
            <Accent>{formatNumber(c.views)}</Accent>
          </div>
        </div>

        <p className="mt-3 text-sm font-bold text-gray-900 dark:text-white">
          {formatDate(c.issuedAt)}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{c.summary}</p>
      </div>
    </Link>
  );
}
