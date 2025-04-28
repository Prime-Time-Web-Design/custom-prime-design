"use client";
import React, { ReactNode } from "react";

interface SectionProps extends React.HTMLProps<HTMLElement> {
  background?: string;
  children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  children,
  background,
  ...props
}) => {
  return (
    <div className={background || "bg-[--color-primary] text-[--color-text]"}>
      <section className="py-12 mx-auto max-w-7xl px-6" {...props}>
        {children}
      </section>
    </div>
  );
};
