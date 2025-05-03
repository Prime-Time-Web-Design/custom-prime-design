"use client";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import MainNav from "./MainNav";
import { useLayout } from "../layout-context";
import AlertBanner from "./AlertBanner";
import { MobileMenu } from "./MobileMenu";
import Link from "next/link";
import Image from "next/image";
import mobileLogo from "../../../../public/logo.svg";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { globalSettings } = useLayout();
  const navigation = globalSettings!.navigation!;

  return (
    <header className="sticky top-0 z-50 shadow-md bg-[var(--color-bg)] lg:rounded-xl lg:mt-2.5 lg:mx-2.5">
      <AlertBanner />
      <div className="flex items-center justify-between px-4 py-2 lg:hidden">
        <div className="flex-shrink-0">
          <span className="text-2xl font-semibold text-[var(--color-text)] ">
            <Link href="/">
              <Image src={mobileLogo} width={80} height={40} alt="Logo" />
            </Link>
          </span>
        </div>

        <div className="flex items-center gap-x-2">
          <Link
            href="/log-in"
            className="rounded-lg bg-transparent px-3 py-1.5 text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200"
          >
            Log in
          </Link>
          <Link
            href="/book-now"
            className="rounded-lg bg-[var(--color-primary)] px-3 py-1.5 text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-primary-hover)] shadow-sm focus:outline-none transition duration-200"
          >
            Find a Therapist
          </Link>
          <button
            type="button"
            className="cursor-pointer inline-flex items-center justify-center rounded-xl p-2 text-[var(--color-text)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MainNav navigation={navigation} />

      <MobileMenu
        navigation={navigation}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};
