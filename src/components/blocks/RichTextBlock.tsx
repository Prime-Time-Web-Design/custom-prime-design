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
    <div className="px-4 py-16 bg-bg-contrast">
      {heading && (
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--color-bg-light)] text-center">
          {heading}
        </h2>
      )}
      {subheading && (
        <p className="text-lg sm:text-xl mb-6 text-[var(--color-primary)] text-center">
          {subheading}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-7xl mx-auto">
        {features?.map((f, idx) => {
          // Only try to render image if src exists and is not empty
          const hasValidImage =
            f?.src && typeof f.src === "string" && f.src.trim() !== "";

          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-evenly rounded-lg shadow-lg p-3 mx-auto my-2 transition-transform hover:-translate-y-1 hover:shadow-2xl border border-[var(--color-primary-hover)] min-h-[330px] max-w-[210px] w-full"
            >
              <div className="absolute top-2 left-2 h-6 w-6 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-semibold text-sm">
                {idx + 1}
              </div>
              <div className="mb-3 flex items-center justify-center">
                {hasValidImage ? (
                  <div className="h-[110px] w-[110px] flex items-center justify-center bg-[var(--color-primary)] bg-opacity-10 rounded-full overflow-hidden shadow-md">
                    <div className="flex items-center justify-center h-[80px] w-[80px]">
                      <Image
                        alt={f.title || "Illustration"}
                        src={normalizeSrc(f.src ?? "")}
                        height={72}
                        width={72}
                        className="object-contain"
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-[110px] w-[110px] flex items-center justify-center text-[var(--color-primary)] bg-[var(--color-primary)] bg-opacity-10 rounded-full shadow-md text-2xl">
                    ✦
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold mb-1 text-[var(--color-secondary-hover)] text-center">
                {f?.title}
              </h3>
              <div
                data-tina-field
                className="text-[var(--color-bg)] text-sm font-body text-center max-w-[95%] mx-auto"
              >
                <TinaMarkdown content={f?.description} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RichTextBlock;
