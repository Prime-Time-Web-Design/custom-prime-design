import {
  MainNavItem,
  SubNavItem,
  FeaturedCard as LocalFeaturedCard,
  FooterSettings,
} from "@/lib/component-types";

export type MainNavProps = {
  navigation: {
    mainNav?: MainNavItem[];
    footer?: FooterSettings;
  };
};

export type SubItem = SubNavItem;
export type FeaturedCard = LocalFeaturedCard;
