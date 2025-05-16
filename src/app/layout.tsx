import "./../styles/globals.css";
import Layout from "@/components/layout/Layout";
import client from "../../tina/__generated__/client";
// import { Metadata } from "next";

export interface RootLayoutProps {
  children: React.ReactNode;
  params?: {
    urlSegments?: string[];
  };
}

import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Add font-display: swap for better performance
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap", // Add font-display: swap for better performance
});

// Add metadata for better SEO and performance hints
// export const metadata: Metadata = {
//   title: "Custom Prime Design",
//   description:
//     "Transform Your Therapy Website Into A Client-Converting Machine",
//   viewport: "width=device-width, initial-scale=1",
//   themeColor: "#ffffff",
//   metadataBase: new URL("https://custom-prime-design.vercel.app"),
//   alternates: {
//     canonical: "/",
//   },
//   icons: {
//     icon: "/optimized/logo.svg",
//   },
//   // Add browser hints to preload critical resources
//   other: {
//     "lightning-css": "true",
//   },
// };

// Generate HTTP headers for better caching and performance
// export async function generateMetadata() {
//   return {
//     ...metadata,
//     other: {
//       ...metadata.other,
//       "Cache-Control": "public, max-age=3600, s-maxage=86400",
//       "Content-Security-Policy":
//         "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
//     },
//   };
// }
// }

export default async function RootLayout({ children }: RootLayoutProps) {
  const globalData = await client.queries.global({
    relativePath: "Navigation_Data.yaml",
  });

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preload critical assets */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Preload hero image */}
        <link
          rel="preload"
          href="/optimized/hero.webp"
          as="image"
          type="image/webp"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Layout globalData={globalData}>{children}</Layout>
        </div>
      </body>
    </html>
  );
}
