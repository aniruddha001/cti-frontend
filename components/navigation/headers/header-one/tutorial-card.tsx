import Link from "next/link"
import { Play, PlayCircle } from "lucide-react"
import type { TutorialItem } from "./types"

export function TutorialCard({ item }: { item: TutorialItem }) {
  return (
    <div className="flex items-start gap-4">
      <div className="relative shrink-0 h-20 w-32 rounded-xl overflow-hidden bg-linear-to-br from-gray-300 to-gray-400">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm">
            <Play className="h-3.5 w-3.5 fill-violet-600 text-violet-600 ml-0.5" />
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 leading-snug">{item.title}</p>
        <p className="mt-1 text-sm text-gray-500 leading-snug line-clamp-2">
          {item.description}
        </p>
        <Link
          href={item.href}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors"
        >
          <PlayCircle className="h-4 w-4" />
          Watch video
        </Link>
      </div>
    </div>
  )
}
