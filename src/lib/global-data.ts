import client from "../../tina/__generated__/client";
import {
  GlobalNavigation,
  GlobalNavigationMainNav,
  GlobalNavigationMainNavFeaturedCards,
  GlobalNavigationMainNavSubItems,
  GlobalNavigationFooter,
  GlobalNavigationFooterContact,
  GlobalNavigationFooterSocial,
  GlobalAlertBanner,
} from "../../tina/__generated__/types";
import {
  GlobalSettings,
  AlertBanner,
  Navigation,
  MainNavItem,
  FeaturedCard,
  SubNavItem,
  FooterSettings,
  FooterContact,
  FooterSocial,
} from "./component-types";

function mapAlertBanner(
  alertBanner: GlobalAlertBanner | null | undefined
): AlertBanner | undefined {
  if (!alertBanner) return undefined;
  return {
    alertLabel: alertBanner.alertLabel ?? "",
    alertLink: alertBanner.alertLink ?? "",
    alertLinkText: alertBanner.alertLinkText ?? "",
  };
}

function mapFeaturedCard(
  card: GlobalNavigationMainNavFeaturedCards | null | undefined
): FeaturedCard {
  return {
    image: {
      src: card?.image?.src ?? "",
      alt: card?.image?.alt ?? "",
    },
    title: card?.title ?? "",
    description: card?.description ?? "",
    ctaText: card?.ctaText ?? "",
    ctaLink: card?.ctaLink ?? "",
    layout: card?.layout ?? undefined,
  };
}

function mapSubNavItem(
  item: GlobalNavigationMainNavSubItems | null | undefined
): SubNavItem {
  return {
    label: item?.label ?? "",
    href: item?.href ?? "",
    icon: item?.icon ?? undefined,
    variant: item?.variant ?? undefined,
    description: item?.description ?? undefined,
  };
}

function mapMainNavItem(
  item: GlobalNavigationMainNav | null | undefined
): MainNavItem {
  return {
    label: item?.label ?? "",
    href: item?.href ?? undefined,
    featuredCards: item?.featuredCards?.filter(Boolean).map(mapFeaturedCard),
    subItems: item?.subItems?.filter(Boolean).map(mapSubNavItem),
  };
}

function mapFooterContact(
  contact: GlobalNavigationFooterContact | null | undefined
): FooterContact {
  return {
    phone: contact?.phone ?? undefined,
    textNumber: contact?.textNumber ?? undefined,
    email: contact?.email ?? undefined,
  };
}

function mapFooterSocial(
  social: GlobalNavigationFooterSocial | null | undefined
): FooterSocial {
  return {
    platform: social?.platform ?? "",
    url: social?.url ?? "",
  };
}

function mapFooterSettings(
  footer: GlobalNavigationFooter | null | undefined
): FooterSettings {
  return {
    contact: mapFooterContact(footer?.contact),
    social: footer?.social?.filter(Boolean).map(mapFooterSocial),
    companyName: footer?.companyName ?? undefined,
  };
}

function mapNavigation(
  navigation: GlobalNavigation | null | undefined
): Navigation {
  return {
    mainNav: navigation?.mainNav?.filter(Boolean).map(mapMainNavItem),
    footer: mapFooterSettings(navigation?.footer),
  };
}

export async function fetchGlobalSettings(): Promise<
  GlobalSettings | undefined
> {
  const result = await client.queries.global({
    relativePath: "Navigation_Data.yaml",
  });
  const global = result.data.global;
  if (!global) return undefined;
  return {
    alertBanner: mapAlertBanner(global.alertBanner),
    navigation: mapNavigation(global.navigation),
  };
}
