import React from "react";
import { Section } from "../layout/Section";
import { getIconComponent } from "@/lib/utils";

interface Credential {
  icon?: string;
  title: string;
  description?: string;
}

interface CredentialsBlockProps {
  data: {
    heading?: string;
    subheading?: string;
    credentials?: Credential[];
    backgroundColor?: string;
  };
}

export const CredentialsBlock: React.FC<CredentialsBlockProps> = ({ data }) => {
  const { heading, subheading, credentials, backgroundColor = "bg-bg" } = data;

  return (
    <Section className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {heading && (
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-deep-slate)] mb-4">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-lg text-[var(--color-deep-slate)] max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials?.map((credential, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
            >
              {credential.icon && (
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 text-[var(--color-primary)] flex items-center justify-center">
                    {getIconComponent(credential.icon)}
                  </div>
                </div>
              )}
              
              <h3 className="text-lg font-semibold text-[var(--color-deep-slate)] mb-2">
                {credential.title}
              </h3>
              
              {credential.description && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {credential.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CredentialsBlock;