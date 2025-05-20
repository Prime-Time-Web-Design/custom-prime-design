"use client";
import {
  PageBlocks,
  PageBlocksCarouselBlock,
  PageBlocksCtaBlock,
  PageBlocksHero,
  PageBlocksRichTextBlock,
  PageBlocksServiceListingBlock,
} from "../../../tina/__generated__/types";

// Import all blocks directly to prevent flickering
// This is better for core/essential components that appear above the fold
import { HeroBlock } from "./HeroBlock";
import { CarouselBlock } from "./CarouselBlock";
// import { HowItWorksBlock } from "./HowItWorksBlock";
import RichTextBlock from "./RichTextBlock";
import { CTABlock } from "./CTABlock";
import ServiceListingBlock from "./ServiceListingBlock";

// 1) Map each __typename to its data type
type PageBlockMap = {
  PageBlocksHero: PageBlocksHero;
  PageBlocksRichTextBlock: PageBlocksRichTextBlock;
  PageBlocksCarouselBlock: PageBlocksCarouselBlock;
  PageBlocksCtaBlock: PageBlocksCtaBlock;
  PageBlocksServiceListingBlock: PageBlocksServiceListingBlock; // Using any as a placeholder until the type is generated
};

type BlockComponentMap = {
  [K in keyof PageBlockMap]: React.ComponentType<{ data: PageBlockMap[K] }>;
};

// Use lazy loaded components
const BLOCK_COMPONENTS: BlockComponentMap = {
  PageBlocksHero: HeroBlock,
  PageBlocksRichTextBlock: RichTextBlock, // Use the new HowItWorksBlock instead of RichTextBlock
  PageBlocksCarouselBlock: CarouselBlock,
  PageBlocksCtaBlock: CTABlock,
  PageBlocksServiceListingBlock: ServiceListingBlock,
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

  return <Component key={idx} data={block} />;
}
