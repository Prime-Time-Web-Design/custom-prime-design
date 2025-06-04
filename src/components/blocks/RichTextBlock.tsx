import React from "react";
import { PageBlocksRichTextBlock } from "../../../tina/__generated__/types";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { normalizeSrc } from "@/lib/utils";

interface RichTextBlockProps {
  data: PageBlocksRichTextBlock;
}

export const RichTextBlock = ({ data }: RichTextBlockProps) => {
  const { heading, subheading, features } = data;

  return (
    <div className="px-4 py-28 bg-bg-contrast">
      <div className="pb-8">
        {heading && (
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[var(--color-bg-light)] text-center">
            {heading}
          </h1>
        )}
        {subheading && (
          <p className="text-lg sm:text-xl mb-6 text-[var(--color-primary)] text-center">
            {subheading}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto space-y-4 sm:space-y-0">
        {features?.map((f, idx) => {
          const hasValidImage =
            f?.src && typeof f.src === "string" && f.src.trim() !== "";

          return (
            <div
              key={idx}
              className="relative flex flex-col justify-between w-full group"
            >
              {/* Step Number - more visible, smaller, inside card */}
              <div className="absolute top-4 right-6 text-4xl font-extrabold text-[var(--color-bg-contrast)] opacity-30 z-20 select-none pointer-events-none">
                {String(idx + 1).padStart(2, "0")}
              </div>

              {/* Icon/Shape - outside/overlapping card, fixed size, styled, now transitions with card */}
              <div className="absolute -top-6 left-4 z-30 group-hover:-translate-y-2 group-hover:shadow-2xl transition-all duration-300 rounded-xl">
                <div className="h-16 w-16 flex items-center justify-center bg-bg shadow-lg rounded-xl border border-gray-200 overflow-hidden">
                  {hasValidImage ? (
                    <Image
                      alt={f.title || "Illustration"}
                      src={normalizeSrc(f.src ?? "")}
                      height={50}
                      width={50}
                      className="object-contain"
                    />
                  ) : (
                    <div className="h-10 w-10 flex items-center justify-center text-2xl text-[var(--color-primary)]">
                      ✦
                    </div>
                  )}
                </div>
              </div>

              {/* Main Card - compact, no min-h, less padding, cursor-pointer */}
              <div
                className="relative flex flex-col justify-between bg-secondary-hover bg-opacity-20 rounded-xl shadow-lg p-6 pt-12 h-full overflow-hidden border border-[var(--color-primary-hover)] z-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2  select-none"
                style={{ minHeight: "unset" }}
              >
                {/* Card Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-1 text-[var(--color-text)] text-left select-none">
                    {f?.title}
                  </h3>
                  <div className="h-1 w-30 mb-2 rounded bg-bg" />
                  <div
                    data-tina-field
                    className="text-[var(--color-text)] text-base font-body text-left max-w-[95%] select-none"
                  >
                    <TinaMarkdown content={f?.description} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RichTextBlock;
