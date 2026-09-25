import type { Metadata } from 'next'
import { FileText, Download } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { RevealStagger, RevealItem } from '@/components/reveal'
import { CtaButton } from '@/components/cta-button'
import { CTABand } from '@/components/cta-band'
import { getResources } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Free Resources',
  description:
    'Download free study-abroad guides, checklists, templates and tools from EduCoach Services.',
}

const typeColors: Record<string, string> = {
  Guide: 'bg-primary/10 text-primary',
  Tool: 'bg-gold/15 text-gold-foreground',
  Checklist: 'bg-green-500/10 text-green-700 dark:text-green-400',
  Template: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
}

export default async function ResourcesPage() {
  const resources = await getResources()

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Free guides, checklists & tools"
        description="Everything you need to plan your study-abroad journey — created by our counsellors and available for free."
        crumbs={[{ label: 'Resources' }]}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <RevealItem key={r.title}>
                <div className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/60">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${typeColors[r.type] ?? 'bg-secondary text-foreground'}`}>
                      {r.type}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{r.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{r.description}</p>
                  <CtaButton href="/contact" variant="outline" className="mt-5 w-full">
                    <Download className="h-4 w-4" />
                    Request Access
                  </CtaButton>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <CTABand
        title="Need personalised guidance?"
        subtitle="Our resources are a great starting point — but a 1-on-1 session takes it further."
      />
    </>
  )
}
