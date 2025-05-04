"use client";
import React, { useRef, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { MainNavProps } from "./header.types";
import Image from "next/image";
import mobileLogo from "../../../../public/mobileLogo.svg";

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
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-[100]"
        onClose={onClose}
      >
        <TransitionChild
          as={React.Fragment}
          enter="transition-opacity ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[var(--color-bg-contrast)]/80 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 z-[100] lg:hidden overflow-hidden">
          <div className="min-h-full">
            <TransitionChild
              as={React.Fragment}
              enter="transform transition ease-out duration-300"
              enterFrom="-translate-y-full"
              enterTo="translate-y-0"
              leave="transform transition ease-in duration-200"
              leaveFrom="translate-y-0"
              leaveTo="-translate-y-full"
            >
              <DialogPanel className="relative bg-[var(--color-bg)] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <Link href="/">
                      <Image src={mobileLogo} width={120} height={40} alt="Logo" />
                    </Link>
                    <button
                      type="button"
                      className="rounded-xl p-2.5 text-[var(--color-text)] hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <nav className="mt-6 flow-root">
                    <div className="space-y-2">
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
                              onClick={() => handleDetailsClick(item.label)}
                            >
                              <summary className="list-none flex cursor-pointer items-center rounded-lg px-3 py-2 text-base font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200">
                                {item?.label}
                                <ChevronDown
                                  className={`ml-2 h-4 w-4 text-primary transition-transform duration-200 group-open:rotate-180`}
                                />
                              </summary>
                              <div className="mt-2 pl-4 space-y-2">
                                {item?.subItems.map((subItem) => (
                                  <Link
                                    key={subItem?.label}
                                    href={subItem?.href ?? "#"}
                                    onClick={onClose}
                                    className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200"
                                  >
                                    {subItem?.label}
                                  </Link>
                                ))}
                              </div>
                            </details>
                          ) : (
                            <Link
                              href={item?.href ?? "#"}
                              onClick={onClose}
                              className="block rounded-lg px-3 py-2 text-base font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200"
                            >
                              {item?.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-[var(--color-accent)]">
                      <Link
                        href="/log-in"
                        onClick={onClose}
                        className="block rounded-lg px-3 py-2.5 text-base font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200"
                      >
                        Log in
                      </Link>
                      <Link
                        href="/book-now"
                        onClick={onClose}
                        className="mt-4 block rounded-lg bg-[var(--color-primary)] px-3 py-2.5 text-base font-semibold text-[var(--color-text)] hover:bg-[var(--color-primary-hover)] transition duration-200"
                      >
                        Find a Therapist
                      </Link>
                    </div>
                  </nav>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
