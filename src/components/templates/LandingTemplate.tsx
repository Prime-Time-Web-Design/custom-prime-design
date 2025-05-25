import React, { ReactNode } from "react";
import { Blocks } from "../blocks";
import { Section } from "../layout/Section";
import { TemplateProps } from "./index";
import { ensureValidBlocks } from "../../lib/template-utils";

// Import header directly to prevent flickering
import DefaultHeader from "../molecules/DefaultHeader";

interface LandingTemplateProps extends TemplateProps {
  children?: ReactNode;
}

export default function LandingTemplate({
  data,
  children,
}: LandingTemplateProps) {
  return (
    <div className="landing-template">
      {/* Render the header blocks if they exist, otherwise use the fallback */}
      {data?.headerBlocks && data.headerBlocks.length > 0 ? (
        <Blocks blocks={ensureValidBlocks(data.headerBlocks)} />
      ) : (
        <DefaultHeader />
      )}

      {/* Main content blocks - dynamic from Tina */}
      <Section className="main-content-section bg-gradient-to-b from-[var(--color-very-light-gray)] to-[var(--color-soft-lavender-light)] py-16">
        <Blocks blocks={ensureValidBlocks(data?.blocks)} />
      </Section>

      {/* Custom call to action section - statically part of template */}
      {/* <Section className="cta-section py-16 bg-gradient-to-r from-[var(--color-calming-blue-dark)] to-[var(--color-soft-turquoise-dark)] text-white text-center">
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
      </Section> */}

      {/* Render any children passed to the template */}
      {children && (
        <Section className="template-children bg-[var(--color-very-light-gray)]">
          {children}
        </Section>
      )}
    </div>
  );
}
