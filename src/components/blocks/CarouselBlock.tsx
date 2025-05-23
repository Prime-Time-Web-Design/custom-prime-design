import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import type { AutoplayType } from "embla-carousel-autoplay";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { PageBlocksCarouselBlock } from "../../../tina/__generated__/types";
import { normalizeSrc } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const StarRating = ({ rating = 5 }: { rating?: number }) => {
  const safeRating = Math.min(5, Math.max(0, rating));
  return (
    <div className="flex items-center space-x-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${
            i < safeRating ? "text-tertiary" : "text-gray-300"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

interface CarouselBlockProps {
  data: PageBlocksCarouselBlock;
  className?: string;
}

export const CarouselBlock: React.FC<CarouselBlockProps> = ({
  data,
  className,
}) => {
  const {
    slides = [],
    autoplayInterval,
    options_loop,
    blockTitle,
    blockSubtitle,
  } = data;

  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const loopOption = options_loop ?? true;
  const autoplayDelay =
    typeof autoplayInterval === "number" && autoplayInterval > 0
      ? autoplayInterval
      : 5000;

  const emblaOptions: EmblaOptionsType = {
    loop: loopOption,
    align: "start", // Changed from "center" to "start"
    slidesToScroll: 1,
    dragFree: false,
    containScroll: "trimSnaps",
    skipSnaps: false,
    inViewThreshold: 0.8,
  };

  const plugins: AutoplayType[] = [
    Autoplay({
      delay: autoplayDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      playOnInit: true, // Ensure autoplay starts when the carousel initializes
      rootNode: (emblaRoot) => emblaRoot.parentElement, // Use the parent element for detecting mouse events
    }),
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback((emblaApiInstance: EmblaCarouselType) => {
    setScrollSnaps(emblaApiInstance.scrollSnapList());
    setSelectedIndex(emblaApiInstance.selectedScrollSnap());
  }, []);

  const onSelect = useCallback((emblaApiInstance: EmblaCarouselType) => {
    setSelectedIndex(emblaApiInstance.selectedScrollSnap());
  }, []);

  // Effect for initial setup and persistent event listeners
  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi); // Initial call to set state

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onInit); // Called after emblaApi.reInit() completes

    // Cleanup listeners when component unmounts or emblaApi/callbacks change
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onInit);
    };
  }, [emblaApi, onInit, onSelect]);

  // Effect to restart autoplay when breakpoints change
  useEffect(() => {
    if (!emblaApi) return;

    // Force a reinitialization when breakpoints change
    emblaApi.reInit();

    // Explicitly tell all plugins to restart, particularly focusing on Autoplay
    const handlePluginInit = () => {
      // Give it a small delay to ensure the carousel has fully initialized
      setTimeout(() => {
        // Access autoplay plugin (if it exists)
        const pluginApi = emblaApi.plugins();
        if (pluginApi.autoplay) {
          // Stop and restart
          pluginApi.autoplay.stop();
          pluginApi.autoplay.play();
        }
      }, 50);
    };

    // Run immediately and also hook into the reInit event
    handlePluginInit();
    emblaApi.on("reInit", handlePluginInit);

    // Clean up
    return () => {
      emblaApi.off("reInit", handlePluginInit);
    };
  }, [emblaApi, isTablet, isDesktop]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  if (!slides || slides.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No carousel slides configured.
      </p>
    );
  }

  return (
    <div className={`relative py-12 sm:py-16 bg-bg ${className}`}>
      {(blockTitle || blockSubtitle) && (
        <div className="text-center mb-10 max-w-3xl mx-auto px-4">
          {blockTitle && (
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {blockTitle}
            </h2>
          )}
          {blockSubtitle && (
            <p className="text-lg text-accent-dark">{blockSubtitle}</p>
          )}
        </div>
      )}

      <div
        className="relative mx-auto px-4 sm:px-6 lg:px-8"
        // ref={emblaRef} // ref moved to embla__viewport
      >
        <div
          className="embla__viewport overflow-hidden w-full"
          ref={emblaRef}
          key={`${isTablet}-${isDesktop}`} // Added key to force re-mount on breakpoint change
        >
          <div className="embla__container flex">
            {" "}
            {/* Changed class, removed py-4 */}
            {slides.map((slide, idx) => {
              if (!slide) return null;

              const bgColors = [
                "bg-[var(--color-primary)]",
                "bg-[var(--color-accent)]",
                "bg-[var(--color-secondary-hover)]",
              ];
              const bgColor = bgColors[idx % bgColors.length];

              // Determine flex basis for responsive slides
              const flexBasis = isDesktop
                ? "23%" // Further adjusted for narrower cards on desktop
                : isTablet
                ? "30%" // Further adjusted for narrower cards on tablet
                : "100%";

              return (
                <div
                  key={idx}
                  className={`embla__slide flex flex-col p-3 justify-end rounded-xl shadow-lg overflow-hidden mx-2 sm:mx-3 min-h-[300px] sm:min-h-[320px] md:min-h-[340px] lg:min-h-[360px] ${bgColor} transition-all duration-300 hover:shadow-2xl`}
                  style={{
                    flex: `0 0 ${flexBasis}`,
                    maxWidth: flexBasis, // Ensure slide does not exceed flexBasis
                  }}
                >
                  <div className="w-full h-36 sm:h-44 md:h-48 lg:h-48 flex items-end justify-center relative p-4 pb-0">
                    {slide.src && (
                      <Image
                        src={normalizeSrc(slide.src)}
                        alt={slide.alt || `${slide.clientName || "Client"}`}
                        fill
                        className="object-cover object-top rounded-lg"
                        unoptimized={slide.src.startsWith("http")}
                        sizes={
                          isDesktop
                            ? "(min-width: 1024px) 25vw" // Adjusted for narrower cards
                            : isTablet
                            ? "(min-width: 768px) 33vw" // Adjusted for narrower cards
                            : "100vw"
                        }
                        style={{ inset: 0 }}
                      />
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-5 text-text bg-opacity-90 relative">
                    {slide.testimonialText && (
                      <p className="mb-4 text-sm font-medium leading-relaxed text-center">
                        “{slide.testimonialText}”
                      </p>
                    )}
                    {slide.clientName && (
                      <div className="mt-auto text-left">
                        <div className="font-bold text-base inline-block">
                          {slide.clientName}
                        </div>
                        <div className="mt-2 flex justify-start">
                          <StarRating rating={5} />
                        </div>
                        <div className="h-1 w-20 mt-1 rounded bg-bg" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={scrollPrev}
          className="w-10 h-10 rounded-full bg-primary-hover text-bg-medium flex items-center justify-center shadow-md hover:bg-primary focus:outline-none focus:ring focus:ring-bg-medium focus:ring-opacity-50 transition-colors"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-colors focus:outline-none focus:ring focus:ring-tertiary-dark focus:ring-opacity-50 ${
                index === selectedIndex
                  ? "bg-secondary"
                  : "bg-accent-hover hover:opacity-75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          className="w-10 h-10 rounded-full bg-accent text-bg-medium flex items-center justify-center shadow-md hover:bg-tertiary focus:outline-none focus:ring focus:ring-tertiary-dark focus:ring-opacity-50 transition-colors"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CarouselBlock;
