import type { LucideIcon } from "lucide-react"

export interface MegaLinkItem {
  icon: LucideIcon
  title: string
  description: string
  href: string
  badge?: string
}

export interface TutorialItem {
  title: string
  description: string
  href: string
}
