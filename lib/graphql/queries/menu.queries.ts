const MENU_ITEM_FIELDS = `
  id
  label
  url
  cssClasses
  menuIcon
  menuDescription
  menuMedia {
    id
    url
    alt
    mimeType
  }
`

export const GET_PRIMARY_MENU = `
query GetPrimaryMenu {
  menus(where: { location: PRIMARY }) {
    nodes {
      id
      name

      menuItems(first: 100, where: { parentId: null }) {
        nodes {
          ${MENU_ITEM_FIELDS}

          childItems(first: 100) {
            nodes {
              ${MENU_ITEM_FIELDS}

              childItems(first: 100) {
                nodes {
                  ${MENU_ITEM_FIELDS}
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
