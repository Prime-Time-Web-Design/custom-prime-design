import { GetPageQuery } from "./__generated__/types";

/**
 * Page props interface for all page components
 */
export interface PageComponentProps {
  data: GetPageQuery;
}

/**
 * Block component props for specific block components
 */
export interface BlockComponentProps<T> {
  data: T;
  className?: string;
}
