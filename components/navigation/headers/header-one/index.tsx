"use client"

import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { HoverDropdown } from "./hover-dropdown"
import { DynamicMegaMenu } from "./dynamic-mega-menu"
import type { CtiOptions } from "@/types/cti-settings-option"
import type { MenuItem } from "@/types/menu"

function MobileMenu({
  navItems,
  ctaItems,
  onClose,
}: {
  navItems: MenuItem[]
  ctaItems: MenuItem[]
  onClose: () => void
}) {
  const [openL1, setOpenL1] = useState<string | null>(null)
  const [openL2, setOpenL2] = useState<string | null>(null)

  return (
    <div className="relative z-50 mx-auto max-w-8xl mt-2 border border-gray-200 bg-white shadow-sm px-4 py-3 lg:hidden">
      {navItems.map((item) => {
        const l1Children = item.childItems?.nodes ?? []
        const isL1Open = openL1 === item.id

        if (l1Children.length === 0) {
          return (
            <Link
              key={item.id}
              href={item.url}
              className="block rounded-none px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              {item.label}
            </Link>
          )
        }

        return (
          <div key={item.id}>
            {/* L1 accordion toggle */}
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-none px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => { setOpenL1(isL1Open ? null : item.id); setOpenL2(null) }}
            >
              {item.label}
              <ChevronRight className={cn("h-4 w-4 text-gray-400 transition-transform duration-200", isL1Open && "rotate-90")} />
            </button>

            {isL1Open && (
              <div className="ml-3 border-l border-gray-100 pl-3 mb-1">
                {l1Children.map((child) => {
                  const l2Children = child.childItems?.nodes ?? []
                  const isL2Open = openL2 === child.id

                  if (l2Children.length === 0) {
                    return (
                      <Link
                        key={child.id}
                        href={child.url}
                        className="block rounded-none px-3 py-2 transition-colors hover:bg-gray-50 group"
                        onClick={onClose}
                      >
                        <span className="text-sm font-medium text-gray-700 group-hover:text-violet-600">
                          {child.label}
                        </span>
                        {child.menuDescription && (
                          <span className="block text-xs text-gray-500 mt-0.5 leading-snug">
                            {child.menuDescription}
                          </span>
                        )}
                      </Link>
                    )
                  }

                  return (
                    <div key={child.id}>
                      {/* L2 accordion toggle */}
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-none px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setOpenL2(isL2Open ? null : child.id)}
                      >
                        <span>{child.label}</span>
                        <ChevronRight className={cn("h-3.5 w-3.5 text-gray-400 transition-transform duration-200", isL2Open && "rotate-90")} />
                      </button>

                      {isL2Open && (
                        <div className="ml-3 border-l border-gray-100 pl-3 mb-1">
                          {l2Children.map((grandchild) => (
                            <Link
                              key={grandchild.id}
                              href={grandchild.url}
                              className="block rounded-none px-3 py-2 transition-colors hover:bg-gray-50 group"
                              onClick={onClose}
                            >
                              <span className="text-sm text-gray-600 group-hover:text-violet-600">
                                {grandchild.label}
                              </span>
                              {grandchild.menuDescription && (
                                <span className="block text-xs text-gray-500 mt-0.5 leading-snug">
                                  {grandchild.menuDescription}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}

      {ctaItems.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
          {ctaItems.map(item => (
            <Link
              key={item.id}
              href={item.url}
              className="block rounded-none bg-violet-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-violet-700"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

interface Props {
  options: CtiOptions | null
  menuItems: MenuItem[]
}

export default function HeaderOne({ options, menuItems }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isSticky = options?.headerSticky ?? false
  const stickyOffset = options?.headerStickyOffset ?? 0
  const logo = options?.logoPrimary
  const showCta = options?.headerCtaShow
  const ctaLabel = options?.headerCtaLabel
  const ctaUrl = options?.headerCtaUrl

  useEffect(() => {
    if (!isSticky) return
    const handleScroll = () => setScrolled(window.scrollY > stickyOffset)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isSticky, stickyOffset])

  // Separate CTA items (nav-cta class) from regular nav items
  const navItems = menuItems.filter(item => !item.cssClasses?.includes("nav-cta"))
  const ctaItems = menuItems.filter(item => item.cssClasses?.includes("nav-cta"))

  return (
    <div
      className={cn(
        "px-4 pt-4 pb-2 bg-gray-50 transition-shadow duration-200",
        isSticky && "sticky top-0 z-40",
        isSticky && scrolled && "shadow-md",
      )}
    >
      <NavigationMenu.Root className="relative w-full">

        {/* Floating header card */}
        <div className="mx-auto max-w-8xl rounded-none px-5 py-3 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            {logo?.url ? (
              <Image
                src={logo.url}
                alt={logo.alt || "Logo"}
                width={logo.displayWidth || 120}
                height={logo.displayHeight || 40}
                priority
                style={{ height: logo.displayHeight || 40, width: "auto" }}
              />
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-none bg-violet-600">
                <span className="text-xs font-bold text-white">CTI</span>
              </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <NavigationMenu.List className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const children = item.childItems?.nodes ?? []

              // Does any L1 child itself have children? → mega menu
              const isMega = children.some(c => (c.childItems?.nodes?.length ?? 0) > 0)

              if (children.length === 0) {
                // Plain link
                return (
                  <NavigationMenu.Item key={item.id}>
                    <Link
                      href={item.url}
                      className="block rounded-none px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </NavigationMenu.Item>
                )
              }

              if (isMega) {
                // Mega menu — rendered inside Radix Viewport
                return (
                  <NavigationMenu.Item key={item.id} className="relative">
                    <NavigationMenu.Trigger
                      className={cn(
                        "flex items-center gap-1 rounded-none px-3 py-2 text-sm font-medium text-gray-600",
                        "hover:bg-gray-50 hover:text-gray-900 transition-colors",
                        "data-[state=open]:bg-gray-50 data-[state=open]:text-gray-900",
                      )}
                    >
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 text-gray-400 transition-transform duration-200 data-[state=open]:rotate-180" />
                    </NavigationMenu.Trigger>
                    <DynamicMegaMenu sections={children} />
                  </NavigationMenu.Item>
                )
              }

              // Simple hover dropdown — one level of children
              return (
                <NavigationMenu.Item key={item.id}>
                  <HoverDropdown
                    label={item.label}
                    items={children.map(c => ({
                      label: c.label,
                      url: c.url,
                      menuIcon: c.menuIcon,
                      menuDescription: c.menuDescription,
                    }))}
                  />
                </NavigationMenu.Item>
              )
            })}
          </NavigationMenu.List>

          {/* Right — CTA buttons */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* nav-cta items from WordPress menu */}
            {ctaItems.map(item => (
              <Link
                key={item.id}
                href={item.url}
                className="relative overflow-hidden rounded-none bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-violet-500/40 hover:bg-violet-700 hover:shadow-violet-500/60 transition-all duration-300 group"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
                <span className="relative">{item.label}</span>
              </Link>
            ))}
            {/* CtiOptions CTA (if configured and no nav-cta from menu) */}
            {ctaItems.length === 0 && showCta && ctaLabel && (
              <Link
                href={ctaUrl || "#"}
                className="relative overflow-hidden rounded-none bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-violet-500/40 hover:bg-violet-700 hover:shadow-violet-500/60 transition-all duration-300 group"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
                <span className="relative">{ctaLabel}</span>
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-none text-gray-600 hover:bg-gray-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

        </div>

        {/* Viewport — desktop dropdowns only */}
        <div className="hidden lg:block absolute top-full left-1/2 -translate-x-1/2 w-full max-w-8xl z-50">
          <NavigationMenu.Viewport className="w-full mt-3" />
        </div>

      </NavigationMenu.Root>

      {/* Mobile menu */}
      {mobileOpen && (
        <MobileMenu
          navItems={navItems}
          ctaItems={ctaItems}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </div>
  )
}
