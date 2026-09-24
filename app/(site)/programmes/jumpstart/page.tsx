import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CTABand } from '@/components/cta-band'
import { CtaButton } from '@/components/cta-button'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'JumpStart — Early Career Discovery for Class 8–10',
  description:
    'EduCoach JumpStart helps Class 8–10 students discover their strengths early through psychometric assessment, interest exploration, and structured profile building.',
}

const benefits = [
  'Psychometric assessment tailored for younger students',
  'Interest exploration across 12+ career clusters',
  'Early extracurricular roadmap (competitions, projects, clubs)',
  'Subject selection guidance for Class 11 streams',
  'Parent alignment session on expectations and pathways',
  'Annual check-ins to track growth and adapt the plan',
]

export default function JumpStartPage() {
  return (
    <>
      <PageHero
        eyebrow="JumpStart Programme"
        title="Start early, aim high"
        description="For Class 8–10 students who want to build a strong foundation before the application race begins."
        crumbs={[
          { label: 'Programmes', href: '/services' },
          { label: 'JumpStart' },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Ages 13–16"
              title="The head start that matters"
              description="The strongest university applications are built over years of intentional effort. JumpStart gives students a structured start — identifying their strengths, sparking curiosity, and building a profile before the pressure of Class 11 begins."
              align="left"
            />
            <div className="mt-8">
              <CtaButton href="/book-assessment" variant="gold">
                Enrol in JumpStart
              </CtaButton>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="font-heading text-lg font-bold text-foreground">What&apos;s included</h3>
              <ul className="mt-5 space-y-4">
                {benefits.map((b) => (
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
            eyebrow="Ideal For"
            title="Is JumpStart right for your child?"
          />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { title: 'The Explorer', desc: 'A curious student who hasn\'t decided their path yet — JumpStart helps them discover what excites them through structured exploration.' },
              { title: 'The Achiever', desc: 'A high-performing student who wants to channel their energy into the right extracurriculars and competitions from an early age.' },
              { title: 'The Planner Family', desc: 'Parents who want to give their child every advantage — starting early with a roadmap that builds toward strong university applications.' },
            ].map((item, i) => (
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
