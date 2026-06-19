import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import Link from "next/link"
import { BookOpenCheck } from "lucide-react"
import { resourcesLinks, companyLinks, tutorialItems } from "./data"
import { MegaLinkRow } from "./mega-link-row"
import { TutorialCard } from "./tutorial-card"

export function ResourcesMegaMenu() {
  return (
    <NavigationMenu.Content className="w-full border border-gray-100 bg-white shadow-lg overflow-hidden">
      <div className="grid grid-cols-[1fr_1fr_1.25fr] divide-x divide-gray-100">

        {/* Column 1 — Resources */}
        <div className="px-8 py-7">
          <p className="mb-2 text-sm font-semibold text-violet-600">Resources</p>
          <div className="divide-y divide-gray-100">
            {resourcesLinks.map((item) => (
              <MegaLinkRow key={item.title} item={item} />
            ))}
          </div>
        </div>

        {/* Column 2 — Company */}
        <div className="px-8 py-7">
          <p className="mb-2 text-sm font-semibold text-violet-600">Company</p>
          <div className="divide-y divide-gray-100">
            {companyLinks.map((item) => (
              <MegaLinkRow key={item.title} item={item} />
            ))}
          </div>
        </div>

        {/* Column 3 — Tutorials + CTAs */}
        <div className="px-8 py-7 flex flex-col justify-between">
          <div>
            <p className="mb-5 text-sm font-semibold text-violet-600">Tutorials</p>
            <div className="space-y-6">
              {tutorialItems.map((item) => (
                <TutorialCard key={item.title} item={item} />
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <Link
              href="#"
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              <BookOpenCheck className="h-4 w-4" />
              Documentation
            </Link>
            <Link
              href="#"
              className="flex flex-1 items-center justify-center rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700 transition-colors whitespace-nowrap"
            >
              View all posts
            </Link>
          </div>
        </div>

      </div>
    </NavigationMenu.Content>
  )
}
