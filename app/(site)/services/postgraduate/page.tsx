import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal, RevealStagger, RevealItem } from '@/components/reveal'
import { CTABand } from '@/components/cta-band'
import { CtaButton } from '@/components/cta-button'
import { getProgramme } from '@/lib/data'
import { section } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const p = await getProgramme('postgraduate')
  return {
    title: p?.metaTitle ?? 'Postgraduate Admissions — Masters, MBA & PhD',
    description: p?.metaDescription,
  }
}

export default async function PostgraduatePage() {
  const p = await getProgramme('postgraduate')
  const s = (key: string) => section(p?.sections, key)
  const whatWeDo = s('what-we-do')
  const levels = s('levels')

  return (
    <>
      <PageHero
        eyebrow={p?.heroEyebrow ?? 'Postgraduate'}
        title={p?.heroTitle ?? 'Advance your career with the right programme'}
        description={p?.heroDescription}
        crumbs={p?.crumbs ?? [{ label: 'Services', href: '/services' }, { label: 'Postgraduate' }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow={whatWeDo.eyebrow}
          title={whatWeDo.title ?? 'Precision PG admissions support'}
          description={whatWeDo.description}
        />
        <RevealStagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(p?.cards ?? []).map((item) => (
            <RevealItem key={item.title}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <SectionHeading
            eyebrow={levels.eyebrow}
            title={levels.title ?? 'Masters vs MBA vs PhD'}
            description={levels.description}
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {(p?.levels ?? []).map((level, i) => (
              <Reveal key={level.title} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground">{level.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{level.desc}</p>
                  <div className="mt-4 space-y-1 text-xs text-muted-foreground">
                    <p><span className="font-semibold text-foreground">Duration:</span> {level.duration}</p>
                    <p><span className="font-semibold text-foreground">Top countries:</span> {level.countries}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CtaButton href="/book-assessment" variant="gold">
              {p?.ctaLabel ?? 'Plan Your PG Journey'}
            </CtaButton>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
