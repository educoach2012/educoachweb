import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { SectionContent } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function section(sections: SectionContent[] | undefined, key: string): SectionContent {
  return sections?.find((s) => s.key === key) ?? { key }
}
