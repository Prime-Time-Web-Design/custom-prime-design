"use client";
import React from "react";
import { MainNavProps, SubItem, FeaturedCard } from "./header.types";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Card from "@/components/molecules/Card";
import FeaturedContentCard from "@/components/molecules/FeaturedContentCard";
import Image from "next/image";
import logo from "../../../../public/logo.svg";
import { mapFeaturedCards } from "./nav.helpers";

export const MainNav: React.FC<MainNavProps> = ({ navigation }) => {
  // navItems is always an array of non-null items
  const navItems = (navigation?.mainNav ?? []).filter(
    (item): item is NonNullable<typeof item> => !!item && !!item.label
  );

  const renderSubItems = (subItems: (SubItem | null)[] | null | undefined) =>
    (subItems ?? []).filter(Boolean).map((subitem) =>
      subitem && subitem.label && subitem.href ? (
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
      ) : null
    );

  const renderFeaturedCards = (
    featuredCards: (FeaturedCard | null)[] | null | undefined
  ) =>
    (mapFeaturedCards(featuredCards) || [])
      .filter((card): card is NonNullable<FeaturedCard> => {
        if (!card) return false;
        if (!card.image) return false;
        if (typeof card.image.src !== "string") return false;
        if (typeof card.image.alt !== "string") return false;
        if (typeof card.title !== "string") return false;
        if (typeof card.description !== "string") return false;
        if (typeof card.ctaText !== "string") return false;
        if (typeof card.ctaLink !== "string") return false;
        // Only allow 'vertical' or 'horizontal' or undefined for layout
        if (
          card.layout !== undefined &&
          card.layout !== "vertical" &&
          card.layout !== "horizontal"
        )
          return false;
        return true;
      })
      .map((card, idx) => (
        <FeaturedContentCard
          key={idx}
          title={card.title}
          description={card.description}
          ctaText={card.ctaText}
          ctaLink={card.ctaLink}
          layout={
            card.layout === "vertical" || card.layout === "horizontal"
              ? card.layout
              : undefined
          }
          image={{
            src: card.image?.src || "",
            alt: card.image?.alt || "",
          }}
        />
      ));

  return (
    <nav
      className="mx-auto flex items-center md:px-10 lg:p-2 lg:px-16 text-[var(--color-text)] shadow-md lg:rounded-2xl"
      aria-label="Global"
    >
      <div className="hidden lg:flex w-full items-center justify-between">
        <div className="flex-shrink-0">
          <span className="text-xl font-semibold text-[var(--color-text)]">
            <Link href="/">
              <Image src={logo} width={220} height={60} alt="Logo" />
            </Link>
          </span>
        </div>
        <div className="flex items-center gap-x-4">
          {navItems.map((item) =>
            item.subItems?.length || item.featuredCards?.length ? (
              <div key={item.label}>
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <PopoverButton className="text-base font-semibold text-[var(--color-text)] p-[1rem_0.875rem_1rem_1rem] rounded-xl hover:bg-[var(--color-accent-hover)] transition duration-200 cursor-pointer focus:outline-none">
                        <div className="flex items-center gap-2">
                          {item.label}
                          <ChevronDown
                            className={`inline h-4 w-4 transition-transform duration-200 ${
                              open ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </PopoverButton>
                      <PopoverPanel className="absolute z-10 mt-4 left-0 rounded-2xl bg-[var(--color-bg)] shadow-2xl focus:outline-none">
                        <div className="p-4 flex flex-row gap-x-4 relative">
                          <div className="flex flex-col gap-2 flex-1">
                            {renderSubItems(item.subItems)}
                          </div>
                          {item.featuredCards &&
                            item.featuredCards.length > 0 && (
                              <div className="flex flex-col gap-2 min-w-[240px] pl-4 border-l border-[var(--color-accent-hover)]">
                                {renderFeaturedCards(item.featuredCards)}
                              </div>
                            )}
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
                className="text-base font-semibold text-[var(--color-text)] p-[1rem_0.875rem_1rem_1rem] rounded-xl hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200 focus:outline-none focus:text-[var(--color-primary)]"
              >
                {item.label}
              </Link>
            )
          )}
        </div>
        <div className="flex items-center gap-x-4">
          <Link
            href="/log-in"
            className="rounded-lg bg-transparent px-4 py-2 text-base font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-primary-hover)] hover:text-[var(--color-primary)] transition duration-200 focus:outline-none focus:text-[var(--color-primary)]"
          >
            Log in
          </Link>
          <Link
            href="/book-now"
            className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-base font-semibold text-[var(--color-text)] hover:bg-[var(--color-primary-hover)] shadow-sm transition duration-200 focus:outline-none focus:text-[var(--color-bg)]"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
