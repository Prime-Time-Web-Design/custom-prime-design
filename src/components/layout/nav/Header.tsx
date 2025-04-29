"use client";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import MainNav from "./MainNav";
import { useLayout } from "../layout-context";
import AlertBanner from "./AlertBanner";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { globalSettings } = useLayout();
  const navigation = globalSettings!.navigation!;

  return (
    <header className="sticky top-0 z-50 shadow-md bg-[var(--color-bg)] lg:rounded-xl lg:mt-2.5 lg:mx-2.5">
      <AlertBanner />
      <MainNav navigation={navigation} />

      {/* Mobile Menu Button */}
      <div className="flex justify-end lg:hidden absolute top-4 right-4">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-2.5 text-[var(--color-text)] bg-[var(--color-primary-hover)] hover:bg-[var(--color-primary)] transition duration-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <MobileMenu
        navigation={navigation}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};
