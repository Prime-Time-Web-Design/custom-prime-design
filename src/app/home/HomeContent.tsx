"use client";
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
      <div className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-gray-600">{description}</p>
        </section>

        <section className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white mb-12">
          <h2 className="text-3xl font-bold mb-4">{hero?.heading}</h2>
          <p className="text-xl mb-6">{hero?.subheading}</p>
          <a
            href={hero?.buttonLink}
            className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {hero?.buttonText}
          </a>
        </section>
      </div>
    </>
  );
}
