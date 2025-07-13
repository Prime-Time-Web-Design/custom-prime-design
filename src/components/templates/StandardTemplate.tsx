import { ReactNode } from "react";
import { Blocks } from "../blocks";
import { Section } from "../layout/Section";
import { TemplateProps } from "./index";
import { ensureValidBlocks } from "../../lib/template-utils";

interface StandardTemplateProps extends TemplateProps {
  children?: ReactNode;
}

export default function StandardTemplate({
  data,
  children,
}: StandardTemplateProps) {
  return (
    <div className="standard-template">
      {/* Main content blocks section */}
      <Section className="main-content-section">
        <Blocks blocks={ensureValidBlocks(data?.blocks)} />
      </Section>

      {/* Render any children passed to the template */}
      {children && <Section className="template-children">{children}</Section>}
    </div>
  );
}
