"use client";
import React, { ReactNode } from "react";

interface SectionProps extends React.HTMLProps<HTMLElement> {
  background?: string;
  children: ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  background,
  className = "",
  ...props
}) => {
  return (
    <section className={`w-full ${background || ""} ${className}`} {...props}>
      {children}
    </section>
  );
};
