import Link from 'next/link'
import { ArrowUpRight, Calendar, MapPin, Ticket, Check } from 'lucide-react'
import { RevealStagger, RevealItem, Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { CtaButton } from '@/components/cta-button'
import { Icon } from '@/components/icon'
import { RichText } from '@/components/rich-text'
import { StoriesGrid } from '@/components/stories-grid'
import { BlogsGrid } from '@/components/blogs-grid'
import { UniversitiesGrid } from '@/components/universities-grid'
import { TeamGrid } from '@/components/team-modal'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type {
  Country,
  Service,
  Blog,
  SuccessStory,
  Event,
  University,
  Resource,
  Acceptance,
  CaseStudy,
  TeamMember,
  Step,
  PageContent,
  DynamicItem,
} from '@/lib/types'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function CountriesLayout({ items }: { items: Country[] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((c) => (
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

function ServicesLayout({ items }: { items: Service[] }) {
  return (
    <div className="divide-y divide-border">
      {items.map((s, i) => (
        <section key={s.serviceId} className={i % 2 === 1 ? 'bg-secondary/40' : ''}>
          <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
              <Reveal>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold-foreground">
                  <Icon name={s.icon} className="h-7 w-7" />
                </div>
                <h2 className="mt-5 font-heading text-2xl font-bold text-foreground md:text-3xl">{s.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.shortDesc}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-base leading-relaxed text-muted-foreground">{s.longDesc}</p>
                <ul className="mt-6 space-y-3">
                  {s.features?.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

function EventsLayout({ items }: { items: Event[] }) {
  const now = new Date()
  const upcoming = items.filter((e) => new Date(e.date) >= now)
  const past = items.filter((e) => new Date(e.date) < now)

  return (
    <>
      {upcoming.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading eyebrow="Upcoming" title="Register for an upcoming session" />
            <RevealStagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((e) => (
                <RevealItem key={e.title}>
                  <div className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                    <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{e.mode}</span>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{e.title}</h3>
                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gold" /> {formatDate(e.date)}</p>
                      <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> {e.city}</p>
                      <p className="flex items-center gap-2"><Ticket className="h-4 w-4 text-gold" /> {e.spots}</p>
                    </div>
                    <CtaButton href="/book-assessment" variant="gold" className="mt-6 w-full">Reserve Seat</CtaButton>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>
      )}
      {past.length > 0 && (
        <section className="border-t border-border bg-secondary/40 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading eyebrow="Past Events" title="Previous sessions" />
            <RevealStagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {past.map((e) => (
                <RevealItem key={e.title}>
                  <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 opacity-75">
                    <span className="inline-flex w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">{e.mode}</span>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{e.title}</h3>
                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {formatDate(e.date)}</p>
                      <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {e.city}</p>
                    </div>
                    <p className="mt-auto pt-6 text-sm font-medium text-muted-foreground">Event completed</p>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>
      )}
      {items.length === 0 && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <p className="text-lg text-muted-foreground">No events scheduled right now. Check back soon.</p>
          </div>
        </section>
      )}
    </>
  )
}

function ResourcesLayout({ items }: { items: Resource[] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <RevealItem key={r.title}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                {r.type && (
                  <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{r.type}</span>
                )}
                <h3 className="mt-4 text-lg font-semibold text-foreground">{r.title}</h3>
                {r.description && (
                  <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
                )}
                {r.url && (
                  <a href={r.url} target="_blank" rel="noreferrer" className="mt-auto pt-4 text-sm font-semibold text-primary hover:underline">
                    Download →
                  </a>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}

function AcceptancesLayout({ items }: { items: Acceptance[] }) {
  const years = [...new Set(items.map((a) => a.year))].sort((a, b) => Number(b) - Number(a))
  return (
    <>
      {years.map((year) => (
        <section key={year} className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">{year}</h2>
            <RevealStagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {items.filter((a) => a.year === year).map((a) => (
                <RevealItem key={`${a.studentName}-${a.university}`}>
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="font-semibold text-foreground">{a.studentName}</p>
                    <p className="mt-1 text-sm text-primary">{a.university}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{a.course} — {a.level}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>
      ))}
    </>
  )
}

function CaseStudiesLayout({ items }: { items: CaseStudy[] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 space-y-12">
        {items.map((cs) => (
          <Reveal key={cs.title}>
            <div className="grid gap-8 rounded-3xl border border-border bg-card p-8 lg:grid-cols-2">
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">{cs.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{cs.studentName} — {cs.university}</p>
                <div className="mt-6 space-y-4">
                  {cs.challenge && <div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Challenge</p><p className="mt-1 text-sm text-muted-foreground">{cs.challenge}</p></div>}
                  {cs.approach && <div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Approach</p><p className="mt-1 text-sm text-muted-foreground">{cs.approach}</p></div>}
                </div>
              </div>
              <div>
                {cs.outcome && <div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Outcome</p><p className="mt-1 text-sm text-muted-foreground">{cs.outcome}</p></div>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function StepsLayout({ items }: { items: Step[] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="relative space-y-0">
          <div className="absolute left-6 top-0 h-full w-0.5 bg-border" aria-hidden="true" />
          {items.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05}>
              <div className="relative flex gap-6 pb-12 last:pb-0">
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-card text-lg font-bold text-primary">
                  {i + 1}
                </div>
                <div className="pt-1.5">
                  <h3 className="font-heading text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.shortDesc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContentLayout({ page }: { page: PageContent }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        {page.richBody && page.richBody.length > 0 ? (
          <Reveal>
            <RichText value={page.richBody} />
          </Reveal>
        ) : page.contentParagraphs && page.contentParagraphs.length > 0 ? (
          <Reveal>
            <div className="space-y-4">
              {page.contentParagraphs.map((p, i) => (
                <p key={i} className="leading-relaxed text-muted-foreground">{p}</p>
              ))}
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}

function DynamicItemsGrid({ items, layout }: { items: DynamicItem[]; layout: string }) {
  const cols = layout === 'team' || layout === 'countries' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <RevealStagger className={`grid gap-5 sm:grid-cols-2 ${cols}`}>
          {items.map((item) => (
            <RevealItem key={item._id}>
              <div className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                {item.image?.asset?._ref && (
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-2xl">
                    <Image
                      src={urlFor(item.image).width(600).height(340).url()}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                {item.badge && (
                  <span className="mb-2 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{item.badge}</span>
                )}
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                {item.subtitle && <p className="mt-1 text-sm text-primary">{item.subtitle}</p>}
                {item.person && <p className="mt-1 text-sm text-muted-foreground">{item.person}</p>}
                {item.organisation && <p className="mt-0.5 text-sm text-muted-foreground">{item.organisation}</p>}
                {item.description && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>}
                {item.quote && <blockquote className="mt-3 border-l-2 border-primary/30 pl-3 text-sm italic text-muted-foreground">&ldquo;{item.quote}&rdquo;</blockquote>}
                {item.date && <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="h-3.5 w-3.5" /> {formatDate(item.date)}</p>}
                {item.location && <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {item.location}</p>}
                {item.stat && <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-primary">{item.stat}</p>}
                {item.features && item.features.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {item.tags.map((t) => (
                      <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">{t}</span>
                    ))}
                  </div>
                )}
                {item.url && (
                  <a href={item.url} target="_blank" rel="noreferrer" className="mt-auto pt-4 text-sm font-semibold text-primary hover:underline">
                    Learn more →
                  </a>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
        {items.length === 0 && (
          <p className="py-12 text-center text-lg text-muted-foreground">No items yet. Add content in Sanity Studio.</p>
        )}
      </div>
    </section>
  )
}

export function DynamicLayout({ layout, items, page }: { layout: string; items: unknown[]; page: PageContent }) {
  if (layout !== 'content' && page.contentSource !== 'existing') {
    return <DynamicItemsGrid items={items as DynamicItem[]} layout={layout} />
  }

  switch (layout) {
    case 'content':
      return <ContentLayout page={page} />
    case 'countries':
      return <CountriesLayout items={items as Country[]} />
    case 'services':
      return <ServicesLayout items={items as Service[]} />
    case 'blog':
      return (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <BlogsGrid blogs={items as Blog[]} />
          </div>
        </section>
      )
    case 'success-stories':
      return (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <StoriesGrid stories={items as SuccessStory[]} />
          </div>
        </section>
      )
    case 'events':
      return <EventsLayout items={items as Event[]} />
    case 'universities':
      return (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <UniversitiesGrid universities={items as University[]} />
          </div>
        </section>
      )
    case 'resources':
      return <ResourcesLayout items={items as Resource[]} />
    case 'acceptances':
      return <AcceptancesLayout items={items as Acceptance[]} />
    case 'case-studies':
      return <CaseStudiesLayout items={items as CaseStudy[]} />
    case 'team':
      return (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <TeamGrid members={items as TeamMember[]} />
          </div>
        </section>
      )
    case 'how-we-work':
      return <StepsLayout items={items as Step[]} />
    default:
      return <ContentLayout page={page} />
  }
}
