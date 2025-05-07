"use client";
import React from "react";
import {
  PageBlocks,
  PageBlocksCarouselBlock,
  PageBlocksHero,
  PageBlocksText,
} from "../../../tina/__generated__/types";
import HeroBlock from "./HeroBlock";
import { TextBlock } from "./TextBlock"; // your stub or real TextBlock
import { CarouselBlock } from "./CarouselBlock";

// 1) Map each __typename to its data type
type PageBlockMap = {
  PageBlocksHero: PageBlocksHero;
  PageBlocksText: PageBlocksText;
  PageBlocksCarouselBlock: PageBlocksCarouselBlock;
};

type BlockComponentMap = {
  [K in keyof PageBlockMap]: React.ComponentType<{ data: PageBlockMap[K] }>;
};

const BLOCK_COMPONENTS: BlockComponentMap = {
  PageBlocksHero: HeroBlock,
  PageBlocksText: TextBlock,
  PageBlocksCarouselBlock: CarouselBlock,
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
