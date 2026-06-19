export const GET_CTI_SETTINGS_OPTION = `
  query CtiOptions {
    ctiOptions {
      logoPrimary {
        id
        url
        width
        height
        alt
        displayWidth
        displayHeight
      }
      logoDark {
        id
        url
        width
        height
        alt
        displayWidth
        displayHeight
      }
      favicon {
        id
        url
        width
        height
        alt
      }
      headerTemplate
      headerSticky
      headerStickyOffset
      headerCtaShow
      headerCtaLabel
      headerCtaUrl
      footerTemplate
      footerCopyright
      footerDescription
      footerLogo {
        id
        url
        width
        height
        alt
        displayWidth
        displayHeight
      }
      footerColumns {
        heading
        headingLink
        links {
          label
          url
        }
      }
      footerSocial {
        platform
        url
        icon
      }
      footerBottomLinks {
        label
        url
      }
      footerHideOn
    }
  }
`