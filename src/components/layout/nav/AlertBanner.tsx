import React from "react";
import Link from "next/link";
import { ArrowBigRight } from "lucide-react";

const AlertBanner: React.FC = () => (
  <>
    <Link href="#" className="font-semibold text-[var(--color-text)]">
      <div className=" bg-[var(--color-secondary-hover)] cursor-pointer hover:bg-[var(--color-secondary)] transition duration-200 py-2 text-sm text-[var(--color-text)] flex items-center justify-center rounded-t-2xl">
        <div className="flex items-center justify-center">
          Most insured members have a $0 copay.
          <div className="ml-4">Learn More</div>
          <ArrowBigRight className="inline h-4 w-4" />
        </div>
      </div>
    </Link>
  </>
);

export default AlertBanner;
