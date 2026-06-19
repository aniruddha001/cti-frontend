"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { MegaColumn } from "./mega-column";
import { MegaMenuColumn } from "@/types/menu";

interface MegaContentProps {
  columns: MegaMenuColumn[];
}

export function MegaContent({ columns }: MegaContentProps) {
  const columnItems = columns.filter((c) => c.links.length > 0);
  const plainLinks = columns.filter((c) => c.links.length === 0);

  if (columnItems.length === 0 && plainLinks.length === 0) return null;

  return (
    <>
      <div className="max-w-8xl">
        <NavigationMenu.Content className="absolute left-0 top-full mt-6 w-max rounded-xl border bg-white p-6 shadow-xl z-50">
          {plainLinks.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-x-6 gap-y-1 border-b pb-4">
              {plainLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}

          {columnItems.length > 0 && (
            <div className="grid grid-cols-3 gap-8">
              {columnItems.map((column) => (
                <MegaColumn key={column.title} {...column} />
              ))}
            </div>
          )}
        </NavigationMenu.Content>
      </div>
    </>
  );
}