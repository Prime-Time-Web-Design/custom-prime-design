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
      className={`bg-[var(--color-bg)] border-2 border-[var(--color-accent-hover)] hover:border-[var(--color-bg-medium)] rounded-xl overflow-hidden transition-colors duration-200 ${
        isHorizontal ? "flex flex-row h-48" : "flex flex-col"
      }`}
    >
      <div
        className={`relative ${
          isHorizontal ? "w-48 h-full min-w-48" : "w-full h-48"
        }`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <div className={`p-6 ${isHorizontal ? "flex-1" : ""}`}>
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
          {title}
        </h3>
        <p className="text-[var(--color-text)] opacity-80 mb-4">
          {description}
        </p>
        <Link
          href={ctaLink}
          className="inline-block px-6 py-2 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text)] font-medium transition-colors duration-200"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
};

export default FeaturedContentCard;
