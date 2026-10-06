'use client'

import { Reveal } from '@/components/reveal'
import type { Milestone } from '@/lib/types'

interface StoryTimelineProps {
  milestones?: Milestone[]
}

export function StoryTimeline({ milestones = [] }: StoryTimelineProps) {
  if (milestones.length === 0) return null

  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

      <div className="space-y-12">
        {milestones.map((m, i) => {
          const isRight = i % 2 === 0

          return (
            <Reveal key={m.year} delay={i * 0.08}>
              <div className={`relative flex items-start gap-6 md:gap-0 ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-6 top-1 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                  <span className="h-3 w-3 rounded-full border-2 border-gold bg-card" />
                </div>

                <div className="flex w-12 shrink-0 items-start justify-center md:hidden">
                  <span className="font-display text-sm font-bold text-gold">{m.year}</span>
                </div>

                <div className={`flex-1 rounded-2xl border border-border bg-card p-5 md:w-[calc(50%-2rem)] ${isRight ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <span className="hidden font-display text-sm font-bold text-gold md:inline-block">{m.year}</span>
                  <h3 className="text-lg font-semibold text-foreground md:mt-1">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.description}</p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
