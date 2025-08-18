"use client";

import { useMemo, useState } from "react";
import CertCard from "@/components/certificates/cert-card";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { Certificate } from "@/types/certificate";

type Props = { data: Certificate[] };

export default function CertificatesClient({ data }: Props) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const [desc, setDesc] = useState(true);

  const tags = useMemo(
    () => Array.from(new Set(data.flatMap((d) => d.tags))),
    [data]
  );
  const list = useMemo(() => {
    let arr = [...data];
    if (q) {
      const qq = q.toLowerCase();
      arr = arr.filter(
        (x) =>
          x.title.toLowerCase().includes(qq) ||
          x.summary.toLowerCase().includes(qq) ||
          x.issuer.toLowerCase().includes(qq)
      );
    }
    if (active) arr = arr.filter((x) => x.tags.includes(active));
    arr.sort(
      (a, b) =>
        (+new Date(a.issuedAt) - +new Date(b.issuedAt)) * (desc ? -1 : 1)
    );
    return arr;
  }, [q, active, desc, data]);

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-9 py-9">
        <h1 className="text-5xl font-extrabold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500">
            Blog
          </span>
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          My certificates—tech, web, and everything in between.
        </p>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search blog..."
          className="mt-6 w-full rounded-lg border bg-white/70 px-4 py-3 outline-none ring-fuchsia-500/30 focus:ring dark:bg-neutral-900/60"
        />

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActive((prev) => (prev === t ? null : t))}
                className={`rounded-md px-2 py-1 text-sm ${
                  active === t
                    ? "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-200"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={() => setDesc((v) => !v)}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            <span>Sort by date</span>
            <HiArrowPathRoundedSquare
              className={`h-4 w-4 ${desc ? "" : "rotate-180"}`}
            />
          </button>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <CertCard key={c.slug} c={c} />
          ))}
        </div>
      </section>
    </main>
  );
}
