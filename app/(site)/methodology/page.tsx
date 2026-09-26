import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CTABand } from '@/components/cta-band'
import { getPageContent } from '@/lib/data'
import { section } from '@/lib/utils'
import { Icon } from '@/components/icon'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('methodology')
  return {
    title: page?.metaTitle ?? 'Our Methodology — Psycho-Aptitude Analysis',
    description: page?.metaDescription,
  }
}

export default async function MethodologyPage() {
  const page = await getPageContent('methodology')
  const s = (key: string) => section(page?.sections, key)
  const framework = s('framework')
  const whyItWorks = s('why-it-works')

  return (
    <>
      <PageHero
        eyebrow={page?.heroEyebrow ?? 'Methodology'}
        title={page?.heroTitle ?? 'Psycho-Aptitude Analysis'}
        description={page?.heroDescription}
        crumbs={[{ label: 'Methodology' }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow={framework.eyebrow}
          title={framework.title ?? 'Six pillars of clarity'}
          description={framework.description}
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(page?.items ?? []).map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold-foreground">
                  <Icon name={p.icon ?? 'Lightbulb'} className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                {p.detail && <p className="mt-3 text-xs text-muted-foreground/70">{p.detail}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <SectionHeading
            eyebrow={whyItWorks.eyebrow}
            title={whyItWorks.title ?? 'Science over guesswork'}
            description={whyItWorks.description}
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-border bg-card p-8">
                <h3 className="font-heading text-xl font-bold text-foreground">{page?.listTitle ?? 'The typical approach'}</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {(page?.listItems ?? []).map((item) => (
                    <li key={item} className="flex items-start gap-2"><span className="text-destructive">✕</span> {item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border-2 border-gold bg-card p-8">
                <h3 className="font-heading text-xl font-bold text-foreground">{page?.listTitle2 ?? 'The EduCoach approach'}</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {(page?.listItems2 ?? []).map((item) => (
                    <li key={item} className="flex items-start gap-2"><span className="text-primary">✓</span> {item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
