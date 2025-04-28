"use client";
import { getIconComponent } from "@/lib/utils";
import React from "react";

interface CardProps {
  icon?: string;
  title: string;
  description?: string;
  cta?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  variant?: string;
}

const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  cta,
  children,
  className = "",
  variant = "small",
}) => {
  const baseStyles =
    "rounded-lg flex items-start w-full max-w-md transition-colors duration-200 border-2 border-[var(--color-accent-hover)] hover:border-[var(--color-accent)]";
  const largeStyles =
    "bg-[var(--color-bg)] text-[var(--color-text)] flex-col p-6 min-h-[120px] text-lg hover:text-[var(--color-text)] gap-3";
  const smallStyles =
    "bg-[var(--color-bg)] text-[var(--color-text)] p-4 flex items-center gap-4 text-base";
  const iconComponent = icon ? getIconComponent(icon) : null;

  console.log("icon", icon);
  return (
    <div
      className={`${baseStyles} ${
        variant === "large" ? largeStyles : smallStyles
      } ${className}`}
    >
      <div className="bg-[var(--color-primary-hover)] rounded-2xl flex items-center justify-center w-10 h-10 shrink-0">
        {iconComponent && iconComponent}
      </div>
      <div className="flex flex-col gap-1">
        <h3
          className={`font-semibold ${
            variant === "large" ? "text-xl" : "text-lg"
          }`}
        >
          {title}
        </h3>
        {description && (
          <p className="text-base text-[var(--color-text)]">{description}</p>
        )}
        {children}
        {cta && <div className="mt-4">{cta}</div>}
      </div>
    </div>
  );
};

export default Card;
