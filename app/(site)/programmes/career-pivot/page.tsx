import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CTABand } from '@/components/cta-band'
import { CtaButton } from '@/components/cta-button'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Career Pivot — Masters & MBA for Working Professionals',
  description:
    'EduCoach Career Pivot helps working professionals plan and execute a career change through the right masters or MBA programme abroad.',
}

const forWhom = [
  { title: '2–5 years experience', desc: 'You\'ve started your career but feel stuck. A masters can deepen your expertise or open a new domain entirely.' },
  { title: '5–10 years experience', desc: 'You\'re mid-career and want to accelerate into leadership. An MBA or executive programme can bridge the gap.' },
  { title: 'Career changers', desc: 'You want to switch industries — from engineering to consulting, from medicine to health tech, from teaching to edtech. The right programme makes the pivot credible.' },
]

const included = [
  'Career-direction assessment (psychometric + professional)',
  'Programme shortlisting matched to career goals and ROI',
  'SOP crafting that connects your work experience to your ambition',
  'MBA interview coaching with case study practice',
  'Scholarship and employer sponsorship strategy',
  'Visa and relocation planning',
]

export default function CareerPivotPage() {
  return (
    <>
      <PageHero
        eyebrow="Career Pivot Programme"
        title="Your next chapter starts with the right programme"
        description="For working professionals who want to use a masters or MBA to change direction, accelerate growth, or break into a new industry."
        crumbs={[
          { label: 'Programmes', href: '/services' },
          { label: 'Career Pivot' },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow="Who It's For"
          title="Ready for the next chapter?"
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {forWhom.map((item, i) => (
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
                eyebrow="The Programme"
                title="What's included"
                description="Career Pivot combines career assessment, programme strategy, and application execution — tailored for professionals who can't afford to take a shot in the dark."
                align="left"
              />
              <div className="mt-8">
                <CtaButton href="/book-assessment" variant="gold">
                  Start Your Pivot
                </CtaButton>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-4">
                {included.map((item) => (
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
