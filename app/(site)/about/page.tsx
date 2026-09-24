import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal, RevealStagger, RevealItem } from '@/components/reveal'
import { AnimatedCounter } from '@/components/animated-counter'
import { CTABand } from '@/components/cta-band'
import { StoryTimeline } from '@/components/story-timeline'
import { getSiteSettings, getTeamMembers } from '@/lib/data'
import { MapPin } from 'lucide-react'
import { CtaButton } from '@/components/cta-button'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about EduCoach Services — our mission, story, values, and the team behind 2,500+ successful study-abroad journeys since 2013.',
}

export default async function AboutPage() {
  const settings = await getSiteSettings()
  const experts = await getTeamMembers()

  return (
    <>
      <PageHero
        eyebrow="About EduCoach"
        title="Guiding students to the world's best universities since 2013"
        description="We combine psychometric science, deep expertise and genuine care to help every student find the right university, build the right profile, and secure the right offer."
        crumbs={[{ label: 'About' }]}
      />

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="rounded-3xl border border-border bg-card p-5 md:p-8">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  Our Mission
                </span>
                <p className="mt-4 text-lg leading-relaxed text-foreground">{settings.mission}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border bg-card p-5 md:p-8">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  Our Vision
                </span>
                <p className="mt-4 text-lg leading-relaxed text-foreground">{settings.vision}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary/40 py-14">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 px-4 md:gap-10 md:justify-between">
          {settings.stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl font-bold text-primary md:text-5xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story — Timeline */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Our Journey"
            title="From a small office to India's trusted counselling partner"
            description="A decade of guiding students to the world's best universities."
          />
          <div className="mt-14">
            <StoryTimeline />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Our Values"
            title="What we stand for"
            description="These principles guide every interaction, recommendation and decision at EduCoach."
          />
          <RevealStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {settings.values.map((v) => (
              <RevealItem key={v.title}>
                <div className="h-full rounded-3xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Our Team"
            title="Led by experts who've done this thousands of times"
            description="Seasoned mentors with deep, country-specific expertise and a genuine care for outcomes."
          />
          <RevealStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {experts.map((e) => (
              <RevealItem key={e.name}>
                <div className="group h-full overflow-hidden rounded-3xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-navy font-display text-2xl font-bold text-primary-foreground">
                    {e.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
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
                  <CtaButton href="/book-assessment" variant="outline" className="mt-5 w-full">
                    Book Session
                  </CtaButton>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
          <div className="mt-10 text-center">
            <CtaButton href="/team" variant="outline" size="lg">
              Meet the full team
            </CtaButton>
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to begin? Book your assessment today."
        subtitle="A free, no-obligation session with a senior counsellor to map your study-abroad journey."
      />
    </>
  )
}
