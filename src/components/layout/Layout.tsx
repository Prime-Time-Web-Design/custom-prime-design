import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import { Header } from "./nav/Header";
import Footer from "./nav/Footer";

// Import the generated types for proper typing
import { GlobalSettings } from "@/lib/component-types";

type LayoutProps = PropsWithChildren & {
  globalSettings: GlobalSettings | undefined;
};

export default function Layout({ children, globalSettings }: LayoutProps) {
  return (
    <LayoutProvider globalSettings={globalSettings} pageData={null}>
      <div className="min-h-screen">
        <Header />
        <main className="overflow-x-hidden">{children}</main>
        <Footer />
        {/* <ScriptLoader /> */}
      </div>
    </LayoutProvider>
  );
}
