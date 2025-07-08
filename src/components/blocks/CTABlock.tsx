import React from "react";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { normalizeSrc } from "@/lib/utils";
import { PageBlocksCtaBlock } from "../../../tina/__generated__/types";
import { ArrowUpRight, Play } from "lucide-react";

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
    mediaType = "image", // New prop: 'image' or 'video'
    videoUrl = "", // New prop for video URL
    cardTitle = "Prime Therapy Annual Outcomes", // Make card title dynamic
    cardLinkText = "Report", // Make link text dynamic
    cardLinkUrl = "", // New prop for card link URL
    cardDescription = "Read more about our latest clinical research and industry-leading outcomes", // Make description dynamic
  } = data;

  // Check if we have a valid media source
  const hasMedia =
    (mediaType === "image" &&
      imageSrc &&
      typeof imageSrc === "string" &&
      imageSrc.trim() !== "") ||
    (mediaType === "video" &&
      videoUrl &&
      typeof videoUrl === "string" &&
      videoUrl.trim() !== "");

  return (
    <div className={`px-4 md:px-8 lg:px-16 py-20 ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto">
        {/* Two-column layout container */}
        <div className="flex flex-col md:flex-row justify-evenly">
          {/* Left column - Card with media and text */}
          {hasMedia && (
            <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center md:justify-end pr-0 md:pr-6">
              <div className="bg-[#1A1E43] rounded-lg p-8 text-white max-w-md w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start mb-4">
                  <div className="relative overflow-hidden rounded-lg">
                    {mediaType === "image" && imageSrc && (
                      <Image
                        src={normalizeSrc(imageSrc)}
                        alt={imageAlt ?? "Featured Image"}
                        width={200}
                        height={200}
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 192px"
                      />
                    )}
                    {mediaType === "video" && videoUrl && (
                      <div className="relative w-[200px] h-[200px] bg-[#0A0E33] rounded-lg flex items-center justify-center group">
                        <div className="absolute inset-0 overflow-hidden rounded-lg">
                          {/* Video thumbnail could be added here */}
                        </div>
                        <button
                          className="relative z-10 rounded-full bg-white/20 p-3 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300"
                          onClick={() => window.open(videoUrl, "_blank")}
                          aria-label="Play video"
                        >
                          <Play className="h-8 w-8 text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-bold mb-1">{cardTitle}</h3>
                    {cardLinkText && (
                      <div
                        onClick={() =>
                          cardLinkUrl && window.open(cardLinkUrl, "_blank")
                        }
                        className={`flex items-center ${
                          cardLinkUrl ? "cursor-pointer" : ""
                        } hover:text-[var(--color-secondary)] transition-colors duration-300 group`}
                      >
                        <span className="mr-1 block">{cardLinkText}</span>
                        <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </div>
                    )}
                  </div>
                </div>
                <p className="opacity-80">{cardDescription}</p>
              </div>
            </div>
          )}

          {/* Right column - Content area */}
          <div
            className={`w-full ${
              hasMedia ? "md:w-1/2 md:pl-8 lg:pl-12" : "md:w-2/3 mx-auto"
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
