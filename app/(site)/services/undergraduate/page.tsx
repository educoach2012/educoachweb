import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal, RevealStagger, RevealItem } from '@/components/reveal'
import { CTABand } from '@/components/cta-band'
import { CtaButton } from '@/components/cta-button'
import { getProgramme } from '@/lib/data'
import { section } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const p = await getProgramme('undergraduate')
  return {
    title: p?.metaTitle ?? 'Undergraduate Admissions — Study Abroad for Class 11 & 12',
    description: p?.metaDescription,
  }
}

export default async function UndergraduatePage() {
  const p = await getProgramme('undergraduate')
  const s = (key: string) => section(p?.sections, key)
  const whatWeDo = s('what-we-do')
  const timeline = s('timeline')

  return (
    <>
      <PageHero
        eyebrow={p?.heroEyebrow ?? 'Undergraduate'}
        title={p?.heroTitle ?? "Your path to the world's best universities"}
        description={p?.heroDescription}
        crumbs={p?.crumbs ?? [{ label: 'Services', href: '/services' }, { label: 'Undergraduate' }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow={whatWeDo.eyebrow}
          title={whatWeDo.title ?? 'End-to-end UG admissions support'}
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
            eyebrow={timeline.eyebrow}
            title={timeline.title ?? 'When to start, what to do'}
            description={timeline.description}
          />
          <div className="relative mt-14 mx-auto max-w-2xl">
            {(p?.timeline ?? []).map((item, i) => (
              <Reveal key={item.date} delay={i * 0.05}>
                <div className="flex gap-6 pb-8">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-card text-xs font-bold text-gold">
                      {i + 1}
                    </div>
                    {i < (p?.timeline?.length ?? 0) - 1 && <div className="w-px flex-1 bg-border" />}
                  </div>
                  <div className="pb-4">
                    <p className="font-heading text-sm font-bold text-primary">{item.date}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 text-center">
            <CtaButton href="/book-assessment" variant="gold">
              {p?.ctaLabel ?? 'Start Your UG Journey'}
            </CtaButton>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
