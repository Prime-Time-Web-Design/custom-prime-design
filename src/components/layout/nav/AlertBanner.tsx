"use client";
import React from "react";
import Link from "next/link";
import { MoveRight, X } from "lucide-react";
import { GlobalAlertBanner } from "../../../../tina/__generated__/types";

interface AlertBannerProps {
  alertBanner: GlobalAlertBanner;
}

const AlertBanner: React.FC<AlertBannerProps> = (props: AlertBannerProps) => {
  const [isVisible, setIsVisible] = React.useState(true);
  if (!isVisible) return null;

  const { alertBanner } = props;

  return (
    <div className="relative bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] py-2 px-4 text-white lg:rounded-t-xl shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-screen-xl mx-auto px-2 relative">
        <span className="font-medium text-bg-contrast text-center sm:mb-0 text-sm ">
          {alertBanner?.alertLabel}
        </span>
        <Link
          href={alertBanner?.alertLink ?? ""}
          className="bg-bg-contrast hover:bg-bg-contrast-light text-bg-bg hover:text-shadow-bg-contrast font-medium py-1.5 px-4 rounded-md transition duration-200 text-sm flex items-center gap-2 whitespace-nowrap shadow-sm mb-2 sm:mb-0"
        >
          <div>{alertBanner?.alertLinkText}</div>
          <MoveRight className="h-4 w-4" />
        </Link>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute bottom-1 sm:bottom-auto right-2 sm:right-2 sm:top-1/2 sm:transform sm:-translate-y-1/2 text-bg-contrast hover:text-gray-200 cursor-pointer p-1.5"
        aria-label="Close alert"
      >
        <X className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
};

export default AlertBanner;
