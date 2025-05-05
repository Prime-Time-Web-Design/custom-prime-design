import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import client from "../../../tina/__generated__/client";
import { Section } from "@/components/layout/Section";
import ClientPage from "./client-page";

export const revalidate = 300;

interface PageParams {
  params: { urlSegments: string[] };
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const filepath = params.urlSegments.join("/");

  try {
    const result = await client.queries.page({
      relativePath: `${filepath}.yaml`,
    });

    return {
      title: result.data.page.title,
      description: result.data.page.description,
    };
  } catch {
    return {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist.",
    };
  }
}

export default async function Page({ params }: PageParams) {
  const filepath = params.urlSegments.join("/");

  try {
    const result = await client.queries.page({
      relativePath: `${filepath}.yaml`,
    });

    return (
      <Section>
        <ClientPage
          data={result.data}
          variables={{ relativePath: `${filepath}.yaml` }}
          query={result.query}
        />
      </Section>
    );
  } catch {
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
