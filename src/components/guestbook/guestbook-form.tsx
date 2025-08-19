'use client'

import { useState } from 'react'

export default function GuestbookForm({ onPosted }: { onPosted: () => void }) {
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message: msg }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j?.error ? 'Invalid input' : 'Failed to post')
      }
      setName(''); setMsg('')
      onPosted()
    } catch (err: any) {
      setError(err.message ?? 'Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border bg-white/80 p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60">
      <h2 className="text-2xl font-extrabold">
        <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
          Sign the Guestbook
        </span>
      </h2>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
        Share a message for a future visitor of my site.
      </p>

      <form onSubmit={submit} className="mt-4 space-y-3">
        <input
          value={name} onChange={(e)=>setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-lg border bg-white/70 px-4 py-3 outline-none ring-fuchsia-500/30 focus:ring dark:bg-neutral-900/60"
        />
        <input
          value={msg} onChange={(e)=>setMsg(e.target.value)}
          placeholder="Sign in to leave a message"
          className="w-full rounded-lg border bg-white/70 px-4 py-3 outline-none ring-fuchsia-500/30 focus:ring dark:bg-neutral-900/60"
        />

        <div className="flex items-center gap-3">
          <button
            disabled={loading || !name || !msg}
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-neutral-50 disabled:opacity-60 dark:hover:bg-neutral-800"
          >
            {loading ? 'Sending…' : 'Sign'}
          </button>
          {error && <span className="text-sm text-red-600">{error}</span>}
        </div>

        <p className="text-xs text-neutral-500">
          Your information is only used to display your name and message.
        </p>
      </form>
    </div>
  )
}