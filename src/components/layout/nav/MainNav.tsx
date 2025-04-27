import React from "react";
import { MainNavProps } from "./header.types";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";

const getIconComponent = (iconName: string) => {
  const IconComponent = (
    LucideIcons as unknown as Record<
      string,
      React.ComponentType<React.SVGProps<SVGSVGElement>>
    >
  )[iconName];
  return IconComponent ? <IconComponent className="inline h-4 w-4" /> : null;
};

export const MainNav: React.FC<MainNavProps> = (props: MainNavProps) => {
  const { navigation } = props;
  const navItems = navigation?.mainNav || [];

  console.log(navigation);

  return (
    <>
      {/* Main Navigation Header */}
      <nav
        className="mx-auto flex items-center justify-between p-4 lg:px-16"
        aria-label="Global"
      >
        {/* Logo Section */}
        <div className="flex flex-1">
          <span className="text-xl font-semibold text-accent-text">
            {/* {logoText} */}
            Prime Therapy
          </span>
        </div>

        {/* Navigation Items */}
        <div className="hidden lg:flex lg:gap-x-4 lg:items-center">
          {navItems
            .filter(
              (item): item is NonNullable<typeof item> =>
                item !== null && item !== undefined
            )
            .map((item) =>
              item.subItems && item.subItems.length > 0 ? (
                <div key={item.label}>
                  <Popover>
                    <PopoverButton className="text-base font-semibold text-[var(--color-accent-text)] px-5 py-3 rounded-xl hover:bg-[var(--color-accent)] transition duration-200 cursor-pointer focus:outline-none">
                      <div>
                        {item.label} <ChevronDown className="inline h-4 w-4" />
                      </div>
                    </PopoverButton>
                    <PopoverPanel className="absolute z-10 mt-2 w-56 rounded-lg bg-[var(--color-accent)] shadow-lg">
                      <div className="p-4">
                        {item.subItems
                          .filter(
                            (subitem): subitem is NonNullable<typeof subitem> =>
                              subitem !== null && subitem !== undefined
                          )
                          .map((subitem) => (
                            <Link
                              key={subitem.label}
                              href={subitem.href}
                              className="block text-base font-semibold text-[var(--color-text)] hover:underline"
                            >
                              {subitem.label}{" "}
                              {subitem.icon && getIconComponent(subitem.icon)}
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
                  className="text-base font-semibold text-[var(--color-accent-text)] px-5 py-3 rounded-xl hover:bg-[var(--color-accent)] transition duration-200"
                >
                  {item.label}
                </Link>
              )
            )}
        </div>

        {/* Log In and Find a Therapist Buttons */}
        <div className="hidden lg:flex lg:gap-x-4">
          <Link
            href="/log-in"
            className="rounded-lg bg-transparent px-4 py-2 text-base font-semibold text-[var(--color-accent-text)] hover:bg-[var(--color-accent)] transition duration-200"
          >
            Log in
          </Link>
          <Link
            href="/book-now"
            className="rounded-lg bg-[var(--color-accent-text)] px-4 py-2 text-base font-semibold text-[var(--color-text)] hover:text-[var(--color-accent-text)] shadow-sm hover:bg-accent focus:outline-none transition duration-200"
          >
            Find a Therapist
          </Link>
        </div>
      </nav>
    </>
  );
};

export default MainNav;
