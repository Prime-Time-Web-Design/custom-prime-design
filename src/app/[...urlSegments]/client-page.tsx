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

  // Prepare the page data for the template system
  const pageData = {
    ...data?.page,
    blocks: ensureValidBlocks(data?.page?.blocks),
    // Ensure headerBlocks is available (even if empty)
    headerBlocks: [],
  };

  return (
    <ErrorBoundary>
      <Templates data={pageData} />
    </ErrorBoundary>
  );
}
