import client from "../../tina/__generated__/client";
import { unstable_cache } from "next/cache";

// We need to use a more generic type to avoid TypeScript errors
type TinaPageData = Record<string, unknown>;

/**
 * Helper function to get page data with custom GraphQL fragments
 * @param relativePath Path to the page YAML file
 * @returns Page data with custom GraphQL fragments
 */
export async function getPageData(
  relativePath: string
): Promise<TinaPageData | null> {
  return getPageDataWithCache(relativePath);
}

/**
 * Cached version of getPageData with server-side caching
 * Uses Next.js unstable_cache for persistent caching between requests
 */
const getPageDataWithCache = unstable_cache(
  async (relativePath: string): Promise<TinaPageData | null> => {
    try {
      // Use Tina client with the proper request format
      const result = await client.queries.page({
        relativePath: relativePath,
      });

      return result.data as TinaPageData;
    } catch (error) {
      console.error(`Error fetching data for ${relativePath}:`, error);
      return null;
    }
  },
  ["page-data", "tina"], // Add more specific cache keys
  {
    revalidate: 3600, // Revalidate cache every hour
    tags: ["tina-content", "page-content"], // Multiple tags for better invalidation control
  }
);

/**
 * Get all available page paths from Tina CMS
 * @returns Array of page paths
 */
export const getAllPagePaths = unstable_cache(
  async (): Promise<string[]> => {
    try {
      const result = await client.queries.pageConnection();

      return (
        result.data.pageConnection.edges
          ?.map((edge) => {
            const path = edge?.node?._sys.filename || "";
            return path;
          })
          .filter(Boolean) || []
      );
    } catch (error) {
      console.error("Error fetching page paths:", error);
      return [];
    }
  },
  ["all-page-paths"],
  {
    revalidate: 3600,
    tags: ["tina-content"],
  }
);

/**
 * Helper function to validate if a path should be processed as a page
 * @param path Path to validate
 * @returns Whether the path is valid
 */
export function isValidPagePath(path: string): boolean {
  return /^[a-z0-9\-\/]+$/i.test(path);
}

/**
 * Get static parameters for all pages - useful for static site generation
 * @returns Array of params objects with path segments for each page
 */
export async function getStaticParams(): Promise<{ urlSegments: string[] }[]> {
  const paths = await getAllPagePaths();

  return paths.filter(isValidPagePath).map((path) => {
    // Convert page path to URL segments (removing .yaml extension if present)
    const cleanPath = path.replace(/\.yaml$/, "");
    // Split path into segments for dynamic routing
    return { urlSegments: cleanPath.split("/") };
  });
}
