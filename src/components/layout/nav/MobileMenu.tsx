"use client";
import React from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { X } from "lucide-react";
import Link from "next/link";
import { MainNavProps } from "./header.types";
import Card from "@/components/molecules/Card";

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

  return (
    <Transition show={isOpen} as={Dialog} static onClose={onClose}>
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
          <div className="fixed inset-0 bg-[var(--color-bg-contrast)]/80 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-[var(--color-bg)] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-xl font-semibold text-[var(--color-text)]">
                Prime Time
              </span>
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
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-[var(--color-accent)]">
              <div className="space-y-2 py-6">
                {navItems.map((item) => (
                  <div key={item?.label} className="py-2">
                    <Link
                      href={item?.href ?? "#"}
                      className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[var(--color-text)] hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200"
                    >
                      {item?.label}
                    </Link>
                    {item?.subItems && item?.subItems.length > 0 && (
                      <div className="mt-2 space-y-2 pl-4">
                        {item?.subItems.map((subItem) => (
                          <Link
                            key={subItem?.label}
                            href={subItem?.href ?? "#"}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200"
                          >
                            {subItem?.label && (
                              <Card
                                title={subItem.label}
                                icon={subItem?.icon || undefined}
                                variant={subItem?.variant || undefined}
                                description={subItem?.description || undefined}
                              />
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/log-in"
                  className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[var(--color-text)] hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200"
                >
                  Log in
                </Link>
                <Link
                  href="/book-now"
                  className="mt-4 block rounded-lg bg-[var(--color-primary)] px-3 py-2.5 text-base font-semibold leading-7 text-[var(--color-text)] hover:bg-[var(--color-primary-hover)] transition duration-200"
                >
                  Find a Therapist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Transition>
  );
};
