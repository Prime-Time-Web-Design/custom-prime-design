import "./../styles/globals.css";
import Layout from "@/components/layout/Layout";
import client from "../../tina/__generated__/client";

export interface RootLayoutProps {
  children: React.ReactNode;
  params?: {
    urlSegments?: string[];
  };
}

import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default async function RootLayout({ children }: RootLayoutProps) {
  const globalData = await client.queries.global({
    relativePath: "Navigation_Data.yaml",
  });

  // Debug the data from Tina CMS
  console.log(
    "Global data from Tina:",
    JSON.stringify(
      {
        alertBanner: globalData.data.global.alertBanner,
        hasNavigation: !!globalData.data.global.navigation,
      },
      null,
      2
    )
  );

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <div className="min-h-screen flex flex-col">
          <Layout globalData={globalData}>{children}</Layout>
        </div>
      </body>
    </html>
  );
}
