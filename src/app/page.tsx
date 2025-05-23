import { getPageData } from "@/lib/page-data";
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

export async function generateMetadata() {
  try {
    const data = (await getPageData("home.yaml")) as PageData;

    return {
      title: data?.page?.title || "Home",
      description: data?.page?.description || "Welcome to our website",
    };
  } catch (error) {
    console.error("Home page metadata error:", error);
    return {
      title: "Home",
      description: "Welcome to our website",
    };
  }
}

/**
 * Home page component using the optimized PageLoader pattern
 * This provides consistent behavior with other pages and leverages the caching system
 */
export default async function HomePage() {
  return <PageLoader relativePath="home.yaml" />;
}
