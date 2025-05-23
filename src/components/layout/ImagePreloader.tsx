"use client";

import { useEffect } from "react";

/**
 * Component to preload critical images
 * This can be used for any important images that need to be available immediately
 */
export default function ImagePreloader() {
  useEffect(() => {
    // Preload the hero image and other critical images
    const imagesToPreload = [
      "/optimized/hero.webp",
      // Add other critical images here
    ];

    // Create non-visible image elements to trigger browser preloading
    imagesToPreload.forEach((imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
    });
  }, []);

  // This component doesn't render anything visible
  return null;
}
