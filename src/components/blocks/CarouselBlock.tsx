import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import type { AutoplayType } from "embla-carousel-autoplay";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
// Assuming you might want the tween/parallax effect later, importing it here
// import { ScrollTween } from 'embla-carousel-scroll-tween';
import { PageBlocksCarouselBlock } from "../../../tina/__generated__/types";

// Helper function to ensure image paths are correctly formed
const normalizeSrc = (src: string): string => {
  if (!src.startsWith("http") && !src.startsWith("/")) {
    return `/${src}`;
  }
  return src;
};

// Helper for star ratings
const StarRating = ({ rating = 5 }: { rating?: number }) => {
  return (
    <div className="flex items-center mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-secondary"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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

  console.log("CarouselBlock data:", data);
  const loopOption = options_loop ?? false;
  // Ensure autoplayInterval is a number, default to 0 if null/undefined/negative
  const autoplayDelay =
    typeof autoplayInterval === "number" && autoplayInterval > 0
      ? autoplayInterval
      : 0;

  // Embla Options for centered view and spacing
  const emblaOptions: EmblaOptionsType = {
    loop: loopOption,
    align: "center",
    slidesToScroll: 1,
  };

  // Conditionally add Autoplay plugin if delay is set
  const plugins: AutoplayType[] = [];
  if (autoplayDelay > 0) {
    plugins.push(Autoplay({ delay: autoplayDelay, stopOnInteraction: false }));
  }

  // Initialize Embla Carousel with options and plugins
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, plugins);

  // State for navigation buttons and pagination dots
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Update scroll capabilities and selected index
  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

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
    <div className={`relative py-16 sm:py-20 bg-bg ${className}`}>
      {/* Section Title and Subtitle */}
      {(blockTitle || blockSubtitle) && (
        <div className="text-center mb-12">
          {blockTitle && (
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {blockTitle}
            </h2>
          )}
          {blockSubtitle && (
            <p className="text-lg text-accent-dark max-w-3xl mx-auto">
              {blockSubtitle}
            </p>
          )}
        </div>
      )}

      <div className="overflow-hidden mx-auto px-8" ref={emblaRef}>
        <div className="flex gap-12 py-4">
          {slides.map((slide, idx) => {
            if (!slide) return null;

            return (
              <div
                className="relative flex-shrink-0 w-full lg:w-[40%] px-2"
                key={idx}
              >
                <div className="bg-primary-hover rounded-xl shadow-lg p-8 h-full flex">
                  {/* Left side - Image */}
                  <div className="hidden md:block relative w-52 h-52 rounded-lg overflow-hidden mr-8 flex-shrink-0">
                    {slide.src && (
                      <Image
                        src={normalizeSrc(slide.src)}
                        alt={slide.alt || `${slide.clientName || "Client"}`}
                        fill
                        className="object-cover"
                        unoptimized={slide.src.startsWith("http")}
                      />
                    )}
                  </div>

                  {/* Right side - Content */}
                  <div className="flex flex-col w-full">
                    {/* Rating Stars */}
                    <StarRating />

                    {/* Testimonial Text */}
                    {slide.testimonialText && (
                      <div className="flex-grow mb-6">
                        <p className="text-text-dark text-lg md:text-xl font-medium">
                          {slide.testimonialText}
                        </p>
                      </div>
                    )}

                    {/* Client Name and Type */}
                    <div className="flex items-center">
                      {/* Mobile only image */}
                      <div className="md:hidden relative w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0 border border-secondary">
                        {slide.src && (
                          <Image
                            src={normalizeSrc(slide.src)}
                            alt={slide.alt || `${slide.clientName || "Client"}`}
                            fill
                            className="object-cover"
                            unoptimized={slide.src.startsWith("http")}
                          />
                        )}
                      </div>

                      <div>
                        {slide.clientName && (
                          <h4 className="font-semibold text-primary text-lg">
                            {slide.clientName}
                          </h4>
                        )}
                        {slide.clientType && (
                          <p className="text-accent-dark">{slide.clientType}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center items-center mt-10 space-x-4">
        {!loopOption && (
          <>
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="w-12 h-12 rounded-full bg-primary-hover text-bg-medium flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-primary focus:outline-none focus:ring focus:ring-bg-medium focus:ring-opacity-50"
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

            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
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

        <div className="flex space-x-3">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring focus:ring-tertiary-dark focus:ring-opacity-50 ${
                index === selectedIndex
                  ? "bg-secondary"
                  : "bg-accent-hover hover:opacity-75"
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
