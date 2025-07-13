"use client";
import { ReactNode, useEffect, useState } from "react";
import { useTina } from "tinacms/dist/react";
import { Templates } from "@/components/templates";
import { ensureValidBlocks } from "@/lib/template-utils";
import ErrorBoundary from "@/lib/ErrorBoundary";

// Simple type that includes only what we need
interface PageData {
  page?: {
    title?: string;
    description?: string;
    blocks?: unknown[];
    // headerBlocks has been removed
    [key: string]: unknown;
  } | null;
}

interface PageClientWrapperProps {
  data: PageData;
  children?: ReactNode;
}

/**
 * Client component for rendering page data with Tina CMS
 * Handles client-side data transformations and error handling
 */
export function PageClientWrapper({ data, children }: PageClientWrapperProps) {
  // Track if this is the first render to prevent flickering
  const [hasHydrated, setHasHydrated] = useState(false);

  // Flag hydration completion after first render
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Use Tina's client-side hooks to handle the data
  const { data: tinaData } = useTina({
    data,
    query: "", // Not needed when data is already fetched on server
    variables: {}, // Not needed when data is already fetched on server
  });

  // Safely handle data to prevent errors with missing or malformed data
  if (!tinaData?.page) {
    console.error("No page data available in PageClientWrapper");
    return (
      <ErrorBoundary>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Missing Page Data</h2>
          <p>The requested page could not be found or has no content.</p>
          {children}
        </div>
      </ErrorBoundary>
    );
  }

  // Process the blocks to ensure they're valid
  const blocks = ensureValidBlocks(tinaData.page?.blocks);
  // headerBlocks have been removed
  
  // Apply a style to prevent content shift during hydration
  const hydrationStyle = !hasHydrated ? { opacity: 0.99 } : {};

  return (
    <ErrorBoundary>
      <div style={hydrationStyle}>
        <Templates
          data={{
            ...tinaData.page,
            blocks,
          }}
        >
          {children}
        </Templates>
      </div>
    </ErrorBoundary>
  );
}
