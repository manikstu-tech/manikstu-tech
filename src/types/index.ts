import type { ReactNode } from "react"

export type HeroSlide = {
  image: string

  alt: string

  position: string

  eyebrow: string

  title: ReactNode

  text: string

  primary: [string, string]

  secondary: [string, string]

  // Optional short line of proof under the text, such as a stat; quote site figures exactly
  proof?: string

  // Desktop only: enlarge the photo by this factor (e.g. 1.15), growing leftwards from its right edge
  zoom?: number
}

export type SolutionItem = {
  number: string

  icon: ImpactIconType

  title: string

  description: string

  // Its own page, for solutions that have one
  href?: string
}

// A photo on a solution page. quote is a short line laid over the bottom of the photo.
export type SolutionPhoto = { src: string; alt: string; quote?: string; position?: string }

// Everything one solution page shows, top to bottom (see src/components/sections/solutions/SolutionArticle.tsx)
export type SolutionPageContent = {
  slug: string
  // Breadcrumb, the small label above the title and the browser tab
  name: string
  // Search and share description, under 160 characters
  summary: string
  title: string
  lede: string
  lead: SolutionPhoto & { caption: string }
  intro: string[]
  pillarsHeading: string
  pillars: { icon: ImpactIconType; title: string; text: string }[]
  pair: [SolutionPhoto, SolutionPhoto]
  motto: { hi: string; en: string }
  stepsHeading: string
  steps: string[]
  partners: { heading: string; sub: string; why: string; values: { title: string; text: string }[] }
  cta: { heading: string; line: string; primary: string }
}

export type ImpactStatItem = {
  icon: "farmers" | "villages" | "goats" | "states"

  value: string

  label: string
}

export type NavItem = {
  label: string

  href: string

  // Links shown in a small pop-up when the item is hovered
  menu?: { label: string; href: string }[]

  // Clicking only opens the menu: the item has no landing page, and href just marks it active
  dropdownOnly?: boolean
}

export type MapState = {
  name: string

  d: string

  at: number[]

  dot?: boolean
}

export type ImpactIconType = "farmers" | "villages" | "goats" | "states" | "herd" | "meat" | "balance" | "mail" | "phone" | "pin" | "calendar" | "truck" | "headset" | "facebook" | "instagram" | "linkedin" | "youtube" | "sprout" | "health" | "shield" | "training" | "market" | "rupee" | "coins" | "chart" | "handshake" | "clipboard" | "check" | "medkit"


export type StoryItem = {
  // Optional: a story without a photo shows the person's initials
  image?: string
  quote: string
  name: string
  role: string
}

export type GoatSource = {
  organisation: string
  title: string
  table: string
  page: number | null
  referenceYear: number
  url: string
  kind: string
}

export type GoatMetricInfo = {
  label: string
  unit: string
  reportingYear?: number
  dataType: string
  category?: string
  sourceIds: string[]
  unavailableReason?: string
}

export type GoatMarketData = {
  sources: Record<string, GoatSource>
  metrics: Record<string, GoatMetricInfo>
  states: Record<string, { code: string; note?: string } & Record<string, string | number | undefined>>
}
