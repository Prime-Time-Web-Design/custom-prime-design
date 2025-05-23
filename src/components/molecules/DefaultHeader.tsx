import { Section } from "../layout/Section";

export default function DefaultHeader() {
  return (
    <div className="relative">
      {/* Background Image */}

      {/* Content Section */}
      <Section className="py-16 text-center px-4 relative z-10 bg-[var(--color-soft-turquoise-dark)]">
        <div className="w-full max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-block px-4 py-2 rounded-full bg-tertiary text-[var(--color-deep-slate)] mb-4 text-sm font-medium">
            Website Optimization Guide
          </div>

          {/* Main heading with cleaner styling */}
          <div className="mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-bg-contrast">
              Transform Your Therapy Website Into A Client-Converting Machine
            </h1>

            {/* Descriptive text */}
            <p className="text-lg text-bg font-medium mb-8 max-w-3xl mx-auto">
              Learn the proven strategies used by successful therapists to
              create engaging websites that build trust and attract ideal
              clients.
            </p>

            {/* Buttons container */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {/* First button - Download Guide */}
              <a
                href="/download-guide"
                className="bg-white text-[var(--color-deep-slate)] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm"
              >
                Download Free Guide
              </a>

              {/* Second button - Schedule Consultation */}
              <a
                href="/consultation"
                className="bg-bg-contrast text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-colors shadow-sm"
              >
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
