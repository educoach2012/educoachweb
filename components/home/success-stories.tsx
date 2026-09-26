'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, GraduationCap, MapPin, Quote } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { CtaButton } from '@/components/cta-button'

interface SuccessStoriesProps {
  stories: { name: string; quote: string; course: string; university: string; countryName: string; scholarship: string; year: number }[]
  title?: string
  description?: string
}

export function SuccessStories({ stories, title, description }: SuccessStoriesProps) {
  const scroller = useRef<HTMLDivElement>(null)

  function scroll(dir: 1 | -1) {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Success stories"
            title={title ?? 'Real students. Life-changing offers.'}
            description={description ?? 'Behind every offer is a story of the right guidance at the right time.'}
          />
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-secondary"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-secondary"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {stories.map((s) => (
            <article
              key={s.name}
              className="group relative w-[85%] shrink-0 snap-start overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 sm:w-[46%] lg:w-[31%]"
            >
              <Quote className="h-8 w-8 text-gold/40" />
              <p className="mt-4 text-pretty text-base leading-relaxed text-foreground">
                &ldquo;{s.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-border pt-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                    {s.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.course}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5 text-sm">
                  <p className="flex items-center gap-2 font-medium text-foreground">
                    <GraduationCap className="h-4 w-4 text-primary" /> {s.university}
                  </p>
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" /> {s.countryName}
                  </p>
                </div>
                <div className="mt-4 inline-flex rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-foreground">
                  {s.scholarship} scholarship · {s.year}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <CtaButton href="/success-stories" variant="outline" size="lg">
            Browse all success stories
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
