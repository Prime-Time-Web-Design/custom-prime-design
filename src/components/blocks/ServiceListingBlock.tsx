"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  PageBlocksServiceListingBlock,
  PageBlocksServiceListingBlockServices,
} from "../../../tina/__generated__/types";

// Extended interface for our tabbed services
interface EnhancedService extends PageBlocksServiceListingBlockServices {
  treatmentApproach?: string; // Alias for description
}

interface ServiceListingBlockProps {
  data: PageBlocksServiceListingBlock;
}

const ServiceListingBlock: React.FC<ServiceListingBlockProps> = ({ data }) => {
  const {
    title = "",
    services = [],
    ctaText = "Find a therapist",
    ctaLink = "#",
    ctaContent = "",
    backgroundColor = "bg-bg-beige",
  } = data || {};

  // Use the services data directly from Tina
  // These fields are now defined in the Tina schema
  const enhancedServices: EnhancedService[] = services
    ?.map((service) => {
      if (!service) return null;

      // For backward compatibility with existing data
      // If the fields aren't in Tina yet, provide defaults
      const examples =
        service.examples ||
        (service.name === "Anxiety"
          ? "Generalized anxiety, social anxiety, panic attacks, panic disorder, agoraphobia"
          : service.name === "Depression"
          ? "Major depression, melancholic depression, atypical depression, seasonal affective disorder"
          : service.name === "Trauma"
          ? "Acute trauma, chronic trauma, complex trauma, post-traumatic stress disorder"
          : service.name === "Self-harm"
          ? "Self-harm, self-injury, suicidal ideation, suicide survival"
          : service.name === "Substance use disorders"
          ? "Alcohol, marijuana, prescription drugs, opioids, amphetamines, cocaine"
          : service.name === "Eating disorders"
          ? "Anorexia, bulimia, binge eating disorder, rumination disorder, orthorexia"
          : "Various types and manifestations");

      const description =
        service.description ||
        "Our therapists use evidence-based approaches tailored to address your specific needs.";

      return {
        ...service,
        examples,
        description,
        treatmentApproach: description,
      };
    })
    .filter(Boolean) as EnhancedService[];

  // State to track which tab is active
  const [activeTab, setActiveTab] = useState<string>(
    enhancedServices.length > 0 ? enhancedServices[0]?.name || "" : ""
  );

  const activeService = enhancedServices.find((s) => s.name === activeTab);

  return (
    <section className={`${backgroundColor} py-16 px-4`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-text">
            {title}
          </h2>
        )}

        <div className="flex flex-col md:flex-row">
          {/* Left side - tabs */}
          <div className="md:w-1/3 md:pr-0">
            {enhancedServices.length > 0 && (
              <div className="flex flex-col">
                {enhancedServices.map((service) => (
                  <button
                    key={service.name}
                    onClick={() => setActiveTab(service.name)}
                    className={`text-left py-5 px-6 flex rounded-l-lg items-center justify-between border-b border-gray-200 group transition-all cursor-pointer duration-300 ${
                      activeTab === service.name
                        ? "bg-bg-contrast text-bg font-medium"
                        : "text-bg-contrast hover:text-text hover:bg-gray-50 bg-bg"
                    }`}
                  >
                    <span
                      className={`text-lg ${
                        activeTab === service.name ? "font-medium" : ""
                      }`}
                    >
                      {service.name}
                    </span>
                    {activeTab === service.name && (
                      <ArrowRight className="h-5 w-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right side - Content for active tab */}
          {activeService && (
            <div className="md:w-2/3 bg-bg-contrast rounded-r-lg p-6 md:p-8">
              <div className="border-b border-gray-200 mb-6">
                <h3 className="text-2xl font-bold mb-4 text-bg">
                  {activeService.name}
                </h3>
                <div className="text-bg mb-6">{activeService.examples}</div>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                {activeService.description && (
                  <div className="mb-6 text-bg">
                    <h4 className="text-lg font-medium mb-2 ">
                      How we treat it
                    </h4>
                    <p>{activeService.description}</p>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <Link
                  href={activeService.slug || ctaLink || "#"}
                  className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium py-3 px-6 rounded-md transition-all duration-300 group"
                >
                  <span>
                    {ctaText || `Find a therapist for ${activeService.name}`}
                  </span>
                  <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                    <ArrowRight size={18} />
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {(ctaContent || ctaText) && !activeService && (
          <div className="mt-12 text-center">
            {ctaContent && (
              <p className="text-text text-lg mb-5 max-w-2xl mx-auto">
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
