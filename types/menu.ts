export interface MenuMedia {
  id: number
  url: string
  alt: string
  mimeType: string
}

export interface MenuItem {
  id: string
  label: string
  url: string
  parentId: string | null
  cssClasses?: string[]
  menuIcon?: string
  menuDescription?: string
  menuMedia?: MenuMedia | null
  childItems?: {
    nodes: MenuItem[]
  }
}

export interface MenuData {
  menus: {
    nodes: {
      id: string
      name: string
      menuItems: {
        nodes: MenuItem[]
      }
    }[]
  }
}

export interface MegaMenuColumn {
  title: string
  href: string
  links: MegaMenuLink[]
}

export interface MegaMenuLink {
  id: string
  label: string
  href: string
}
