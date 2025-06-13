import React from "react";
import { Section } from "../layout/Section";
import { PageBlocksBannerBlock } from "../../../tina/__generated__/types";
import { getIconComponent } from "@/lib/utils";

export interface BannerBlockProps {
  data: PageBlocksBannerBlock;
}

export const BannerBlock: React.FC<BannerBlockProps> = ({ data }) => {
  const { title, subtitle, benefits } = data;

  return (
    <Section className="py-20 bg-bg-contrast text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-16">
          <div className="lg:w-1/3 mb-10 lg:mb-0">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {title}
              </h2>
            )}
          </div>
          <div className="lg:w-2/3">
            {subtitle && (
              <div className="text-base md:text-lg text-white max-w-3xl leading-relaxed">
                <p className="mb-6">
                  {subtitle.split(".").slice(0, 2).join(".")}
                </p>
                <p>{subtitle.split(".").slice(2).join(".")}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits?.slice(0, 3).map((benefit, index) => {
            // Define card colors based on index or content
            const bgColors = [
              "bg-[#c3c7ed]", // Light purple for first card
              "bg-[#ece3fa]", // Light lavender for second card
              "bg-[#ffd9a3]", // Light orange for third card
            ];
            const bgColor = bgColors[index];

            return (
              <div
                key={index}
                className={`${bgColor} rounded-lg p-8 h-full flex flex-col`}
              >
                {benefit?.icon && (
                  <div className="mb-6">
                    <div className="w-8 h-8 text-[#1e1e3f]">
                      {getIconComponent(benefit.icon)}
                    </div>
                  </div>
                )}

                {benefit?.heading && (
                  <h3 className="text-xl font-bold mb-4 text-[#1e1e3f]">
                    {benefit.heading}
                  </h3>
                )}

                <p className="text-[#1e1e3f] mb-8 flex-grow">{benefit?.text}</p>

                {benefit?.buttonText && (
                  <div className="mt-auto">
                    <a
                      href={benefit.buttonLink ?? ""}
                      className="inline-block py-3 px-6 bg-[#1e1e3f] text-white font-medium rounded-md hover:bg-[#2d2d5a] transition-colors"
                    >
                      {benefit.buttonText}
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default BannerBlock;
