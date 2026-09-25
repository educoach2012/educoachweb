import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { Icon } from '@/components/icon'
import { CtaButton } from '@/components/cta-button'
import { CTABand } from '@/components/cta-band'
import { getServices } from '@/lib/data'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Explore EduCoach\'s full range of study-abroad services — career counselling, profile building, admissions, test prep, scholarships and visa support.',
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="One partner for the entire journey"
        description="Every service is designed to move you closer to the right offer — and a future you're excited about."
        crumbs={[{ label: 'Services' }]}
      />

      <div className="divide-y divide-border">
        {services.map((s, i) => (
          <section
            key={s.serviceId}
            id={s.serviceId}
            className={i % 2 === 1 ? 'bg-secondary/40' : ''}
          >
            <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
              <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
                <Reveal>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold-foreground">
                    <Icon name={s.icon} className="h-7 w-7" />
                  </div>
                  <h2 className="mt-5 font-heading text-2xl font-bold text-foreground md:text-3xl">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {s.shortDesc}
                  </p>
                  <CtaButton href="/book-assessment" variant="gold" className="mt-6">
                    Book Free Assessment
                  </CtaButton>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {s.longDesc}
                  </p>
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

      <CTABand />
    </>
  )
}
