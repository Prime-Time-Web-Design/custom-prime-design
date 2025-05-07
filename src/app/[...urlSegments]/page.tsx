import { notFound } from "next/navigation";
import { Metadata } from "next";
import client from "../../../tina/__generated__/client";
import { Section } from "@/components/layout/Section";
import ClientPage from "./client-page";

export const revalidate = 300;

const EXCLUDED_PREFIXES = ["_next", "api", "admin"];

const isExcludedPath = (urlSegments: string[]): boolean =>
  EXCLUDED_PREFIXES.includes(urlSegments[0]);

export async function generateMetadata({
  params,
}: {
  params: { urlSegments: string[] };
}): Promise<Metadata> {
  // REMOVE await here
  const { urlSegments } = params;

  if (isExcludedPath(urlSegments)) {
    return {
      title: "Not Found",
      description: "",
    };
  }

  const filepath = urlSegments.join("/");

  try {
    const result = await client.queries.page({
      relativePath: `${filepath}.yaml`,
    });

    if (!result.data?.page) {
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
    console.error("Metadata error:", error);
    return {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist.",
    };
  }
}

export default async function Page({
  params,
}: {
  params: { urlSegments: string[] };
}) {
  // REMOVE await here
  const { urlSegments } = params;

  if (isExcludedPath(urlSegments)) {
    notFound();
  }

  const filepath = urlSegments.join("/");

  try {
    const result = await client.queries.page({
      relativePath: `${filepath}.yaml`,
    });

    if (!result.data?.page) {
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
    console.error("Page error:", error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    let pages = await client.queries.pageConnection();
    const allPages = [...(pages.data.pageConnection.edges || [])];

    // Loop to fetch additional pages if there are more
    while (pages.data.pageConnection.pageInfo?.hasNextPage) {
      pages = await client.queries.pageConnection({
        after: pages.data.pageConnection.pageInfo.endCursor,
      });

      if (!pages.data.pageConnection.edges?.length) break;
      allPages.push(...pages.data.pageConnection.edges);
    }

    return allPages
      .filter((edge): edge is NonNullable<typeof edge> => Boolean(edge?.node))
      .map((edge) => ({
        urlSegments: edge.node!._sys.breadcrumbs,
      }));
  } catch (error) {
    console.error("Static param generation error:", error);
    return [];
  }
}
