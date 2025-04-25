import { Metadata } from "next";
import { client } from "@/tina/__generated__/client";
import HomeContent from "./home/HomeContent";

// Use Edge Runtime for faster execution
export const runtime = "edge";

// Revalidate every hour
export const revalidate = 3600;

// Generate metadata for the page
export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our website",
};

// Default data for when TinaCMS isn't configured
const defaultData = {
  home: {
    title: "Welcome to Our Website",
    description:
      "Discover our amazing products and services designed to help you achieve your goals.",
    hero: {
      heading: "Transform Your Business",
      subheading:
        "We provide innovative solutions to help your business grow and succeed in today's digital world.",
      buttonText: "Get Started",
      buttonLink: "/contact",
    },
  },
};

export default async function Home() {
  let data;

  try {
    const result = await client.queries.home({ relativePath: "home.yaml" });
    data = result.data;
  } catch (error) {
    console.error("Error fetching home data:", error);
    data = defaultData;
  }

  return <HomeContent data={data} />;
}
