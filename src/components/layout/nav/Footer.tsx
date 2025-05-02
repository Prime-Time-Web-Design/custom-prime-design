import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[var(--color-bg-contrast)] text-[var(--color-very-light-gray)]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* All about section */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-lg font-semibold mb-4">All about Tend</h2>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/leadership"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  Leadership
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="/insurance"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  Insurance
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations section */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Locations</h2>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/locations/nyc"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  New York City
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/dc"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  Washington DC Metro
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/atlanta"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  Atlanta
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/boston"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  Boston
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/connecticut"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  Connecticut
                </Link>
              </li>
              <li>
                <Link
                  href="/locations/nashville"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  Nashville
                </Link>
              </li>
            </ul>
          </div>

          {/* Services section */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Services</h2>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  All Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services/exam"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  Dental Exam
                </Link>
              </li>
              <li>
                <Link
                  href="/services/invisalign"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  Invisalign® Aligners
                </Link>
              </li>
              <li>
                <Link
                  href="/services/veneers"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  Veneers
                </Link>
              </li>
              <li>
                <Link
                  href="/services/whitening"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  Whitening
                </Link>
              </li>
              <li>
                <Link
                  href="/services/implants"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  Implants
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Questions?</h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="font-semibold">Call:</span>
                <a
                  href="tel:212-686-3686"
                  className="ml-2 hover:text-[var(--color-calming-blue-light)]"
                >
                  212-686-3686
                </a>
              </li>
              <li className="flex items-center">
                <span className="font-semibold">Text:</span>
                <a
                  href="sms:833-528-0731"
                  className="ml-2 hover:text-[var(--color-calming-blue-light)]"
                >
                  833-528-0731
                </a>
              </li>
              <li>
                <span className="font-semibold block">Email:</span>
                <a
                  href="mailto:hello@hellotend.com"
                  className="hover:text-[var(--color-calming-blue-light)]"
                >
                  hello@hellotend.com
                </a>
              </li>
              <li>
                <span className="font-semibold block mb-2">Social:</span>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    className="hover:text-[var(--color-calming-blue-light)]"
                    aria-label="Facebook"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    className="hover:text-[var(--color-calming-blue-light)]"
                    aria-label="Instagram"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--color-calming-blue-dark)]">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} Prime Time Web Design. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
