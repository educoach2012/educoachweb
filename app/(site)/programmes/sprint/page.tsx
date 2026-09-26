import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CTABand } from '@/components/cta-band'
import { CtaButton } from '@/components/cta-button'
import { Check } from 'lucide-react'
import { getProgramme } from '@/lib/data'
import { section } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const p = await getProgramme('sprint')
  return {
    title: p?.metaTitle ?? 'Sprint — Intensive Admissions for Class 11–12',
    description: p?.metaDescription,
  }
}

export default async function SprintPage() {
  const p = await getProgramme('sprint')
  const s = (key: string) => section(p?.sections, key)
  const plan = s('plan')
  const results = s('results')

  return (
    <>
      <PageHero
        eyebrow={p?.heroEyebrow ?? 'Sprint Programme'}
        title={p?.heroTitle ?? '12 months to your dream university'}
        description={p?.heroDescription}
        crumbs={p?.crumbs ?? [{ label: 'Programmes', href: '/services' }, { label: 'Sprint' }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow={plan.eyebrow}
          title={plan.title ?? 'Three phases, twelve months'}
          description={plan.description}
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {(p?.phases ?? []).map((phase, i) => (
            <Reveal key={phase.title} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <h3 className="font-heading text-base font-bold text-foreground">{phase.title}</h3>
                <ul className="mt-4 flex-1 space-y-3">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <CtaButton href="/book-assessment" variant="gold">
            {p?.ctaLabel ?? 'Join the Sprint'}
          </CtaButton>
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <SectionHeading
            eyebrow={results.eyebrow}
            title={results.title ?? 'What Sprint students achieve'}
          />
          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {(p?.stats ?? []).map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.05}>
                <div className="text-center">
                  <p className="font-heading text-3xl font-bold text-gold-foreground">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
