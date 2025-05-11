import { GlobalQuery } from "../../../../tina/__generated__/types";

export type NavigationData = {
  data: {
    global: {
      navigation: {
        mainNav: NavigationItem[];
      };
    };
  };
};

export type HeaderProps = {
  navigation: GlobalQuery["global"]["navigation"];
};

export type MainNavProps = {
  navigation: GlobalQuery["global"]["navigation"];
};

export type AlertBannerProps = {
  alertBanner: GlobalQuery["global"]["alertBanner"];
};

export type SubItem = {
  __typename: "GlobalNavigationMainNavSubItems";
  label: string;
  href: string;
  icon?: string | null;
  variant?: string | null;
  description?: string | null;
};

export type FeaturedCard = {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  layout?: "vertical" | "horizontal";
};

export type NavigationItem = {
  __typename: "GlobalNavigationMainNav";
  label: string;
  href: string;
  subItems?: Array<SubItem | null> | null;
  featuredCards?: Array<FeaturedCard | null> | null;
};
