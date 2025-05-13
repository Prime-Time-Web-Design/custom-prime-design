import NextImage, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string;
  fallbackSrc?: string;
  lowQualitySrc?: string;
  priority?: boolean;
  sizes?: string;
}

export const OptimizedImage = ({
  src,
  fallbackSrc = "/placeholder.jpg",
  lowQualitySrc,
  alt,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  ...props
}: OptimizedImageProps) => {
  const [imgSrc, setImgSrc] = useState(lowQualitySrc || src);
  const [isLoaded, setIsLoaded] = useState(false);

  // Try to load WebP version first, then optimized, then original
  const webpSrc = src.startsWith("/optimized/")
    ? src.replace(/\.[^/.]+$/, ".webp") // If already in optimized dir, just change extension
    : src.startsWith("/")
    ? `/optimized${src.substring(0, src.lastIndexOf("."))}.webp`
    : `/optimized/${src.substring(0, src.lastIndexOf("."))}.webp`;

  // Optimized version path
  const optimizedSrc = src.startsWith("/optimized/")
    ? src // If already referring to optimized dir, use as is
    : src.startsWith("/")
    ? `/optimized${src}`
    : `/optimized/${src}`;

  // If original image doesn't start with http, assume it's a local path
  const originalSrc = src.startsWith("http") ? src : src;

  useEffect(() => {
    // Debug image paths in development
    if (process.env.NODE_ENV === "development") {
      console.log("Image loading attempt with paths:", {
        original: src,
        webp: webpSrc,
        optimized: optimizedSrc,
        fallback: fallbackSrc,
      });
    }

    // First try WebP
    const webpImg = new window.Image();
    webpImg.src = webpSrc;

    webpImg.onload = () => {
      setImgSrc(webpSrc);
      if (process.env.NODE_ENV === "development") {
        console.log("Successfully loaded WebP image:", webpSrc);
      }
      return;
    };

    webpImg.onerror = () => {
      if (process.env.NODE_ENV === "development") {
        console.log(
          "WebP image failed to load, trying optimized:",
          optimizedSrc
        );
      }
      // If WebP fails, try optimized version
      const img = new window.Image();
      img.src = optimizedSrc;

      img.onload = () => {
        setImgSrc(optimizedSrc);
        if (process.env.NODE_ENV === "development") {
          console.log("Successfully loaded optimized image:", optimizedSrc);
        }
      };

      img.onerror = () => {
        if (process.env.NODE_ENV === "development") {
          console.log(
            "Optimized image failed to load, trying original:",
            originalSrc
          );
        }
        // Fall back to original if optimized doesn't exist
        setImgSrc(originalSrc);
      };
    };
  }, [webpSrc, optimizedSrc, originalSrc]);

  return (
    <div className="relative">
      <NextImage
        {...props}
        src={imgSrc}
        alt={alt}
        priority={priority}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          // If both optimized and original fail, use fallback
          if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
          }
        }}
        className={`${props.className || ""} ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      />

      {!isLoaded && lowQualitySrc && (
        <div className="absolute inset-0 blur-md">
          <NextImage
            {...props}
            src={lowQualitySrc}
            alt={alt}
            sizes={sizes}
            className={`${props.className || ""}`}
          />
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
