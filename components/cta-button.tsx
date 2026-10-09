import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60'

const variants = {
  primary:
    'bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5',
  gold: 'bg-gold text-gold-foreground shadow-lg shadow-gold/30 hover:brightness-105 hover:-translate-y-0.5',
  outline: 'border border-border bg-card text-foreground hover:bg-secondary hover:-translate-y-0.5',
  ghost: 'text-foreground hover:bg-secondary',
} as const

const sizes = {
  md: 'h-11 px-5',
  lg: 'h-13 px-7 text-[0.95rem]',
} as const

type Props = {
  children: ReactNode
  href?: string
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
  target?: string
  rel?: string
}

export function CtaButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  disabled,
  onClick,
  target,
  rel,
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className)
  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
