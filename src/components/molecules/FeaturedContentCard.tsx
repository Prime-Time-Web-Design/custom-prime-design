import React from "react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedContentCardProps {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  layout?: "vertical" | "horizontal"; // New prop for layout
}

const FeaturedContentCard: React.FC<FeaturedContentCardProps> = ({
  image,
  title,
  description,
  ctaText,
  ctaLink,
  layout = "vertical", // Default to vertical
}) => {
  const isHorizontal = layout === "horizontal";
  return (
    <div
      className={`bg-[var(--color-bg)] p-3 border-2 border-[var(--color-accent-hover)] rounded-2xl shadow-sm transition-colors duration-200 flex ${
        isHorizontal
          ? "flex-row h-36 min-h-[144px] max-h-[160px] min-w-[320px] max-w-[360px] gap-5"
          : "flex-col h-64 min-h-[260px] max-h-[320px] min-w-[340px] max-w-[380px] gap-4"
      }`}
    >
      <div
        className={`relative flex-shrink-0 overflow-hidden rounded-xl ${
          isHorizontal
            ? "w-36 h-full min-w-36 max-w-36 aspect-[3/2]"
            : "w-full h-28 min-h-[112px] max-h-[120px] aspect-[3/1]"
        }`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover rounded-xl"
          sizes="(max-width: 600px) 100vw, 400px"
        />
        <div className="absolute top-3 left-3 px-3 py-1 bg-[var(--color-secondary)]/90 rounded-full shadow text-xs font-semibold text-[var(--color-text)] tracking-wide">
          Featured
        </div>
      </div>
      <div
        className={`flex flex-col justify-between ${
          isHorizontal ? "flex-1 py-1" : "py-1"
        }`}
      >
        <div>
          <h3 className="text-base font-bold text-[var(--color-text)] mb-1 leading-tight">
            {title}
          </h3>
          <p className="text-[var(--color-text)] opacity-80 mb-2 text-xs leading-snug">
            {description}
          </p>
        </div>
        <div className="flex justify-end">
          <Link
            href={ctaLink}
            className="px-5 py-2 rounded-lg bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] text-[var(--color-text)] font-semibold text-sm transition-colors duration-200 shadow-sm"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContentCard;
