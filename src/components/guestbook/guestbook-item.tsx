import Image from 'next/image'

export type GuestItem = { id: string; name: string; message: string; createdAt: number | null }

export default function GuestbookItem({ item }: { item: GuestItem }) {
  const ts = item.createdAt ? new Date(item.createdAt) : null
  const dateLabel = ts ? ts.toLocaleDateString('en-GB') : ''

  return (
    <li className="rounded-xl border bg-white/60 p-3 md:p-4 dark:border-neutral-800 dark:bg-neutral-900/60">
      <div className="flex items-start gap-3">
        {/* placeholder avatar */}
        <div className="h-9 w-9 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
          <Image src="/avatar-placeholder.png" alt="" width={36} height={36} className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <p className="font-medium truncate">{item.name}</p>
            {dateLabel && (
              <a className="text-xs text-neutral-500 underline-offset-2 hover:underline" title={ts?.toLocaleString()}>
                {dateLabel}
              </a>
            )}
          </div>
          <p className="mt-1 text-sm text-neutral-800 dark:text-neutral-300">{item.message}</p>
        </div>
      </div>
    </li>
  )
}