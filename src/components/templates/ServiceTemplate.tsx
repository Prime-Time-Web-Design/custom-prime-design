import { ReactNode } from "react";
import { Blocks } from "../blocks";
import { Section } from "../layout/Section";
import { TemplateProps } from "./index";
import Card from "../molecules/Card";
import Link from "next/link";
import { ensureValidBlocks } from "../../lib/template-utils";
import { HeroBlock } from "../blocks/HeroBlock";
import ServiceContentBlock from "../blocks/ServiceContentBlock";

interface ServiceTemplateProps extends TemplateProps {
  children?: ReactNode;
}

export default function ServiceTemplate({
  data,
  children,
}: ServiceTemplateProps) {
  // Create a hero block configuration for service pages
  const serviceHeroData = {
    __typename: "PageBlocksHero" as const,
    heading: data?.title || "Our Services",
    subheading:
      data?.description || "Professional services tailored to your needs",
    tagline: "Excellence starts with connection.",
    buttonText: "Get Started",
    buttonLink: "#contact",
    secondaryButtonText: "1 (555) 123-4567",
    secondaryButtonLink: "tel:15551234567",
    layout: "service",
    collageImages: [],
  };

  // Sample content sections for demonstration
  const sampleContentSections = [
    {
      heading: "When traditional approaches may not be enough",
      content: {
        type: "root",
        children: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Our comprehensive service approach combines proven methodologies with innovative solutions to deliver exceptional results for our clients.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "We understand that every client has unique needs, which is why our services are designed to be flexible, scalable, and tailored to your specific requirements.",
              },
            ],
          },
        ],
      },
      backgroundColor: "bg-white",
      textAlign: "left" as const,
      maxWidth: "lg" as const,
    },
    {
      heading: "Our approach to service excellence",
      subheading: "Delivering value through expertise and innovation",
      content: {
        type: "root",
        children: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "We believe in building lasting relationships with our clients through transparency, communication, and consistent delivery of high-quality results.",
              },
            ],
          },
        ],
      },
      backgroundColor: "bg-gray-50",
      textAlign: "center" as const,
      maxWidth: "md" as const,
      showDivider: true,
      features: [
        {
          title: "Expert Consultation",
          description: {
            type: "root",
            children: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Our team of experienced professionals provides strategic guidance tailored to your specific needs.",
                  },
                ],
              },
            ],
          },
          icon: "users",
        },
        {
          title: "Proven Results",
          description: {
            type: "root",
            children: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Track record of success with measurable outcomes and client satisfaction.",
                  },
                ],
              },
            ],
          },
          icon: "chart-bar",
        },
        {
          title: "Ongoing Support",
          description: {
            type: "root",
            children: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Continuous support and optimization to ensure long-term success and growth.",
                  },
                ],
              },
            ],
          },
          icon: "support",
        },
      ],
    },
  ];

  return (
    <div className="service-template">
      {/* Hero Section - Charlie Health inspired */}
      <HeroBlock data={serviceHeroData} />

      {/* Sample content sections */}
      {sampleContentSections.map((section, index) => (
        <ServiceContentBlock key={index} data={section} />
      ))}

      {/* Dynamic blocks from Tina CMS */}
      {data?.blocks && data.blocks.length > 0 && (
        <Section className="service-content">
          <Blocks blocks={ensureValidBlocks(data?.blocks)} />
        </Section>
      )}

      {/* Related services section with updated styling */}
      <Section className="related-services py-16 bg-[var(--color-bg)]">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-deep-slate)]">
              Related Services
            </h2>
            <p className="text-lg text-[var(--color-deep-slate-light)] max-w-2xl mx-auto">
              Explore our comprehensive range of professional services designed
              to help you achieve your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              title="Web Design & Development"
              description="Professional and responsive website design tailored to your brand, built with modern technologies and best practices."
              cta={
                <Link
                  href="/services/web-design"
                  className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors duration-300"
                >
                  Learn more
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              }
            />
            <Card
              title="Digital Marketing"
              description="Comprehensive digital marketing strategies to grow your online presence and reach your target audience effectively."
              cta={
                <Link
                  href="/services/digital-marketing"
                  className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors duration-300"
                >
                  Learn more
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              }
            />
            <Card
              title="Consultation Services"
              description="Expert consultation and strategic guidance to help you make informed decisions and achieve sustainable growth."
              cta={
                <Link
                  href="/services/consultation"
                  className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors duration-300"
                >
                  Learn more
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              }
            />
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="service-cta py-16 bg-[var(--color-bg-contrast)]">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how our services can help you achieve
            your goals and drive meaningful results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#contact"
              className="px-8 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-deep-slate)] font-medium rounded-lg transition-colors duration-300"
            >
              Get Started Today
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-[var(--color-deep-slate)] font-medium rounded-lg transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Section>

      {/* Render any children passed to the template */}
      {children && <Section className="template-children">{children}</Section>}
    </div>
  );
}
