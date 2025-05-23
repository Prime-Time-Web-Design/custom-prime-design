"use client";
import React, { useState, useEffect } from "react";
// import { Menu } from "lucide-react";
import MainNav from "./MainNav";
import { useLayout } from "../layout-context";
import AlertBanner from "./AlertBanner";
import { MobileMenu } from "./MobileMenu";
import Link from "next/link";
import Image from "next/image";
import mobileLogo from "../../../../public/mobileLogo.svg";
import HamburgerMenu from "@/components/molecules/HamburgerMenu";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { globalSettings } = useLayout();
  // Updated for new structure:
  const navigation = globalSettings?.navigation;
  const alertBanner = globalSettings?.alertBanner;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    new AbortController();
    const controller = new AbortController();
    const { signal } = controller;

    window.addEventListener("scroll", handleScroll, { signal });
    return () => {
      controller.abort();
    };
  }, []);

  if (!navigation) return null;

  return (
    <header
      className={`sticky top-0 z-50 shadow-md bg-[var(--color-bg)] transition-all duration-300 ${
        isScrolled
          ? "lg:rounded-none lg:rounded-b-xl lg:mt-0"
          : "lg:rounded-xl lg:mt-2.5"
      } lg:mx-4`}
    >
      {alertBanner && (
        <AlertBanner alertBanner={alertBanner} isScrolled={isScrolled} />
      )}
      <div className="flex items-center justify-between px-4 py-2 lg:hidden">
        <div className="flex-shrink-0">
          <span className="text-2xl font-semibold text-[var(--color-text)] ">
            <Link href="/">
              <Image src={mobileLogo} width={120} height={40} alt="Logo" />
            </Link>
          </span>
        </div>

        <div className="flex items-center gap-x-2">
          <Link
            href="/log-in"
            className="hidden lg:block rounded-lg bg-transparent px-3 py-1.5 text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200"
          >
            Log in
          </Link>
          <Link
            href="/book-now"
            className="rounded-lg bg-[var(--color-primary)] px-3 py-1.5 text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-primary-hover)] shadow-sm focus:outline-none transition duration-200"
          >
            Book Now
          </Link>
          {/* <button
            type="button"
            className="cursor-pointer inline-flex items-center justify-center rounded-xl p-2 text-[var(--color-text)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button> */}
          <HamburgerMenu>
            <MobileMenu
              navigation={navigation}
              isOpen={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
            />
          </HamburgerMenu>
        </div>
      </div>

      <MainNav navigation={navigation} />

      {/* <MobileMenu
        navigation={navigation}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      /> */}
    </header>
  );
};
