import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { RevealStagger, RevealItem } from '@/components/reveal'

interface DestinationsProps {
  countries: { slug: string; flag: string; name: string; tagline: string; universityCount: number | string }[]
}

export function Destinations({ countries }: DestinationsProps) {
  return (
    <section className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Study destinations"
          title="Choose your country. We'll handle the rest."
          description="Deep expertise across every major study-abroad destination and top universities within each."
        />

        <RevealStagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {countries.map((c) => (
            <RevealItem key={c.slug}>
              <Link
                href={`/countries/${c.slug}`}
                className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="text-4xl" aria-hidden="true">{c.flag}</span>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{c.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.tagline}</p>
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-primary">
                  {c.universityCount} universities
                </p>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
