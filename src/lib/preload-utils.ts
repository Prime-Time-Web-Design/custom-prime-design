/**
 * Utility functions for image preloading and placeholders
 */

/**
 * Creates a transparent light blue placeholder as a base64 data URL
 * This creates a much more pleasant loading experience than the default red placeholder
 */
export const lightBlurPlaceholder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOMVwAAAbsBNZ4GF/IAAAAASUVORK5CYII=";

/**
 * A custom generated blur placeholder specifically for the hero image
 * This is a 10px tiny version of the actual image, which provides a more accurate color representation
 * during loading than a solid color
 */
export const heroImagePlaceholder =
  "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAACwAQCdASoKAAcABUB8JbACdADyf/xoAP3wes6LHCAoZauz3ejvYJEpJfl2aL5Fs0CmLMA9JRmvQDxSAHGTonwQm7+9rgAA";

/**
 * Function to generate the preload link for critical images
 * @param src The image source path
 * @param type The image mime type
 * @returns The HTML link element as a string
 */
export function preloadImageTag(src: string, type: string = "image/webp") {
  return `<link rel="preload" href="${src}" as="image" type="${type}" />`;
}

/**
 * Helper to determine if an image should be preloaded
 * @param pathname Current page path
 * @param imageSrc Image source
 * @returns Boolean indicating if image should be preloaded
 */
export function shouldPreloadImage(
  pathname: string,
  imageSrc: string
): boolean {
  // Always preload hero image on homepage
  if (pathname === "/" && imageSrc.includes("hero")) {
    return true;
  }

  // Add other conditions as needed
  return false;
}

/**
 * Get the appropriate placeholder for a given image
 * @param imagePath Path to the image
 * @returns The appropriate blur data URL
 */
export function getPlaceholderForImage(imagePath: string): string {
  if (imagePath.includes("hero")) {
    return heroImagePlaceholder;
  }

  // Default placeholder for other images
  return lightBlurPlaceholder;
}
