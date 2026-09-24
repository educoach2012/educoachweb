import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CTABand } from '@/components/cta-band'
import { CtaButton } from '@/components/cta-button'
import { Check, GraduationCap, FileText, Mic, Award, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Undergraduate Admissions — Study Abroad for Class 11 & 12',
  description:
    'End-to-end undergraduate admissions support for Class 11 and 12 students — university shortlisting, Common App, UCAS, essays, interviews and scholarships.',
}

const services = [
  {
    icon: GraduationCap,
    title: 'University Shortlisting',
    desc: 'We build a balanced list of reach, match, and safety universities across countries — based on your profile, budget, and career goals. No commission-driven recommendations.',
  },
  {
    icon: FileText,
    title: 'Application Management',
    desc: 'Common App, UCAS, coalition applications, and country-specific portals — we manage timelines, requirements, and submissions so nothing falls through.',
  },
  {
    icon: Mic,
    title: 'Essay & Interview Prep',
    desc: 'Your personal statement and supplemental essays are the heart of your application. We brainstorm, draft, and refine until your authentic voice shines. Mock interviews prepare you for the real thing.',
  },
  {
    icon: Award,
    title: 'Scholarship Strategy',
    desc: 'We identify merit and need-based scholarships you qualify for and help you craft winning applications — maximising your financial aid across all offers.',
  },
  {
    icon: Globe,
    title: 'Multi-Country Applications',
    desc: 'Applying to the UK and US simultaneously? We manage the different timelines, formats, and strategies so you can pursue the best options in parallel.',
  },
]

const timeline = [
  { when: 'Class 9–10', what: 'Discovery & profile building — psychometric assessment, interest mapping, early extracurricular development' },
  { when: 'Class 11 (Start)', what: 'Standardised test prep begins (SAT/ACT, IELTS/TOEFL). Deepen extracurriculars, start research or passion projects' },
  { when: 'Class 11 (End)', what: 'University shortlist finalised. Summer internships, competitions, and leadership activities' },
  { when: 'Class 12 (Jul–Sep)', what: 'Essays drafted and refined. Early Decision/Early Action applications submitted' },
  { when: 'Class 12 (Oct–Jan)', what: 'Regular Decision applications submitted. UCAS deadline met. Interview preparation' },
  { when: 'Class 12 (Mar–May)', what: 'Offers evaluated. Scholarship negotiations. Visa process begins' },
]

export default function UndergraduatePage() {
  return (
    <>
      <PageHero
        eyebrow="Undergraduate Admissions"
        title="Your path to the world's best universities"
        description="From Class 9 planning to offer-day celebrations — structured, personalised support for undergraduate applications across 30+ countries."
        crumbs={[
          { label: 'Services', href: '/services' },
          { label: 'Undergraduate' },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow="What We Do"
          title="End-to-end UG admissions support"
          description="Every element of your application — from the first brainstorm to the final acceptance — is guided by a dedicated counsellor who knows what top universities look for."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <SectionHeading
            eyebrow="The Timeline"
            title="When to start, what to do"
            description="The strongest applications are built over years, not weeks. Here's the ideal undergraduate admissions timeline."
          />
          <div className="mt-12 space-y-6">
            {timeline.map((t, i) => (
              <Reveal key={t.when} delay={i * 0.05}>
                <div className="flex gap-6 rounded-xl border border-border bg-card p-5">
                  <div className="flex h-10 w-28 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                    {t.when}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.what}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CtaButton href="/book-assessment" variant="gold">
              Start Your UG Journey
            </CtaButton>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
