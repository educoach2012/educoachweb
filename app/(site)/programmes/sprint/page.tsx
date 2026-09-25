import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CTABand } from '@/components/cta-band'
import { CtaButton } from '@/components/cta-button'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sprint — Intensive Admissions for Class 11–12',
  description:
    'EduCoach Sprint is an intensive admissions programme for Class 11–12 students applying to top universities — covering test prep, essays, applications and scholarships.',
}

const phases = [
  { title: 'Phase 1 — Assess & Align (Month 1)', items: ['Psychometric assessment & career mapping', 'University shortlist (reach, match, safety)', 'Test prep schedule locked (SAT/IELTS/TOEFL)', 'Family budget and scholarship planning'] },
  { title: 'Phase 2 — Build & Prepare (Months 2–6)', items: ['Profile-building sprints (projects, internships, competitions)', 'Standardised test completion and score review', 'Essay brainstorming and first drafts', 'LOR briefing with recommenders'] },
  { title: 'Phase 3 — Apply & Win (Months 7–12)', items: ['Application submissions (EA/ED + Regular)', 'Interview coaching and mock sessions', 'Scholarship applications filed', 'Offer evaluation, visa, and pre-departure'] },
]

export default function SprintPage() {
  return (
    <>
      <PageHero
        eyebrow="Sprint Programme"
        title="12 months to your dream university"
        description="An intensive, structured programme for Class 11 and 12 students who are ready to commit to a world-class application."
        crumbs={[
          { label: 'Programmes', href: '/services' },
          { label: 'Sprint' },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow="The Plan"
          title="Three phases, twelve months"
          description="Sprint compresses our full methodology into an intensive 12-month programme — every week has a purpose, every milestone has a deadline."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {phases.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <h3 className="font-heading text-base font-bold text-foreground">{p.title}</h3>
                <ul className="mt-4 flex-1 space-y-3">
                  {p.items.map((item) => (
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
            Join the Sprint
          </CtaButton>
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <SectionHeading
            eyebrow="Results"
            title="What Sprint students achieve"
          />
          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {[
              { value: '92%', label: 'placed in top-100 universities' },
              { value: '₹12Cr+', label: 'scholarships secured in 2024–25' },
              { value: '4.2', label: 'average offers per student' },
              { value: '100%', label: 'visa approval rate' },
            ].map((stat, i) => (
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
