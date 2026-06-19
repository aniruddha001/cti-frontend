"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MenuLinkProps {
  href: string;
  label: string;
}

export function MenuLink({ href, label }: MenuLinkProps) {
  const pathname = usePathname();
  const isActive = href !== "#" && (pathname === href || pathname.startsWith(href + "/"));

  return (
    <Link
      href={href}
      className={cn(
        "block py-1 text-sm transition-colors hover:text-primary",
        isActive ? "text-primary font-semibold" : "text-muted-foreground"
      )}
    >
      {label}
    </Link>
  );
}