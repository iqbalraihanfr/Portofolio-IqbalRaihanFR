"use client";
import * as React from "react";
import { Search, ArrowUpDown, Calendar, Tag, ShieldCheck, ExternalLink, Award } from "lucide-react";

// =====================================
// Types
// =====================================
export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issuedAt: string; // ISO date string
  url?: string; // verification / view url
  imageUrl?: string; // thumbnail
  topics?: string[]; // tags / categories
  credentialId?: string;
  hours?: number; // optional study hours
};

export interface CertificatesPageProps {
  heading?: string;
  subheading?: string;
  items: Certificate[];
  /** When true, show a lighter, compact top bar */
  compact?: boolean;
}

// =====================================
// Small utilities
// =====================================
const cx = (...a: Array<string | false | undefined | null>) => a.filter(Boolean).join(" ");

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

// build topic list from items
const topicsFrom = (items: Certificate[]) => {
  const set = new Set<string>();
  for (const it of items) (it.topics || []).forEach((t) => set.add(t));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
};

// =====================================
// Components
// =====================================
function TopicChip({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs transition",
        active
          ? "bg-violet-600 text-white shadow hover:bg-violet-500"
          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
      )}
      aria-pressed={active}
    >
      <Tag className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

function SortByDate({ asc, onToggle }: { asc: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-800 shadow-sm hover:bg-neutral-50 active:scale-[0.98] dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
    >
      <ArrowUpDown className={cx("h-4 w-4", asc ? "rotate-180" : "")} />
      Sort by date
    </button>
  );
}

function CertificateCard({ c }: { c: Certificate }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/95 shadow-sm ring-1 ring-black/5 transition hover:shadow-md dark:bg-neutral-900/70">
      {/* thumbnail */}
      <div className="relative h-40 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={c.imageUrl || "https://images.unsplash.com/photo-1520975922284-2aa99f56bdc7?q=80&w=1200&auto=format&fit=crop"}
          alt={c.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {c.topics && c.topics[0] && (
          <span className="absolute right-2 top-2 rounded-md bg-black/60 px-2 py-1 text-[10px] text-white backdrop-blur">
            {c.topics[0]}
          </span>
        )}
      </div>

      {/* body */}
      <div className="p-4">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-neutral-900 dark:text-neutral-50">
          {c.title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-600 dark:text-neutral-300">
          <span className="inline-flex items-center gap-1"><Award className="h-3.5 w-3.5"/> {c.issuer}</span>
          <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5"/> {formatDate(c.issuedAt)}</span>
        </div>

        {c.credentialId && (
          <div className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400">Credential ID: {c.credentialId}</div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {(c.topics || []).slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                {t}
              </span>
            ))}
          </div>

          {c.url && (
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-neutral-900 px-2.5 py-1.5 text-[11px] font-medium text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              <ShieldCheck className="h-3.5 w-3.5" /> Verify
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// =====================================
// Page component
// =====================================
export function CertificatesPage({ heading = "Certificates", subheading = "A curated list of my certifications, badges, and awards.", items, compact }: CertificatesPageProps) {
  const [query, setQuery] = React.useState("");
  const [topic, setTopic] = React.useState<string | null>(null);
  const [asc, setAsc] = React.useState(false); // newest first by default

  const topics = React.useMemo(() => topicsFrom(items), [items]);

  const filtered = React.useMemo(() => {
    let arr = items.slice();
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      arr = arr.filter((c) =>
        [c.title, c.issuer, c.credentialId, ...(c.topics || [])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }
    if (topic) arr = arr.filter((c) => (c.topics || []).includes(topic));
    arr.sort((a, b) => (asc ? 1 : -1) * (new Date(a.issuedAt).getTime() - new Date(b.issuedAt).getTime()));
    return arr;
  }, [items, query, topic, asc]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 lg:pt-14">
      {/* Header */}
      <header className={cx("mb-6", compact ? "mb-4" : "mb-8")}>        
        <h1 className="text-4xl font-extrabold tracking-tight text-violet-500 md:text-5xl">{heading}</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">{subheading}</p>
      </header>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <label className="relative block w-full md:max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search certificates..."
            className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-9 pr-3 text-sm text-neutral-900 outline-none ring-violet-300 placeholder:text-neutral-400 focus:border-violet-400 focus:ring-4 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          />
        </label>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <SortByDate asc={asc} onToggle={() => setAsc((v) => !v)} />
        </div>
      </div>

      {/* Topics */}
      <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-neutral-500 dark:text-neutral-400">Choose topic:</span>
        <TopicChip label="all" active={!topic} onClick={() => setTopic(null)} />
        {topics.map((t) => (
          <TopicChip key={t} label={t} active={topic === t} onClick={() => setTopic(t)} />
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-neutral-300 p-10 text-center text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          No certificates match your filters.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CertificateCard key={c.id} c={c} />
          ))}
        </div>
      )}
    </main>
  );
}

// =====================================
// Demo for canvas preview / usage example
// =====================================
const demoItems: Certificate[] = [
  {
    id: "1",
    title: "Next.js Advanced Patterns",
    issuer: "Vercel",
    issuedAt: "2024-12-12",
    url: "https://vercel.com/",
    imageUrl: "https://images.unsplash.com/photo-1553484771-371a605b060b?q=80&w=1200&auto=format&fit=crop",
    topics: ["web", "nextjs"],
    credentialId: "VER-ADV-2024-001",
  },
  {
    id: "2",
    title: "Laravel Backend Engineering",
    issuer: "Laravel",
    issuedAt: "2025-03-01",
    url: "https://laravel.com/",
    imageUrl: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop",
    topics: ["backend", "laravel"],
    credentialId: "LAR-BE-2025-777",
  },
  {
    id: "3",
    title: "REST API Design & Security",
    issuer: "Coursera",
    issuedAt: "2024-09-20",
    url: "https://www.coursera.org/",
    imageUrl: "https://images.unsplash.com/photo-1541560052-77ec1bbc09f7?q=80&w=1200&auto=format&fit=crop",
    topics: ["api", "security"],
  },
  {
    id: "4",
    title: "Cloud Fundamentals (GCP)",
    issuer: "Google Cloud",
    issuedAt: "2025-02-11",
    url: "https://cloud.google.com/",
    imageUrl: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
    topics: ["cloud", "gcp"],
  },
  {
    id: "5",
    title: "Data Structures & Algorithms",
    issuer: "HackerRank",
    issuedAt: "2023-12-24",
    url: "https://www.hackerrank.com/",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    topics: ["cs", "dsa"],
  },
  {
    id: "6",
    title: "Public Speaking & MC Essentials",
    issuer: "Toastmasters",
    issuedAt: "2025-07-14",
    url: "https://www.toastmasters.org/",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
    topics: ["soft-skills", "mc"],
  },
];

export default function CertificatesDemo() {
  return (
    <div className="min-h-[100dvh] w-full bg-neutral-50 text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-50">
      {/* Put your Navbar here */}
      <CertificatesPage items={demoItems} />
      {/* Put your Footer here */}
    </div>
  );
}
