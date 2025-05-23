import "./../styles/globals.css";
import Layout from "@/components/layout/Layout";
import client from "../../tina/__generated__/client";
import { GetGlobalQuery, GetGlobalDocument } from "@/lib/__generated__/types";
// import { Metadata } from "next";

export interface RootLayoutProps {
  children: React.ReactNode;
  params?: {
    urlSegments?: string[];
  };
}

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "optional", // Changed from swap to optional for better performance
  preload: true, // Explicitly preload the font
});

// Add metadata for better SEO and performance
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
  // Use your custom GetGlobal query document and types
  const { data } = await client.request<GetGlobalQuery>(
    { query: GetGlobalDocument.loc!.source.body },
    {}
  );

  // data.global is typed as GetGlobalQuery["global"]
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <head>
        {/* Preload critical assets */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Preload hero image for best LCP, static tag to avoid hydration mismatch */}
        <link
          rel="preload"
          href="/optimized/hero.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <Layout globalData={data.global}>{children}</Layout>
        </div>
      </body>
    </html>
  );
}
