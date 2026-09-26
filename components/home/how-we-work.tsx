import { SectionHeading } from '@/components/section-heading'
import { RevealStagger, RevealItem } from '@/components/reveal'
import { CtaButton } from '@/components/cta-button'

interface HowWeWorkProps {
  steps: { title: string; shortDesc: string }[]
  eyebrow?: string
  title?: string
  description?: string
}

export function HowWeWork({ steps, eyebrow, title, description }: HowWeWorkProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 grid-pattern opacity-10"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow={eyebrow ?? 'How we work'}
          title={title ?? 'A clear, guided journey to your dream offer'}
          description={description ?? 'Eight considered steps. One dedicated counsellor. Zero guesswork.'}
          className="[&_h2]:text-primary-foreground [&_p]:text-primary-foreground/80 [&_span]:text-gold"
        />

        <RevealStagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <RevealItem key={step.title}>
              <div className="group relative h-full rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur-sm transition-colors hover:bg-primary-foreground/10">
                <span className="font-display text-5xl font-bold text-gold/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-primary-foreground/70">
                  {step.shortDesc}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <div className="mt-12 flex justify-center">
          <CtaButton href="/how-we-work" variant="gold" size="lg">
            See the full process
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
