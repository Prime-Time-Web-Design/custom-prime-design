import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import { Header } from "./nav/Header";
import Footer from "./nav/Footer";
import { GetGlobalQuery } from "@/lib/__generated__/types";

type LayoutProps = PropsWithChildren & {
  globalData: GetGlobalQuery["global"];
};

export default function Layout({ children, globalData }: LayoutProps) {
  return (
    <LayoutProvider globalSettings={globalData} pageData={null}>
      <div className="min-h-screen">
        <Header />
        <main className="overflow-x-hidden">{children}</main>
        <Footer />
        {/* <ScriptLoader /> */}
      </div>
    </LayoutProvider>
  );
}
