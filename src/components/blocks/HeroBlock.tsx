import Image from "next/image";
import { PageBlocksHero } from "../../../tina/__generated__/types";
import { Section } from "../layout/Section";

interface HeroBlockProps {
  data: PageBlocksHero;
}

export const HeroBlock = ({ data }: HeroBlockProps) => {
  const { heading, subheading, buttonText, buttonLink } = data;

  return (
    <Section
      background="bg-[var(--color-very-light-gray)]"
      className="min-h-[80vh] flex items-center"
    >
      <div className="w-full py-12 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-deep-slate)]">
                {heading}
              </h1>
              <div className="prose prose-lg text-[var(--color-medium-slate)]">
                {subheading}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href={buttonLink}
                  className="px-8 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-bg-contrast)] font-medium transition-colors"
                >
                  {buttonText}
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <Image
                src="/optimized/hero.jpg"
                alt="Hero illustration"
                width={1200}
                height={800}
                priority
                className="w-full h-auto rounded-lg shadow-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={80}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HeroBlock;
