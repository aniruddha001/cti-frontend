"use client"

import dynamic from "next/dynamic"
import type { CtiOptions } from "@/types/cti-settings-option"
import type { MenuItem } from "@/types/menu"

const HeaderOne = dynamic(() => import("./header-one"), { ssr: false })

interface Props {
  options: CtiOptions | null
  menuItems: MenuItem[]
}

export default function HeaderOneClient({ options, menuItems }: Props) {
  return <HeaderOne options={options} menuItems={menuItems} />
}
