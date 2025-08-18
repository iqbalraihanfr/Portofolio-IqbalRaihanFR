// src/components/ui/accent.tsx
import React from 'react'
import { colors } from '@/lib/utils/colors'

type AccentProps = {
  children: React.ReactNode
  className?: string
  plain?: boolean  // kalau true = pakai text accent biasa
}

export function Accent({ children, className = '', plain = false }: AccentProps) {
  if (plain) {
    return <span className={[colors.text.accent, className].join(' ')}>{children}</span>
  }
  return (
    <span
      className={[
        'bg-clip-text text-transparent',
        colors.gradients.secondary,   // from-purple-500 via-pink-500 to-rose-500
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}