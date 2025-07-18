import React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { getIconComponent } from "@/lib/utils";

interface ServiceContentBlockProps {
  data: {
    heading?: string;
    subheading?: string;
    content?: any; // Rich text content
    backgroundColor?: string;
    textAlign?: "left" | "center" | "right";
    maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
    showDivider?: boolean;
    features?: Array<{
      title?: string;
      description?: any;
      icon?: string;
    }>;
  };
}

export const ServiceContentBlock = ({ data }: ServiceContentBlockProps) => {
  const {
    heading,
    subheading,
    content,
    backgroundColor = "bg-white",
    textAlign = "left",
    maxWidth = "lg",
    showDivider = false,
    features = [],
  } = data;

  const alignmentClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[textAlign];

  const maxWidthClass = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-5xl",
    xl: "max-w-6xl",
    full: "max-w-full",
  }[maxWidth];

  return (
    <div className={`py-16 md:py-20 ${backgroundColor}`}>
      <div
        className={`container mx-auto px-4 md:px-8 lg:px-16 ${maxWidthClass}`}
      >
        <div className={alignmentClass}>
          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[var(--color-deep-slate)] leading-tight">
              {heading}
            </h2>
          )}

          {subheading && (
            <p className="text-lg md:text-xl text-[var(--color-deep-slate-light)] mb-8 leading-relaxed">
              {subheading}
            </p>
          )}

          {content && (
            <div
              className={`prose prose-lg max-w-none text-[var(--color-deep-slate)] ${alignmentClass} mb-8`}
            >
              <TinaMarkdown content={content} />
            </div>
          )}

          {showDivider && (
            <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mb-8"></div>
          )}

          {/* Features grid if provided */}
          {features && features.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {features.map((feature, index) => (
                <div key={index} className="space-y-4">
                  {feature.icon && (
                    <div className="text-[var(--color-primary)]">
                      {getIconComponent(feature.icon)}
                    </div>
                  )}

                  {feature.title && (
                    <h3 className="text-xl font-semibold text-[var(--color-deep-slate)]">
                      {feature.title}
                    </h3>
                  )}

                  {feature.description && (
                    <div className="text-[var(--color-deep-slate-light)] prose prose-sm">
                      <TinaMarkdown content={feature.description} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceContentBlock;
