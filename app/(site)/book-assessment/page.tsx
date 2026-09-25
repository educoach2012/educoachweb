import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { AssessmentForm } from "@/components/assessment-form"
import { Reveal } from "@/components/reveal"
import { Icon } from "@/components/icon"
import { getCountries, getServices, getSiteSettings } from "@/lib/data"

export const metadata: Metadata = {
  title: "Book Your Free Assessment",
  description:
    "Book a free, no-obligation study abroad assessment with EduCoach Services. Get a personalised roadmap for your admission, scholarship and visa journey.",
}

const perks = [
  { icon: "compass", title: "Personalised roadmap", body: "A step-by-step plan mapped to your profile, budget and target intake." },
  { icon: "award", title: "Scholarship review", body: "We surface funding you actually qualify for across 500+ universities." },
  { icon: "shield", title: "Visa confidence", body: "Documentation and interview prep from a 98% approval-rate team." },
  { icon: "clock", title: "30-minute call", body: "A focused session with a senior counsellor — no sales pressure." },
]

export default async function BookAssessmentPage() {
  const [countries, services, settings] = await Promise.all([
    getCountries(),
    getServices(),
    getSiteSettings() as Promise<{ assessmentFormUrl?: string | null }>,
  ])

  const iframeUrl = settings.assessmentFormUrl

  return (
    <>
      <PageHero
        eyebrow="Free Assessment"
        title="Let's map your journey abroad"
        description="Tell us a little about your goals and we'll build a personalised study-abroad roadmap — completely free."
      />

      {iframeUrl ? (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4">
            <iframe
              src={iframeUrl}
              title="Book your assessment"
              className="h-[800px] w-full rounded-3xl border border-border"
              loading="lazy"
              allow="camera; microphone"
            />
          </div>
        </section>
      ) : (
        <section className="py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[1fr_1.15fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl text-balance">
                  What you get in your assessment
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Every assessment is handled by a senior counsellor who has helped hundreds of students get admitted to
                  top universities worldwide.
                </p>
              </Reveal>
              <ul className="mt-8 space-y-5">
                {perks.map((perk, i) => (
                  <li key={perk.title}>
                    <Reveal delay={i * 0.08} className="flex gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary-foreground">
                        <Icon name={perk.icon} className="size-5 text-primary" />
                      </span>
                      <div>
                        <h3 className="font-heading font-semibold text-foreground">{perk.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{perk.body}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
            <Reveal delay={0.1}>
              <AssessmentForm countries={countries} services={services} />
            </Reveal>
          </div>
        </section>
      )}
    </>
  )
}
