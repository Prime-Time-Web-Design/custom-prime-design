"use client";
import { useTina } from "tinacms/dist/react";
import { PageQuery } from "../../../tina/__generated__/types";
import ErrorBoundary from "../../lib/ErrorBoundary";
import { Templates } from "../../components/templates";
import { ensureValidBlocks } from "../../lib/template-utils";

export interface ClientPageProps {
  data: {
    page: PageQuery["page"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({ ...props });

  // Safely handle data to prevent errors with missing or malformed data
  if (!data || !data.page) {
    console.error("No data or page data available");
    return (
      <ErrorBoundary>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Content Not Available</h2>
          <p>The requested page content could not be loaded.</p>
        </div>
      </ErrorBoundary>
    );
  }

  // Prepare the page data for the template system with proper fallbacks
  const pageData = {
    ...data.page,
    blocks: ensureValidBlocks(data.page?.blocks),
    // Ensure headerBlocks is available (even if empty)
    headerBlocks: ensureValidBlocks(data.page?.headerBlocks || []),
  };

  return (
    <ErrorBoundary>
      <Templates data={pageData} />
    </ErrorBoundary>
  );
}
