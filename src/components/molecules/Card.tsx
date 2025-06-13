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
    "rounded-lg flex items-start w-full transition-colors duration-200 border-2 border-accent hover:border-[var(--color-bg-medium)]";
  const largeStyles =
    "bg-[var(--color-bg)] text-[var(--color-text)] flex-col p-6 min-h-[120px] text-lg hover:text-[var(--color-text)] gap-3 min-w-[300px] max-w-[340px]";
  const smallStyles =
    "bg-[var(--color-bg)] text-[var(--color-text)] py-2.5 px-3 flex items-center gap-3 text-base min-w-[320px]";
  const iconComponent = icon ? getIconComponent(icon) : null;

  return (
    <div
      className={`${baseStyles} ${
        variant === "large" ? largeStyles : smallStyles
      } ${className}`}
    >
      <div className="flex items-center justify-center shrink-0">
        {iconComponent &&
          React.cloneElement(iconComponent, {
            className: "h-6 w-6 text-text",
          })}
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <h3
          className={`font-semibold ${
            variant === "large" ? "text-xl" : "text-base"
          } truncate`}
        >
          {title}
        </h3>
        {description && (
          <p className="text-xs text-[var(--color-text)] opacity-80 font-medium">
            {description}
          </p>
        )}
        {children}
        {cta && <div className="mt-3">{cta}</div>}
      </div>
    </div>
  );
};

export default Card;
