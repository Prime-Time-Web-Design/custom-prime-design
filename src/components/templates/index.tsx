import React, { lazy, Suspense } from "react";

// Lazy load all template components
const LandingTemplate = lazy(() => import("./LandingTemplate"));
const ServiceTemplate = lazy(() => import("./ServiceTemplate"));
const ContactTemplate = lazy(() => import("./ContactTemplate"));
const StandardTemplate = lazy(() => import("./StandardTemplate"));

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

// Map of template components (using lazy loaded components)
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

  // Render the template with Suspense for lazy loading
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-gray-50 animate-pulse"></div>}
    >
      <TemplateComponent data={data}>{children}</TemplateComponent>
    </Suspense>
  );
}
