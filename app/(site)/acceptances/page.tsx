import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { CTABand } from '@/components/cta-band'
import { CtaButton } from '@/components/cta-button'
import { getAcceptances } from '@/lib/data'
import { GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Acceptances Wall — University Offers Secured by EduCoach Students',
  description:
    'Browse the EduCoach Acceptances Wall — a visual showcase of university offers and scholarships secured by our students across 30+ countries.',
}

export default async function AcceptancesPage() {
  const acceptances = await getAcceptances()

  const years = [...new Set(acceptances.map((a) => a.year))].sort((a, b) => b - a)

  return (
    <>
      <PageHero
        eyebrow="Acceptances"
        title="Our students, their universities"
        description="Every card represents a real student, a real offer, and a real future — made possible with structured guidance and genuine investment."
        crumbs={[{ label: 'Acceptances' }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="mb-8 flex items-center justify-center gap-4 text-center">
          <div className="rounded-xl bg-gold/15 px-6 py-3">
            <p className="font-heading text-2xl font-bold text-gold-foreground">{acceptances.length}+</p>
            <p className="text-xs text-muted-foreground">Offers secured</p>
          </div>
          <div className="rounded-xl bg-primary/10 px-6 py-3">
            <p className="font-heading text-2xl font-bold text-primary">{new Set(acceptances.map((a) => a.university)).size}+</p>
            <p className="text-xs text-muted-foreground">Universities</p>
          </div>
          <div className="rounded-xl bg-secondary px-6 py-3">
            <p className="font-heading text-2xl font-bold text-foreground">{new Set(acceptances.map((a) => a.countryName)).size}+</p>
            <p className="text-xs text-muted-foreground">Countries</p>
          </div>
        </div>

        {years.map((year) => (
          <div key={year} className="mt-12">
            <SectionHeading title={`Class of ${year}`} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {acceptances
                .filter((a) => a.year === year)
                .map((a, i) => (
                  <Reveal key={`${a.studentName}-${a.university}`} delay={i * 0.03}>
                    <div className="group rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-foreground">
                          <GraduationCap className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-heading text-sm font-bold text-foreground truncate">{a.studentName}</p>
                          <p className="text-xs text-muted-foreground truncate">{a.university}</p>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                        <p>{a.course}</p>
                        <p>{a.countryName} · {a.level}</p>
                        {a.scholarship && (
                          <p className="font-semibold text-gold-foreground">{a.scholarship}</p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
            </div>
          </div>
        ))}

        {acceptances.length === 0 && (
          <p className="text-center text-muted-foreground">Acceptances wall coming soon.</p>
        )}
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:py-24">
          <SectionHeading
            eyebrow="Join Them"
            title="See your name on this wall"
            description="Book a free assessment and take the first step toward your dream university."
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
