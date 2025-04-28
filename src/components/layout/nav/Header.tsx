"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import MainNav from "./MainNav";
import { useLayout } from "../layout-context";
import AlertBanner from "./AlertBanner";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { globalSettings } = useLayout();
  const navigation = globalSettings!.navigation!;

  console.log(navigation);

  return (
    <header className="sticky top-0 z-50 shadow-md bg-[var(--color-bg)] rounded-xl mt-2.5 mx-2.5">
      <AlertBanner />
      <MainNav navigation={navigation} />

      {/* Mobile Menu Button */}
      <div className="flex justify-end lg:hidden absolute top-4 right-4">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-2.5 text-[var(--color-text)] bg-[var(--color-bg-contrast)] hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-green)] transition duration-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <Transition
        show={mobileMenuOpen}
        as={Dialog}
        static
        onClose={() => setMobileMenuOpen(false)}
      >
        <DialogPanel className="fixed inset-0 z-50 lg:hidden">
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[var(--color-pink-dark)]/80 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-[var(--color-navy)] p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="text-xl font-bold text-[var(--color-yellow)]">
                  Prime Therapy
                </span>
              </Link>
              <button
                type="button"
                className="rounded-xl p-2.5 text-[var(--color-yellow)] hover:bg-[var(--color-mint-light)] hover:text-[var(--color-green)] transition duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-[var(--color-accent)]">
                <div className="space-y-2 py-6">
                  {/* {navigation.mainNav?.map((item) => (
                    <div key={item.label} className="py-2">
                      <Link
                        href={item.href ?? "#"}
                        className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[var(--color-yellow)] hover:bg-[var(--color-mint-light)] hover:text-[var(--color-green)] transition duration-200"
                      >
                        {item.label}
                      </Link>
                      {item.subItems && item.subItems.length > 0 && (
                        <div className="mt-2 space-y-2 pl-4">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-yellow)] hover:bg-[var(--color-mint-light)] hover:text-[var(--color-green)] transition duration-200"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))} */}
                </div>
                <div className="py-6">
                  <Link
                    href="/log-in"
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[var(--color-yellow)] hover:bg-[var(--color-mint-light)] hover:text-[var(--color-green)] transition duration-200"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/book-now"
                    className="mt-4 block rounded-lg bg-[var(--color-green)] px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-[var(--color-green-light)] hover:text-[var(--color-navy)] transition duration-200"
                  >
                    Find a Therapist
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Transition>
    </header>
  );
};
