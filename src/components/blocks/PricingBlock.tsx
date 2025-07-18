"use client";
import React, { useState } from "react";
import { Check, X, Star, Shield, Heart, Zap } from "lucide-react";
import { PageBlocksPricingBlock } from "../../../tina/__generated__/types";

interface PricingBlockProps {
  data: PageBlocksPricingBlock;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
  ctaText: string;
  ctaLink: string;
  icon: React.ReactNode;
}

const insuranceTiers: PricingTier[] = [
  {
    name: "Basic Coverage",
    price: "$89",
    period: "per month",
    description: "Essential mental health coverage for individuals",
    features: [
      "Up to 12 therapy sessions per year",
      "Crisis support hotline 24/7",
      "Basic medication coverage",
      "Mental health screening",
      "Online self-help resources",
      "Emergency care coverage",
    ],
    notIncluded: [
      "Specialized therapy programs",
      "Family therapy sessions",
      "Premium medication coverage",
    ],
    ctaText: "Get Basic Coverage",
    ctaLink: "/insurance/basic",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    name: "Complete Care",
    price: "$159",
    period: "per month",
    description: "Comprehensive mental health coverage for optimal care",
    features: [
      "Unlimited therapy sessions",
      "Crisis support hotline 24/7",
      "Full medication coverage",
      "Specialized therapy programs",
      "Family therapy sessions",
      "Emergency care coverage",
      "Mental health coaching",
      "Telehealth services",
      "Wellness programs",
    ],
    popular: true,
    ctaText: "Get Complete Care",
    ctaLink: "/insurance/complete",
    icon: <Heart className="h-6 w-6" />,
  },
  {
    name: "Premium Plus",
    price: "$229",
    period: "per month",
    description: "Premium coverage with exclusive benefits and priority access",
    features: [
      "Everything in Complete Care",
      "Priority appointment scheduling",
      "Concierge mental health services",
      "Premium specialist access",
      "Alternative therapy coverage",
      "Mental health retreats",
      "Personalized care coordination",
      "Advanced diagnostic tools",
      "Exclusive wellness programs",
    ],
    ctaText: "Get Premium Plus",
    ctaLink: "/insurance/premium",
    icon: <Star className="h-6 w-6" />,
  },
];

const membershipTiers: PricingTier[] = [
  {
    name: "Individual",
    price: "$49",
    period: "per month",
    description: "Perfect for individuals starting their mental health journey",
    features: [
      "2 therapy sessions per month",
      "Online support groups",
      "Mental health resources library",
      "Self-assessment tools",
      "Wellness check-ins",
      "Mobile app access",
    ],
    notIncluded: [
      "Crisis intervention",
      "Family therapy",
      "Medication management",
    ],
    ctaText: "Start Individual Plan",
    ctaLink: "/membership/individual",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    name: "Family",
    price: "$129",
    period: "per month",
    description: "Comprehensive support for the whole family",
    features: [
      "6 therapy sessions per month",
      "Family therapy sessions",
      "Crisis intervention support",
      "Teen and child specialists",
      "Online support groups",
      "Mental health resources library",
      "Medication management",
      "24/7 support chat",
      "Family wellness programs",
    ],
    popular: true,
    ctaText: "Start Family Plan",
    ctaLink: "/membership/family",
    icon: <Heart className="h-6 w-6" />,
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "per month",
    description: "Advanced support for organizations and teams",
    features: [
      "Unlimited therapy sessions",
      "Corporate wellness programs",
      "Team mental health assessments",
      "Executive coaching",
      "Crisis intervention support",
      "On-site consultation",
      "Employee assistance programs",
      "Advanced analytics dashboard",
      "Custom training programs",
      "Dedicated account manager",
    ],
    ctaText: "Contact Sales",
    ctaLink: "/membership/enterprise",
    icon: <Zap className="h-6 w-6" />,
  },
];

export const PricingBlock = ({ data }: PricingBlockProps) => {
  const [activeTab, setActiveTab] = useState<"insurance" | "membership">(
    "insurance"
  );

  const {
    heading = "Choose Your Plan",
    subheading = "Select the perfect plan for your mental health journey",
    backgroundColor = "bg-[var(--color-bg)]",
  } = data;

  const currentTiers =
    activeTab === "insurance" ? insuranceTiers : membershipTiers;

  return (
    <div className={`py-16 ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
            {heading}
          </h2>
          <p className="text-lg text-[var(--color-deep-slate-light)] max-w-2xl mx-auto mb-8">
            {subheading}
          </p>

          {/* Tab Navigation */}
          <div className="inline-flex bg-[var(--color-soft-lavender)] rounded-lg p-1 mb-8">
            <button
              onClick={() => setActiveTab("insurance")}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === "insurance"
                  ? "bg-[var(--color-primary)] text-[var(--color-deep-slate)] shadow-sm"
                  : "text-[var(--color-deep-slate)] hover:text-[var(--color-primary)]"
              }`}
            >
              Insurance Plans
            </button>
            <button
              onClick={() => setActiveTab("membership")}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === "membership"
                  ? "bg-[var(--color-primary)] text-[var(--color-deep-slate)] shadow-sm"
                  : "text-[var(--color-deep-slate)] hover:text-[var(--color-primary)]"
              }`}
            >
              Membership Plans
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {currentTiers.map((tier) => (
            <div
              key={`${activeTab}-${tier.name}`}
              className={`relative rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                tier.popular
                  ? "border-[var(--color-primary)] bg-gradient-to-b from-[var(--color-primary-hover)] to-[var(--color-bg)] scale-105 shadow-lg"
                  : "border-[var(--color-accent)] bg-[var(--color-bg)] hover:border-[var(--color-primary)]"
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[var(--color-secondary)] text-[var(--color-deep-slate)] px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-[var(--color-primary)] rounded-full text-[var(--color-deep-slate)]">
                      {tier.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-text)] mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-[var(--color-deep-slate-light)] mb-4">
                    {tier.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-[var(--color-text)]">
                      {tier.price}
                    </span>
                    <span className="text-[var(--color-deep-slate-light)] ml-2">
                      {tier.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-[var(--color-secondary)] mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-[var(--color-text)]">
                          {feature}
                        </span>
                      </li>
                    ))}
                    {tier.notIncluded?.map((feature, featureIndex) => (
                      <li
                        key={`not-${featureIndex}`}
                        className="flex items-start opacity-50"
                      >
                        <X className="h-5 w-5 text-[var(--color-medium-slate)] mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-[var(--color-text)]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <a
                  href={tier.ctaLink}
                  className={`block w-full text-center py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    tier.popular
                      ? "bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] text-[var(--color-deep-slate)]"
                      : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-deep-slate)]"
                  } shadow-sm hover:shadow-md`}
                >
                  {tier.ctaText}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[var(--color-soft-lavender)] to-[var(--color-tertiary)] rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">
              Need Help Choosing?
            </h3>
            <p className="text-[var(--color-deep-slate-light)] mb-6 max-w-2xl mx-auto">
              Our mental health specialists are here to help you find the
              perfect plan for your needs. Schedule a free consultation to
              discuss your options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/consultation"
                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-deep-slate)] px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Schedule Free Consultation
              </a>
              <a
                href="/contact"
                className="border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-deep-slate)] px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingBlock;
