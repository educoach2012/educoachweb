'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { RevealStagger, RevealItem } from '@/components/reveal'
import type { TeamMember } from '@/lib/types'
import { urlFor } from '@/sanity/lib/image'

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function Initials({ name, size = 'sm' }: { name: string; size?: 'sm' | 'lg' }) {
  const letters = name.split(' ').map((n) => n[0]).join('').slice(0, 2)
  const dim = size === 'lg' ? 'h-40 w-40 text-4xl' : 'h-full w-full text-2xl'
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-navy font-display font-bold text-primary-foreground ${dim}`}
    >
      {letters}
    </div>
  )
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  TeamModal                                                         */
/* ------------------------------------------------------------------ */

function TeamModal({
  member,
  open,
  onClose,
}: {
  member: TeamMember | null
  open: boolean
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  /* Close on backdrop click */
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) handleClose()
    },
    [handleClose],
  )

  if (!member) return null

  const photoSrc = member.secondaryPhoto
    ? urlFor(member.secondaryPhoto).width(600).height(600).url()
    : member.photo
      ? urlFor(member.photo).width(600).height(600).url()
      : null

  const hasSocials = member.linkedin || member.twitter || member.instagram

  return (
    <dialog
      ref={dialogRef}
      aria-modal="true"
      onClick={handleBackdropClick}
      onClose={handleClose}
      className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card p-0 text-foreground backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-6 md:p-8">
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Photo */}
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-gold/30">
            {photoSrc ? (
              <Image
                src={photoSrc}
                alt={member.name}
                fill
                className="object-cover"
                sizes="160px"
              />
            ) : (
              <Initials name={member.name} size="lg" />
            )}
          </div>

          {/* Name & Role */}
          <h2 className="mt-5 font-heading text-2xl font-bold text-foreground">
            {member.name}
          </h2>
          <p className="text-sm font-medium text-primary">{member.role}</p>

          {/* Details row */}
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {member.experience && (
              <span className="rounded-full border border-border px-3 py-1">
                {member.experience} experience
              </span>
            )}
            {member.specialisation && (
              <span className="rounded-full border border-border px-3 py-1">
                {member.specialisation}
              </span>
            )}
            {member.countries && (
              <span className="rounded-full border border-border px-3 py-1">
                {member.countries}
              </span>
            )}
          </div>

          {/* Bio */}
          {member.bio && (
            <p className="mt-6 text-left leading-relaxed text-muted-foreground">
              {member.bio}
            </p>
          )}

          {/* Social links */}
          {hasSocials && (
            <div className="mt-6 flex items-center gap-4">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              )}
              {member.twitter && (
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on Twitter`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <TwitterIcon className="h-4 w-4" />
                </a>
              )}
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on Instagram`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          )}

        </div>
      </div>
    </dialog>
  )
}

/* ------------------------------------------------------------------ */
/*  TeamGrid (main export)                                            */
/* ------------------------------------------------------------------ */

export function TeamGrid({ members }: { members: TeamMember[] }) {
  const [selected, setSelected] = useState<TeamMember | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (member: TeamMember) => {
    setSelected(member)
    setModalOpen(true)
  }
  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <RevealStagger className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {members.map((member) => {
          const photoSrc = member.photo
            ? urlFor(member.photo).width(400).height(400).url()
            : null

          return (
            <RevealItem key={member.name}>
              <button
                type="button"
                onClick={() => openModal(member)}
                className="group w-full rounded-3xl border border-border bg-card p-4 text-left transition-all duration-300 hover:scale-[1.03] hover:border-gold/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {/* Photo */}
                <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-2xl">
                  {photoSrc ? (
                    <Image
                      src={photoSrc}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-navy">
                      <span className="font-display text-3xl font-bold text-primary-foreground">
                        {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Name & Role */}
                <h3 className="mt-3 font-heading text-sm font-semibold text-foreground md:text-base">
                  {member.name}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
                  {member.role}
                </p>
              </button>
            </RevealItem>
          )
        })}
      </RevealStagger>

      <TeamModal member={selected} open={modalOpen} onClose={closeModal} />
    </>
  )
}
