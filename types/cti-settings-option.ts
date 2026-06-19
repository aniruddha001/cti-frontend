export interface MediaItem {
  id: string;
  url: string;
  width: number;
  height: number;
  alt: string;
  displayWidth: number;
  displayHeight: number;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterColumn {
  heading: string;
  headingLink: string | null;
  links: FooterLink[];
}

export interface FooterSocial {
  platform: string;
  url: string;
  icon: string | null;
}

export interface FooterBottomLink {
  label: string;
  url: string;
}

export interface CtiOptions {
  logoPrimary: MediaItem | null;
  logoDark: MediaItem | null;
  favicon: MediaItem | null;

  headerTemplate: string | null;
  headerSticky: boolean;
  headerStickyOffset: number | null;

  headerCtaShow: boolean;
  headerCtaLabel: string | null;
  headerCtaUrl: string | null;

  footerTemplate: string | null;
  footerCopyright: string | null;
  footerDescription: string | null;

  footerLogo: MediaItem | null;

  footerColumns: FooterColumn[];
  footerSocial: FooterSocial[];
  footerBottomLinks: FooterBottomLink[];

  footerHideOn: string[];
}

export interface CtiOptionsResponse {
  ctiOptions: CtiOptions;
}
