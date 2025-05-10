import React from "react";
import Link from "next/link";
import { MoveRight, X } from "lucide-react";

const AlertBanner: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] py-2 px-4 text-sm text-white lg:rounded-t-2xl">
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-screen-xl mx-auto">
        <span className="font-medium">
          7 Critical Website Mistakes Costing You Therapy Clients
        </span>
        <Link
          href="#"
          className="bg-bg-contrast hover:bg- text-bg-bg hover:text-shadow-bg-contrast font-medium py-1 px-3 rounded-md transition duration-200 text-sm"
        >
          <div className="flex items-center gap-2">
            <div>Learn More</div>
            <div>
              <MoveRight className="h-4 w-4" />
            </div>
          </div>
        </Link>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-bg-contrast hover:text-gray-200 cursor-pointer"
        aria-label="Close alert"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default AlertBanner;
