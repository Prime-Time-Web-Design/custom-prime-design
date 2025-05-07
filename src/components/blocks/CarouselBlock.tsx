import React, { useCallback, useEffect, useState } from "react";
// Import useEmblaCarousel from the react wrapper
import useEmblaCarousel from "embla-carousel-react";
// Import EmblaOptionsType and EmblaCarouselType from the core 'embla-carousel' package using 'import type'
import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
// Import AutoplayType so we can conditionally include the plugin
import type { AutoplayType } from "embla-carousel-autoplay";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
// Assuming you might want the tween/parallax effect later, importing it here
// import { ScrollTween } from 'embla-carousel-scroll-tween';
import { PageBlocksCarouselBlock } from "../../../tina/__generated__/types";

interface CarouselBlockProps {
  data: PageBlocksCarouselBlock;
  className?: string; // Optional external classes for the block container
}

export const CarouselBlock: React.FC<CarouselBlockProps> = ({
  data,
  className,
}) => {
  const { slides, autoplayInterval, options_loop } = data;

  const loopOption = options_loop ?? false;
  // Ensure autoplayInterval is a number, default to 0 if null/undefined/negative
  const autoplayDelay =
    typeof autoplayInterval === "number" && autoplayInterval > 0
      ? autoplayInterval
      : 0;

  // Embla Options for centered view and spacing
  const emblaOptions: EmblaOptionsType = {
    loop: loopOption, // boolean
    align: "center", // Center the active slide
    slidesToScroll: 1, // Scroll one slide at a time
    // Using CSS gap via Tailwind for spacing (applied to the container div)
    // containScroll: 'trimSnaps', // Optional: keeps the carousel contained without exposing extra space at ends
  };

  // Conditionally add Autoplay plugin if delay is set
  const plugins: AutoplayType /* | ScrollTween */[] = [];
  if (autoplayDelay > 0) {
    plugins.push(Autoplay({ delay: autoplayDelay, stopOnInteraction: false }));
  }
  // If you want to add ScrollTween plugin later:
  // plugins.push(ScrollTween());

  // Initialize Embla Carousel with options and plugins
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, plugins); // Use the plugins array

  // State for navigation buttons and pagination dots
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Update scroll capabilities and selected index
  // Replace 'any' with 'EmblaCarouselType'
  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  // Replace 'any' with 'EmblaCarouselType'
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    // Pass the correctly typed emblaApi to the handlers
    onInit(emblaApi); // Initial state update

    // Listen for events to update state
    // Embla's event listeners should now correctly type the api parameter
    emblaApi.on("init", onInit);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onInit); // Handle window resize

    // Cleanup
    return () => {
      emblaApi.off("init", onInit);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onInit);
    };
  }, [emblaApi, onInit, onSelect]); // Keep dependencies as they are

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
    // Keep bg-bg-contrast as per your latest code
    <div className={`relative py-16 sm:py-20 bg-bg-contrast ${className}`}>
      {/* Embla Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* Embla Container - Use Tailwind gap for spacing */}
        <div className="flex gap-6 md:gap-8 lg:gap-10">
          {slides.map((slide, idx) => (
            // Embla Slide - flex-shrink-0 needed.
            // Keep the reduced widths for smaller slides
            // w-[55%] on small, md:w-[40%] on medium, lg:w-[30%] on large screens
            <div
              className="relative flex-shrink-0 w-[55%] md:w-[40%] lg:w-[30%]"
              key={idx}
            >
              {slide && slide.src && (
                <div className="relative w-full h-0 pb-[66.66%]">
                  {/* Aspect Ratio Box (3:2) - Adjust pb-% for different ratios */}
                  <Image
                    src={slide.src}
                    alt={slide.alt || `Slide ${idx + 1}`}
                    fill
                    // Apply rounded corners and shadow
                    className="rounded-xl md:rounded-2xl lg:rounded-3xl shadow-lg object-cover"
                  />
                </div>
              )}
              {/* Keep caption text styling as in your latest code */}
              {slide && slide.caption && (
                <p className="mt-4 text-center text-[var(--color-bg)] text-lg px-2">
                  {" "}
                  {/* Using text-[var(--color-bg)] as in your last code */}
                  {slide.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation and Pagination Container */}
      {/* Increased top margin for more separation */}
      <div className="flex justify-center items-center mt-10 space-x-4">
        {/* Navigation Buttons - Hide if loop is enabled */}
        {!loopOption && (
          <>
            {/* Prev Button */}
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              // Keep button colors as in your latest code (bg-accent, text-bg-medium)
              className="w-12 h-12 rounded-full bg-accent text-bg-medium flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-tertiary focus:outline-none focus:ring focus:ring-tertiary-dark focus:ring-opacity-50"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
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

            {/* Next Button */}
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              // Keep button colors as in your latest code (bg-accent, text-bg-medium)
              className="w-12 h-12 rounded-full bg-accent text-bg-medium flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-tertiary focus:outline-none focus:ring focus:ring-tertiary-dark focus:ring-opacity-50"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
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
          </>
        )}

        {/* Pagination Dots */}
        <div className="flex space-x-3">
          {" "}
          {/* Increased space between dots */}
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              // Keep dot colors as in your latest code (bg-secondary, bg-accent-hover)
              className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring focus:ring-tertiary-dark focus:ring-opacity-50 ${
                index === selectedIndex
                  ? "bg-secondary" // Active dot color as in your last code (bg-secondary)
                  : "bg-accent-hover hover:opacity-75" // Inactive dot color as in your last code (bg-accent-hover)
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselBlock;
