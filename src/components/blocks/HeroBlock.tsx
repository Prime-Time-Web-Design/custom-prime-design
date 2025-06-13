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
      className="py-16 md:py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
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
            {!collageImages ||
            collageImages.length ===
              0 /* No images case */ ? null : collageImages.length === 1 ? (
              /* Single image display - no carousel */
              <div className="relative">
                <Image
                  src={collageImages[0]?.src ?? ""}
                  alt="Hero illustration"
                  width={1200}
                  height={800}
                  priority={true}
                  loading="eager"
                  className="w-full h-auto object-cover rounded-xl shadow-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                  placeholder="blur"
                  blurDataURL={heroImagePlaceholder}
                />
              </div>
            ) : (
              /* Multiple images - carousel layout */
              <div className="relative w-full h-[480px] md:h-[580px] flex items-center justify-center">
                {/* Healthcare cross layout */}

                {/* Top image */}
                <div className="absolute top-0 left-[50%] transform -translate-x-1/2 w-[165px] h-[165px] rounded-xl outline-2 outline-tertiary overflow-hidden shadow-md z-20">
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

                {/* Main image (center) */}
                <div className="absolute top-[50%] left-[50%] outline-2 outline-tertiary transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[230px] rounded-xl overflow-hidden shadow-lg z-30">
                  <AnimatePresence initial={false}>
                    {collageImages?.map(
                      (image, index) =>
                        index === activeIndexes.mainImage && (
                          <motion.div
                            key={`main-${index}`}
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
                              alt={`Hero main image ${index}`}
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

                {/* Bottom image */}
                <div className="absolute bottom-0 left-[50%] outline-2 outline-tertiary transform -translate-x-1/2 w-[165px] h-[165px] rounded-xl overflow-hidden shadow-md z-20">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HeroBlock;
