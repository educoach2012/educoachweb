import Link from 'next/link'
import { Calendar, MapPin, Ticket } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { RevealStagger, RevealItem } from '@/components/reveal'
import { CtaButton } from '@/components/cta-button'

interface EventsSectionProps {
  events: { title: string; date: string; city: string; mode: string; spots: string }[]
  sectionTitle?: string
  sectionDescription?: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function EventsSection({ events, sectionTitle, sectionDescription }: EventsSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:py-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          align="left"
          eyebrow="Upcoming events"
          title={sectionTitle ?? 'Free masterclasses & workshops'}
          description={sectionDescription ?? 'Join our live sessions on admissions, scholarships and country-specific strategies.'}
        />
        <CtaButton href="/events" variant="outline" className="shrink-0">
          View all events
        </CtaButton>
      </div>

      <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((e) => (
          <RevealItem key={e.title}>
            <div className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
              <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {e.mode}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{e.title}</h3>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gold" /> {formatDate(e.date)}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gold" /> {e.city}
                </p>
                <p className="flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-gold" /> {e.spots}
                </p>
              </div>
              <CtaButton href="/events" variant="gold" className="mt-6 w-full">
                Reserve Seat
              </CtaButton>
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  )
}
