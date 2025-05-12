import React from "react";
import LandingTemplate from "./LandingTemplate";
import ServiceTemplate from "./ServiceTemplate";
import ContactTemplate from "./ContactTemplate";
import StandardTemplate from "./StandardTemplate";

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
    headerBlocks?: Block[];
    blocks?: Block[];
    [key: string]: unknown;
  };
  children?: React.ReactNode;
}

// Map of template components (no dynamic imports)
const TEMPLATE_COMPONENTS = {
  landing: LandingTemplate,
  service: ServiceTemplate,
  contact: ContactTemplate,
  standard: StandardTemplate,
};

// Template selection component
export function Templates({ data, children }: TemplateProps) {
  // Default to standard template if no template is specified
  const templateName = data?.template || "standard";

  // Get the template component from our map
  const TemplateComponent =
    TEMPLATE_COMPONENTS[templateName as keyof typeof TEMPLATE_COMPONENTS] ||
    StandardTemplate;

  // Directly render the template without Suspense or lazy loading
  return <TemplateComponent data={data}>{children}</TemplateComponent>;
}
