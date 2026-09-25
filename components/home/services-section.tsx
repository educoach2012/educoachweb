import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { RevealStagger, RevealItem } from '@/components/reveal'
import { Icon } from '@/components/icon'

interface ServicesSectionProps {
  services: { serviceId: string; icon: string; title: string; shortDesc: string }[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Services"
        title="One partner for the entire journey"
        description="Every service is designed to move you closer to the right offer — and a future you're excited about."
      />

      <RevealStagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <RevealItem key={s.serviceId}>
            <Link
              href={`/services#${s.serviceId}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold-foreground">
                <Icon name={s.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.shortDesc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  )
}
