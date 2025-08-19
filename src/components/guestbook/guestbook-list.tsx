'use client'

import { useEffect, useState } from 'react'
import GuestbookItem, { GuestItem } from './guestbook-item'

export default function GuestbookList() {
  const [items, setItems] = useState<GuestItem[]>([])
  const [cursor, setCursor] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function load(reset = false) {
    setLoading(true)
    const url = new URL('/api/guestbook', window.location.origin)
    url.searchParams.set('limit', '10')
    if (!reset && cursor) url.searchParams.set('cursor', cursor)
    const res = await fetch(url.toString(), { cache: 'no-store' })
    const json = await res.json()
    setItems(prev => (reset ? json.items : [...prev, ...json.items]))
    setCursor(json.nextCursor ?? null)
    setLoading(false)
  }

  useEffect(() => { load(true) }, [])

  return (
    <>
      <ul className="mt-6 space-y-3">
        {items.map(i => <GuestbookItem key={i.id} item={i} />)}
      </ul>
      <div className="mt-4 flex justify-center">
        {cursor ? (
          <button
            onClick={() => load(false)}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
            disabled={loading}
          >
            {loading ? 'Loading…' : 'Load more'}
          </button>
        ) : null}
      </div>
    </>
  )
}