import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import client from "../../../tina/__generated__/client";
import { Section } from "@/components/layout/Section";
import ClientPage from "./client-page";

export const revalidate = 300;

interface PageParams {
  params: Promise<{ urlSegments: string[] }>;
}

// Function to check if the path should be excluded
const isExcludedPath = (urlSegments: string[]): boolean => {
  // Exclude paths starting with _next or other known build/static prefixes
  return urlSegments[0] === "_next";
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  // Await params as before
  const awaitedParams = await params;

  // Check if the path should be excluded
  if (isExcludedPath(awaitedParams.urlSegments)) {
    // Return a generic not found metadata for excluded paths
    return {
      title: "Not Found",
      description: "",
    };
  }

  const filepath = awaitedParams.urlSegments.join("/");

  try {
    const result = await client.queries.page({
      relativePath: `${filepath}.yaml`,
    });

    // Check if data and page exist before accessing properties
    if (!result.data || !result.data.page) {
      return {
        title: "Page Not Found",
        description: "The page you're looking for doesn't exist.",
      };
    }

    return {
      title: result.data.page.title,
      description: result.data.page.description,
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist.",
    };
  }
}

export default async function Page({ params }: PageParams) {
  // Await params as before
  const awaitedParams = await params;

  // Check if the path should be excluded
  if (isExcludedPath(awaitedParams.urlSegments)) {
    // For excluded paths, trigger a 404
    notFound();
  }

  const filepath = awaitedParams.urlSegments.join("/");

  try {
    const result = await client.queries.page({
      relativePath: `${filepath}.yaml`,
    });

    // Check if data and page exist before passing to ClientPage or calling notFound
    if (!result.data || !result.data.page) {
      notFound();
    }

    return (
      <Section>
        <ClientPage
          data={result.data}
          variables={{ relativePath: `${filepath}.yaml` }}
          query={result.query}
        />
      </Section>
    );
  } catch (error) {
    console.error("Error fetching page data:", error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    let pages = await client.queries.pageConnection();
    const allPages = {
      data: {
        pageConnection: {
          edges: [...(pages.data.pageConnection.edges || [])],
        },
      },
    };

    while (pages.data.pageConnection.pageInfo?.hasNextPage) {
      const nextPages = await client.queries.pageConnection({
        after: pages.data.pageConnection.pageInfo.endCursor,
      });

      if (!nextPages.data.pageConnection.edges?.length) break;

      allPages.data.pageConnection.edges.push(
        ...nextPages.data.pageConnection.edges
      );
      pages = nextPages;
    }

    return allPages.data.pageConnection.edges
      .filter((edge): edge is NonNullable<typeof edge> => Boolean(edge?.node))
      .map((edge) => ({
        urlSegments: edge.node!._sys.breadcrumbs,
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
