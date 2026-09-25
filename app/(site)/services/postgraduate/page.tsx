import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CTABand } from '@/components/cta-band'
import { CtaButton } from '@/components/cta-button'
import { BookOpen, FileText, Users, FlaskConical, Briefcase } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Postgraduate Admissions — Masters, MBA & PhD',
  description:
    'Expert guidance for postgraduate applications — programme matching, SOP crafting, research proposals, MBA coaching, and scholarship strategy.',
}

const services = [
  {
    icon: BookOpen,
    title: 'Programme & Supervisor Matching',
    desc: 'We match your academic interests and career goals to the right programmes — considering research focus, faculty strengths, industry links, and post-graduation outcomes.',
  },
  {
    icon: FileText,
    title: 'SOP & Personal Statement',
    desc: 'Your statement of purpose is your most important document. We help you craft a narrative that connects your past experience to your future ambition — authentically and compellingly.',
  },
  {
    icon: FlaskConical,
    title: 'Research Proposal Development',
    desc: 'For research-track programmes and PhDs, we help you develop a proposal that demonstrates your research maturity, methodology awareness, and alignment with the supervisor\'s work.',
  },
  {
    icon: Briefcase,
    title: 'MBA Application & Interview',
    desc: 'MBA applications demand a different approach — leadership narratives, career progression stories, and post-MBA clarity. We coach you through essays, recommendations, and interviews.',
  },
  {
    icon: Users,
    title: 'LOR Strategy',
    desc: 'Letters of recommendation can make or break an application. We advise on whom to approach, what to highlight, and how to brief your recommenders for maximum impact.',
  },
]

const levels = [
  { title: 'Masters (MS/MA/MSc)', desc: 'Specialised 1–2 year programmes for deep expertise in a specific field. Ideal if you know your direction and want to accelerate into it.', duration: '1–2 years', countries: 'UK (1-year), US, Canada, Australia, Europe' },
  { title: 'MBA', desc: 'Business leadership programmes that value work experience, leadership stories, and post-MBA clarity. ROI-driven decisions matter here.', duration: '1–2 years', countries: 'US, UK, Singapore, Canada, Europe' },
  { title: 'PhD / Research', desc: 'Research-intensive programmes requiring a strong proposal, supervisor alignment, and demonstrated research aptitude. Often fully funded.', duration: '3–5 years', countries: 'US, UK, Europe, Australia, Singapore' },
]

export default function PostgraduatePage() {
  return (
    <>
      <PageHero
        eyebrow="Postgraduate Admissions"
        title="Advance your career with the right programme"
        description="Whether it's a masters, MBA, or PhD — we help you find the programme that accelerates your goals, not just adds a degree."
        crumbs={[
          { label: 'Services', href: '/services' },
          { label: 'Postgraduate' },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow="What We Do"
          title="Precision PG admissions support"
          description="Postgraduate applications demand depth — the right programme match, compelling narratives, and strategic positioning."
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
            eyebrow="Choose Your Path"
            title="Masters vs MBA vs PhD"
            description="Each level serves a different goal. Understanding which is right for you is the first step."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {levels.map((l, i) => (
              <Reveal key={l.title} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground">{l.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{l.desc}</p>
                  <div className="mt-4 space-y-1 border-t border-border pt-4 text-xs text-muted-foreground">
                    <p><span className="font-semibold text-foreground">Duration:</span> {l.duration}</p>
                    <p><span className="font-semibold text-foreground">Top countries:</span> {l.countries}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CtaButton href="/book-assessment" variant="gold">
              Plan Your PG Journey
            </CtaButton>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
