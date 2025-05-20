"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  PageBlocksServiceListingBlock,
  PageBlocksServiceListingBlockServices,
} from "../../../tina/__generated__/types";

interface ServiceListingBlockProps {
  data: PageBlocksServiceListingBlock;
}

const ServiceListingBlock: React.FC<ServiceListingBlockProps> = ({ data }) => {
  const {
    title = "",
    services = [],
    ctaText = "",
    ctaLink = "#",
    ctaContent = "",
    backgroundColor = "bg-[var(--color-bg-secondary)]",
  } = data || {};
  return (
    <section className={`${backgroundColor} py-16 px-4`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-white">
            {title}
          </h2>
        )}

        {services && services.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services
              ?.filter(
                (service): service is PageBlocksServiceListingBlockServices =>
                  !!service
              )
              .map((service) => (
                <Link
                  key={service.slug}
                  href={service.slug || "#"}
                  className="bg-secondary-hover bg-opacity-90 hover:bg-opacity-100 text-[var(--color-text)] font-medium rounded-lg p-5 text-center group relative overflow-hidden hover:shadow-md transition-all duration-300"
                  style={{
                    transitionProperty: "background, box-shadow, transform",
                  }}
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <span>{service.name}</span>
                    <span className="relative inline-block">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">
                        <ArrowRight size={22} />
                      </span>
                    </span>
                  </span>
                </Link>
              ))}
          </div>
        )}

        {(ctaContent || ctaText) && (
          <div className="mt-12 text-center">
            {ctaContent && (
              <p className="text-white text-lg mb-5 max-w-2xl mx-auto">
                {ctaContent}
              </p>
            )}
            {ctaText && (
              <Link
                href={ctaLink ?? "#"}
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium py-3 px-6 rounded-md transition-all duration-300 group"
              >
                <span>{ctaText}</span>
                <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight size={18} />
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceListingBlock;
