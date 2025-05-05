import "./../styles/globals.css";
import Layout from "@/components/layout/Layout";
import client from "../../tina/__generated__/client";

export interface RootLayoutProps {
  children: React.ReactNode;
  params?: {
    urlSegments?: string[];
  };
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const globalData = await client.queries.global({
    relativePath: "Navigation_Data.yaml",
  });

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Layout globalData={globalData}>{children}</Layout>
        </div>
      </body>
    </html>
  );
}
