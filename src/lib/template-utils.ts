/**
 * Utility functions for handling Tina blocks and page templates
 */

/**
 * Safely converts Tina blocks to the format expected by the Blocks component
 * This allows us to be more flexible with the data structure
 */

export function ensureValidBlocks(blocks: any) {
  if (!blocks) return [];

  // Convert any null values to empty arrays
  if (blocks === null) return [];

  // If it's already an array, return it (the Blocks component will handle the rest)
  if (Array.isArray(blocks)) return blocks;

  // If it's something else, return an empty array
  return [];
}
