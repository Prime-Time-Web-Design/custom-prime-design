import React from "react";

// Eagerly import all template components to prevent flicker
import LandingTemplate from "./LandingTemplate";
import ServiceTemplate from "./ServiceTemplate";
import ContactTemplate from "./ContactTemplate";
import StandardTemplate from "./StandardTemplate";
import PeopleTemplate from "./PeopleTemplate";
import PricingTemplate from "./PricingTemplate";

// Define more specific types for blocks
export interface Block {
  _template: string;
  [key: string]: unknown;
}

// Template props interface with proper typing
export interface TemplateProps {
  data: {
    title?: string;
    description?: string;
    template?: string;
    // headerBlocks property has been removed - all blocks are now in the blocks array
    blocks?: Block[];
    [key: string]: unknown;
  };
  children?: React.ReactNode;
}

// Map of template components (using lazy loaded components)
const TEMPLATE_COMPONENTS = {
  landing: LandingTemplate,
  service: ServiceTemplate,
  contact: ContactTemplate,
  standard: StandardTemplate,
  people: PeopleTemplate,
  pricing: PricingTemplate,
};

// Template selection component
export function Templates({ data, children }: TemplateProps) {
  // Default to standard template if no template is specified
  const templateName = data?.template || "standard";

  // Get the template component from our map
  const TemplateComponent =
    TEMPLATE_COMPONENTS[templateName as keyof typeof TEMPLATE_COMPONENTS] ||
    StandardTemplate;

  // Render the template directly (no Suspense needed)
  return <TemplateComponent data={data}>{children}</TemplateComponent>;
}
