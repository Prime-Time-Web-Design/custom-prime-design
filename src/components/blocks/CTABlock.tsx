import React from "react";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { normalizeSrc } from "@/lib/utils";
import { PageBlocksCtaBlock } from "../../../tina/__generated__/types";
import { ArrowUpRight } from "lucide-react";

interface CTABlockProps {
  data: PageBlocksCtaBlock;
}

export const CTABlock = ({ data }: CTABlockProps) => {
  const {
    heading,
    subheading,
    content,
    buttonText,
    buttonLink,
    imageSrc,
    imageAlt = "Featured Image",
    backgroundColor = "bg-[var(--color-bg)]",
  } = data;

  // Check if we have a valid image source
  const hasImage =
    imageSrc && typeof imageSrc === "string" && imageSrc.trim() !== "";

  return (
    <div className={`px-4 py-16 ${backgroundColor} border-b border-gray-200`}>
      <div className="max-w-7xl mx-auto">
        {/* Two-column layout container */}
        <div className="flex flex-col md:flex-row items-center gap-5">
          {/* Left column - Card with image and text */}
          {hasImage && (
            <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center md:justify-end pr-0 md:pr-12">
              <div className="bg-[#1A1E43] rounded-lg p-8 text-white max-w-md w-full">
                <div className="flex items-start mb-4">
                  <div className="relative overflow-hidden">
                    <Image
                      src={normalizeSrc(imageSrc)}
                      alt={imageAlt ?? "Featured Image"}
                      width={200}
                      height={200}
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 100vw, 192px"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-bold mb-1">
                      Prime Therapy Annual Outcomes
                    </h3>
                    <div className="flex items-center cursor-pointer hover:text-[var(--color-secondary)] transition-colors duration-300 group">
                      <span className="mr-1 block">Report</span>
                      <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
                <p className="opacity-80">
                  Read more about our latest clinical research and
                  industry-leading outcomes
                </p>
              </div>
            </div>
          )}

          {/* Right column - Content area */}
          <div
            className={`w-full ${
              hasImage ? "md:w-1/2" : "md:w-2/3 mx-auto"
            } text-left`}
          >
            {heading && (
              <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-text">
                {heading}
              </h2>
            )}

            {subheading && (
              <p className="text-lg mb-8 text-[var(--color-deep-slate-light)] max-w-xl">
                {subheading}
              </p>
            )}

            {content && (
              <div className="prose prose-lg text-text mb-8 max-w-xl">
                <TinaMarkdown content={content} />
              </div>
            )}

            {buttonText && buttonLink && (
              <div className="mt-6">
                <a
                  href={buttonLink}
                  className="inline-block px-8 py-3 bg-[var(--color-tertiary)] hover:bg-[var(--color-tertiary-hover)] text-[var(--color-deep-slate)] font-medium rounded-lg transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                  {buttonText}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTABlock;
