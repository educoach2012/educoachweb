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
  const p = await getProgramme('career-pivot')
  return {
    title: p?.metaTitle ?? 'Career Pivot — Masters & MBA for Working Professionals',
    description: p?.metaDescription,
  }
}

export default async function CareerPivotPage() {
  const p = await getProgramme('career-pivot')
  const s = (key: string) => section(p?.sections, key)
  const who = s('who')
  const programme = s('programme')

  return (
    <>
      <PageHero
        eyebrow={p?.heroEyebrow ?? 'Career Pivot Programme'}
        title={p?.heroTitle ?? 'Your next chapter starts with the right programme'}
        description={p?.heroDescription}
        crumbs={p?.crumbs ?? [{ label: 'Programmes', href: '/services' }, { label: 'Career Pivot' }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow={who.eyebrow}
          title={who.title ?? 'Ready for the next chapter?'}
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {(p?.cards ?? []).map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow={programme.eyebrow}
                title={programme.title ?? "What's included"}
                description={programme.description}
                align="left"
              />
              <div className="mt-8">
                <CtaButton href="/book-assessment" variant="gold">
                  {p?.ctaLabel ?? 'Start Your Pivot'}
                </CtaButton>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-4">
                {(p?.benefits ?? []).map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
