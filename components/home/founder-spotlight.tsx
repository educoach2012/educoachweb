'use client'

import { Reveal } from '@/components/reveal'
import { CtaButton } from '@/components/cta-button'
import { Quote } from 'lucide-react'
import type { Founder } from '@/lib/types'

interface FounderSpotlightProps {
  founder?: Founder
}

export function FounderSpotlight({ founder }: FounderSpotlightProps) {
  const f = founder ?? {
    name: 'Dr. Priya Menon',
    role: 'Founder & Lead Counsellor',
    initials: 'PM',
    heading: 'An education psychologist who turned counselling into a science',
    quote: 'Every student has an intellectual fingerprint — a combination of passion, aptitude, and ambition that no algorithm can fully map. Our job is to make that fingerprint visible to the universities that matter most.',
    bio: [],
    tags: [],
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-[0.4fr_1fr] lg:gap-16">
          <Reveal>
            <div className="mx-auto w-full max-w-xs lg:max-w-none">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
                <div className="flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-primary/20 to-navy/30">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary to-navy font-display text-5xl font-bold text-primary-foreground">
                    {f.initials}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card via-card/90 to-transparent p-6 pt-16">
                  <p className="font-display text-lg font-bold text-foreground">{f.name}</p>
                  <p className="text-sm text-primary">{f.role}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Meet the Founder
              </span>

              <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
                {f.heading}
              </h2>

              <div className="relative mt-6">
                <Quote className="absolute -left-2 -top-2 h-8 w-8 text-gold/20" />
                <blockquote className="pl-8 text-lg italic leading-relaxed text-muted-foreground">
                  {f.quote}
                </blockquote>
              </div>

              {f.bio.length > 0 && (
                <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
                  {f.bio.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}

              {f.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {f.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm font-medium text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8">
                <CtaButton href="/about" variant="outline">
                  Read our full story
                </CtaButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
