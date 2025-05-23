import { GetGlobalQuery } from "@/lib/__generated__/types";

export type MainNavProps = {
  navigation: NonNullable<GetGlobalQuery["global"]["navigation"]>;
};

export type SubItem = NonNullable<
  NonNullable<GetGlobalQuery["global"]>["navigation"]
>["mainNav"] extends (infer T)[] | null | undefined
  ? T extends { subItems?: (infer S)[] | null }
    ? S
    : never
  : never;

export type FeaturedCard = NonNullable<
  NonNullable<GetGlobalQuery["global"]>["navigation"]
>["mainNav"] extends (infer T)[] | null | undefined
  ? T extends { featuredCards?: (infer F)[] | null }
    ? F
    : never
  : never;
