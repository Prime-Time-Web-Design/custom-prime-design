"use client";
import React, { useState } from "react";
// import { Menu } from "lucide-react";
import MainNav from "./MainNav";
import { useLayout } from "../layout-context";
import AlertBanner from "./AlertBanner";
import { MobileMenu } from "./MobileMenu";
import Link from "next/link";
import Image from "next/image";
import mobileLogo from "../../../../public/optimized/primeLogo-trimmed.webp";
import HamburgerMenu from "@/components/molecules/HamburgerMenu";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { globalSettings } = useLayout();
  // Updated for new structure:
  const navigation = globalSettings?.navigation;
  const alertBanner = globalSettings?.alertBanner;

  if (!navigation) return null;

  return (
    <header
      className={`sticky top-0 z-50 shadow-md bg-[#252042] transition-all duration-300`}
    >
      {alertBanner && <AlertBanner alertBanner={alertBanner} />}
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8 lg:px-16 pb-1.5 pt-4 lg:hidden bg-[#252042] text-white">
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              src={mobileLogo}
              width={120}
              height={21}
              alt="Logo"
              style={{ height: "auto" }}
              priority
              className="py-1"
            />
          </Link>
        </div>

        <div className="flex items-center gap-x-3">
          <Link
            href="/log-in"
            className="hidden lg:block rounded-lg bg-transparent px-3 py-1.5 text-sm font-semibold text-bg hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200"
          >
            Log in
          </Link>
          <Link
            href="/book-now"
            className="rounded bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-[#252042] hover:bg-[var(--color-primary-hover)] shadow-sm focus:outline-none transition duration-200 flex items-center"
          >
            Book Now
          </Link>
          <div className="flex items-center">
            <HamburgerMenu>
              <MobileMenu
                navigation={navigation}
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
              />
            </HamburgerMenu>
          </div>
        </div>
      </div>

      <MainNav navigation={navigation} />
    </header>
  );
};
