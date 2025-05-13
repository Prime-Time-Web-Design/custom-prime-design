"use client";
import React, { lazy, Suspense } from "react";
import {
  PageBlocks,
  PageBlocksCarouselBlock,
  PageBlocksHero,
  PageBlocksRichTextBlock,
} from "../../../tina/__generated__/types";

// Lazy load all block components
const HeroBlock = lazy(() => import("./HeroBlock"));
const RichTextBlock = lazy(() => import("./RichTextBlock"));
const CarouselBlock = lazy(() => import("./CarouselBlock"));

// 1) Map each __typename to its data type
type PageBlockMap = {
  PageBlocksHero: PageBlocksHero;
  PageBlocksRichTextBlock: PageBlocksRichTextBlock;
  PageBlocksCarouselBlock: PageBlocksCarouselBlock;
};

type BlockComponentMap = {
  [K in keyof PageBlockMap]: React.ComponentType<{ data: PageBlockMap[K] }>;
};

// Use lazy loaded components
const BLOCK_COMPONENTS: BlockComponentMap = {
  PageBlocksHero: HeroBlock,
  PageBlocksRichTextBlock: RichTextBlock,
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
 *  - Wraps in Suspense for lazy loading
 */
function renderBlock<T extends PageBlocks>(block: T, idx: number) {
  const typename = block.__typename as keyof BlockComponentMap;
  const Component = BLOCK_COMPONENTS[typename] as React.ComponentType<{
    data: T;
  }>;

  return (
    <Suspense
      key={idx}
      fallback={
        <div className="h-48 w-full animate-pulse bg-gray-100 rounded"></div>
      }
    >
      <Component data={block} />
    </Suspense>
  );
}
