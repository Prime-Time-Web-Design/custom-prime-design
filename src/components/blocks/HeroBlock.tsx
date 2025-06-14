import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PageBlocksHero } from "../../../tina/__generated__/types";
import { Section } from "../layout/Section";
import { heroImagePlaceholder } from "@/lib/preload-utils";
import { useEffect, useState } from "react";
import { normalizeSrc } from "@/lib/utils";

// Function to calculate the right image index based on other active indexes
// This helps ensure we show different images in each position when possible
const calculateRightImageIndex = (
  mainIndex: number,
  topLeftIndex: number,
  bottomRightIndex: number,
  totalImages: number
): number => {
  // Empty or single image case
  if (totalImages <= 1) return 0;

  // For exactly 2 images, just use the opposite of main image
  if (totalImages === 2) {
    return mainIndex === 0 ? 1 : 0;
  }

  // For 3+ images, we can show a unique image in each position
  // First, collect indexes that are already in use
  const usedIndexes = [mainIndex, topLeftIndex, bottomRightIndex];

  // Find the first available index that isn't used
  for (let i = 0; i < totalImages; i++) {
    if (!usedIndexes.includes(i)) {
      return i;
    }
  }

  // If all indexes are already used (can happen with 3 images),
  // pick an index that's different from main image at minimum
  let rightIdx = (mainIndex + 1) % totalImages;

  // If this index happens to be the same as main image, find another
  while (rightIdx === mainIndex) {
    rightIdx = (rightIdx + 1) % totalImages;
  }

  return rightIdx;
};

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
  // Initialize with staggered indexes to ensure different images are shown
  const [activeIndexes, setActiveIndexes] = useState(() => {
    const imageCount = collageImages?.length || 0;

    // If no images or just one image
    if (imageCount <= 1) {
      return { mainImage: 0, circleTopLeft: 0, circleBottomRight: 0 };
    }

    // For exactly 2 images
    if (imageCount === 2) {
      return {
        mainImage: 0,
        circleTopLeft: 1,
        circleBottomRight: 0,
      };
    }

    // For 3 or more images, start with fully distinct images
    return {
      mainImage: 0,
      circleTopLeft: 1,
      circleBottomRight: 2,
    };
  });

  useEffect(() => {
    if (buttonLink?.endsWith(".pdf")) {
      setIsDownloadLink(true);
    }
  }, [buttonLink]);

  // Rotate through images for each position with staggered timing
  useEffect(() => {
    if (!collageImages || collageImages.length <= 1) return;

    const imageCount = collageImages.length;

    // Helper function to find next unique index
    const getNextUniqueIndex = (
      currentIndex: number,
      otherPositions: number[]
    ): number => {
      // Try each index in sequence until finding one not used elsewhere
      for (let i = 1; i <= imageCount; i++) {
        const candidateIdx = (currentIndex + i) % imageCount;
        if (!otherPositions.includes(candidateIdx)) {
          return candidateIdx;
        }
      }

      // If all indices are used (can happen with exactly 3 images),
      // just return the next index that's not the current one
      return (currentIndex + 1) % imageCount;
    };

    // Start rotations very quickly with minimal initial delay
    const initialDelay = 800;

    // Initialize timers for each image position
    let mainTimer: NodeJS.Timeout;
    let topLeftTimer: NodeJS.Timeout;
    let bottomRightTimer: NodeJS.Timeout;

    // Create more gradual rotation timing with staggered intervals
    // First rotation happens quickly, subsequent rotations happen more gradually
    const mainFirstInterval = 5000; // 5 seconds for first rotation
    const mainSubsequentInterval = 8000; // 8 seconds for subsequent rotations

    const topLeftFirstInterval = 5500; // 5.5 seconds for first rotation
    const topLeftSubsequentInterval = 9000; // 9 seconds for subsequent rotations

    const bottomRightFirstInterval = 6000; // 6 seconds for first rotation
    const bottomRightSubsequentInterval = 10000; // 10 seconds for subsequent rotations

    // For the main image rotation - start very soon
    mainTimer = setTimeout(() => {
      // Update immediately after initial delay
      setActiveIndexes((prev) => {
        const usedPositions = [prev.circleTopLeft, prev.circleBottomRight];
        const nextMainIndex = getNextUniqueIndex(prev.mainImage, usedPositions);
        return { ...prev, mainImage: nextMainIndex };
      });

      // Wait for the first rotation interval
      const firstRotationTimeout = setTimeout(() => {
        // For the first rotation after initial display
        setActiveIndexes((prev) => {
          const usedPositions = [prev.circleTopLeft, prev.circleBottomRight];
          const nextMainIndex = getNextUniqueIndex(
            prev.mainImage,
            usedPositions
          );
          return { ...prev, mainImage: nextMainIndex };
        });

        // Then set up the more gradual subsequent interval
        const mainIntervalId = setInterval(() => {
          setActiveIndexes((prev) => {
            // Find a unique index for the main image
            const usedPositions = [prev.circleTopLeft, prev.circleBottomRight];
            const nextMainIndex = getNextUniqueIndex(
              prev.mainImage,
              usedPositions
            );

            return {
              ...prev,
              mainImage: nextMainIndex,
            };
          });
        }, mainSubsequentInterval);

        // Store the interval ID for cleanup
        mainTimer = mainIntervalId;
      }, mainFirstInterval);

      // Store the timeout ID for cleanup
      mainTimer = firstRotationTimeout;
    }, initialDelay);

    // For the top-left circle - start with slightly longer delay
    topLeftTimer = setTimeout(() => {
      setActiveIndexes((prev) => {
        const usedPositions = [prev.mainImage, prev.circleBottomRight];
        const nextTopLeftIndex = getNextUniqueIndex(
          prev.circleTopLeft,
          usedPositions
        );
        return { ...prev, circleTopLeft: nextTopLeftIndex };
      });

      // Wait for the first rotation interval
      const firstTopLeftTimeout = setTimeout(() => {
        // First rotation after initial display
        setActiveIndexes((prev) => {
          const usedPositions = [prev.mainImage, prev.circleBottomRight];
          const nextTopLeftIndex = getNextUniqueIndex(
            prev.circleTopLeft,
            usedPositions
          );
          return { ...prev, circleTopLeft: nextTopLeftIndex };
        });

        // Then set up the more gradual subsequent interval
        const topLeftIntervalId = setInterval(() => {
          setActiveIndexes((prev) => {
            // Find a unique index for the top-left circle
            const usedPositions = [prev.mainImage, prev.circleBottomRight];
            const nextTopLeftIndex = getNextUniqueIndex(
              prev.circleTopLeft,
              usedPositions
            );

            return {
              ...prev,
              circleTopLeft: nextTopLeftIndex,
            };
          });
        }, topLeftSubsequentInterval);

        topLeftTimer = topLeftIntervalId;
      }, topLeftFirstInterval);

      topLeftTimer = firstTopLeftTimeout;
    }, initialDelay + 400); // Shorter stagger time (0.4s)

    // For the bottom-right circle - start with the longest delay
    bottomRightTimer = setTimeout(() => {
      setActiveIndexes((prev) => {
        const usedPositions = [prev.mainImage, prev.circleTopLeft];
        const nextBottomRightIndex = getNextUniqueIndex(
          prev.circleBottomRight,
          usedPositions
        );
        return { ...prev, circleBottomRight: nextBottomRightIndex };
      });

      // Wait for the first rotation interval
      const firstBottomRightTimeout = setTimeout(() => {
        // First rotation after initial display
        setActiveIndexes((prev) => {
          const usedPositions = [prev.mainImage, prev.circleTopLeft];
          const nextBottomRightIndex = getNextUniqueIndex(
            prev.circleBottomRight,
            usedPositions
          );
          return { ...prev, circleBottomRight: nextBottomRightIndex };
        });

        // Then set up the more gradual subsequent interval
        const bottomRightIntervalId = setInterval(() => {
          setActiveIndexes((prev) => {
            // Find a unique index for the bottom-right circle
            const usedPositions = [prev.mainImage, prev.circleTopLeft];
            const nextBottomRightIndex = getNextUniqueIndex(
              prev.circleBottomRight,
              usedPositions
            );

            return {
              ...prev,
              circleBottomRight: nextBottomRightIndex,
            };
          });
        }, bottomRightSubsequentInterval);

        bottomRightTimer = bottomRightIntervalId;
      }, bottomRightFirstInterval);

      bottomRightTimer = firstBottomRightTimeout;
    }, initialDelay + 800); // Shorter stagger time (0.8s)

    return () => {
      // Fixed cleanup function to properly clear all timers
      // Each timer could be either a timeout or interval depending on state when component unmounts
      if (mainTimer) {
        clearTimeout(mainTimer);
        clearInterval(mainTimer);
      }

      if (topLeftTimer) {
        clearTimeout(topLeftTimer);
        clearInterval(topLeftTimer);
      }

      if (bottomRightTimer) {
        clearTimeout(bottomRightTimer);
        clearInterval(bottomRightTimer);
      }
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
                  src={normalizeSrc(collageImages[0]?.src ?? "")}
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
                                src={normalizeSrc(image?.src ?? "")}
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
                                  src={normalizeSrc(image?.src ?? "")}
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
                            // Use an offset from the main image index for the right image
                            index ===
                              calculateRightImageIndex(
                                activeIndexes.mainImage,
                                activeIndexes.circleTopLeft,
                                activeIndexes.circleBottomRight,
                                collageImages.length
                              ) && (
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
                                  src={normalizeSrc(image?.src ?? "")}
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
                                src={normalizeSrc(image?.src ?? "")}
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
