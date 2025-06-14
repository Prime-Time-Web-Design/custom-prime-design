"use client";
import { useState } from "react";
import Link from "next/link";
import { MoveRight, X } from "lucide-react";
import { GlobalAlertBanner } from "../../../../tina/__generated__/types";

interface AlertBannerProps {
  alertBanner: GlobalAlertBanner;
}

const AlertBanner: React.FC<AlertBannerProps> = (props) => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  const { alertBanner } = props;

  return (
    <div
      className={`relative bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] py-2 px-4 text-white transition-all duration-300 shadow-sm`}
    >
      <div className="flex sm:items-center sm:justify-center gap-2 max-w-screen-xl mx-auto px-2 relative">
        <span className="font-medium text-bg-contrast sm:text-center sm:mb-0 text-sm sm:max-w-full">
          {alertBanner?.alertLabel}
        </span>
        <Link
          href={alertBanner?.alertLink ?? ""}
          className="bg-bg-contrast hover:bg-bg-contrast-light text-bg hover:text-shadow-bg-contrast sm:py-1 font-medium max-h-8 sm:max-h-none px-3 rounded-md transition duration-200 text-xs sm:text-sm flex items-center gap-3 whitespace-nowrap shadow-sm mr-2"
        >
          <div>{alertBanner?.alertLinkText}</div>
          <MoveRight className="h-4 w-4" />
        </Link>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1/2 right-0 -translate-y-1/2 text-bg-contrast hover:text-gray-200 cursor-pointer p-1"
        aria-label="Close alert"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default AlertBanner;
