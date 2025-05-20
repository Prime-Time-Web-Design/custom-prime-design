import Image from "next/image";
import { PageBlocksHero } from "../../../tina/__generated__/types";
import { Section } from "../layout/Section";
import { heroImagePlaceholder } from "@/lib/preload-utils";

interface HeroBlockProps {
  data: PageBlocksHero;
}

export const HeroBlock = ({ data }: HeroBlockProps) => {
  const { heading, subheading, buttonText, buttonLink, src } = data;

  return (
    <Section
      background="bg-bg"
      className="min-h-[80vh] flex items-center relative overflow-hidden"
    >
      <div className="w-full py-12 md:py-24 px-4 md:px-8 lg:px-16 relative z-10">
        <div className="mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-deep-slate)]">
                {heading?.split(" ").slice(0, -1).join(" ")}
                <span className="block italic">
                  {heading?.split(" ").slice(-1)[0]}.
                </span>
              </h1>
              <div className="prose prose-lg text-[var(--color-deep-slate)]">
                {subheading}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href={buttonLink ?? "#"}
                  className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-hover text-[var(--color-deep-slate)] font-medium transition-colors"
                >
                  {buttonText}
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative">
                <Image
                  src={src ?? ""}
                  alt="Hero illustration"
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto object-cover rounded-xl shadow-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                  placeholder="blur"
                  blurDataURL={heroImagePlaceholder}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HeroBlock;
