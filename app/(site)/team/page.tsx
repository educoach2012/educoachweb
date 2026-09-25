import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal, RevealStagger, RevealItem } from '@/components/reveal'
import { CtaButton } from '@/components/cta-button'
import { CTABand } from '@/components/cta-band'
import { getTeamMembers } from '@/lib/data'
import { MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the EduCoach team — experienced counsellors, essay strategists and visa experts who\'ve guided thousands of students to the world\'s best universities.',
}

export default async function TeamPage() {
  const experts = await getTeamMembers()

  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="Counsellors who've done this thousands of times"
        description="Seasoned mentors with deep, country-specific expertise and a genuine care for outcomes."
        crumbs={[{ label: 'Team' }]}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Meet the experts"
            title="Your journey is led by people who care"
            description="Every counsellor at EduCoach has lived the international education experience. They don't just advise — they empathise, strategise and advocate."
          />

          <div className="mt-14 space-y-8">
            {experts.map((e, i) => (
              <Reveal key={e.name} delay={i * 0.06}>
                <div className="grid gap-6 rounded-3xl border border-border bg-card p-6 md:grid-cols-[auto_1fr] md:p-8">
                  <div className="flex flex-col items-center text-center md:w-56">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-navy font-display text-3xl font-bold text-primary-foreground">
                      {e.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{e.name}</h3>
                    <p className="text-sm text-primary">{e.role}</p>
                    <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <p>{e.experience} experience</p>
                      <p className="flex items-center justify-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-gold" /> {e.countries}
                      </p>
                    </div>
                    <CtaButton href="/book-assessment" variant="gold" className="mt-4 w-full">
                      Book Session
                    </CtaButton>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{e.specialisation}</p>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{e.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Want to speak with a counsellor?"
        subtitle="Book a free assessment and get paired with the right expert for your goals."
      />
    </>
  )
}
