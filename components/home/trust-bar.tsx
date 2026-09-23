import { AnimatedCounter } from '@/components/animated-counter'
import { RevealStagger, RevealItem } from '@/components/reveal'

const logos = [
  'Oxford', 'Stanford', 'Toronto', 'Melbourne', 'NUS', 'TU Munich', 'Imperial', 'UBC', 'ETH Zürich', 'Cambridge',
]

interface TrustBarProps {
  stats: { value: number; suffix: string; label: string }[]
}

export function TrustBar({ stats }: TrustBarProps) {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <RevealStagger className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <RevealItem key={s.label} className="text-center md:text-left">
              <AnimatedCounter
                value={s.value}
                suffix={s.suffix}
                className="font-display text-4xl font-bold text-primary sm:text-5xl"
              />
              <p className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</p>
            </RevealItem>
          ))}
        </RevealStagger>

        <div className="mt-12 overflow-hidden">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Our students study at the world&apos;s top universities
          </p>
          <div className="relative mt-6 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
              {[...logos, ...logos].map((logo, i) => (
                <span key={i} className="whitespace-nowrap font-display text-xl font-semibold text-foreground/40">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
