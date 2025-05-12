import { ReactNode } from "react";
import { Blocks } from "../blocks";
import { Section } from "../layout/Section";
import { TemplateProps } from "./index";
import FeaturedContentCard from "../molecules/FeaturedContentCard";
import { ensureValidBlocks } from "../../lib/template-utils";

interface LandingTemplateProps extends TemplateProps {
  children?: ReactNode;
}

export default function LandingTemplate({
  data,
  children,
}: LandingTemplateProps) {
  return (
    <div className="landing-template">
      {/* Custom header with special styling */}
      <div className="landing-header bg-bg text-white">
        {/* Render the header blocks if they exist */}
        {data?.headerBlocks && data.headerBlocks.length > 0 ? (
          <Blocks blocks={ensureValidBlocks(data.headerBlocks)} />
        ) : (
          <Section className="py-20 text-center">
            {/* Badge */}
            <div className="inline-block px-4 py-2 rounded-full bg-tertiary text-[var(--color-deep-slate)] mb-6 text-sm font-medium">
              Website Optimization Guide
            </div>

            {/* Main heading with larger font and dark text color */}
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-deep-slate)]">
                Transform Your Therapy Website Into A Client-Converting Machine
              </h1>

              {/* Descriptive text */}
              <p className="text-xl text-[var(--color-deep-slate)] mb-10">
                Learn the proven strategies used by successful therapists to
                create engaging websites that build trust and attract ideal
                clients.
              </p>

              {/* Buttons container */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                {/* First button - Download Guide */}
                <a
                  href="/download-guide"
                  className="bg-[var(--color-soft-turquoise)] text-[var(--color-deep-slate)] px-8 py-3 rounded-lg font-bold hover:bg-[var(--color-soft-turquoise-light)] transition-colors"
                >
                  Download Free Guide
                </a>

                {/* Second button - Schedule Consultation */}
                <a
                  href="/consultation"
                  className="bg-[var(--color-soft-lavender)] text-[var(--color-deep-slate)] px-8 py-3 rounded-lg font-bold hover:bg-[var(--color-soft-lavender-light)] transition-colors"
                >
                  Schedule Consultation
                </a>
              </div>
            </div>
          </Section>
        )}
      </div>

      {/* Featured section with custom design - statically part of template */}
      <Section className="featured-section py-16 bg-gradient-to-b from-[var(--color-secondary)] to-[var(--color-primary)]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-[var(--color-deep-slate)]">
            Our Featured Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeaturedContentCard
              title="Custom Websites"
              description="Professional, responsive websites tailored to your needs"
              image={{ src: "/featuredCardImage.png", alt: "Custom Websites" }}
              ctaText="Learn More"
              ctaLink="/services/websites"
              layout="horizontal"
            />
            <FeaturedContentCard
              title="Digital Marketing"
              description="Strategies to boost your online presence and reach"
              image={{
                src: "/featuredCardImage.png",
                alt: "Digital Marketing",
              }}
              ctaText="Learn More"
              ctaLink="/services/marketing"
              layout="horizontal"
            />
            <FeaturedContentCard
              title="Content Creation"
              description="Engaging content that connects with your audience"
              image={{ src: "/featuredCardImage.png", alt: "Content Creation" }}
              ctaText="Learn More"
              ctaLink="/services/content"
              layout="horizontal"
            />
          </div>
        </div>
      </Section>

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
            className="bg-white text-[var(--color-deep-slate)] px-8 py-3 rounded-lg font-bold hover:bg-[var(--color-soft-apricot-light)] hover:text-[var(--color-deep-slate)] transition-colors"
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
