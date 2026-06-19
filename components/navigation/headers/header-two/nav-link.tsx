"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  cssClasses?: string[];
}

export function NavLink({ href, label, cssClasses }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href !== "#" && (pathname === href || pathname.startsWith(href + "/"));
  const isCta = cssClasses?.includes("nav-cta");

  return (
    <NavigationMenu.Item>
      <Link
        href={href}
        className={
          isCta
            ? "group h-10 px-5 py-2 rounded-none bg-cta text-cta border-2 border-[#00aaa4] shadow-lg shadow-cta/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:bg-cta-hover hover:border-cta-hover hover:text-cta hover:shadow-xl hover:shadow-cta/60"
            : cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "",
                cssClasses?.join(" ")
              )
        }
      >
        {label}
      </Link>
    </NavigationMenu.Item>
  );
}
