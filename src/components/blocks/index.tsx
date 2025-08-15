"use client";
import {
  PageBlocks,
  PageBlocksAppointmentBookingBlock,
  PageBlocksBannerBlock,
  PageBlocksCarouselBlock,
  PageBlocksCtaBlock,
  PageBlocksHeaderBlock,
  PageBlocksHero,
  PageBlocksNewsletterSignupBlock,
  PageBlocksPricingBlock,
  PageBlocksRichTextBlock,
  PageBlocksServiceListingBlock,
} from "../../../tina/__generated__/types";

import { AppointmentBookingBlock } from "./AppointmentBookingBlock";
import { HeroBlock } from "./HeroBlock";
import { CarouselBlock } from "./CarouselBlock";
import RichTextBlock from "./RichTextBlock";
import { CTABlock } from "./CTABlock";
import { HeaderBlock } from "./HeaderBlock";
import ServiceListingBlock from "./ServiceListingBlock";
import BannerBlock from "./BannerBlock";
import NewsletterSignupBlock from "./NewsletterSignupBlock";
import PricingBlock from "./PricingBlock";
import ServiceContentBlock from "./ServiceContentBlock";
import CredentialsBlock from "./CredentialsBlock";

// 1) Map each __typename to its data type
type PageBlockMap = {
  PageBlocksAppointmentBookingBlock: PageBlocksAppointmentBookingBlock;
  PageBlocksHero: PageBlocksHero;
  PageBlocksRichTextBlock: PageBlocksRichTextBlock;
  PageBlocksCarouselBlock: PageBlocksCarouselBlock;
  PageBlocksCtaBlock: PageBlocksCtaBlock;
  PageBlocksHeaderBlock: PageBlocksHeaderBlock;
  PageBlocksServiceListingBlock: PageBlocksServiceListingBlock;
  PageBlocksBannerBlock: PageBlocksBannerBlock;
  PageBlocksNewsletterSignupBlock: PageBlocksNewsletterSignupBlock;
  PageBlocksPricingBlock: PageBlocksPricingBlock;
  PageBlocksServiceContentBlock: any; // Will be defined in tina config
  PageBlocksCredentialsBlock: any; // Will be defined in tina config
};

type BlockComponentMap = {
  [K in keyof PageBlockMap]: React.ComponentType<{ data: PageBlockMap[K] }>;
};

// Use eagerly loaded components for above-the-fold content
// This prevents flickering by ensuring components are available immediately
const BLOCK_COMPONENTS: BlockComponentMap = {
  PageBlocksAppointmentBookingBlock: AppointmentBookingBlock,
  PageBlocksHero: HeroBlock,
  PageBlocksRichTextBlock: RichTextBlock,
  PageBlocksCarouselBlock: CarouselBlock,
  PageBlocksCtaBlock: CTABlock,
  PageBlocksHeaderBlock: HeaderBlock,
  PageBlocksServiceListingBlock: ServiceListingBlock,
  PageBlocksBannerBlock: BannerBlock,
  PageBlocksNewsletterSignupBlock: NewsletterSignupBlock,
  PageBlocksPricingBlock: PricingBlock,
  PageBlocksServiceContentBlock: ServiceContentBlock,
  PageBlocksCredentialsBlock: CredentialsBlock,
};

interface BlocksProps {
  // blocks may be undefined, null, or an array with possible null entries
  blocks?: (PageBlocks | null)[] | null;
}

export const Blocks: React.FC<BlocksProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null;

  // Filter out any null entries
  const validBlocks = blocks.filter((b): b is PageBlocks => b !== null);

  if (validBlocks.length === 0) return null;

  return <>{validBlocks.map(renderBlock)}</>;
};

/**
 * Generic helper that:
 *  - Narrows T to the specific union member (PageBlocksHero or PageBlocksText)
 *  - Picks the correct component from BLOCK_COMPONENTS
 *  - Passes block straight through, properly typed
 */
function renderBlock<T extends PageBlocks>(block: T, idx: number) {
  const typename = block.__typename as keyof BlockComponentMap;

  const Component = BLOCK_COMPONENTS[typename] as React.ComponentType<{
    data: T;
  }>;

  // If the component is undefined, log for debugging and render nothing
  if (!Component) {
    console.warn(`No component found for block type: ${typename}`);
    return null;
  }

  return <Component key={idx} data={block} />;
}
