'use client'

import { useState } from 'react'
import { RevealStagger, RevealItem } from '@/components/reveal'
import { GraduationCap, MapPin, Quote } from 'lucide-react'

type Story = { name: string; university: string; countryName: string; course: string; scholarship: string; year: number; quote: string }

export function StoriesGrid({ stories }: { stories: Story[] }) {
  const [filter, setFilter] = useState<string | null>(null)

  const allCountries = Array.from(new Set(stories.map((s) => s.countryName)))
  const filtered = filter ? stories.filter((s) => s.countryName === filter) : stories

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilter(null)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            filter === null
              ? 'bg-primary text-primary-foreground'
              : 'border border-border bg-card text-foreground hover:bg-secondary'
          }`}
        >
          All
        </button>
        {allCountries.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === c
                ? 'bg-primary text-primary-foreground'
                : 'border border-border bg-card text-foreground hover:bg-secondary'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">No stories found for this country.</p>
      )}
      <RevealStagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" key={filter ?? 'all'}>
        {filtered.map((s) => (
          <RevealItem key={s.name}>
            <article className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
              <Quote className="h-8 w-8 text-gold/40" />
              <p className="mt-4 flex-1 text-pretty text-base leading-relaxed text-foreground">
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
          </RevealItem>
        ))}
      </RevealStagger>
    </>
  )
}
