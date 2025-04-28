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

// export type HomeSchema = {
//   data: {
//     page: PageQuery["page"];
//   };
//   variables: {
//     relativePath: string;
//   };
//   query: string;
// };

export type HeaderProps = {
  navigation: GlobalQuery["global"]["navigation"];
};

export type MainNavProps = {
  navigation: GlobalQuery["global"]["navigation"];
};

export type SubItem = {
  __typename: "GlobalNavigationMainNavSubItems";
  label: string;
  href: string;
  icon?: string | null;
  variant?: string | null;
};

export type NavigationItem = {
  __typename: "GlobalNavigationMainNav";
  label: string;
  href: string;
  subItems?: Array<SubItem | null> | null;
};
