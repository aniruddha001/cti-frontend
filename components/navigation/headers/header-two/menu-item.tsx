"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MegaContent } from "./mega-content";
import { MegaMenuColumn } from "@/types/menu";

interface MenuItemProps {
  label: string;
  columns: MegaMenuColumn[];
}

export function MenuItem({ label, columns }: MenuItemProps) {
  const pathname = usePathname();
  const isActive = columns.some(
    (col) =>
      (col.href !== "#" && (pathname === col.href || pathname.startsWith(col.href + "/"))) ||
      col.links.some(
        (link) => link.href !== "#" && (pathname === link.href || pathname.startsWith(link.href + "/"))
      )
  );

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger
        className={cn(
          "group flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : ""
        )}
      >
        {label}
        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </NavigationMenu.Trigger>

      <MegaContent columns={columns} />
    </NavigationMenu.Item>
  );
}