import HeaderOneClient from "./header-one-client"
import MegaMenu from "./header-two/megamenu"
import type { CtiOptions } from "@/types/cti-settings-option"
import type { MenuItem } from "@/types/menu"

interface Props {
  options: CtiOptions | null
  menuItems: MenuItem[]
}

export default function ActiveHeader({ options, menuItems }: Props) {
  switch (options?.headerTemplate) {
    case "Header-two":
      return <MegaMenu />
    case "Header-one":
    default:
      return <HeaderOneClient options={options} menuItems={menuItems} />
  }
}
