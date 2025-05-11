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
    <div className="px-4 py-12 bg-bg-contrast">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {features?.map((f, idx) => {
          // Only try to render image if src exists and is not empty
          const hasValidImage =
            f?.src && typeof f.src === "string" && f.src.trim() !== "";

          return (
            <div key={idx} className="text-center">
              <div className="mx-auto mb-2 inline-flex items-center justify-center rounded  p-3">
                {hasValidImage ? (
                  <div className="h-[200px] w-[200px] flex items-center justify-center bg-primary-hover rounded-full overflow-hidden">
                    <div className="flex items-center justify-center h-[150px] w-[150px]">
                      <Image
                        alt={f.title || "Illustration"}
                        src={normalizeSrc(f.src ?? "")}
                        height={100}
                        width={100}
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
                  <div className="h-[200px] w-[200px] flex items-center justify-center text-[var(--color-bg-light)] rounded-full">
                    ✦
                  </div>
                )}
              </div>

              <h3 className="text-lg font-medium mb-1 text-[var(--color-secondary-hover)]">
                {f?.title}
              </h3>
              <div
                data-tina-field
                className="max-w-[40%] text-[var(--color-bg-light)] mx-auto text-sm font-body"
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
