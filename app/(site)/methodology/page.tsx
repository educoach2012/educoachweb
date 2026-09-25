import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CTABand } from '@/components/cta-band'
import { Brain, Target, Compass, BarChart3, Users, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Methodology — Psycho-Aptitude Analysis',
  description:
    'Discover EduCoach\'s Psycho-Aptitude Analysis framework — a science-backed methodology combining psychometric profiling, aptitude mapping and career alignment.',
}

const pillars = [
  {
    icon: Brain,
    title: 'Psychometric Profiling',
    desc: 'We use validated psychometric instruments to map your personality traits, cognitive strengths, and behavioural preferences. This isn\'t a generic quiz — it\'s a clinical-grade assessment that reveals how you think, learn, and make decisions.',
    detail: 'Covers: Big Five personality traits, Holland occupational codes, cognitive processing style, stress response patterns.',
  },
  {
    icon: BarChart3,
    title: 'Aptitude Mapping',
    desc: 'Your aptitudes — verbal reasoning, numerical ability, spatial awareness, abstract thinking — are measured against programme-specific benchmarks. This tells us not just what you\'re good at, but where you\'ll thrive academically.',
    detail: 'Covers: Differential Aptitude Tests across 8 dimensions, benchmarked against 10,000+ student profiles.',
  },
  {
    icon: Target,
    title: 'Interest-Career Alignment',
    desc: 'We map your assessed interests against real-world career paths and industry demand. The result is a shortlist of careers that align with who you are — not just what\'s trending.',
    detail: 'Covers: Interest inventory, career demand analysis, ROI projections, growth trajectory mapping.',
  },
  {
    icon: Compass,
    title: 'Course & University Matching',
    desc: 'With your profile complete, we match you to specific courses and universities that fit your aptitude, interests, budget, and long-term goals. Every recommendation is data-backed.',
    detail: 'Covers: University database of 5,000+ programmes across 30+ countries, filtered by admission probability and career outcomes.',
  },
  {
    icon: Users,
    title: 'Family Alignment Session',
    desc: 'Education decisions affect the whole family. We conduct a dedicated session with parents to align expectations, address concerns, and build a shared plan.',
    detail: 'Covers: Budget planning, timeline alignment, risk communication, parent Q&A.',
  },
  {
    icon: Lightbulb,
    title: 'Personalised Roadmap',
    desc: 'The final output is a detailed, time-bound action plan — covering profile building, test prep, applications, and milestones. This becomes your GPS for the next 12–24 months.',
    detail: 'Covers: Month-by-month action items, test dates, application deadlines, extracurricular targets.',
  },
]

export default function MethodologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Methodology"
        title="Psycho-Aptitude Analysis"
        description="A science-backed framework that replaces guesswork with clarity — mapping who you are to where you'll thrive."
        crumbs={[{ label: 'Methodology' }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow="The Framework"
          title="Six pillars of clarity"
          description="Every student who works with EduCoach goes through our Psycho-Aptitude Analysis — a structured process that builds from self-understanding to a concrete action plan."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold-foreground">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <p className="mt-3 text-xs text-muted-foreground/70">{p.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <SectionHeading
            eyebrow="Why It Works"
            title="Science over guesswork"
            description="Most consultancies start with university brochures. We start with you."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-border bg-card p-8">
                <h3 className="font-heading text-xl font-bold text-foreground">The typical approach</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-destructive">✕</span> Starts with university rankings</li>
                  <li className="flex items-start gap-2"><span className="text-destructive">✕</span> One-size-fits-all recommendations</li>
                  <li className="flex items-start gap-2"><span className="text-destructive">✕</span> Relies on trends and peer pressure</li>
                  <li className="flex items-start gap-2"><span className="text-destructive">✕</span> Ignores aptitude and personality fit</li>
                  <li className="flex items-start gap-2"><span className="text-destructive">✕</span> No structured follow-through</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border-2 border-gold bg-card p-8">
                <h3 className="font-heading text-xl font-bold text-foreground">The EduCoach approach</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-primary">✓</span> Starts with the student</li>
                  <li className="flex items-start gap-2"><span className="text-primary">✓</span> Personalised, data-driven recommendations</li>
                  <li className="flex items-start gap-2"><span className="text-primary">✓</span> Backed by psychometric science</li>
                  <li className="flex items-start gap-2"><span className="text-primary">✓</span> Matches aptitude to programme design</li>
                  <li className="flex items-start gap-2"><span className="text-primary">✓</span> 12–24 month structured roadmap</li>
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
