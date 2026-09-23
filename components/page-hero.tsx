import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

type Crumb = { label: string; href?: string }

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
}: {
  eyebrow?: string
  title: string
  description?: string
  crumbs?: Crumb[]
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/40 pt-32 pb-16">
      <div
        className="pointer-events-none absolute inset-0 grid-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 -top-20 h-80 w-80 rounded-full bg-gold/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary">Home</Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1">
                <ChevronRight className="h-4 w-4" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-primary">{c.label}</Link>
                ) : (
                  <span className="text-foreground">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Reveal className="max-w-3xl">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.05] sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
