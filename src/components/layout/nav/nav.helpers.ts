import { FeaturedCard } from "./header.types";

// Define the type for the featured card from the GraphQL schema
type GlobalNavFeaturedCard = {
  __typename?: "GlobalNavigationMainNavFeaturedCards";
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  layout?: string | null;
  image?: {
    __typename?: "GlobalNavigationMainNavFeaturedCardsImage";
    src: string;
    alt: string;
  } | null;
};

// Helper to map GraphQL featuredCards to local FeaturedCard type
export const mapFeaturedCards = (
  cards: Array<GlobalNavFeaturedCard | null> | null | undefined
): (FeaturedCard | null)[] => {
  if (!cards) return [];
  return cards.map((card) => {
    if (!card) return null;
    if (!card.title || !card.description || !card.ctaText || !card.ctaLink)
      return null;

    const image =
      card.image && card.image.src && card.image.alt
        ? { src: card.image.src, alt: card.image.alt }
        : { src: "", alt: "" };

    let layout: "vertical" | "horizontal" | undefined = undefined;
    if (card.layout === "vertical" || card.layout === "horizontal") {
      layout = card.layout;
    }

    return {
      title: card.title,
      description: card.description,
      ctaText: card.ctaText,
      ctaLink: card.ctaLink,
      layout,
      image,
    };
  });
};
