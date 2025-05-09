"use client";

import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const getIconComponent = (
  iconName: string | undefined,
  backgroundColor?: string
) => {
  if (!iconName) return null;

  // Remove 'Lucide' prefix if present
  const cleanIconName = iconName.replace(/^Lucide/, "");

  // Convert icon name to PascalCase to match Lucide component names
  const pascalCaseName = cleanIconName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");

  // Get the icon component from LucideIcons
  const IconComponent = LucideIcons[
    pascalCaseName as keyof typeof LucideIcons
  ] as LucideIcon;

  if (!IconComponent) {
    console.warn(
      `Icon "${cleanIconName}" not found in Lucide icons. Available icons:`,
      Object.keys(LucideIcons)
    );
    return null;
  }

  return (
    <IconComponent
      className={`inline h-5 w-5 ${
        backgroundColor ? `bg-[${backgroundColor}]` : ""
      }`}
    />
  );
};

export const normalizeSrc = (src: string): string => {
  if (!src.startsWith("http") && !src.startsWith("/")) {
    return `/${src}`;
  }
  return src;
};
