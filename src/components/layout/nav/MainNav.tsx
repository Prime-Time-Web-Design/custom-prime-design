"use client";
import React from "react";
import { MainNavProps, SubItem } from "./header.types";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Card from "@/components/molecules/Card";
import Image from "next/image";
import logo from "../../../../public/optimized/primeLogo-trimmed.webp";

export const MainNav: React.FC<MainNavProps> = ({ navigation }) => {
  // navItems is always an array of non-null items
  const navItems = (navigation?.mainNav ?? []).filter(
    (item): item is NonNullable<typeof item> => !!item && !!item.label
  );

  const renderSubItems = (
    subItems: (SubItem | null)[] | null | undefined,
    close: () => void
  ) =>
    (subItems ?? []).filter(Boolean).map((subitem) =>
      subitem && subitem.label && subitem.href ? (
        <Link
          key={subitem.label}
          href={subitem.href}
          className="block text-base font-medium text-[var(--color-text)] hover:text-[var(--color-primary)]"
          onClick={() => close()}
        >
          <Card
            title={subitem.label}
            icon={subitem.icon ?? undefined}
            variant={subitem.variant ?? undefined}
            description={subitem.description ?? undefined}
          />
        </Link>
      ) : null
    );

  return (
    <nav
      className="w-full flex items-center text-[var(--color-text)] shadow-md"
      aria-label="Global"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 w-full py-2 lg:py-4">
        <div className="hidden lg:flex w-full items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                width={120}
                height={21}
                alt="Logo"
                style={{ height: "auto" }}
                priority
                className="py-1"
              />
            </Link>
          </div>
          <div className="flex items-center gap-x-4">
            {navItems.map((item) =>
              item.subItems?.length || item.featuredCards?.length ? (
                <div key={item.label}>
                  <Popover className="relative">
                    {({ open, close }) => (
                      <>
                        <PopoverButton className="text-base font-medium text-bg px-4 py-2 rounded-lg hover:bg-bg-contrast-light transition duration-200 cursor-pointer focus:outline-none">
                          <div className="flex items-center gap-2">
                            {item.label}
                            <ChevronDown
                              className={`inline h-4 w-4 transition-transform duration-200 ${
                                open ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </PopoverButton>
                        <PopoverPanel className="absolute z-10 mt-2 left-0 rounded-xl bg-bg shadow-xl focus:outline-none overflow-hidden">
                          <div className="flex flex-row relative">
                            <div className="p-4 flex flex-col gap-2 flex-1">
                              {renderSubItems(item.subItems, close)}
                            </div>

                            {/* Conditions We Treat section */}
                            {item.label === "Our Programs" ||
                            item.label === "Services" ? (
                              <div className="flex flex-col min-w-[220px] bg-bg-contrast p-4">
                                <h3 className="text-base font-bold mb-2 text-bg">
                                  What We Treat
                                </h3>
                                <div className="h-1 w-30 mb-2 rounded bg-tertiary" />
                                <ul className="space-y-3">
                                  {[
                                    "Anxiety",
                                    "Depression",
                                    "Trauma",
                                    "Self-Harm",
                                    "Substance Use Disorders",
                                    "Eating Disorders",
                                  ].map((condition) => (
                                    <li key={condition}>
                                      <Link
                                        href={`/conditions/${condition
                                          .toLowerCase()
                                          .replace(/\s+/g, "-")}`}
                                        className="text-bg hover:text-secondary transition-colors"
                                        onClick={() => close()}
                                      >
                                        {condition}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                                <div className="mt-4 pt-2 border-tertiary border-t-2">
                                  <Link
                                    href="/conditions"
                                    className="text-sm text-bg hover:underline"
                                    onClick={() => close()}
                                  >
                                    Explore All
                                  </Link>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </PopoverPanel>
                      </>
                    )}
                  </Popover>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href ?? "#"}
                  className="text-base font-medium text-bg px-4 py-2 rounded-lg hover:bg-bg-contrast-light  transition duration-200 focus-visible:outline-none"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
          <div className="flex items-center gap-x-4">
            <Link
              href="/log-in"
              className="rounded-lg bg-transparent px-4 py-2 text-base font-medium text-bg  hover:bg-bg-contrast-light transition duration-200 focus:outline-none focus:text-[var(--color-primary)]"
            >
              Log in
            </Link>
            <Link
              href="/book-now"
              className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-base font-medium text-bg hover:bg-[var(--color-primary-hover)] shadow-sm transition duration-200 focus:outline-none focus:text-[var(--color-bg)]"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
