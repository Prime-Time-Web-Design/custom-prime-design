import { PageQuery } from "../../../tina/__generated__/types";
import HeroBlock from "./HeroBlock";
// import other blocks...

// Step 1: Get a clean union type for a single block
type Block = NonNullable<NonNullable<PageQuery["page"]["blocks"]>[number]>;

// Step 2: Define props
interface BlocksProps {
  blocks?: (Block | null)[] | null;
}

const BLOCK_COMPONENTS: Partial<{
  [K in Block["__typename"]]: React.ComponentType<{
    data: Extract<Block, { __typename: K }>;
  }>;
}> = {
  PageBlocksHero: HeroBlock,
  // PageBlocksText: TextBlock,
  // Add more mappings here...
};

// Step 4: Render blocks type-safely
export const Blocks = ({ blocks }: BlocksProps) => {
  const validBlocks = blocks?.filter((b): b is Block => b !== null) ?? [];

  return (
    <>
      {validBlocks.map((block, i) => {
        const Component = BLOCK_COMPONENTS[
          block.__typename
        ] as React.ComponentType<{
          data: typeof block;
        }>;
        return <Component key={i} data={block} />;
      })}
    </>
  );
};
