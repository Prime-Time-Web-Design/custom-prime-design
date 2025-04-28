"use client";
import React from "react";
import { MainNavProps } from "./header.types";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Card from "@/components/molecules/Card";

export const MainNav: React.FC<MainNavProps> = (props: MainNavProps) => {
  const { navigation } = props;
  const navItems = navigation?.mainNav || [];

  return (
    <>
      {/* Main Navigation Header */}

      <nav
        className="mx-auto flex items-center p-2 lg:px-16 text-[var(--color-text)] shadow-md rounded-2xl"
        aria-label="Global"
      >
        {/* Desktop Layout: Single flex container */}
        <div className="hidden lg:flex w-full items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-semibold text-[var(--color-text)]">
              <Link href="/">
                {/* <Image
                  src="/logo.svg"
                  alt="Prime Time Web Design Logo"
                  width={10}
                  height={10}
                  className="h-auto w-auto cursor-pointer"
                  priority
                /> */}
                Prime Time
              </Link>
            </span>
          </div>
          {/* Nav Items */}
          <div className="flex items-center gap-x-8">
            {navItems
              .filter(
                (item): item is NonNullable<typeof item> =>
                  item !== null && item !== undefined
              )
              .map((item) =>
                item.subItems && item.subItems.length > 0 ? (
                  <div key={item.label}>
                    <Popover className="relative">
                      <PopoverButton className="text-base font-semibold text-[var(--color-text)] p-[1rem_0.875rem_1rem_1rem] rounded-xl hover:bg-[var(--color-accent-hover)] transition duration-200 cursor-pointer focus:outline-none">
                        <div>
                          {item.label}{" "}
                          <ChevronDown className="inline h-4 w-4" />
                        </div>
                      </PopoverButton>
                      <PopoverPanel className="absolute z-10 mt-4 left-0 rounded-2xl bg-[var(--color-bg)] shadow-2xl">
                        <div className="p-4 flex flex-col gap-2 min-w-[280px]">
                          {item.subItems
                            .filter(
                              (
                                subitem
                              ): subitem is NonNullable<typeof subitem> =>
                                subitem !== null && subitem !== undefined
                            )
                            .map((subitem) => (
                              <Link
                                key={subitem.label}
                                href={subitem.href}
                                className="block text-base font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)]"
                              >
                                <Card
                                  title={subitem.label}
                                  icon={subitem.icon ?? undefined}
                                  variant={subitem.variant ?? undefined}
                                />
                              </Link>
                            ))}
                        </div>
                      </PopoverPanel>
                    </Popover>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href ?? "#"}
                    className="text-base font-semibold text-[var(--color-text)] p-[1rem_0.875rem_1rem_1rem] rounded-xl hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200"
                  >
                    {item.label}
                  </Link>
                )
              )}
          </div>
          {/* Actions */}
          <div className="flex items-center gap-x-4">
            <Link
              href="/log-in"
              className="rounded-lg bg-transparent px-4 py-2 text-base font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200"
            >
              Log in
            </Link>
            <Link
              href="/book-now"
              className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-base font-semibold text-[var(--color-text)] hover:bg-[var(--color-primary-hover)] shadow-sm focus:outline-none transition duration-200"
            >
              Find a Therapist
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNav;
