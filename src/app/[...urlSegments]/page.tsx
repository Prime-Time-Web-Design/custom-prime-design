import { notFound } from "next/navigation";
import client from "../../../tina/__generated__/client";
import { Section } from "@/components/layout/Section";
import ClientPage from "./client-page";

const EXCLUDED_PREFIXES = ["_next", "api", "admin", "favicon.ico", "robots.txt"];

function isExcludedPath(urlSegments: string[]): boolean {
  // Exclude if the first segment matches, or if the full path matches a static asset
  const first = urlSegments[0];
  const full = urlSegments.join("/");
  return EXCLUDED_PREFIXES.includes(first) || EXCLUDED_PREFIXES.includes(full);
}

interface PageProps {
  params: { urlSegments?: string[] };
}

export async function generateMetadata({ params }: PageProps) {
  const urlSegments = params?.urlSegments || [];
  if (isExcludedPath(urlSegments)) {
    return {
      title: "Not Found",
      description: "The page you're looking for doesn't exist.",
    };
  }
  const filepath = urlSegments.join("/");
  try {
    const result = await client.queries.page({
      relativePath: `${filepath}.yaml`,
    });
    if (!result.data?.page) {
      return {
        title: "Not Found",
        description: "The page you're looking for doesn't exist.",
      };
    }
    return {
      title: result.data.page.title || "Page Not Found",
      description:
        result.data.page.description ||
        "The page you're looking for doesn't exist.",
    };
  } catch {
    return {
      title: "Not Found",
      description: "The page you're looking for doesn't exist.",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const urlSegments = params?.urlSegments || [];
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
