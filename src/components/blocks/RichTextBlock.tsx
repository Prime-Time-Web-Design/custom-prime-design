import React from "react";
import { PageBlocksRichTextBlock } from "../../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { getIconComponent } from "@/lib/utils";

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
          const hasIcon =
            f?.icon && typeof f.icon === "string" && f.icon.trim() !== "";
          return (
            <div
              key={idx}
              className="relative flex flex-col justify-between w-full group"
            >
              {/* Step Number - more visible, smaller, inside card */}
              <div className="absolute top-4 right-6 text-4xl font-extrabold text-[var(--color-bg-contrast)] opacity-30 z-20 select-none pointer-events-none">
                {String(idx + 1).padStart(2, "0")}
              </div>

              {/* Main Card - compact, no min-h, less padding, cursor-pointer */}
              <div
                className="relative flex flex-col justify-between bg-secondary-hover bg-opacity-20 rounded-xl shadow-lg p-6 h-full overflow-hidden border border-[var(--color-primary-hover)] z-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2  select-none"
                style={{ minHeight: "unset" }}
              >
                {/* Card Content */}
                <div className="relative z-10">
                  {hasIcon ? (
                    <div className="text-bg mb-4">
                      {getIconComponent(f?.icon ?? "")}
                    </div>
                  ) : (
                    <div className="h-10 w-10 flex items-center justify-center text-2xl text-[var(--color-primary)]">
                      ✦
                    </div>
                  )}
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
