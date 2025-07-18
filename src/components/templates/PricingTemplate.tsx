import React, { ReactNode } from "react";
import { Blocks } from "../blocks";
import { Section } from "../layout/Section";
import { TemplateProps } from "./index";
import { ensureValidBlocks } from "../../lib/template-utils";

interface PricingTemplateProps extends TemplateProps {
  children?: ReactNode;
}

const PricingTemplate: React.FC<PricingTemplateProps> = ({
  data,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero Section */}
      <Section background="bg-gradient-to-br from-[var(--color-deep-slate)] to-[var(--color-deep-slate-light)]">
        <div className="text-center py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {data.title || "Pricing Plans"}
          </h1>
          {data.description && (
            <p className="text-xl md:text-2xl text-[var(--color-calming-blue-light)] max-w-3xl mx-auto leading-relaxed">
              {String(data.description)}
            </p>
          )}
          {data.subtitle ? (
            <p className="text-lg text-[var(--color-soft-turquoise-light)] mt-4 max-w-2xl mx-auto">
              {String(data.subtitle)}
            </p>
          ) : null}
        </div>
      </Section>

      {/* Content Blocks */}
      {data.blocks && <Blocks blocks={data.blocks as any} />}

      {/* Additional Content */}
      {children && <div>{children}</div>}

      {/* Trust Indicators Section */}
      <Section background="bg-[var(--color-soft-lavender)]">
        <div className="py-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-8">
            Why Choose Our Services?
          </h3>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-4">🏆</div>
              <h4 className="font-semibold text-[var(--color-text)] mb-2">
                Award-Winning Care
              </h4>
              <p className="text-sm text-[var(--color-deep-slate-light)]">
                Recognized for excellence in mental health treatment
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-4">🔒</div>
              <h4 className="font-semibold text-[var(--color-text)] mb-2">
                HIPAA Compliant
              </h4>
              <p className="text-sm text-[var(--color-deep-slate-light)]">
                Your privacy and security are our top priority
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-4">🩺</div>
              <h4 className="font-semibold text-[var(--color-text)] mb-2">
                Licensed Professionals
              </h4>
              <p className="text-sm text-[var(--color-deep-slate-light)]">
                All therapists are licensed and experienced
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-4">📱</div>
              <h4 className="font-semibold text-[var(--color-text)] mb-2">
                24/7 Support
              </h4>
              <p className="text-sm text-[var(--color-deep-slate-light)]">
                Crisis support available whenever you need it
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="bg-[var(--color-bg)]">
        <div className="py-16">
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] text-center mb-12">
            Frequently Asked Questions
          </h3>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-lg border border-[var(--color-accent)] p-6">
              <h4 className="font-semibold text-[var(--color-text)] mb-3">
                Can I switch between plans?
              </h4>
              <p className="text-[var(--color-deep-slate-light)]">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                take effect at the next billing cycle.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-[var(--color-accent)] p-6">
              <h4 className="font-semibold text-[var(--color-text)] mb-3">
                Is there a cancellation fee?
              </h4>
              <p className="text-[var(--color-deep-slate-light)]">
                No, there are no cancellation fees. You can cancel your plan at
                any time with 30 days notice.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-[var(--color-accent)] p-6">
              <h4 className="font-semibold text-[var(--color-text)] mb-3">
                Do you accept insurance?
              </h4>
              <p className="text-[var(--color-deep-slate-light)]">
                We work with most major insurance providers. Contact us to
                verify your coverage and benefits.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-[var(--color-accent)] p-6">
              <h4 className="font-semibold text-[var(--color-text)] mb-3">
                What if I need crisis support?
              </h4>
              <p className="text-[var(--color-deep-slate-light)]">
                All plans include 24/7 crisis support. If you're in immediate
                danger, please call 911 or go to your nearest emergency room.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section background="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
        <div className="py-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-deep-slate)] mb-6">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg text-[var(--color-deep-slate)] mb-8 max-w-2xl mx-auto">
            Take the first step towards better mental health. Our team is here
            to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/appointments"
              className="bg-[var(--color-deep-slate)] hover:bg-[var(--color-deep-slate-light)] text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Schedule Consultation
            </a>
            <a
              href="/contact"
              className="border-2 border-[var(--color-deep-slate)] text-[var(--color-deep-slate)] hover:bg-[var(--color-deep-slate)] hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-200"
            >
              Ask Questions
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PricingTemplate;
