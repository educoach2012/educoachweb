'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AssessmentFormProps {
  countries: { slug: string; name: string; flag: string }[]
  services: { serviceId: string; title: string }[]
}

const stages = ['Grade 8-10', 'Grade 11-12', 'Undergraduate', 'Postgraduate', 'Career changer', 'Parent']

const field =
  'h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary'

export function AssessmentForm({ countries, services }: AssessmentFormProps) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [data, setData] = useState({
    stage: '',
    countries: [] as string[],
    interest: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const total = 3

  function toggleCountry(name: string) {
    setData((d) => ({
      ...d,
      countries: d.countries.includes(name)
        ? d.countries.filter((c) => c !== name)
        : [...d.countries, name],
    }))
  }

  function next() {
    setStep((s) => Math.min(s + 1, total - 1))
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0))
  }

  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
      <div className="flex flex-col items-center rounded-3xl border border-border bg-card p-6 text-center sm:p-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-foreground">Your assessment is booked!</h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          Thank you, {data.name || 'there'}. A dedicated counsellor will reach out within 24 hours to
          confirm your session and next steps.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      {/* progress */}
      <div className="mb-8 flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors',
                i <= step ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground',
              )}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            {i < total - 1 && (
              <div className={cn('h-0.5 flex-1 rounded', i < step ? 'bg-primary' : 'bg-border')} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={submit}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="s0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-lg font-semibold text-foreground">Who is this assessment for?</h3>
              <p className="mt-1 text-sm text-muted-foreground">Select the option that fits best.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {stages.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setData((d) => ({ ...d, stage: s }))}
                    className={cn(
                      'rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors',
                      data.stage === s
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border hover:border-primary/40',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-lg font-semibold text-foreground">Where would you like to study?</h3>
              <p className="mt-1 text-sm text-muted-foreground">Pick all that interest you.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {countries.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => toggleCountry(c.name)}
                    className={cn(
                      'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                      data.countries.includes(c.name)
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border hover:border-primary/40',
                    )}
                  >
                    {c.flag} {c.name}
                  </button>
                ))}
              </div>
              <label className="mt-6 block text-sm font-medium text-foreground">
                What do you need most help with?
              </label>
              <select
                value={data.interest}
                onChange={(e) => setData((d) => ({ ...d, interest: e.target.value }))}
                className={cn(field, 'mt-2')}
              >
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s.serviceId} value={s.title}>{s.title}</option>
                ))}
              </select>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-lg font-semibold text-foreground">Your details</h3>
              <p className="mt-1 text-sm text-muted-foreground">We&apos;ll confirm your session within 24 hours.</p>
              <div className="mt-5 grid gap-4">
                <input
                  required
                  placeholder="Full name"
                  aria-label="Full name"
                  value={data.name}
                  onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                  className={field}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    type="email"
                    placeholder="Email address"
                    aria-label="Email address"
                    value={data.email}
                    onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                    className={field}
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Phone number"
                    aria-label="Phone number"
                    value={data.phone}
                    onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
                    className={field}
                  />
                </div>
                <textarea
                  placeholder="Anything you'd like us to know? (optional)"
                  aria-label="Message"
                  rows={3}
                  value={data.message}
                  onChange={(e) => setData((d) => ({ ...d, message: e.target.value }))}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {step < total - 1 ? (
            <button
              type="button"
              onClick={next}
              disabled={step === 0 && !data.stage}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 disabled:opacity-50"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-1.5 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition-all hover:-translate-y-0.5 disabled:opacity-50"
            >
              {sending ? 'Booking...' : 'Book My Assessment'} <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
