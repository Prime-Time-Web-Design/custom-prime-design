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
import { motion, AnimatePresence } from "framer-motion";
import { PageBlocksHero } from "../../../tina/__generated__/types";
import { Section } from "../layout/Section";
import { heroImagePlaceholder } from "@/lib/preload-utils";
import { useEffect, useState } from "react";

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
  const [activeIndexes, setActiveIndexes] = useState({
    mainImage: 0,
    circleTopLeft: 0,
    circleBottomRight: 0,
    // We'll use mainImage + 1 % length for the right main image, so no need for another state
  });

  useEffect(() => {
    if (buttonLink?.endsWith(".pdf")) {
      setIsDownloadLink(true);
    }
  }, [buttonLink]);

  // Rotate through images for each position
  useEffect(() => {
    if (!collageImages || collageImages.length <= 1) return;

    const mainInterval = setInterval(() => {
      setActiveIndexes((prev) => ({
        ...prev,
        mainImage: (prev.mainImage + 1) % collageImages.length,
      }));
    }, 6000);

    const circleTopLeftInterval = setInterval(() => {
      setActiveIndexes((prev) => ({
        ...prev,
        circleTopLeft: (prev.circleTopLeft + 1) % collageImages.length,
      }));
    }, 7000);

    const circleBottomRightInterval = setInterval(() => {
      setActiveIndexes((prev) => ({
        ...prev,
        circleBottomRight: (prev.circleBottomRight + 1) % collageImages.length,
      }));
    }, 8000);

    return () => {
      clearInterval(mainInterval);
      clearInterval(circleTopLeftInterval);
      clearInterval(circleBottomRightInterval);
    };
  }, [collageImages]);

  return (
    <Section
      background="bg-bg"
      className="py-16 md:py-20 relative overflow-hidden md:flex md:items-center md:min-h-[75vh]"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
          <div className="w-full md:w-[45%] space-y-6 text-center md:text-left md:self-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-deep-slate)]">
              {heading}
            </h1>
            <div className="text-lg text-[var(--color-deep-slate)]">
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

          <div className="w-full md:w-[55%] md:flex md:justify-end md:items-center">
            {!collageImages ||
            collageImages.length ===
              0 /* No images case */ ? null : collageImages.length === 1 ? (
              /* Single image display - no carousel */
              <div className="relative max-w-[600px] mx-auto">
                <Image
                  src={collageImages[0]?.src ?? ""}
                  alt="Hero illustration"
                  width={1200}
                  height={800}
                  priority={true}
                  loading="eager"
                  className="w-full h-auto object-cover rounded-xl shadow-xl"
                  sizes="(max-width: 768px) 100vw, 55vw"
                  quality={90}
                  placeholder="blur"
                  blurDataURL={heroImagePlaceholder}
                />
              </div>
            ) : (
              /* Multiple images - grid layout with 4 positions and color blocks */
              <div className="relative w-full aspect-square md:aspect-square lg:aspect-square max-h-[600px] max-w-[600px] mx-auto">
                <div className="grid grid-cols-3 grid-rows-3 gap-2 sm:gap-3 md:gap-4 h-full w-full">
                  {/* Top row with purple block (left), image (center), purple block (right) */}
                  <div className="bg-[var(--color-soft-light-purple)] rounded-lg md:rounded-xl shadow-md" />

                  <div className="relative rounded-lg md:rounded-xl shadow-md overflow-hidden">
                    <AnimatePresence initial={false}>
                      {collageImages?.map(
                        (image, index) =>
                          index === activeIndexes.circleTopLeft && (
                            <motion.div
                              key={`top-${index}`}
                              className="absolute inset-0"
                              initial={{ opacity: 0, scale: 1.1 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Image
                                src={image?.src ?? ""}
                                alt={`Hero top image ${index}`}
                                fill
                                className="object-cover"
                                quality={90}
                                placeholder="blur"
                                blurDataURL={heroImagePlaceholder}
                              />
                            </motion.div>
                          )
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="bg-bg-contrast rounded-lg md:rounded-xl shadow-md" />

                  {/* Middle row with two main images side by side */}
                  <div className="col-span-3 grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                    {/* Left main image */}
                    <div className="relative rounded-lg md:rounded-xl shadow-md overflow-hidden">
                      <AnimatePresence initial={false}>
                        {collageImages?.map(
                          (image, index) =>
                            index === activeIndexes.mainImage && (
                              <motion.div
                                key={`main-left-${index}`}
                                className="absolute inset-0"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{
                                  opacity: 1,
                                  scale: 1,
                                  transition: { duration: 0.7 },
                                }}
                                exit={{
                                  opacity: 0,
                                  scale: 0.95,
                                  transition: { duration: 0.5 },
                                }}
                              >
                                <Image
                                  src={image?.src ?? ""}
                                  alt={`Hero main left image ${index}`}
                                  fill
                                  className="object-cover"
                                  quality={90}
                                  priority={true}
                                  placeholder="blur"
                                  blurDataURL={heroImagePlaceholder}
                                />
                              </motion.div>
                            )
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right main image */}
                    <div className="relative rounded-lg md:rounded-xl shadow-md overflow-hidden">
                      <AnimatePresence initial={false}>
                        {collageImages?.map(
                          (image, index) =>
                            index ===
                              (activeIndexes.mainImage + 1) %
                                collageImages.length && (
                              <motion.div
                                key={`main-right-${index}`}
                                className="absolute inset-0"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{
                                  opacity: 1,
                                  scale: 1,
                                  transition: { duration: 0.7 },
                                }}
                                exit={{
                                  opacity: 0,
                                  scale: 0.95,
                                  transition: { duration: 0.5 },
                                }}
                              >
                                <Image
                                  src={image?.src ?? ""}
                                  alt={`Hero main right image ${index}`}
                                  fill
                                  className="object-cover"
                                  quality={90}
                                  placeholder="blur"
                                  blurDataURL={heroImagePlaceholder}
                                />
                              </motion.div>
                            )
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Bottom row with purple block (left), image (center), purple block (right) */}
                  <div className="bg-bg-contrast rounded-lg md:rounded-xl shadow-md" />

                  <div className="relative rounded-lg md:rounded-xl shadow-md overflow-hidden">
                    <AnimatePresence initial={false}>
                      {collageImages?.map(
                        (image, index) =>
                          index === activeIndexes.circleBottomRight && (
                            <motion.div
                              key={`bottom-${index}`}
                              className="absolute inset-0"
                              initial={{ opacity: 0, scale: 1.1 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Image
                                src={image?.src ?? ""}
                                alt={`Hero bottom image ${index}`}
                                fill
                                className="object-cover"
                                quality={90}
                                placeholder="blur"
                                blurDataURL={heroImagePlaceholder}
                              />
                            </motion.div>
                          )
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="bg-[var(--color-soft-light-purple)] rounded-lg md:rounded-xl shadow-md" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HeroBlock;
