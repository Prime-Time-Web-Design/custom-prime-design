import React, { ReactNode, lazy, Suspense } from "react";
import { Blocks } from "../blocks";
import { Section } from "../layout/Section";
import { TemplateProps } from "./index";
import { ensureValidBlocks } from "../../lib/template-utils";
import Image from "../molecules/OptimizedImage";

// Lazy load the fallback header component
const DefaultHeader = lazy(() => import("../molecules/DefaultHeader"));

interface LandingTemplateProps extends TemplateProps {
  children?: ReactNode;
}

export default function LandingTemplate({
  data,
  children,
}: LandingTemplateProps) {
  return (
    <div className="landing-template">
      {/* Custom header with special styling and optimized background image */}
      <div className="landing-header relative">
        <Image
          src="/optimized/aniket-deole-T-tOgjWZ0fQ-unsplash.webp"
          alt="Landing Page Background"
          fill
          className="object-cover object-center"
          onError={(e) => {
            // Fallback to JPEG if WebP is not available
            e.currentTarget.src =
              "/optimized/aniket-deole-T-tOgjWZ0fQ-unsplash.jpg";
          }}
          priority // Mark as high priority LCP image
        />
      </div>
      {/* Render the header blocks if they exist, otherwise lazy load the fallback */}
      {data?.headerBlocks && data.headerBlocks.length > 0 ? (
        <Blocks blocks={ensureValidBlocks(data.headerBlocks)} />
      ) : (
        <Suspense
          fallback={<div className="h-72 animate-pulse bg-gray-200"></div>}
        >
          <DefaultHeader />
        </Suspense>
      )}

      {/* Main content blocks - dynamic from Tina */}
      <Section className="main-content-section bg-gradient-to-b from-[var(--color-very-light-gray)] to-[var(--color-soft-lavender-light)] py-16">
        <Blocks blocks={ensureValidBlocks(data?.blocks)} />
      </Section>

      {/* Custom call to action section - statically part of template */}
      <Section className="cta-section py-16 bg-gradient-to-r from-[var(--color-calming-blue-dark)] to-[var(--color-soft-turquoise-dark)] text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Take the first step towards transforming your online presence today.
          </p>
          <a
            href="/contact"
            className="bg-tertiary text-[var(--color-deep-slate)] px-8 py-3 rounded-lg font-bold hover:bg-[var(--color-soft-apricot-light)] hover:text-[var(--color-deep-slate)] transition-colors"
          >
            Book a Free Consultation
          </a>
        </div>
      </Section>

      {/* Render any children passed to the template */}
      {children && (
        <Section className="template-children bg-[var(--color-very-light-gray)]">
          {children}
        </Section>
      )}
    </div>
  );
}
