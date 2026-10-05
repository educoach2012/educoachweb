import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { RevealStagger, RevealItem } from '@/components/reveal'
import type { SanityImageRef } from '@/lib/types'
import { urlFor } from '@/sanity/lib/image'

interface ExpertsProps {
  experts: { name: string; role: string; experience: string; specialisation: string; countries: string; photo?: SanityImageRef }[]
  title?: string
  description?: string
}

export function Experts({ experts, title, description }: ExpertsProps) {
  return (
    <section className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Meet our experts"
          title={title ?? "Counsellors who've done this thousands of times"}
          description={description ?? 'Seasoned mentors with deep, country-specific expertise and a genuine care for outcomes.'}
        />

        <RevealStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {experts.map((e) => (
            <RevealItem key={e.name}>
              <div className="group h-full overflow-hidden rounded-3xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
                  {e.photo?.asset?._ref ? (
                    <Image
                      src={urlFor(e.photo).width(160).height(160).url()}
                      alt={e.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-navy font-display text-2xl font-bold text-primary-foreground">
                      {e.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{e.name}</h3>
                <p className="text-sm text-primary">{e.role}</p>
                <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                  <p>{e.experience} experience</p>
                  <p>{e.specialisation}</p>
                  <p className="flex items-center justify-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-gold" /> {e.countries}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
