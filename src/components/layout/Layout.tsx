import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "../../../tina/__generated__/client";
import { Header } from "./nav/Header";

type LayoutProps = PropsWithChildren & {
  rawPageData?: unknown;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  const { data: globalData } = await client.queries.global({
    relativePath: "Navigation_Data.yaml",
  });

  return (
    <LayoutProvider globalSettings={globalData.global} pageData={rawPageData}>
      <div className="min-h-screen">
        <Header />
        <main className="overflow-x-hidden pt-20">{children}</main>
      </div>
    </LayoutProvider>
  );
}
