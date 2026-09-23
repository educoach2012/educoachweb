'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionHeading } from '@/components/section-heading'
import { CtaButton } from '@/components/cta-button'
import { cn } from '@/lib/utils'

interface FaqSectionProps {
  faqs: { question: string; answer: string }[]
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-20 sm:py-28">
      <SectionHeading
        eyebrow="FAQ"
        title="Answers to the questions parents ask most"
      />

      <div className="mt-12 divide-y divide-border rounded-3xl border border-border bg-card">
        {faqs.map((faq, i) => {
          const isOpen = open === i
          return (
            <div key={faq.question} className="px-6">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-base font-semibold text-foreground">{faq.question}</span>
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-transform duration-300',
                    isOpen && 'rotate-45 bg-primary text-primary-foreground',
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pr-6 text-sm sm:pr-12 leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <p className="text-muted-foreground">Still have questions?</p>
        <CtaButton href="/book-assessment" variant="primary" size="lg">
          Book a free assessment
        </CtaButton>
      </div>
    </section>
  )
}
