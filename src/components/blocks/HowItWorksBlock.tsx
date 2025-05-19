import React from "react";
import { PageBlocksRichTextBlock } from "../../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Section } from "../layout/Section";
import Image from "next/image";
import { normalizeSrc } from "@/lib/utils";

interface HowItWorksBlockProps {
  data: PageBlocksRichTextBlock;
}

export const HowItWorksBlock: React.FC<HowItWorksBlockProps> = ({ data }) => {
  const { heading, subheading, features } = data;

  if (!features || features.length === 0) {
    return (
      <div className="py-12 px-4 text-center text-gray-500">
        No steps configured. Please add features to display the process.
      </div>
    );
  }

  return (
    <Section className="py-16 bg-bg-contrast">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-accent-hover">
          {heading || "How It Works"}
        </h2>
        {subheading && (
          <p className="text-lg text-center max-w-3xl mx-auto mb-10 text-accent">
            {subheading}
          </p>
        )}

        {/* Main content with phone on the right */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
          {/* Left side: Steps in card format */}
          <div className="w-full lg:w-1/2 space-y-8">
            {features.map((step, idx) => (
              <div
                key={idx}
                className="flex p-6 bg-[var(--color-very-light-gray)] rounded-2xl border-l-4 border-[var(--color-primary)] shadow-sm hover:shadow transition-shadow"
              >
                {/* Step number */}
                <div className="mr-6">
                  {/* <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full border border-[var(--color-primary)] text-5xl font-playfair text-[var(--color-primary)] font-bold">
                    {idx + 1}
                  </div> */}

                  <div className="h-[140px] w-[140px] flex items-center justify-center bg-primary-hover rounded-full overflow-hidden">
                    <div className="flex items-center justify-center h-[120px] w-[120px]">
                      <Image
                        alt={step?.title || "Illustration"}
                        src={normalizeSrc(step?.src ?? "")}
                        height={70}
                        width={70}
                        className="object-contain"
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Step content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-[var(--color-deep-slate)]">
                    {step?.title}
                  </h3>
                  <div className="prose prose-sm text-[var(--color-medium-slate)]">
                    <TinaMarkdown content={step?.description} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side: Phone mockup */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative max-w-xs w-full">
              <div className="rounded-[40px] bg-[var(--color-soft-lavender-light)] p-4 shadow-xl border-4 border-[var(--color-soft-lavender)] overflow-hidden">
                {/* Phone header */}
                <div className="flex justify-between items-center mb-4 px-2">
                  <div className="text-sm font-medium text-[var(--color-deep-slate)]">
                    9:41
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-[var(--color-deep-slate)]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5z" />
                      <path d="M8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7z" />
                      <path d="M14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-[var(--color-deep-slate)]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Back button */}
                <div className="pb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[var(--color-primary)]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="text-center flex-grow text-[var(--color-primary)] font-medium text-lg">
                    Talkspace
                  </div>
                </div>

                {/* App content */}
                <div className="bg-white rounded-xl p-4 mb-4">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-xl overflow-hidden bg-[var(--color-primary)] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-center mb-2 text-[var(--color-deep-slate)]">
                    You&apos;re covered by your health insurance!
                  </h4>
                  <ul className="text-xs space-y-2 text-[var(--color-deep-slate)]">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[var(--color-secondary)] mr-1 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>A therapist matched to your needs</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[var(--color-secondary)] mr-1 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Unlimited sessions</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[var(--color-secondary)] mr-1 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Video and messaging available</span>
                    </li>
                  </ul>
                  <p className="text-xs text-[var(--color-medium-slate)] my-4">
                    *Your final costs may vary based on your benefits
                  </p>
                  <div className="text-center mb-2">
                    <p className="text-sm font-bold text-[var(--color-deep-slate)]">
                      $33 copay per session*
                    </p>
                  </div>
                  <button className="w-full bg-[var(--color-primary)] text-white py-2 rounded-lg font-medium hover:bg-[var(--color-primary-hover)] transition-colors">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HowItWorksBlock;
