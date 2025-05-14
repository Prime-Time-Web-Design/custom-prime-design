import { Section } from "../layout/Section";
import Image from "next/image";

export default function DefaultHeader() {
  return (
    <div className="relative min-h-[80vh]">
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <Image
          src="/optimized/nighttimecontrast.webp"
          alt="Night time contrast background"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-50"
        />
      </div>

      {/* Content Section */}
      <Section className="py-20 text-center px-2 relative z-10 min-h-[80vh] flex items-center">
        <div className="w-full">
          {/* Badge */}
          <div className="inline-block px-4 py-2 rounded-full bg-tertiary text-[var(--color-deep-slate)] mb-6 text-sm font-medium">
            Website Optimization Guide
          </div>

          {/* Main heading with larger font and dark text color */}
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Transform Your Therapy Website Into A Client-Converting Machine
            </h1>

            {/* Descriptive text */}
            <p className="text-xl text-gray-200 mb-10">
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
        </div>
      </Section>
    </div>
  );
}
