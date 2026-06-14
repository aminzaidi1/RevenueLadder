import type { ReactNode } from "react"

export type CaseStudyHeroCardRow =
  | {
      kind: "row"
      icon: ReactNode
      label: ReactNode
      sub?: ReactNode
      pill?: { text: string; variant?: "done" | "run" }
    }
  | {
      kind: "beforeAfter"
      icon: ReactNode
      label: ReactNode
      sub?: ReactNode
      before: { label: string; value: string; sub?: string }
      after: { label: string; value: string; sub?: string }
    }

export interface CaseStudyHeroProps {
  badges: string[]
  eyebrow: string
  title: ReactNode
  subtitle: string
  logoSrc: string
  logoAlt: string
  metaLines: string[]
  card: {
    title: string
    sub: string
    statusLabel?: string
    rows: CaseStudyHeroCardRow[]
    avatars: { initials: string; tone: "gold" | "green" }[]
    footMeta: string
  }
}

export interface CaseStudyContextItem {
  label: string
  value: string
  icon: ReactNode
}

export interface CaseStudyStat {
  value: ReactNode
  unit?: string
  label: string
  icon: ReactNode
  featured?: boolean
}

export interface CaseStudyWorkCard {
  icon: ReactNode
  title: string
  paragraphs: string[]
  result: { icon: ReactNode; text: string }
  dark?: boolean
  extra?: ReactNode
}

export interface CaseStudyKeyword {
  keyword: string
  position: string
  tier?: "" | "top-1" | "top-2" | "top-3"
}

export interface CaseStudyTestimonial {
  quote: string
  attribution: string
  location?: string
}

export interface CaseStudyCTAProps {
  eyebrow: string
  title: ReactNode
  body: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}

export interface CaseStudySummary {
  slug: string
  client: string
  tags: string[]
  headline: string
  blurb: string
  stats: { value: string; label: string }[]
}
