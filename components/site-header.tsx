'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ChevronDown, Menu, Search, X, ArrowRight } from 'lucide-react'
import type { NavItem } from '@/lib/types'
import { Logo } from '@/components/logo'
import { CtaButton } from '@/components/cta-button'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

type SiteHeaderProps = {
  logoUrl?: string
  navItems?: NavItem[]
}

export function SiteHeader({ logoUrl, navItems }: SiteHeaderProps) {
  const items = navItems ?? []
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'py-2' : 'py-3.5',
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={cn(
            'flex items-center justify-between rounded-full border px-3 pl-5 transition-all duration-300',
            scrolled
              ? 'glass border-border shadow-lg shadow-primary/5'
              : 'border-transparent',
          )}
        >
          <Link href="/" className="py-2.5" aria-label="EduCoach Services home">
            <Logo imageUrl={logoUrl} />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {items.map((item) =>
              item.children && item.children.length > 0 ? (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.title)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onFocus={() => setOpenMenu(item.title)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null)
                  }}
                >
                  <Link
                    href={item.href}
                    aria-expanded={openMenu === item.title}
                    aria-haspopup="true"
                    className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {item.title}
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  </Link>
                  {openMenu === item.title && (
                    <div className="absolute left-1/2 top-full w-[28rem] -translate-x-1/2 xl:w-[34rem] pt-3">
                      <div className="grid grid-cols-2 gap-1 rounded-3xl border border-border bg-card p-3 shadow-2xl shadow-primary/10">
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            className="group rounded-2xl p-3 transition-colors hover:bg-secondary"
                          >
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                              {child.title}
                              <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                            </span>
                            {child.desc && (
                              <span className="mt-0.5 block text-xs text-muted-foreground">
                                {child.desc}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  {item.title}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/success-stories"
              aria-label="Search"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary sm:inline-flex"
            >
              <Search className="h-[18px] w-[18px]" />
            </Link>
            <ThemeToggle className="hidden sm:inline-flex" />
            <CtaButton href="/book-assessment" variant="gold" className="hidden md:inline-flex">
              Book Assessment
            </CtaButton>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-card p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <Logo imageUrl={logoUrl} />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
              {items.map((item) => (
                <div key={item.title} className="border-b border-border/60 py-1">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 text-base font-semibold text-foreground"
                  >
                    {item.title}
                  </Link>
                  {item.children && item.children.length > 0 && (
                    <div className="mb-2 flex flex-col gap-0.5 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="py-1.5 text-sm text-muted-foreground"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              <CtaButton href="/book-assessment" variant="gold" size="lg">
                Book Your Assessment
              </CtaButton>
              <div className="flex items-center justify-between rounded-full border border-border px-4 py-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
