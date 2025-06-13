import { ReactNode } from "react";
import { Blocks } from "../blocks";
import { Section } from "../layout/Section";
import { TemplateProps } from "./index";
import Card from "../molecules/Card";
import Link from "next/link";
import { ensureValidBlocks } from "../../lib/template-utils";

interface ServiceTemplateProps extends TemplateProps {
  children?: ReactNode;
}

export default function ServiceTemplate({
  data,
  children,
}: ServiceTemplateProps) {
  return (
    <div className="service-template">
      {/* Header blocks or default header */}
      <div className="service-header">
        {data?.headerBlocks && data.headerBlocks.length > 0 ? (
          <Blocks blocks={ensureValidBlocks(data.headerBlocks)} />
        ) : (
          <div className="bg-bg-contrast overflow-hidden">
            <Section className="flex items-center px-8 py-4 text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-tertiary text-[var(--color-deep-slate)] text-sm font-medium shadow-lg tracking-wide">
                Services
              </span>
              <div className="ml-6">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-bg leading-tight">
                  {data?.title || "Our Services"}
                </h1>
                <p className="text-sm md:text-base text-bg font-medium opacity-90">
                  {data?.description || ""}
                </p>
              </div>
            </Section>
          </div>
        )}
      </div>

      {/* Dynamic blocks from Tina CMS */}
      <Section className="service-content">
        <Blocks blocks={ensureValidBlocks(data?.blocks)} />
      </Section>

      {/* Related services section - static part of the template */}
      <Section className="related-services py-12 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Related Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card
              title="Web Design"
              description="Professional and responsive website design tailored to your brand."
              cta={
                <Link
                  href="/services/web-design"
                  className="text-primary hover:underline text-sm"
                >
                  Learn more
                </Link>
              }
            />
            <Card
              title="Digital Marketing"
              description="Comprehensive digital marketing strategies to grow your online presence."
              cta={
                <Link
                  href="/services/digital-marketing"
                  className="text-primary hover:underline text-sm"
                >
                  Learn more
                </Link>
              }
            />
            <Card
              title="Content Creation"
              description="Engaging content that resonates with your target audience."
              cta={
                <Link
                  href="/services/content-creation"
                  className="text-primary hover:underline text-sm"
                >
                  Learn more
                </Link>
              }
            />
          </div>
        </div>
      </Section>

      {/* Render any children passed to the template */}
      {children && <Section className="template-children">{children}</Section>}
    </div>
  );
}
