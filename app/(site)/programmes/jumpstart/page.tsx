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
  const p = await getProgramme('jumpstart')
  return {
    title: p?.metaTitle ?? 'JumpStart — Early Career Discovery for Class 8–10',
    description: p?.metaDescription,
  }
}

export default async function JumpStartPage() {
  const p = await getProgramme('jumpstart')
  const s = (key: string) => section(p?.sections, key)
  const overview = s('overview')
  const idealFor = s('ideal-for')

  return (
    <>
      <PageHero
        eyebrow={p?.heroEyebrow ?? 'JumpStart Programme'}
        title={p?.heroTitle ?? 'Start early, aim high'}
        description={p?.heroDescription}
        crumbs={p?.crumbs ?? [{ label: 'Programmes', href: '/services' }, { label: 'JumpStart' }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow={overview.eyebrow}
              title={overview.title ?? 'The head start that matters'}
              description={overview.description}
              align="left"
            />
            <div className="mt-8">
              <CtaButton href="/book-assessment" variant="gold">
                {p?.ctaLabel ?? 'Enrol in JumpStart'}
              </CtaButton>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="font-heading text-lg font-bold text-foreground">What&apos;s included</h3>
              <ul className="mt-5 space-y-4">
                {(p?.benefits ?? []).map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <SectionHeading
            eyebrow={idealFor.eyebrow}
            title={idealFor.title ?? 'Is JumpStart right for your child?'}
          />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {(p?.cards ?? []).map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
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
