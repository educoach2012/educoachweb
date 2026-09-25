import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CTABand } from '@/components/cta-band'
import { CtaButton } from '@/components/cta-button'
import { getCaseStudies } from '@/lib/data'
import { GraduationCap, Quote } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Case Studies — Real Students, Real Outcomes',
  description:
    'Read detailed case studies of how EduCoach helped students overcome challenges and secure admissions to top universities with scholarships.',
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Real students, real outcomes"
        description="Every student's journey is different. These detailed case studies show how we helped — from the challenge they faced to the offer they accepted."
        crumbs={[{ label: 'Case Studies' }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="space-y-16">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 0.05}>
              <article className={`rounded-2xl border border-border bg-card overflow-hidden ${cs.featured ? 'ring-2 ring-gold' : ''}`}>
                <div className="grid lg:grid-cols-[1fr_1.5fr]">
                  <div className="bg-secondary/40 p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gold-foreground">
                      <GraduationCap className="h-4 w-4" />
                      {cs.level} — {cs.year}
                    </div>
                    <h2 className="mt-3 font-heading text-xl font-bold text-foreground md:text-2xl">
                      {cs.studentName}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {cs.course} at {cs.university}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{cs.countryName}</p>
                    {cs.scholarshipValue && (
                      <p className="mt-3 inline-block rounded-lg bg-gold/15 px-3 py-1 text-sm font-semibold text-gold-foreground">
                        {cs.scholarshipValue}
                      </p>
                    )}
                  </div>
                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-destructive">The Challenge</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cs.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Our Approach</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cs.approach}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">The Outcome</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cs.outcome}</p>
                    </div>
                    {cs.quote && (
                      <blockquote className="flex items-start gap-3 border-l-2 border-gold pl-4">
                        <Quote className="mt-0.5 h-4 w-4 shrink-0 text-gold-foreground" />
                        <p className="text-sm italic text-foreground">{cs.quote}</p>
                      </blockquote>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {caseStudies.length === 0 && (
          <p className="text-center text-muted-foreground">Case studies coming soon.</p>
        )}
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:py-24">
          <SectionHeading
            eyebrow="Your Story Next"
            title="Ready to write your own success story?"
            description="Book a free assessment and let's map out your journey to the right university."
          />
          <div className="mt-8">
            <CtaButton href="/book-assessment" variant="gold" size="lg">
              Book Free Assessment
            </CtaButton>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
