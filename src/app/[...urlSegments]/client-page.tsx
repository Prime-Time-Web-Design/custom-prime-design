"use client";
import { useTina } from "tinacms/dist/react";
import { Blocks } from "../../components/blocks";
import { PageQuery } from "../../../tina/__generated__/types";
import ErrorBoundary from "../../lib/ErrorBoundary";

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
  return (
    <ErrorBoundary>
      <Blocks blocks={data?.page?.blocks} />
    </ErrorBoundary>
  );
}
