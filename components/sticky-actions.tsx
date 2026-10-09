'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarCheck, MessageCircle, Phone } from 'lucide-react'

type StickyActionsProps = {
  phoneHref: string
  whatsappHref: string
}

export function StickyActions({ phoneHref, whatsappHref }: StickyActionsProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Floating WhatsApp (all screens) */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-24 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 transition-transform hover:scale-105 md:bottom-6"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
      </a>

      {/* Mobile bottom navigation with sticky CTA */}
      <nav
        aria-label="Quick actions"
        className="glass fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-border px-2 py-2 md:hidden"
      >
        <a href={phoneHref} className="flex flex-1 flex-col items-center gap-0.5 py-1 text-xs font-medium text-foreground">
          <Phone className="h-5 w-5 text-primary" />
          Call
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center gap-0.5 py-1 text-xs font-medium text-foreground"
        >
          <MessageCircle className="h-5 w-5 text-[#25D366]" />
          WhatsApp
        </a>
        <Link
          href="/book-assessment"
          className="flex flex-[1.4] items-center justify-center gap-1.5 rounded-full bg-gold py-2.5 text-sm font-semibold text-gold-foreground"
          data-active={pathname === '/book-assessment'}
        >
          <CalendarCheck className="h-4 w-4" />
          Book
        </Link>
      </nav>
    </>
  )
}
