import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { RevealStagger, RevealItem } from '@/components/reveal'
import { CtaButton } from '@/components/cta-button'
import { CTABand } from '@/components/cta-band'
import { getEvents, getPageContent } from '@/lib/data'
import { section } from '@/lib/utils'
import { Calendar, MapPin, Ticket } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('events')
  return {
    title: page?.metaTitle ?? 'Events',
    description: page?.metaDescription ?? 'Join EduCoach\'s free masterclasses, workshops and webinars on admissions, scholarships and country-specific strategies.',
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function isUpcoming(iso: string) {
  return new Date(iso) >= new Date()
}

export default async function EventsPage() {
  const [events, page] = await Promise.all([
    getEvents(),
    getPageContent('events'),
  ])
  const s = (key: string) => section(page?.sections, key)
  const upcoming = events.filter((e) => isUpcoming(e.date))
  const past = events.filter((e) => !isUpcoming(e.date))

  const eventsJsonLd = {
    '@context': 'https://schema.org',
    '@graph': upcoming.map((e) => ({
      '@type': 'Event',
      name: e.title,
      startDate: e.date,
      location: { '@type': 'Place', name: e.city },
      eventAttendanceMode: e.mode === 'Online'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',
      organizer: { '@type': 'Organization', name: 'EduCoach Services', url: 'https://educoach.in' },
    })),
  }

  return (
    <>
      {upcoming.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd).replace(/</g, '\\u003c') }}
        />
      )}
      <PageHero
        eyebrow={page?.heroEyebrow ?? 'Events'}
        title={page?.heroTitle ?? 'Free masterclasses & workshops'}
        description={page?.heroDescription ?? 'Join our live sessions on admissions, scholarships and country-specific strategies. All sessions are free.'}
        crumbs={[{ label: 'Events' }]}
      />

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading
              eyebrow={s('upcoming').eyebrow ?? 'Upcoming'}
              title={s('upcoming').title ?? 'Register for an upcoming session'}
              description={s('upcoming').description ?? 'Limited seats — reserve yours today.'}
            />
            <RevealStagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((e) => (
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
                    <CtaButton href="/book-assessment" variant="gold" className="mt-6 w-full">
                      Reserve Seat
                    </CtaButton>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>
      )}

      {/* Past events */}
      {past.length > 0 && (
        <section className="border-t border-border bg-secondary/40 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading
              eyebrow={s('past').eyebrow ?? 'Past Events'}
              title={s('past').title ?? 'Previous sessions'}
              description={s('past').description ?? 'Missed these? Follow us to catch the next one.'}
            />
            <RevealStagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {past.map((e) => (
                <RevealItem key={e.title}>
                  <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 opacity-75">
                    <span className="inline-flex w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                      {e.mode}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{e.title}</h3>
                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> {formatDate(e.date)}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> {e.city}
                      </p>
                    </div>
                    <p className="mt-auto pt-6 text-sm font-medium text-muted-foreground">Event completed</p>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>
      )}

      {/* No events fallback */}
      {upcoming.length === 0 && past.length === 0 && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <p className="text-lg text-muted-foreground">No events scheduled right now. Check back soon or follow us for updates.</p>
          </div>
        </section>
      )}

      <CTABand
        title={page?.ctaTitle ?? "Can't attend an event? Book a 1-on-1 instead."}
        subtitle={page?.ctaSubtitle ?? 'Get personalised guidance from a senior counsellor — at a time that suits you.'}
      />
    </>
  )
}
