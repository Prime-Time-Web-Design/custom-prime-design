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
    <div>
      <nav className="flow-root">
        <div>
          {navItems.map((item) => (
            <div key={item?.label}>
              {item?.subItems && item?.subItems.length > 0 ? (
                <details
                  ref={(el: HTMLDetailsElement | null) => {
                    if (item.label) {
                      detailsRefs.current[item.label] = el;
                    }
                  }}
                  className="group border-b border-[#ffffff30]"
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
                  <summary className="list-none flex justify-between cursor-pointer items-center px-6 py-4 text-xl font-semibold text-white hover:text-white transition duration-200">
                    {item?.label}
                    <ChevronDown
                      className={`h-6 w-6 text-white transition-transform duration-200 group-open:rotate-180`}
                    />
                  </summary>
                  <div className="bg-[#ffffff10]">
                    {item?.subItems.map((subItem) => (
                      <Link
                        key={subItem?.label}
                        href={subItem?.href ?? "#"}
                        onClick={() => {
                          closeMenu(); // Close the hamburger menu using context
                          onClose(); // Also call the original onClose for compatibility
                        }}
                        className="block px-6 py-4 text-base font-medium text-white hover:bg-[#ffffff20] transition duration-200"
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
                  className="flex justify-between items-center px-6 py-4 text-xl font-semibold text-white hover:bg-[#ffffff10] transition duration-200 border-b border-[#ffffff30]"
                >
                  {item?.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="chevron-right"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};
