"use client"

import { useState } from "react"
import type { CtiOptions } from "@/types/cti-settings-option"
import { siteConfig } from "@/site.config"
import LogoFooter from "@/public/CTI-Footer-Logo.png"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import * as Fa from "react-icons/fa6"
import type { IconType } from "react-icons"

interface Props {
  options?: CtiOptions | null
}

function SocialIcon({ icon }: { icon: string | null }) {
  if (!icon) return null
  const Icon = (Fa as Record<string, IconType>)[icon]
  if (!Icon) return null
  return <Icon className="w-5 h-5" />
}

export function Footer({ options }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const logo = options?.footerLogo
  const columns = options?.footerColumns ?? []
  const social = options?.footerSocial ?? []
  const bottomLinks = options?.footerBottomLinks ?? []
  const copyright = options?.footerCopyright
  const description = options?.footerDescription

  return (
    <footer className="bg-[#0d3b66]">
      <div className="mx-auto max-w-8xl px-6 sm:px-8 pt-12 pb-8">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">

          {/* Logo + description */}
          <div className="md:max-w-xs flex flex-col gap-4 shrink-0">
            <Link href="/" className="flex items-center">
              {logo?.url ? (
                <Image
                  src={logo.url}
                  alt={logo.alt || siteConfig.site_name}
                  width={logo.displayWidth || 130}
                  height={logo.displayHeight || 48}
                  style={{ height: "3rem", width: "auto" }}
                />
              ) : (
                <Image
                  src={LogoFooter}
                  alt={siteConfig.site_name}
                  className="dark:invert w-auto"
                  width={130}
                  height={80}
                  style={{ height: "3rem", width: "auto" }}
                />
              )}
            </Link>
            {description && (
              <p className="text-sm text-white/70 leading-relaxed">
                {description}
              </p>
            )}

            {/* Social icons */}
            {social.length > 0 && (
              <div className="flex gap-5">
                {social.filter(s => s.icon).map((s, i) => (
                  <a
                    key={`social-${i}-${s.platform}`}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <SocialIcon icon={s.icon} />
                    <span className="sr-only">{s.platform}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic link columns */}
          {columns.length > 0 && (
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-8">
              {columns.map((col, i) => {
                const isOpen = openIndex === i
                return (
                  <div key={i} className="border-b border-white/10 md:border-0">

                    {/* Heading row — clickable on mobile, static on desktop */}
                    <button
                      className="flex w-full items-center justify-between py-4 md:py-0 md:mb-6 md:cursor-default md:pointer-events-none"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <h2 className="text-base font-bold text-white uppercase">
                        {col.heading}
                      </h2>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-white/60 transition-transform duration-200 md:hidden",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>

                    {/* Links — accordion on mobile, always visible on desktop */}
                    <ul className={cn(
                      "text-white/60 text-base font-normal leading-none overflow-hidden",
                      "md:block md:pb-0",
                      isOpen ? "block pb-4" : "hidden"
                    )}>
                      {col.links.map((link, li) => (
                        <li key={`${i}-${li}-${link.url}`} className="mb-4 last:mb-0">
                          <Link href={link.url || "#"} className="hover:text-white hover:underline transition-colors">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>

                  </div>
                )
              })}
            </div>
          )}

        </div>

        <hr className="my-8 border-white/20 lg:my-10" />

        <div className="flex flex-col items-center gap-2 text-center">
          {copyright && (
            <span className="text-sm text-white/70">
              {copyright}
            </span>
          )}
          {bottomLinks.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4">
              {bottomLinks.map((link, i) => (
                <Link
                  key={`bottom-${i}-${link.url}`}
                  href={link.url || "#"}
                  className="text-sm text-white/70 hover:text-white hover:underline transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
