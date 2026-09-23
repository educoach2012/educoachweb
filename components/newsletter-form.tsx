'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  if (done) {
    return (
      <div className={cn('flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary', className)}>
        <Check className="h-4 w-4" /> You&apos;re subscribed. Check your inbox soon.
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className={cn('flex flex-col gap-2', className)}>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email address"
        className="h-11 flex-1 rounded-full border border-border bg-card px-4 text-sm outline-none transition-colors focus:border-primary"
      />
      <button
        type="submit"
        disabled={sending}
        aria-label="Subscribe"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-50"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
      </div>
    </form>
  )
}
