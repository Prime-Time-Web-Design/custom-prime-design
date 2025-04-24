"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ArrowBigRight, ChevronDown, Menu, X } from "lucide-react"; // Using Lucide React icons
import Link from "next/link";

// Dummy navigation items
const navigation = [
  { name: "Price", href: "/price" },
  { name: "Services", href: "/services" },
  { name: "Locations", href: "/locations" },
  { name: "Emergency", href: "/emergency" },
  { name: "Blog", href: "/blog" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-md bg-[var(--color-text)] rounded-xl mt-2.5 mx-2.5">
      {/* Top Announcement Banner */}
      <div className="bg-[var(--color-secondary)] py-2 text-sm text-[var(--color-text)] flex items-center justify-center rounded-t-lg">
        <p className="mr-4">Most insured members have a $0 copay. Learn more</p>
        <Link href="#" className="font-semibold hover:underline">
          Learn More <ArrowBigRight className="inline h-4 w-4" />
        </Link>
      </div>

      {/* Main Navigation Header */}
      <nav
        className="mx-auto lg:flex items-center justify-between p-4 lg:px-16"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          {/* <Image
            src="/primetherapy.svg" // or .svg
            alt="Prime Therapy Logo"
            width={100}
            height={100}
          /> */}
          <span className="text-xl font-semibold text-accent-text">
            Prime Therapy
          </span>
        </div>
        <div className="hidden lg:flex lg:gap-x-4 lg:items-center mr-6">
          {navigation
            .filter((item) =>
              ["Price", "Services", "Locations"].includes(item.name)
            )
            .map((item) => (
              <div key={item.name}>
                <Popover>
                  <PopoverButton className="text-base font-semibold text-[var(--color-accent-text)] px-5 py-3 rounded-xl hover:bg-[var(--color-accent)]  transition duration-200 cursor-pointer focus:outline-none">
                    <div>
                      {item.name} <ChevronDown className="inline h-4 w-4" />
                    </div>
                  </PopoverButton>
                  <PopoverPanel className="absolute z-10 mt-2 w-56 rounded-lg bg-[var(--color-accent)] shadow-lg">
                    <div className="p-4">
                      <Link
                        href="#"
                        className="block text-base font-semibold text-[var(--color-text)] hover:underline"
                      >
                        Pricing Plans
                      </Link>
                      <Link
                        href="#"
                        className="block text-base font-semibold text-[var(--color-text)] hover:underline"
                      >
                        Discounts
                      </Link>
                    </div>
                  </PopoverPanel>
                </Popover>
              </div>
            ))}

          {/* Other Navigation Links */}
          {navigation
            .filter(
              (item) => !["Price", "Services", "Locations"].includes(item.name)
            )
            .map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-semibold text-[var(--color-accent-text)] px-5 py-3 rounded-xl hover:bg-[var(--color-accent)]  transition duration-200"
              >
                {item.name}
              </Link>
            ))}
        </div>
        {/* Log In and Book Now Buttons */}
        <div className="hidden lg:flex lg:gap-x-4">
          <Link
            href="/log-in"
            className="rounded-lg bg-transparent px-4 py-2 text-base font-semibold text-[var(--color-accent-text)] hover:bg-[var(--color-accent)] transition duration-200"
          >
            Log in
          </Link>
          <Link
            href="/book-now"
            className="rounded-lg bg-[var(--color-accent-text)] px-4 py-2 text-base font-semibold text-[var(--color-text)] hover:text-[var(--color-accent-text)] shadow-sm hover:bg-accent focus:outline-none  transition duration-200"
          >
            Find a Therapist
          </Link>
        </div>

        <div className="flex justify-end lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center bg-accent-text rounded-md p-2.5 text-[var(--color-text)] hover:bg-[var(--color-primary-hover)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu (using Headless UI Dialog) */}
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
            <div className="fixed inset-0 bg-[var(--color-bg)]/80" />
          </TransitionChild>

          <div className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-[var(--color-bg)] px-6 py-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Tend</span>
                <span className="text-xl font-bold text-[var(--color-primary)]">
                  tend
                </span>{" "}
                {/* Placeholder for your logo text/image */}
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-[var(--color-text)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-[var(--color-secondary-hover)]">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-[var(--color-text)] hover:bg-[var(--color-secondary-hover)] hover:text-[var(--color-primary)] transition duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/log-in"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-[var(--color-text)] transition duration-200"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/book-now"
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 bg-[var(--color-primary)] text-[var(--color-text)] hover:bg-[var(--color-primary-hover)]"
                  >
                    Book now
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
