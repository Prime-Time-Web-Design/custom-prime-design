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
    imageSrc,
    imageAlt = "Featured Image",
    backgroundColor = "bg-[var(--color-bg)]",
  } = data;

  // Check if we have a valid image source
  const hasImage =
    imageSrc && typeof imageSrc === "string" && imageSrc.trim() !== "";

  return (
    <div className={`px-4 py-16 ${backgroundColor}`}>
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex flex-col items-center justify-center">
          {/* Main content area */}
          <div className="w-full mb-8 rounded-xl py-12 px-12 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)]">
            {hasImage && (
              <div className="relative w-16 h-16 mx-auto mb-6">
                <Image
                  src={normalizeSrc(imageSrc)}
                  alt={imageAlt ?? "Featured Image"}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
            )}

            {heading && (
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[var(--color-deep-slate)]">
                {heading}
              </h2>
            )}

            {subheading && (
              <p className="text-xl mb-6 text-[var(--color-deep-slate-light)] max-w-2xl mx-auto">
                {subheading}
              </p>
            )}

            {content && (
              <div className="prose prose-lg text-[var(--color-medium-slate)] mb-8 max-w-2xl mx-auto">
                <TinaMarkdown content={content} />
              </div>
            )}

            {buttonText && buttonLink && (
              <div className="mt-6">
                <a
                  href={buttonLink}
                  className="inline-block px-8 py-4 bg-[var(--color-tertiary)] hover:bg-[var(--color-tertiary-hover)] text-[var(--color-deep-slate)] font-medium rounded-lg transition-colors duration-300 shadow-sm hover:shadow-md"
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
