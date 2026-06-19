import { wpGraphQL } from '@/lib/graphql/client'
import { GET_PRIMARY_MENU } from '@/lib/graphql/queries/menu.queries'
import { MenuData, MenuItem } from '@/types/menu'

const WP_BASE = (process.env.WORDPRESS_URL ?? '').replace(/\/$/, '')

function toRelativeUrl(url: string): string {
  if (!url) return '/'
  if (WP_BASE && url.startsWith(WP_BASE)) {
    const path = url.slice(WP_BASE.length) || '/'
    return path.startsWith('/') ? path : `/${path}`
  }
  return url
}

function normalizeItem(item: MenuItem): MenuItem {
  return {
    ...item,
    url: toRelativeUrl(item.url),
    childItems: item.childItems
      ? { nodes: item.childItems.nodes.map(normalizeItem) }
      : undefined,
  }
}

export async function getPrimaryMenu(): Promise<MenuItem[]> {
  try {
    const data = await wpGraphQL<MenuData>(
      GET_PRIMARY_MENU,
      {},
      3600
    )
    const raw = data.menus.nodes[0]?.menuItems.nodes ?? []

    // WPGraphQL returns all items flat regardless of parentId filter,
    // so collect child/grandchild IDs and filter to true top-level only.
    const childIds = new Set(raw.flatMap(item => {
      const l1 = item.childItems?.nodes ?? []
      const l2 = l1.flatMap(c => c.childItems?.nodes ?? [])
      return [...l1, ...l2].map(n => n.id)
    }))

    return raw
      .filter(item => !childIds.has(item.id))
      .map(normalizeItem)
  } catch (error) {
    console.error('Failed to fetch menu:', error)
    return []
  }
}