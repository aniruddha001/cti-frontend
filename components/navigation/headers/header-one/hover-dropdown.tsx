"use client"

import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { DynamicIcon } from "./dynamic-icon"

export interface DropdownItem {
  label: string
  url: string
  menuIcon?: string
  menuDescription?: string
}

interface Props {
  label: string
  items: DropdownItem[]
}

export function HoverDropdown({ label, items }: Props) {
  return (
    <>
      <NavigationMenu.Trigger
        className={cn(
          "flex items-center gap-1 rounded-none px-3 py-2 text-sm font-medium text-gray-600",
          "hover:bg-gray-50 hover:text-gray-900 transition-colors outline-none",
          "data-[state=open]:bg-gray-50 data-[state=open]:text-gray-900",
        )}
      >
        {label}
        <ChevronDown className="h-3.5 w-3.5 text-gray-400 transition-transform duration-200 data-[state=open]:rotate-180" />
      </NavigationMenu.Trigger>

      <NavigationMenu.Content className="w-full border border-gray-100 bg-white shadow-lg overflow-hidden">
        <div
          className="grid gap-1 p-4"
          style={{ gridTemplateColumns: `repeat(${Math.min(items.length, 3)}, 1fr)` }}
        >
          {items.map((item, i) => (
            <Link
              key={`${i}-${item.url}-${item.label}`}
              href={item.url}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              {item.menuIcon && (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 mt-0.5">
                  <DynamicIcon name={item.menuIcon} className="h-4 w-4 text-violet-600" />
                </span>
              )}
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
          ))}
        </div>
      </NavigationMenu.Content>
    </>
  )
}
