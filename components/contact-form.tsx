"use client"

import { useState, type FormEvent } from "react"
import { CtaButton } from "@/components/cta-button"
import { Icon } from "@/components/icon"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setError('')

    const fd = new FormData(e.currentTarget)
    const payload = {
      name: fd.get('name') as string,
      email: fd.get('email') as string,
      phone: fd.get('phone') as string,
      destination: fd.get('destination') as string,
      message: fd.get('message') as string,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or contact us directly.')
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-secondary/20 text-primary">
          <Icon name="check" className="size-7" />
        </span>
        <h3 className="mt-5 font-heading text-xl font-bold text-foreground">Message received</h3>
        <p className="mt-2 max-w-sm leading-relaxed text-muted-foreground">
          Thanks for reaching out. A counsellor will get back to you within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="Aisha Sharma" required />
        <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
        <Field label="Phone / WhatsApp" name="phone" placeholder="+91 90000 00000" required />
        <Field label="Preferred destination" name="destination" placeholder="UK, USA, Canada..." />
      </div>
      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your study goals..."
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
      </div>
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      <CtaButton type="submit" variant="gold" size="lg" className="mt-6 w-full" disabled={sending}>
        {sending ? 'Sending...' : 'Send message'}
      </CtaButton>
    </form>
  )
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
      />
    </div>
  )
}
