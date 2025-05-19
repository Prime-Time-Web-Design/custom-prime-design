import React from "react";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { normalizeSrc } from "@/lib/utils";
import { PageBlocksCtaBlock } from "../../../tina/__generated__/types";

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
    imageLeft = true,
    imageSrc,
    imageAlt = "Featured Image",
    backgroundColor = "bg-bg-contrast",
  } = data;

  // Check if we have a valid image source
  const hasImage =
    imageSrc && typeof imageSrc === "string" && imageSrc.trim() !== "";

  return (
    <div className={`px-4 py-16 ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex flex-col ${
            imageLeft ? "md:flex-row" : "md:flex-row-reverse"
          } gap-4 md:gap-8 items-center`}
        >
          {/* Left side: Either Image or Content */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            {hasImage ? (
              <div className="relative rounded-lg overflow-hidden shadow-lg h-[200px] sm:h-[250px] w-[85%] mx-auto">
                <Image
                  src={normalizeSrc(imageSrc)}
                  alt={imageAlt ?? "Featured Image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="prose prose-lg text-[var(--color-bg-contrast)] max-w-none">
                <TinaMarkdown content={content} />
              </div>
            )}
          </div>

          {/* Divider for mobile view */}
          <div className="w-1/2 h-px bg-[var(--color-bg-contrast-light)] opacity-20 my-4 md:hidden"></div>

          {/* Vertical divider for desktop */}
          {hasImage && (
            <div className="hidden md:block w-0.5 h-[250px] mr-2 bg-[var(--color-bg-contrast)] opacity-20"></div>
          )}

          {/* Right side: CTA Content */}
          <div className="w-full md:w-1/2 flex flex-col">
            {heading && (
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--color-bg-contrast-light)]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-lg sm:text-xl mb-4 text-[var(--color-bg-contrast-light)] text-center">
                {subheading}
              </p>
            )}

            {/* Only show content here if there's an image on the other side */}
            {hasImage && content && (
              <div className="prose prose-lg text-[var(--color-bg-contrast-light)] mb-6 max-w-none">
                <TinaMarkdown content={content} />
              </div>
            )}

            {buttonText && buttonLink && (
              <div className="mt-4 md:mt-6">
                <a
                  href={buttonLink}
                  className="inline-block px-6 py-3 bg-[var(--color-tertiary)] hover:bg-[var(--color-tertiary-hover)] text-white font-medium rounded-md transition-colors duration-300"
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
