"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MenuItem } from "@/types/menu";

interface SimpleDropdownProps {
  label: string;
  children: MenuItem[];
}

export function SimpleDropdown({ label, children }: SimpleDropdownProps) {
  const pathname = usePathname();

  if (children.length === 0) return null;

  const isActive = children.some(
    (child) => child.url !== "#" && (pathname === child.url || pathname.startsWith(child.url + "/"))
  );

  return (
    <NavigationMenu.Item className="relative">
      <NavigationMenu.Trigger
        className={cn(
          "group flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : ""
        )}
      >
        {label}
        <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </NavigationMenu.Trigger>

      <NavigationMenu.Content className="absolute top-full right-0 mt-7 min-w-45 rounded-md border bg-white py-2 shadow-lg z-50">
        {children.map((child) => {
          const isChildActive = child.url !== "#" && (pathname === child.url || pathname.startsWith(child.url + "/"));
          return (
            <Link
              key={child.id}
              href={child.url || "#"}
              className={cn(
                "block px-4 py-2 text-sm transition-colors hover:bg-gray-50",
                isChildActive ? "text-primary font-semibold bg-gray-50" : ""
              )}
            >
              {child.label}
            </Link>
          );
        })}
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}
