import { cn } from '@/lib/utils'

export function Logo({
  className,
  showText = true,
  variant = 'default',
  imageUrl,
  imageDarkUrl,
}: {
  className?: string
  showText?: boolean
  variant?: 'default' | 'light'
  imageUrl?: string
  imageDarkUrl?: string
}) {
  if (imageUrl) {
    return (
      <span className={cn('inline-flex items-center', className)} aria-label="EduCoach Services">
        <img
          src={imageUrl}
          alt="EduCoach Services"
          width={120}
          height={36}
          className={cn('h-9 w-auto', imageDarkUrl && 'dark:hidden')}
        />
        {imageDarkUrl && (
          <img
            src={imageDarkUrl}
            alt="EduCoach Services"
            width={120}
            height={36}
            className="hidden h-9 w-auto dark:block"
          />
        )}
      </span>
    )
  }

  const wordColor = variant === 'light' ? 'text-primary-foreground' : 'text-foreground'
  const subColor = variant === 'light' ? 'text-gold' : 'text-gold'
  const blue = variant === 'light' ? 'oklch(0.99 0.005 260)' : 'oklch(0.4 0.16 265)'

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)} aria-label="EduCoach Services">
      <svg
        viewBox="0 0 48 40"
        className="h-9 w-11 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 24c0-6 4-10 9-10 5 0 8 4 12 4"
          stroke={blue}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <path
          d="M42 16c0 6-4 10-9 10-5 0-8-4-12-4"
          stroke="var(--gold)"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <path
          d="M6 24c0 6 4 9.5 9 9.5 6 0 9-6 15-6"
          stroke="var(--gold)"
          strokeWidth="3.4"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M42 16c0-6-4-9.5-9-9.5-6 0-9 6-15 6"
          stroke={blue}
          strokeWidth="3.4"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path d="M20 30 L36 8" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" />
        <path d="M30 8 L37 7 L36 14" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {showText && (
        <span className="flex flex-col leading-none">
          <span className={cn('font-display text-lg font-bold tracking-tight', wordColor)}>
            EduCoach
          </span>
          <span className={cn('text-[0.6rem] font-semibold uppercase tracking-[0.35em]', subColor)}>
            Services
          </span>
        </span>
      )}
    </span>
  )
}
