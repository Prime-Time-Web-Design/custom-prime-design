import { notFound } from "next/navigation";
import { getPageData, isValidPagePath, getStaticParams } from "@/lib/page-data";
import { PageLoader } from "@/components/page/PageLoader";

// Define a type for the page data structure based on the schema
interface PageData {
  page?: {
    title?: string;
    description?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

const EXCLUDED_PREFIXES = [
  "_next",
  "api",
  "admin",
  "favicon.ico",
  "robots.txt",
];

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
    const data = (await getPageData(`${filepath}.yaml`)) as PageData;

    if (!data?.page) {
      return {
        title: "Not Found",
        description: "The page you're looking for doesn't exist.",
      };
    }

    return {
      title: data.page.title ?? "Page Not Found",
      description:
        data.page?.description || "The page you're looking for doesn't exist.",
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

  // Validate that we're only trying to fetch YAML files
  // This prevents attempts to fetch image files or other non-content files
  if (!isValidPagePath(filepath)) {
    console.error(`Invalid filepath requested: ${filepath}`);
    notFound();
  }

  // Use optimized PageLoader component with proper caching
  return <PageLoader relativePath={`${filepath}.yaml`} />;
}

/**
 * Generate static paths for all pages at build time
 * This improves performance by pre-rendering pages
 */
export async function generateStaticParams() {
  return await getStaticParams();
}
