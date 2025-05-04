import Image from "next/image";
import hero from "../../../public/hero.jpg";
import { PageQuery } from "../../../tina/__generated__/types";

interface HeroBlockProps {
  data?: PageQuery["page"];
}

export const HeroBlock = ({ data }: HeroBlockProps) => {
  return (
    <section className="relative w-full min-h-[80vh] bg-[var(--color-very-light-gray)]">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-deep-slate)]">
              {data?.hero?.heading || "Space to figure things out"}
            </h1>
            <div className="prose prose-lg text-[var(--color-medium-slate)]">
              {data?.hero?.subheading}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href={data?.hero?.buttonLink || "/contact"}
                className="px-8 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-bg-contrast)] font-medium transition-colors"
              >
                {data?.hero?.buttonText || "Get Started"}
              </a>
            </div>
            <ul className="space-y-3 mt-8">
              <li className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[var(--color-soft-turquoise)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-medium-slate)]">
                  Convenient access anytime, anywhere
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[var(--color-soft-turquoise)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-medium-slate)]">
                  Professional support from licensed therapists
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[var(--color-soft-turquoise)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[var(--color-medium-slate)]">
                  Flexible options tailored to your needs and budget
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:w-full md:w-1/3 w-full">
            <Image
              src={hero}
              alt={"Hero illustration"}
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBlock;
