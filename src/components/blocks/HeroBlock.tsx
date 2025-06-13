// import Image from "next/image";
// import { PageBlocksHero } from "../../../tina/__generated__/types";
// import { Section } from "../layout/Section";
// import { heroImagePlaceholder } from "@/lib/preload-utils";
// import { useEffect, useState } from "react";

// interface HeroBlockProps {
//   data: PageBlocksHero;
// }

// export const HeroBlock = ({ data }: HeroBlockProps) => {
//   const { heading, subheading, buttonText, buttonLink, src } = data;
//   const [isDownloadLink, setIsDownloadLink] = useState(false);
//   useEffect(() => {
//     if (buttonLink?.endsWith(".pdf")) {
//       setIsDownloadLink(true);
//     }
//   }, [buttonLink]);

//   return (
//     <Section
//       background="bg-bg"
//       className="py-16 md:py-20 relative overflow-hidden"
//     >
//       <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
//           <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-deep-slate)]">
//               {heading?.split(" ").slice(0, -1).join(" ")}
//               <span className="block italic">
//                 {heading?.split(" ").slice(-1)[0]}.
//               </span>
//             </h1>
//             <div className="prose prose-lg text-[var(--color-deep-slate)]">
//               {subheading}
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//               <a
//                 href={buttonLink ?? "#"}
//                 download={isDownloadLink}
//                 className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-hover text-[var(--color-deep-slate)] font-medium transition-colors"
//               >
//                 {buttonText}
//               </a>
//             </div>
//           </div>
//           <div className="w-full md:w-1/2">
//             <div className="relative">
//               {src ? (
//                 <Image
//                   src={src}
//                   alt="Hero illustration"
//                   width={1200}
//                   height={800}
//                   priority={true}
//                   loading="eager"
//                   className="w-full h-auto object-cover rounded-xl shadow-xl"
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                   quality={90}
//                   placeholder="blur"
//                   blurDataURL={heroImagePlaceholder}
//                 />
//               ) : null}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Section>
//   );
// };

// export default HeroBlock;

import Image from "next/image";
import { PageBlocksHero } from "../../../tina/__generated__/types";
import { Section } from "../layout/Section";
import { heroImagePlaceholder } from "@/lib/preload-utils";
import { useEffect, useState, useMemo } from "react";

interface HeroBlockProps {
  data: PageBlocksHero;
}

export const HeroBlock = ({ data }: HeroBlockProps) => {
  const {
    heading,
    subheading,
    buttonText,
    buttonLink,
    collageImages = [],
  } = data;
  const [isDownloadLink, setIsDownloadLink] = useState(false);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  useEffect(() => {
    if (buttonLink?.endsWith(".pdf")) {
      setIsDownloadLink(true);
    }
  }, [buttonLink]);

  const shuffledIndexes = useMemo(() => {
    return collageImages.map((_, i) => i);
  }, [collageImages]);

  useEffect(() => {
    if (collageImages.length <= 1) {
      setVisibleIndexes([0]);
      return;
    }
    const interval = setInterval(() => {
      setVisibleIndexes((prev) => {
        const next = [...prev];
        next.shift();
        const remaining = shuffledIndexes.filter((i) => !next.includes(i));
        const nextIndex =
          remaining[Math.floor(Math.random() * remaining.length)] ?? 0;
        return [...next, nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [collageImages.length, shuffledIndexes]);

  useEffect(() => {
    if (collageImages.length > 1) {
      const initial = shuffledIndexes.slice(0, 3);
      setVisibleIndexes(initial);
    }
  }, [shuffledIndexes, collageImages.length]);

  return (
    <Section
      background="bg-bg"
      className="py-16 md:py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
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
                download={isDownloadLink}
                className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-hover text-[var(--color-deep-slate)] font-medium transition-colors"
              >
                {buttonText}
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative w-full h-[400px] md:h-[500px]">
              {collageImages.length <= 1 ? (
                <Image
                  src={collageImages[0] ?? ""}
                  alt="Hero collage fallback"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover rounded-xl shadow-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                  placeholder="blur"
                  blurDataURL={heroImagePlaceholder}
                />
              ) : (
                collageImages.map((src, idx) => {
                  const isVisible = visibleIndexes.includes(idx);
                  const pos = visibleIndexes.indexOf(idx);
                  const rotation =
                    pos === 0
                      ? "-rotate-2"
                      : pos === 1
                      ? "rotate-1"
                      : "rotate-2";
                  const scale = pos === 0 ? "scale-105" : "scale-100";
                  const offsetX =
                    pos === 0
                      ? "left-0"
                      : pos === 1
                      ? "left-4 md:left-12"
                      : "left-8 md:left-24";
                  const offsetY =
                    pos === 0
                      ? "top-0"
                      : pos === 1
                      ? "top-4 md:top-8"
                      : "top-8 md:top-16";

                  return (
                    <Image
                      key={src}
                      src={src}
                      alt="Hero collage dynamic"
                      width={600}
                      height={400}
                      className={`
                        absolute ${offsetX} ${offsetY} w-[85%] md:w-[75%] h-auto object-cover rounded-xl shadow-xl transition-all duration-1000 ease-in-out
                        ${rotation} ${scale} ${
                        isVisible ? "opacity-100 z-20" : "opacity-0 z-10"
                      }
                      `}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                      placeholder="blur"
                      blurDataURL={heroImagePlaceholder}
                    />
                  );
                })
              )}
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-xl z-30 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HeroBlock;
