import client from "../../tina/__generated__/client";
import { GlobalQuery } from "../../tina/__generated__/types";
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
  alertBanner: GlobalQuery["global"]["alertBanner"]
): AlertBanner | undefined {
  if (!alertBanner) return undefined;
  return {
    alertLabel: alertBanner.alertLabel ?? "",
    alertLink: alertBanner.alertLink ?? "",
    alertLinkText: alertBanner.alertLinkText ?? "",
  };
}

function mapFeaturedCard(card: any): FeaturedCard {
  return {
    image: {
      src: card.image?.src ?? "",
      alt: card.image?.alt ?? "",
    },
    title: card.title ?? "",
    description: card.description ?? "",
    ctaText: card.ctaText ?? "",
    ctaLink: card.ctaLink ?? "",
    layout: card.layout,
  };
}

function mapSubNavItem(item: any): SubNavItem {
  return {
    label: item.label ?? "",
    href: item.href ?? "",
    icon: item.icon,
    variant: item.variant,
    description: item.description,
  };
}

function mapMainNavItem(item: any): MainNavItem {
  return {
    label: item.label ?? "",
    href: item.href,
    featuredCards: item.featuredCards?.map(mapFeaturedCard),
    subItems: item.subItems?.map(mapSubNavItem),
  };
}

function mapFooterContact(contact: any): FooterContact {
  return {
    phone: contact?.phone,
    textNumber: contact?.textNumber,
    email: contact?.email,
  };
}

function mapFooterSocial(social: any): FooterSocial {
  return {
    platform: social.platform ?? "",
    url: social.url ?? "",
  };
}

function mapFooterSettings(footer: any): FooterSettings {
  return {
    contact: mapFooterContact(footer?.contact),
    social: footer?.social?.map(mapFooterSocial),
    companyName: footer?.companyName,
  };
}

function mapNavigation(navigation: any): Navigation {
  return {
    mainNav: navigation?.mainNav?.map(mapMainNavItem),
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
