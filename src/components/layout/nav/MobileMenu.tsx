"use client";
import React, { useRef, useEffect, useContext } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { MainNavProps } from "./header.types";
import { MenuContext } from "../../molecules/HamburgerMenu";

interface MobileMenuProps extends MainNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  navigation,
  isOpen,
  onClose,
}) => {
  const navItems = navigation?.mainNav || [];
  const detailsRefs = useRef<{ [key: string]: HTMLDetailsElement | null }>({});
  const { closeMenu } = useContext(MenuContext);

  const handleDetailsClick = (clickedLabel: string) => {
    // Close all other details elements when one is opened
    Object.entries(detailsRefs.current).forEach(([label, element]) => {
      if (label !== clickedLabel && element) {
        element.open = false;
      }
    });
  };

  useEffect(() => {
    // Close all details when mobile menu is closed
    if (!isOpen) {
      Object.values(detailsRefs.current).forEach((element) => {
        if (element) {
          element.open = false;
        }
      });
    }
  }, [isOpen]);

  return (
    <div className="px-6 py-4">
      <nav className="mt-8 flow-root">
        <div className="space-y-3">
          {navItems.map((item) => (
            <div key={item?.label} className="py-2">
              {item?.subItems && item?.subItems.length > 0 ? (
                <details
                  ref={(el: HTMLDetailsElement | null) => {
                    if (item.label) {
                      detailsRefs.current[item.label] = el;
                    }
                  }}
                  className="group"
                  onClick={(e) => {
                    handleDetailsClick(item.label);

                    // Check if the click was directly on an <a> tag (link) or its descendant
                    const target = e.target as HTMLElement;
                    if (
                      target.tagName.toLowerCase() === "a" ||
                      target.closest("a")
                    ) {
                      closeMenu();
                      onClose();
                    }
                  }}
                >
                  <summary className="list-none flex cursor-pointer items-center rounded-lg px-4 py-3 text-base font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200">
                    {item?.label}
                    <ChevronDown
                      className={`ml-2 h-5 w-5 text-primary transition-transform duration-200 group-open:rotate-180`}
                    />
                  </summary>
                  <div className="mt-3 pl-6 space-y-3">
                    {item?.subItems.map((subItem) => (
                      <Link
                        key={subItem?.label}
                        href={subItem?.href ?? "#"}
                        onClick={() => {
                          closeMenu(); // Close the hamburger menu using context
                          onClose(); // Also call the original onClose for compatibility
                        }}
                        className="block rounded-lg px-4 py-3 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200"
                      >
                        {subItem?.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  href={item?.href ?? "#"}
                  onClick={() => {
                    closeMenu(); // Close the hamburger menu using context
                    onClose(); // Also call the original onClose for compatibility
                  }}
                  className="block rounded-lg px-4 py-3 text-base font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200"
                >
                  {item?.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};
