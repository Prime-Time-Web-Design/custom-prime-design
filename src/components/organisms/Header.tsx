"use client";
import { useState } from "react";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";
import Link from "next/link"; // Assuming you're using Next.js
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[var(--color-primary)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex shrink-0 items-center">
              <Link
                href="/"
                className="text-[var(--color-text)] font-bold text-lg"
              >
                My Logo
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[var(--color-text)] hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-primary)] rounded-md px-3 py-2 text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <Popover>
                <PopoverButton className="block text-sm/6 font-semibold text-[var(--color-secondary-hover)] focus:outline-none data-[active]:text-[var(--color-secondary)] data-[hover]:text-[var(--color-secondary)] data-[focus]:outline-1 data-[focus]:outline-[var(--color-secondary)]">
                  Solutions
                </PopoverButton>
                <PopoverPanel
                  transition
                  anchor="bottom"
                  className="divide-y divide-[var(--color-secondary-hover)] rounded-xl bg-[var(--color-secondary-hover)] text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                >
                  <div className="p-3">
                    <a
                      className="block rounded-lg py-2 px-3 transition hover:bg-[var(--color-primary-hover)]"
                      href="#"
                    >
                      <p className="font-semibold text-[var(--color-primary)]">
                        Insights
                      </p>
                      <p className="text-[var(--color-text)]">
                        Measure actions your users take
                      </p>
                    </a>
                    <a
                      className="block rounded-lg py-2 px-3 transition hover:bg-[var(--color-primary-hover)]"
                      href="#"
                    >
                      <p className="font-semibold text-[var(--color-primary)]">
                        Automations
                      </p>
                      <p className="text-[var(--color-text)]">
                        Create your own targeted content
                      </p>
                    </a>
                    <a
                      className="block rounded-lg py-2 px-3 transition hover:bg-[var(--color-primary-hover)]"
                      href="#"
                    >
                      <p className="font-semibold text-[var(--color-primary)]">
                        Reports
                      </p>
                      <p className="text-[var(--color-text)]">
                        Keep track of your growth
                      </p>
                    </a>
                  </div>
                  <div className="p-3">
                    <a
                      className="block rounded-lg py-2 px-3 transition hover:bg-[var(--color-primary-hover)]"
                      href="#"
                    >
                      <p className="font-semibold text-[var(--color-primary)]">
                        Documentation
                      </p>
                      <p className="text-[var(--color-text)]">
                        Start integrating products and tools
                      </p>
                    </a>
                  </div>
                </PopoverPanel>
              </Popover>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-[var(--color-bg)] p-2 text-[var(--color-text)] hover:bg-[var(--color-primary-hover)] hover:text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div
        className={`sm:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="bg-[var(--color-primary-hover)] text-[var(--color-text)] block rounded-md px-3 py-2 text-base font-medium"
              aria-current={item.href === "/" ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
