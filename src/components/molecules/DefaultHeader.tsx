import { Section } from "../layout/Section";

export default function DefaultHeader() {
  return (
    <div className="relative bg-primary overflow-hidden">
      {/* Decorative badge floating at top left, with padding */}
      <div className="absolute left-0 top-0 pl-6 pt-6 z-10">
        <span className="inline-block px-3 py-2 rounded-full bg-tertiary text-[var(--color-deep-slate)] text-sm font-medium shadow-lg tracking-wide">
          Website Optimization Guide
        </span>
      </div>
      {/* Main content left-aligned with responsive padding */}
      <Section className="flex flex-col items-start justify-center min-h-[220px] md:min-h-[300px] py-16 px-4 md:px-12 text-left relative z-10">
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
