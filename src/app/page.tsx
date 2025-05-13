import client from "../../tina/__generated__/client";
import { Section } from "@/components/layout/Section";
import ClientPage from "./[...urlSegments]/client-page";

export async function generateMetadata() {
  try {
    const result = await client.queries.page({
      relativePath: "home.yaml",
    });

    return {
      title: result.data?.page?.title || "Home",
      description: result.data?.page?.description || "Welcome to our website",
    };
  } catch (error) {
    console.error("Home page metadata error:", error);
    return {
      title: "Home",
      description: "Welcome to our website",
    };
  }
}

export default async function HomePage() {
  try {
    console.log("Attempting to fetch home page data: home.yaml");
    const result = await client.queries.page({
      relativePath: "home.yaml",
    });

    if (!result.data?.page) {
      console.error("No home page data found for home.yaml");
      return <div>Error loading home page content</div>;
    }

    console.log("Successfully loaded home page: home.yaml");
    return (
      <Section>
        <ClientPage
          data={result.data}
          variables={{ relativePath: "home.yaml" }}
          query={result.query}
        />
      </Section>
    );
  } catch (error) {
    console.error("Home page error:", error);
    return <div>Error loading home page</div>;
  }
}
