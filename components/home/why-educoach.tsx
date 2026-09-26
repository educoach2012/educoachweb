import { SectionHeading } from '@/components/section-heading'
import { RevealStagger, RevealItem } from '@/components/reveal'
import { Icon } from '@/components/icon'

interface WhyEduCoachProps {
  whyCards: { title: string; desc: string; icon: string }[]
  eyebrow?: string
  title?: string
  description?: string
}

export function WhyEduCoach({ whyCards, eyebrow, title, description }: WhyEduCoachProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:py-28">
      <SectionHeading
        eyebrow={eyebrow}
        title={title ?? 'Everything you need, from discovery to departure'}
        description={description}
      />

      <RevealStagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {whyCards.map((card) => (
          <RevealItem key={card.title}>
            <div className="group h-full rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon name={card.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  )
}
