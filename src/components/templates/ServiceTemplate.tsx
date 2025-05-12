import { ReactNode } from "react";
import { Blocks } from "../blocks";
import { Section } from "../layout/Section";
import { TemplateProps } from "./index";
import Card from "../molecules/Card";
import Image from "next/image";
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
      <div className="service-header bg-indigo-700 text-white">
        {data?.headerBlocks && data.headerBlocks.length > 0 ? (
          <Blocks blocks={ensureValidBlocks(data.headerBlocks)} />
        ) : (
          <Section className="py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">
              {data?.title || "Our Services"}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {data?.description || ""}
            </p>
          </Section>
        )}
      </div>

      {/* Service overview section - static part of the template */}
      <Section className="service-overview py-12 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">How We Can Help</h2>
              <p className="text-lg mb-6">
                Our team of experts is dedicated to delivering high-quality
                services tailored to your specific needs and goals.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personalized approach for each client</li>
                <li>Transparent communication throughout the process</li>
                <li>Ongoing support and maintenance</li>
                <li>Results-driven strategies</li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/featuredCardImage.png"
                alt="Our Service Process"
                className="rounded-lg shadow-lg"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </Section>

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
                  className="text-blue-600 hover:underline text-sm"
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
                  className="text-blue-600 hover:underline text-sm"
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
                  className="text-blue-600 hover:underline text-sm"
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
