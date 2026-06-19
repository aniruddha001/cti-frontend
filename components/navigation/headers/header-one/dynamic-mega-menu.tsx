import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import Link from "next/link"
import Image from "next/image"
import { DynamicIcon } from "./dynamic-icon"
import type { MenuItem } from "@/types/menu"

interface Props {
  sections: MenuItem[] // L1 children — each may have L2 children
}

function MediaThumb({ item }: { item: MenuItem }) {
  const media = item.menuMedia
  if (!media?.url) return null

  const isVideo = media.mimeType.startsWith("video")

  return isVideo ? (
    <div className="relative shrink-0 h-16 w-28 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
      <video
        src={media.url}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <div className="h-7 w-7 rounded-full bg-white/90 flex items-center justify-center">
          <DynamicIcon name="play" className="h-3 w-3 fill-violet-600 text-violet-600 ml-0.5" />
        </div>
      </div>
    </div>
  ) : (
    <div className="relative shrink-0 h-16 w-28 rounded-lg overflow-hidden bg-gray-100">
      <Image
        src={media.url}
        alt={media.alt || item.label}
        fill
        className="object-cover"
        sizes="112px"
      />
    </div>
  )
}

function MegaCard({ item }: { item: MenuItem }) {
  const hasMedia = !!item.menuMedia?.url

  return (
    <Link
      href={item.url}
      className="flex items-start gap-3 py-3 group"
    >
      {/* Media thumbnail — shown if set */}
      {hasMedia && <MediaThumb item={item} />}

      {/* Icon — shown if set and no media */}
      {!hasMedia && item.menuIcon && (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 mt-0.5">
          <DynamicIcon
            name={item.menuIcon}
            className="h-4 w-4 text-violet-600"
          />
        </span>
      )}

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 group-hover:text-violet-600 transition-colors leading-snug">
          {item.label}
        </p>
        {item.menuDescription && (
          <p className="mt-0.5 text-sm text-gray-500 leading-snug line-clamp-2">
            {item.menuDescription}
          </p>
        )}
      </div>
    </Link>
  )
}

export function DynamicMegaMenu({ sections }: Props) {
  return (
    <NavigationMenu.Content className="w-full border border-gray-100 bg-white shadow-lg overflow-hidden">
      <div
        className="grid divide-x divide-y divide-gray-100"
        style={{ gridTemplateColumns: `repeat(${Math.min(sections.length, 3)}, 1fr)` }}
      >
        {sections.map((section) => {
          const grandchildren = section.childItems?.nodes ?? []
          const isLeaf = grandchildren.length === 0

          return (
            <div key={section.id} className="px-6 py-6">

              {isLeaf ? (
                // No grandchildren — render the section itself as a card (with icon/description if set, plain link if not)
                <MegaCard item={section} />
              ) : (
                <>
                  {/* Section heading */}
                  {section.url && section.url !== "#" ? (
                    <Link
                      href={section.url}
                      className="mb-3 block text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors"
                    >
                      {section.label}
                    </Link>
                  ) : (
                    <p className="mb-3 text-sm font-semibold text-violet-600">
                      {section.label}
                    </p>
                  )}

                  {/* L2 grandchildren — rich cards if they have icon/description/media, plain links otherwise */}
                  <div className="divide-y divide-gray-100">
                    {grandchildren.map((child) => {
                      const isRich = child.menuIcon || child.menuDescription || child.menuMedia

                      return isRich ? (
                        <MegaCard key={child.id} item={child} />
                      ) : (
                        <Link
                          key={child.id}
                          href={child.url}
                          className="flex items-center py-2.5 text-sm text-gray-700 hover:text-violet-600 transition-colors"
                        >
                          {child.label}
                        </Link>
                      )
                    })}
                  </div>
                </>
              )}

            </div>
          )
        })}
      </div>
    </NavigationMenu.Content>
  )
}
