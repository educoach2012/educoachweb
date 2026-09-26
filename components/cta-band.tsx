import { CtaButton } from "@/components/cta-button"
import { Reveal } from "@/components/reveal"
import { getSiteSettings } from "@/lib/data"

export async function CTABand({
  title = "Ready to start your journey abroad?",
  subtitle = "Book a free assessment and get a personalised roadmap from a senior counsellor.",
}: {
  title?: string
  subtitle?: string
}) {
  const settings = await getSiteSettings()
  const href = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(settings.whatsappMessage)}`

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center md:px-16 md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-gold/30 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-10 size-64 rounded-full bg-gold/20 blur-3xl"
            />
            <h2 className="relative font-heading text-2xl font-bold text-primary-foreground text-balance md:text-4xl">
              {title}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl leading-relaxed text-primary-foreground/80 text-pretty">
              {subtitle}
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CtaButton href="/book-assessment" variant="gold" size="lg">
                Book Free Assessment
              </CtaButton>
              <CtaButton
                href={href}
                variant="outline"
                size="lg"
                target="_blank"
                rel="noreferrer"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                Chat on WhatsApp
              </CtaButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
