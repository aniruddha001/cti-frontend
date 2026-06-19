import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { MenuItem } from "./menu-item";
import { SimpleDropdown } from "./simple-dropdown";
import { NavLink } from "./nav-link";
import { MobileNav } from "../../../nav/mobile-nav";
import { getPrimaryMenu } from '@/lib/api/menu'
import Logos from "../../../logos/Logos";

const FALLBACK_NAV = [
  { id: 'fb-home',    label: 'Home',    href: '/' },
  { id: 'fb-contact', label: 'Contact', href: '/contact' },
]

export default async function MegaMenu() {

  const menuItems = await getPrimaryMenu()
  const childIds = new Set(
    menuItems.flatMap(item => item.childItems?.nodes?.map(child => child.id) ?? [])
  )
  const topLevel = menuItems
    .filter(item => !childIds.has(item.id))
    .filter(item => item.label?.trim() && item.url !== undefined)


  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center hover:opacity-75 transition-opacity"
        >
             <Logos />
        </Link>
     
        {/* Navigation */}
        <NavigationMenu.Root className="hidden lg:flex">
          <NavigationMenu.List className="flex items-center gap-8">
            {topLevel.length === 0
              ? FALLBACK_NAV.map((item) => (
                  <NavLink key={item.id} href={item.href} label={item.label} />
                ))
              : topLevel.map((item) => {
                  const children = item.childItems?.nodes ?? [];
                  const hasMegaContent = children.some(
                    (child) => (child.childItems?.nodes?.length ?? 0) > 0
                  );

                  if (children.length > 0 && hasMegaContent) {
                    return (
                      <MenuItem
                        key={item.id}
                        label={item.label}
                        columns={children.map((column) => ({
                          title: column.label,
                          href: column.url || "#",
                          links:
                            column.childItems?.nodes?.map((link) => ({
                              id: link.id,
                              label: link.label,
                              href: link.url || "#",
                            })) ?? [],
                        }))}
                      />
                    );
                  }

                  if (children.length > 0) {
                    return (
                      <SimpleDropdown
                        key={item.id}
                        label={item.label}
                        children={children}
                      />
                    );
                  }

                  return (
                    <NavLink key={item.id} href={item.url || "#"} label={item.label} cssClasses={item.cssClasses} />
                  );
                })}
          </NavigationMenu.List>
        </NavigationMenu.Root>
        <MobileNav />
      </div>
    </header>
  );
}