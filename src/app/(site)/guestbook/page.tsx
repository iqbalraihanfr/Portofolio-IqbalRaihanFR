'use client'

import GuestbookForm from '@/components/guestbook/guestbook-form'
import GuestbookList from '@/components/guestbook/guestbook-list'
import { useRef } from 'react'

export default function GuestbookPage() {
  const listRef = useRef<{ reload?: () => void }>(null)

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-9 py-9">
      <h1 className="text-5xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
          Guestbook
        </span>
      </h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        Leave a comment below. Anything—appreciation, info, or jokes. Surprise me!
      </p>

      <div className="mt-6">
        <GuestbookForm onPosted={() => window.location.reload()} />
      </div>

      <GuestbookList />
    </section>
  )
}