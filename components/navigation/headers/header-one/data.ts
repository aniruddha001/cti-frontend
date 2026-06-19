import {
  BookOpen,
  Sparkles,
  PlayCircle,
  FileCode2,
  Flag,
  MessageSquare,
  Users,
  FolderOpen,
} from "lucide-react"
import type { MegaLinkItem, TutorialItem } from "./types"

export const resourcesLinks: MegaLinkItem[] = [
  {
    icon: BookOpen,
    title: "Blog",
    description: "The latest industry news and guides curated by our expert team.",
    href: "#",
  },
  {
    icon: Sparkles,
    title: "Customer stories",
    description: "Learn how our customers are using Untitled UI to 10x their growth.",
    href: "#",
  },
  {
    icon: PlayCircle,
    title: "Video tutorials",
    description: "Get up and running on our newest features and in-depth guides.",
    href: "#",
  },
  {
    icon: FileCode2,
    title: "Documentation",
    description: "In-depth articles on our tools and technologies to empower teams.",
    href: "#",
  },
]

export const companyLinks: MegaLinkItem[] = [
  {
    icon: Flag,
    title: "About us",
    description: "Learn about our team and what we're working towards.",
    href: "#",
  },
  {
    icon: MessageSquare,
    title: "Press",
    description: "News and writings, press releases, and press resources.",
    href: "#",
  },
  {
    icon: Users,
    title: "Careers",
    description: "We're always looking for talented people. Join our remote team!",
    href: "#",
    badge: "We're hiring!",
  },
  {
    icon: FolderOpen,
    title: "Legal",
    description: "Our company information, licensing information, terms, and privacy policy.",
    href: "#",
  },
]

export const tutorialItems: TutorialItem[] = [
  {
    title: "How to get started",
    description: "Jump right in—get an overview of the basics and get started on...",
    href: "#",
  },
  {
    title: "Advanced features",
    description: "Once you're ready, learn more about advanced analytics, features and...",
    href: "#",
  },
]
