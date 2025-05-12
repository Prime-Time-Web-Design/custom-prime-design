import { ReactNode } from "react";
import { Blocks } from "../blocks";
import { Section } from "../layout/Section";
import { TemplateProps } from "./index";
import { ensureValidBlocks } from "../../lib/template-utils";

interface ContactTemplateProps extends TemplateProps {
  children?: ReactNode;
}

export default function ContactTemplate({
  data,
  children,
}: ContactTemplateProps) {
  return (
    <div className="contact-template">
      {/* Header section with header blocks or default */}
      <div className="contact-header bg-teal-600 text-white">
        {data?.headerBlocks && data.headerBlocks.length > 0 ? (
          <Blocks blocks={ensureValidBlocks(data.headerBlocks)} />
        ) : (
          <Section className="py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">
              {data?.title || "Contact Us"}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {data?.description ||
                "We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
            </p>
          </Section>
        )}
      </div>

      {/* Contact information and form - static part of the template */}
      <Section className="contact-info-section py-16">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Contact information */}
            <div className="md:w-1/3">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p>
                    123 Main Street, Suite 100
                    <br />
                    San Francisco, CA 94103
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p>
                    <a
                      href="mailto:hello@example.com"
                      className="text-blue-600 hover:underline"
                    >
                      hello@example.com
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p>
                    <a
                      href="tel:+14155552671"
                      className="text-blue-600 hover:underline"
                    >
                      (415) 555-2671
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Hours</h3>
                  <p>
                    Monday - Friday: 9am - 5pm
                    <br />
                    Saturday & Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Subject of your message"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* Dynamic blocks from Tina CMS */}
      <Section className="contact-content">
        <Blocks blocks={ensureValidBlocks(data?.blocks)} />
      </Section>

      {/* Map section - static part of the template */}
      <Section className="map-section py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Find Us</h2>
          <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            {/* Map placeholder - would be replaced with an actual map component */}
            <p className="text-gray-600">Interactive Map Goes Here</p>
          </div>
        </div>
      </Section>

      {/* Render any children passed to the template */}
      {children && <Section className="template-children">{children}</Section>}
    </div>
  );
}
