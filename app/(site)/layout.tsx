import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { StickyActions } from '@/components/sticky-actions'
import { getSiteSettings, getCountries } from '@/lib/data'
import { urlFor } from '@/sanity/lib/image'
import { contact } from '@/lib/site-data'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, countries] = await Promise.all([
    getSiteSettings(),
    getCountries(),
  ])

  const phone = settings?.phone ?? contact.phone
  const phoneHref = settings?.phoneHref ?? contact.phoneHref
  const whatsapp = settings?.whatsapp ?? contact.whatsapp
  const whatsappMsg = settings?.whatsappMessage ?? contact.whatsappMessage
  const email = settings?.email ?? contact.email
  const address = settings?.address ?? contact.address

  const whatsappHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMsg)}`
  const logoUrl = settings?.logo ? urlFor(settings.logo).height(72).url() : undefined
  const logoDarkUrl = settings?.logoDark ? urlFor(settings.logoDark).height(72).url() : undefined

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>
      <SiteHeader logoUrl={logoUrl} logoDarkUrl={logoDarkUrl} />
      <main id="main-content" className="pb-20 md:pb-0">{children}</main>
      <SiteFooter
        contact={{
          phone,
          phoneHref,
          email,
          address,
        }}
        whatsappHref={whatsappHref}
        countries={countries}
        logoUrl={logoUrl}
        logoDarkUrl={logoDarkUrl}
      />
      <StickyActions
        phoneHref={phoneHref}
        whatsappHref={whatsappHref}
      />
    </>
  )
}
