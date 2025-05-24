// Removed Tina types to decouple app types from CMS schema
// If you need Tina types, import them directly in your data layer, not here

/**
 * Block component props for specific block components
 */
export interface BlockComponentProps<T> {
  data: T;
  className?: string;
}

// --- Global Settings Types ---
export interface AlertBanner {
  alertLabel: string;
  alertLink: string;
  alertLinkText: string;
}

export interface GenericImage {
  src: string;
  alt: string;
}

export interface FeaturedCard {
  image: GenericImage;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  layout?: string;
}

export interface SubNavItem {
  label: string;
  href: string;
  icon?: string;
  variant?: string;
  description?: string;
}

export interface MainNavItem {
  label: string;
  href?: string;
  featuredCards?: FeaturedCard[];
  subItems?: SubNavItem[];
}

export interface FooterContact {
  phone?: string;
  textNumber?: string;
  email?: string;
}

export interface FooterSocial {
  platform: string;
  url: string;
}

export interface FooterSettings {
  contact?: FooterContact;
  social?: FooterSocial[];
  companyName?: string;
}

export interface Navigation {
  mainNav?: MainNavItem[];
  footer?: FooterSettings;
}

export interface GlobalSettings {
  alertBanner?: AlertBanner;
  navigation?: Navigation;
}
