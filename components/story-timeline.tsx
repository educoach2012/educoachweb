'use client'

import { Reveal } from '@/components/reveal'

type Milestone = {
  year: string
  title: string
  description: string
}

const milestones: Milestone[] = [
  {
    year: '2012',
    title: 'The Beginning',
    description:
      'Founded with a simple belief — every student deserves counselling that starts with who they are, not which college ranks highest. Our first office opened with just two counsellors and a handful of families who trusted a new approach.',
  },
  {
    year: '2014',
    title: 'Psycho-Aptitude Analysis Launched',
    description:
      'Developed our signature methodology combining psychometric science with admissions expertise. The first cohort of students guided through this framework secured offers from universities across 8 countries.',
  },
  {
    year: '2016',
    title: '500 Students Milestone',
    description:
      'Crossed 500 successful placements. Expanded the team to include country-specific specialists for the UK, US, Canada, and Australia. Opened partnerships with 100+ universities worldwide.',
  },
  {
    year: '2019',
    title: 'Scholarship Breakthrough',
    description:
      'Crossed ₹50Cr in cumulative scholarships secured for our students. Launched dedicated scholarship research and application support as a core service offering.',
  },
  {
    year: '2022',
    title: '2,000+ Students Placed',
    description:
      'Reached the 2,000-student milestone with placements across 30+ countries. Introduced postgraduate and career-transition counselling tracks alongside our flagship undergraduate programme.',
  },
  {
    year: '2025',
    title: 'The Next Chapter',
    description:
      'Launched our digital platform with CMS-powered content, events hub, and resources library. Expanded to ₹120Cr+ in total scholarships and 2,500+ students guided. The mission continues.',
  },
]

export function StoryTimeline() {
  return (
    <div className="relative mx-auto max-w-3xl">
      {/* vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

      <div className="space-y-12">
        {milestones.map((m, i) => {
          const isRight = i % 2 === 0

          return (
            <Reveal key={m.year} delay={i * 0.08}>
              <div className={`relative flex items-start gap-6 md:gap-0 ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* dot */}
                <div className="absolute left-6 top-1 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                  <span className="h-3 w-3 rounded-full border-2 border-gold bg-card" />
                </div>

                {/* year badge — mobile */}
                <div className="flex w-12 shrink-0 items-start justify-center md:hidden">
                  <span className="font-display text-sm font-bold text-gold">{m.year}</span>
                </div>

                {/* content */}
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
