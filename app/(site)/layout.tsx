import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { StickyActions } from '@/components/sticky-actions'
import { Analytics } from '@/components/analytics'
import { getSiteSettings, getCountries } from '@/lib/data'
import { urlFor } from '@/sanity/lib/image'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, countries] = await Promise.all([
    getSiteSettings(),
    getCountries(),
  ])

  const whatsappHref = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(settings.whatsappMessage)}`
  const logoUrl = settings.logo ? urlFor(settings.logo).height(72).url() : undefined
  const logoDarkUrl = settings.logoDark ? urlFor(settings.logoDark).height(72).url() : undefined

  return (
    <>
      <Analytics gtmId={settings.gtmId} ga4Id={settings.ga4Id} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <SiteHeader logoUrl={logoUrl} logoDarkUrl={logoDarkUrl} />
      <main id="main-content" className="pb-20 md:pb-0">{children}</main>
      <SiteFooter
        contact={{
          phone: settings.phone,
          phoneHref: settings.phoneHref,
          email: settings.email,
          address: settings.address,
        }}
        whatsappHref={whatsappHref}
        countries={countries}
        logoUrl={logoUrl}
        logoDarkUrl={logoDarkUrl}
      />
      <StickyActions
        phoneHref={settings.phoneHref}
        whatsappHref={whatsappHref}
      />
    </>
  )
}
