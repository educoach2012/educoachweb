'use client'

import { useState } from 'react'
import { RevealStagger, RevealItem } from '@/components/reveal'
import { GraduationCap, MapPin } from 'lucide-react'

type University = { name: string; countryName: string; ranking: string; type: string; city: string }

export function UniversitiesGrid({ universities }: { universities: University[] }) {
  const [filter, setFilter] = useState<string | null>(null)

  const allCountries = Array.from(new Set(universities.map((u) => u.countryName)))
  const filtered = filter ? universities.filter((u) => u.countryName === filter) : universities

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
        <p className="mt-10 text-center text-muted-foreground">No universities found for this country.</p>
      )}
      <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" key={filter ?? 'all'}>
        {filtered.map((u) => (
          <RevealItem key={u.name}>
            <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{u.name}</h3>
              <p className="mt-1 text-sm text-primary">{u.ranking}</p>
              <div className="mt-auto pt-4 space-y-1 text-sm text-muted-foreground">
                <p className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-gold" /> {u.city}
                </p>
                <p>{u.countryName} · {u.type}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
    </>
  )
}
