"use client";

import Image from "next/image";
import { Section } from "../layout/Section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { PageBlocksHeaderBlock } from "../../../tina/__generated__/types";
import { normalizeSrc } from "@/lib/utils";

interface HeaderBlockProps {
  data: PageBlocksHeaderBlock;
}

export const HeaderBlock = ({ data }: HeaderBlockProps) => {
  const {
    heading = "About Us",
    tagline = "",
    subtitle = "",
    logoImage = { src: "", alt: "" },
    backgroundColor = "bg-bg-contrast-light",
    highlightWords = [],
  } = data;

  // Prepare the heading with highlighted words
  const renderHighlightedHeading = () => {
    if (!highlightWords || highlightWords.length === 0) {
      return <>{heading}</>;
    }

    // Create a map for faster lookup
    const highlightMap = new Map();
    highlightWords.forEach((hw) => {
      if (hw?.word && hw?.color) {
        highlightMap.set(hw.word, hw.color);
      }
    });

    // Split the heading and wrap highlighted words
    const words = heading?.split(" ");
    return words?.map((word, index) => {
      const color = highlightMap.get(word);
      if (color) {
        return (
          <span
            key={index}
            className={`inline-block px-4 py-1 mx-1 rounded-lg ${
              color === "primary"
                ? "bg-[var(--color-primary)]"
                : color === "secondary"
                ? "bg-[var(--color-secondary)]"
                : color === "tertiary"
                ? "bg-[var(--color-tertiary)]"
                : "bg-[var(--color-accent)]"
            } ${
              color === "tertiary" || color === "accent"
                ? "text-[var(--color-deep-slate)]"
                : "text-white"
            }`}
          >
            {word}
          </span>
        );
      }
      return (
        <span key={index} className="mx-1">
          {word}
        </span>
      );
    });
  };

  return (
    <Section
      className={`py-16 overflow-hidden ${backgroundColor}`}
      // background={backgroundColor ?? "bg-bg-contrast-light"}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Logo */}
          {logoImage?.src && (
            <div className="mb-8">
              <Image
                src={normalizeSrc(logoImage.src)}
                alt={logoImage.alt || "Logo"}
                width={100}
                height={100}
                className="w-auto h-20 object-contain"
              />
            </div>
          )}

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {renderHighlightedHeading()}
          </h1>

          {/* Tagline */}
          {tagline && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="text-xl md:text-2xl text-white flex items-center justify-center gap-2 flex-wrap">
                {renderHighlightedHeading()}
              </div>
            </div>
          )}

          {/* Subtitle/description */}
          {subtitle && (
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-xl text-white opacity-90">{subtitle}</p>
            </div>
          )}

          {/* Feature highlights */}
          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {data?.features?.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 text-center"
              >
                <h3 className="text-xl font-medium mb-2 text-white">
                  {feature?.title || ""}
                </h3>
                {feature?.content && (
                  <div className="prose prose-sm text-white prose-p:text-white max-w-xs">
                    <TinaMarkdown content={feature.content} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HeaderBlock;
