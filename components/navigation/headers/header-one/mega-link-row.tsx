import Link from "next/link"
import type { MegaLinkItem } from "./types"

export function MegaLinkRow({ item }: { item: MegaLinkItem }) {
  const Icon = item.icon
  return (
    <Link href={item.href} className="flex items-start gap-3 py-3 group">
      <Icon className="h-5 w-5 shrink-0 mt-0.5 text-violet-600" />
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">
            {item.title}
          </span>
          {item.badge && (
            <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-0.5 text-xs font-medium text-gray-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              {item.badge}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-sm text-gray-500 leading-snug">
          {item.description}
        </p>
      </div>
    </Link>
  )
}
