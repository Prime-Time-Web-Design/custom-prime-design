"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import "./service-listing.css";

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
      // Convert string values to rich text format if needed
      let examples = service.examples;

      // If examples is a string (old format) or doesn't exist, convert to rich text format
      if (!examples || typeof examples === "string") {
        const defaultExamples =
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

        // Convert string to rich text format with bullet points

        examples = {
          type: "root",
          children: [
            {
              type: "p",
              children: [{ type: "text", text: "" }],
            },
            {
              type: "ul",
              children: defaultExamples.split(",").map((item: string) => ({
                type: "li",
                children: [{ type: "text", text: item.trim() }],
              })),
            },
          ],
        };
      }

      // Handle description in the same way
      let description = service.description;

      if (!description || typeof description === "string") {
        const defaultDescription =
          service.description ||
          "Our therapists use evidence-based approaches tailored to address your specific needs.";

        description = {
          type: "root",
          children: [
            {
              type: "p",
              children: [{ type: "text", text: defaultDescription }],
            },
          ],
        };
      }

      return {
        ...service,
        examples,
        description,
        treatmentApproach: description,
      };
    })
    .filter(Boolean) as EnhancedService[];

  // State to track which tab is active
  // Initialize with the first service if available
  const [activeTab, setActiveTab] = useState<string>(
    enhancedServices.length > 0 ? enhancedServices[0]?.name || "" : ""
  );

  // Find the currently active service
  const activeService = enhancedServices.find((s) => s.name === activeTab);

  return (
    <section className={`${backgroundColor} py-16 px-4`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-text">
            {title}
          </h2>
        )}

        {/* Mobile Tabs - Horizontal scrollable tabs */}
        <div className="md:hidden mb-4">
          {enhancedServices.length > 0 && (
            <div className="service-tabs-mobile">
              {enhancedServices.map((service) => (
                <button
                  key={service.name}
                  onClick={() => setActiveTab(service.name)}
                  className={`service-tab-button text-sm cursor-pointer transition-all ${
                    activeTab === service.name
                      ? "service-tab-active bg-bg-contrast text-bg"
                      : "bg-tertiary text-bg-contrast hover:opacity-90"
                  }`}
                >
                  {service.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:h-[480px]">
          {/* Left side - tabs (desktop only) */}
          <div className="hidden md:block md:w-1/3 md:pr-0">
            {enhancedServices.length > 0 && (
              <div className="flex flex-col h-full">
                {enhancedServices.map((service) => (
                  <button
                    key={service.name}
                    onClick={() => setActiveTab(service.name)}
                    className={`text-left h-[60px] py-5 px-6 flex rounded-l-lg items-center justify-between border-b border-gray-200 group transition-all cursor-pointer duration-300 ${
                      activeTab === service.name
                        ? "bg-bg-contrast text-bg font-medium"
                        : "text-bg-contrast hover:text-text hover:bg-gray-50 bg-tertiary"
                    }`}
                  >
                    <span
                      className={`text-lg whitespace-nowrap overflow-hidden text-ellipsis max-w-[80%] ${
                        activeTab === service.name ? "font-medium" : ""
                      }`}
                    >
                      {service.name}
                    </span>
                    {activeTab === service.name && (
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right side - Content for active tab */}
          <div className="w-full md:w-2/3 bg-bg-contrast md:rounded-r-lg p-6 md:p-8 h-[420px] md:h-[480px] flex flex-col">
            {activeService ? (
              <div className="flex flex-col h-full">
                <div className="border-b border-gray-200 mb-4">
                  <h3 className="text-2xl font-bold mb-2 text-bg">
                    {activeService.name}
                  </h3>
                  <div className="text-bg mb-3 max-h-[100px] overflow-y-auto">
                    {activeService.examples && (
                      <div className="prose prose-sm max-w-none text-bg">
                        <TinaMarkdown content={activeService.examples} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="prose prose-lg max-w-none mb-4 flex-grow overflow-hidden">
                  {activeService.description && (
                    <div className="text-bg h-full flex flex-col">
                      <h4 className="text-2xl font-medium mb-2">
                        How we treat it
                      </h4>
                      <div className="flex-grow overflow-y-auto pr-2 prose prose-sm max-w-none text-bg">
                        <TinaMarkdown content={activeService.description} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-2">
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
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4">
                <p className="text-bg text-lg">
                  Select a condition to view details
                </p>
              </div>
            )}
          </div>
        </div>

        {(ctaContent || ctaText) && !activeService && (
          <div className="mt-6 text-center">
            {ctaContent && (
              <p className="text-text text-lg mb-2 max-w-2xl mx-auto">
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
