'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle, Star } from 'lucide-react'
import { CtaButton } from '@/components/cta-button'

interface HeroProps {
  countries: { name: string; slug: string; flag: string }[]
  stats?: { value: number; suffix: string; label: string }[]
  badge?: string
  headingLines?: string[]
  subtitle?: string
}

export function Hero({ countries, stats, badge, headingLines, subtitle }: HeroProps) {
  const lines = headingLines ?? ['Find the right university.', 'Build the right profile.', 'Create the right future.']
  const heroStat = stats?.[0]
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-0 grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-gold/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-16 lg:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm"
          >
            <span className="flex -space-x-0.5 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold" />
              ))}
            </span>
            {badge ?? 'Rated 4.9/5 by 2,500+ students & parents'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-balance text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            {lines.slice(0, -1).map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
            <span className="mt-2 block leading-[1.2]">
              <span className="highlight-gold">{lines[lines.length - 1]}</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            {subtitle ?? "India's leading study abroad and career counselling consultancy. From psychometric discovery to admission offers and visas — we guide you every step of the way."}
          </motion.p>

          {heroStat && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-gold/30 bg-gold/5 px-5 py-3"
            >
              <span className="font-display text-3xl font-bold text-gold sm:text-4xl">
                {heroStat.value.toLocaleString()}{heroStat.suffix}
              </span>
              <span className="text-sm font-medium text-muted-foreground">{heroStat.label}</span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <CtaButton href="/book-assessment" variant="gold" size="lg">
              Book Your Assessment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </CtaButton>
            <CtaButton href="/success-stories" variant="outline" size="lg">
              <PlayCircle className="h-5 w-5" />
              Explore Success Stories
            </CtaButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10"
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Admissions across 30+ countries
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {countries.slice(0, 6).map((c) => (
                <span
                  key={c.slug}
                  className="rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-foreground"
                >
                  {c.flag} {c.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/10">
            <Image
              src="/hero-student.png"
              alt="Confident student on a global university campus"
              width={720}
              height={880}
              priority
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
          </div>

          {/* floating stat cards — driven from CMS stats */}
          {stats?.[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass absolute -left-4 top-10 hidden rounded-2xl border border-border p-4 shadow-xl sm:-left-8 sm:block"
            >
              <p className="text-2xl font-bold text-foreground">{stats[0].value.toLocaleString()}{stats[0].suffix}</p>
              <p className="text-xs text-muted-foreground">{stats[0].label}</p>
            </motion.div>
          )}
          {stats?.[1] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="glass absolute -right-3 bottom-10 hidden rounded-2xl border border-border p-4 shadow-xl sm:-right-6 sm:block"
            >
              <p className="text-2xl font-bold text-gold">{stats[1].value.toLocaleString()}{stats[1].suffix}</p>
              <p className="text-xs text-muted-foreground">{stats[1].label}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
