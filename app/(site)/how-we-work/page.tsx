import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal, RevealStagger, RevealItem } from '@/components/reveal'
import { AnimatedCounter } from '@/components/animated-counter'
import { CTABand } from '@/components/cta-band'
import { getSteps, getSiteSettings, getPageContent } from '@/lib/data'
import { section } from '@/lib/utils'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('how-we-work')
  return {
    title: page?.metaTitle ?? 'How We Work',
    description: page?.metaDescription ?? 'Discover EduCoach\'s 8-step counselling process — from psychometric discovery to departure, every step is guided by a dedicated counsellor.',
  }
}

export default async function HowWeWorkPage() {
  const [steps, settings, page] = await Promise.all([
    getSteps(),
    getSiteSettings(),
    getPageContent('how-we-work'),
  ])
  const s = (key: string) => section(page?.sections, key)

  return (
    <>
      <PageHero
        eyebrow={page?.heroEyebrow ?? 'How We Work'}
        title={page?.heroTitle ?? 'A clear, guided journey to your dream offer'}
        description={page?.heroDescription ?? 'Eight considered steps. One dedicated counsellor. Zero guesswork.'}
        crumbs={[{ label: 'How We Work' }]}
      />

      {/* Stats bar */}
      <section className="border-b border-border bg-secondary/40 py-14">
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

      {/* Steps timeline */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow={s('process').eyebrow ?? 'The Process'}
            title={s('process').title ?? 'From discovery to departure'}
            description={s('process').description ?? 'Each step builds on the last. Your counsellor stays with you throughout.'}
          />

          <div className="relative mx-auto mt-16 max-w-4xl">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 hidden w-px bg-border md:left-1/2 md:block" aria-hidden="true" />

            <div className="space-y-12">
              {steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.06}>
                  <div className={`relative grid gap-6 md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? '' : 'md:[direction:rtl]'}`}>
                    {/* Number badge */}
                    <div className="absolute left-0 top-0 z-10 hidden md:left-1/2 md:block md:-translate-x-1/2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-primary font-display text-lg font-bold text-primary-foreground">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Content card */}
                    <div className={`rounded-3xl border border-border bg-card p-6 md:p-8 ${i % 2 === 0 ? 'md:text-right' : 'md:[direction:ltr]'}`}>
                      <div className="flex items-center gap-3 md:hidden">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-heading text-xl font-bold text-foreground">{step.title}</h3>
                      </div>
                      <h3 className="hidden font-heading text-xl font-bold text-foreground md:block">{step.title}</h3>
                      <p className="mt-2 text-sm font-medium text-primary">{step.shortDesc}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.longDesc}</p>
                    </div>

                    {/* Empty spacer for alternating layout */}
                    <div className="hidden md:block" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title={page?.ctaTitle ?? 'Ready to start step one?'}
        subtitle={page?.ctaSubtitle ?? "Book a free assessment and we'll map your personalised journey."}
      />
    </>
  )
}
