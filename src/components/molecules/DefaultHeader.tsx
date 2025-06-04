import { Section } from "../layout/Section";

export default function DefaultHeader() {
  return (
    <div className="relative bg-primary overflow-hidden">
      {/* Decorative badge floating at top left, with padding */}
      <div className="absolute left-1 top-1  sm:left-3 sm:top-3 sm:pl-6 pl-3 pt-3 sm:pt-6 z-10">
        <span className="inline-block px-3 py-2 rounded-full bg-tertiary text-[var(--color-deep-slate)] text-sm font-medium shadow-lg tracking-wide">
          Website Optimization Guide
        </span>
      </div>
      {/* Main content left-aligned with responsive padding */}
      <Section className="flex flex-col items-start justify-center min-h-[220px] md:min-h-[300px] py-16 px-8 md:px-12 text-left relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--color-deep-slate)] mb-4 tracking-tight">
          Let’s Get Started
        </h1>
        <p className="text-lg md:text-2xl text-[var(--color-deep-slate)] font-medium opacity-80">
          Create engaging websites that build trust and attract ideal clients.
        </p>
      </Section>
    </div>
  );
}
