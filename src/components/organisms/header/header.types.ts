export type HeaderProps = {
  navigation: NavigationItem[];
};

export type MainNavProps = {
  navigation: NavigationItem[];
  logo?: string;
  logoText: string;
};

export type SubItem = {
  label: string;
  href: string;
  icon?: string;
};

export type NavigationItem = {
  label: string;
  href: string;
  subItems?: SubItem[];
};
