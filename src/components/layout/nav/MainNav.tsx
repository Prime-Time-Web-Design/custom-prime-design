"use client";
import React from "react";
import { MainNavProps, NavigationItem, SubItem } from "./header.types";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Card from "@/components/molecules/Card";
import Image from "next/image";
import logo from "../../../../public/logo.svg"; // Adjust the path to your logo image

export const MainNav: React.FC<MainNavProps> = (props: MainNavProps) => {
  const { navigation } = props;
  const navItems = navigation?.mainNav || [];

  const renderSubItems = (
    subItems: Array<SubItem | null> | null | undefined
  ) => {
    if (!subItems?.length) return null;

    return subItems
      .filter((subitem): subitem is SubItem => subitem !== null)
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
            description={subitem.description ?? undefined}
          />
        </Link>
      ));
  };

  return (
    <>
      <nav
        className="mx-auto flex items-center md:px-10 lg:p-2 lg:px-16 text-[var(--color-text)] shadow-md lg:rounded-2xl"
        aria-label="Global"
      >
        <div className="hidden lg:flex w-full items-center justify-between">
          <div className="flex-shrink-0">
            <span className="text-xl font-semibold text-[var(--color-text)]">
              {/* <Link href="/">Prime Time</Link>
               */}
              <Link href="/">
                <Image src={logo} width={220} height={60} alt="Logo" />
              </Link>
            </span>
          </div>
          <div className="flex items-center gap-x-4">
            {navItems
              .filter(
                (item): item is NavigationItem =>
                  item !== null && item !== undefined
              )
              .map((item) =>
                item.subItems?.length ? (
                  <div key={item.label}>
                    <Popover className="relative">
                      {({ open }) => (
                        <>
                          <PopoverButton className=" text-base font-semibold text-[var(--color-text)] p-[1rem_0.875rem_1rem_1rem] rounded-xl hover:bg-[var(--color-accent-hover)] transition duration-200 cursor-pointer ">
                            <div className="flex items-center gap-2">
                              {item.label}
                              <ChevronDown
                                className={`inline h-4 w-4 transition-transform duration-200 ${
                                  open ? "rotate-180" : ""
                                }`}
                              />
                            </div>
                          </PopoverButton>
                          <PopoverPanel className="absolute z-10 mt-4 left-0 rounded-2xl bg-[var(--color-bg)] shadow-2xl">
                            <div className="p-4 flex flex-col gap-2 min-w-[280px]">
                              {renderSubItems(item.subItems)}
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
                    className="text-base font-semibold focus:outline-[var(--color-secondary)] focus:outline-1 text-[var(--color-text)] p-[1rem_0.875rem_1rem_1rem] rounded-xl hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200"
                  >
                    {item.label}
                  </Link>
                )
              )}
          </div>
          <div className="flex items-center gap-x-4">
            <Link
              href="/log-in"
              className="rounded-lg bg-transparent px-4 py-2 text-base font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200 "
            >
              Log in
            </Link>
            <Link
              href="/book-now"
              className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-base font-semibold text-[var(--color-text)] hover:bg-[var(--color-primary-hover)] shadow-sm focus:outline-[var(--color-secondary)]  transition duration-200"
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
