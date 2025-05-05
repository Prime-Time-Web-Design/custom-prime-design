import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import { Header } from "./nav/Header";
import Footer from "./nav/Footer";
import { GlobalQuery } from "../../../tina/__generated__/types";

type LayoutProps = PropsWithChildren & {
  globalData: { data: { global: GlobalQuery["global"] } };
};

export default function Layout({ children, globalData }: LayoutProps) {
  return (
    <LayoutProvider globalSettings={globalData.data.global} pageData={null}>
      <div className="min-h-screen">
        <Header />
        <main className="overflow-x-hidden">{children}</main>
        <Footer />
      </div>
    </LayoutProvider>
  );
}
