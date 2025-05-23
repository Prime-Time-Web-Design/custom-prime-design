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
 * A custom blur placeholder for the header background image
 * This provides a better loading experience with a preview of the actual image colors
 */
export const headerBackgroundPlaceholder =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxMHB4IiBoZWlnaHQ9IjEwcHgiIHZpZXdCb3g9IjAgMCAxMCAxMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiM3NjlFQjUiIG9wYWNpdHk9IjAuNSI+PHBhdGggZD0iTTAsMEgxMFYxMEgweiI+PC9wYXRoPjwvZz48L3N2Zz4=";

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

  // Always preload header background image on all pages
  if (imageSrc.includes("fe2a3d52-02ee-48c4-8d8d-d09741328f27")) {
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

  if (imagePath.includes("fe2a3d52-02ee-48c4-8d8d-d09741328f27")) {
    return headerBackgroundPlaceholder;
  }

  // Default placeholder for other images
  return lightBlurPlaceholder;
}

/**
 * Preload critical images to prevent layout shifts
 * @param imagePath Path to the image to preload
 */
export function preloadImage(imagePath: string) {
  if (typeof window !== "undefined") {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = imagePath;
    document.head.appendChild(link);
  }
}

/**
 * SSR/CSR-safe image preloader for Next.js
 * On the server, returns a preload <link> string for Head. On the client, injects a preload link.
 * @param imagePath Path to the image to preload
 * @param type Image mime type (default: image/webp)
 * @returns For SSR: string for <Head> dangerouslySetInnerHTML, for CSR: void
 */
export function robustPreloadImage(
  imagePath: string,
  type: string = "image/webp"
) {
  if (typeof window === "undefined") {
    // SSR: return string for <Head>
    return `<link rel="preload" href="${imagePath}" as="image" type="${type}" />`;
  } else {
    // CSR: inject link if not already present
    if (!document.querySelector(`link[rel='preload'][href='${imagePath}']`)) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = imagePath;
      link.type = type;
      document.head.appendChild(link);
    }
  }
}

/**
 * Utility to get the correct image type for preloading
 */
export function getImageMimeType(imagePath: string): string {
  if (imagePath.endsWith(".webp")) return "image/webp";
  if (imagePath.endsWith(".jpg") || imagePath.endsWith(".jpeg"))
    return "image/jpeg";
  if (imagePath.endsWith(".png")) return "image/png";
  if (imagePath.endsWith(".svg")) return "image/svg+xml";
  return "image/*";
}
