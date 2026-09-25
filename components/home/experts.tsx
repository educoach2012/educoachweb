import { MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { RevealStagger, RevealItem } from '@/components/reveal'
import { CtaButton } from '@/components/cta-button'

interface ExpertsProps {
  experts: { name: string; role: string; experience: string; specialisation: string; countries: string }[]
}

export function Experts({ experts }: ExpertsProps) {
  return (
    <section className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Meet our experts"
          title="Counsellors who've done this thousands of times"
          description="Seasoned mentors with deep, country-specific expertise and a genuine care for outcomes."
        />

        <RevealStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {experts.map((e) => (
            <RevealItem key={e.name}>
              <div className="group h-full overflow-hidden rounded-3xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-navy font-display text-2xl font-bold text-primary-foreground">
                  {e.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{e.name}</h3>
                <p className="text-sm text-primary">{e.role}</p>
                <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                  <p>{e.experience} experience</p>
                  <p>{e.specialisation}</p>
                  <p className="flex items-center justify-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-gold" /> {e.countries}
                  </p>
                </div>
                <CtaButton href="/book-assessment" variant="outline" className="mt-5 w-full">
                  Book Session
                </CtaButton>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
