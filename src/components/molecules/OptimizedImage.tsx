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
  const webpSrc = src.startsWith("/")
    ? `/optimized${src.substring(0, src.lastIndexOf("."))}.webp`
    : `/optimized/${src.substring(0, src.lastIndexOf("."))}.webp`;

  // Optimized version path
  const optimizedSrc = src.startsWith("/")
    ? `/optimized${src}`
    : `/optimized/${src}`;

  // If original image doesn't start with http, assume it's a local path
  const originalSrc = src.startsWith("http") ? src : src;

  useEffect(() => {
    // First try WebP
    const webpImg = new window.Image();
    webpImg.src = webpSrc;

    webpImg.onload = () => {
      setImgSrc(webpSrc);
      return;
    };

    webpImg.onerror = () => {
      // If WebP fails, try optimized version
      const img = new window.Image();
      img.src = optimizedSrc;

      img.onload = () => {
        setImgSrc(optimizedSrc);
      };

      img.onerror = () => {
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
