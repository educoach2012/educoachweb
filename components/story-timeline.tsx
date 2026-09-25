'use client'

import { Reveal } from '@/components/reveal'

type Milestone = {
  year: string
  title: string
  description: string
}

const milestones: Milestone[] = [
  {
    year: '2013',
    title: 'The Beginning',
    description:
      'Dr. Priya Menon founded EduCoach Services in Bengaluru with a simple conviction: every student deserves counselling that starts with who they are, not which college ranks highest. The first office opened with two counsellors and a handful of families who believed in a new, science-backed approach to study-abroad guidance.',
  },
  {
    year: '2015',
    title: 'Psycho-Aptitude Analysis Launched',
    description:
      'Drawing on her UCL research in Education Psychology, Dr. Menon formalised EduCoach\'s signature methodology — combining validated psychometric instruments with admissions expertise. The first cohort guided through this framework secured offers from universities across 8 countries, with over ₹1.5Cr in scholarships.',
  },
  {
    year: '2017',
    title: '500 Students Milestone',
    description:
      'Crossed 500 successful placements. Expanded the team to include country-specific specialists for the UK, US, Canada, and Australia. Established partnerships with 100+ universities worldwide and launched a dedicated scholarship research desk.',
  },
  {
    year: '2020',
    title: 'Adapting Through Adversity',
    description:
      'When the pandemic disrupted global education, EduCoach pivoted to fully virtual counselling and helped students navigate deferred intakes, changed visa policies, and online learning transitions. Not a single student was left without a clear plan.',
  },
  {
    year: '2022',
    title: '2,000 Students & ₹80Cr in Scholarships',
    description:
      'Reached the 2,000-student milestone with placements across 30+ countries. Launched dedicated postgraduate and career-transition counselling tracks. Crossed ₹80Cr in cumulative scholarships secured for students.',
  },
  {
    year: '2025',
    title: 'The Next Chapter',
    description:
      'Surpassed 2,500 students guided and ₹120Cr in total scholarships. Launched the digital platform with a resources library, events hub, and CMS-managed content. Introduced three structured programmes — JumpStart, Sprint, and Career Pivot — to serve students at every life stage.',
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
