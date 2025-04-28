import { Metadata } from "next";
import { client } from "../../tina/__generated__/client";
import HomeContent, { HomeSchema } from "./home/HomeContent";
import Layout from "@/components/layout/Layout";

// Use Edge Runtime for faster execution
export const runtime = "edge";

// Revalidate every hour
export const revalidate = 3600;

// Generate metadata for the page
export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our website",
};

export default async function Home() {
  let data;

  try {
    const result = await client.queries.page({ relativePath: "home.yaml" });
    data = result;
  } catch (error) {
    console.error("Error fetching home data:", error);
  }

  return (
    <Layout>
      <HomeContent {...(data as HomeSchema)} />
    </Layout>
  );
}
