"use client";
import HeroBlock from "@/components/blocks/HeroBlock";
import { PageQuery } from "../../../tina/__generated__/types";

export type HomeSchema = {
  data: {
    page: PageQuery["page"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
};

export default function HomeContent(data: HomeSchema) {
  const { title, description, hero } = data.data.page;

  return (
    <>
      {/* <div className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[var(--color-text)]">
            {title}
          </h1>
          <p className="text-xl text-[var(--color-text)]">{description}</p>
        </section>

        <section className="rounded-xl p-8 mb-12 bg-[var(--color-bg)] text-[var(--color-text)] shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-[var(--color-text)]">
            {hero?.heading}
          </h2>
          <p className="text-xl mb-6">{hero?.subheading}</p>
          <a
            href={hero?.buttonLink}
            className="inline-block bg-[var(--color-primary)] text-[var(--color-text)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-primary-hover)]  transition-colors"
          >
            {hero?.buttonText}
          </a>
        </section>
      </div> */}
      <HeroBlock data={{}} />
    </>
  );
}
