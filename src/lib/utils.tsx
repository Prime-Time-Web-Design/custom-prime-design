"use client";

import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const getIconComponent = (
  iconName: string | undefined,
  backgroundColor?: string
) => {
  if (!iconName) return null;

  // Convert icon name to PascalCase to match Lucide component names
  const pascalCaseName = iconName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");

  // Get the icon component from LucideIcons
  const IconComponent = LucideIcons[
    pascalCaseName as keyof typeof LucideIcons
  ] as LucideIcon;

  if (!IconComponent) {
    console.warn(
      `Icon "${iconName}" not found in Lucide icons. Available icons:`,
      Object.keys(LucideIcons)
    );
    return null;
  }

  return (
    <IconComponent
      className={`inline h-4 w-4 ${
        backgroundColor ? `bg-[${backgroundColor}]` : ""
      }`}
    />
  );
};
