"use server";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { getPageData } from "@/lib/page-data";
import { PageClientWrapper } from "@/components/page/PageClientWrapper";

interface PageLoaderProps {
  relativePath: string;
  children?: ReactNode;
}

/**
 * Server Component that handles data fetching and error states
 */
export async function PageLoader({ relativePath, children }: PageLoaderProps) {
  try {
    const data = await getPageData(relativePath);

    if (!data?.page) {
      console.error(`No page data found for: ${relativePath}`);
      notFound();
    }

    // Pass data to client component with error boundary
    return (
      <Section>
        <PageClientWrapper data={data}>{children}</PageClientWrapper>
      </Section>
    );
  } catch (error) {
    console.error(`Error loading page ${relativePath}:`, error);
    notFound();
  }
}
