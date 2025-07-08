import React from "react";
import { Blocks } from "../blocks";
import { Section } from "../layout/Section";
import { TemplateProps } from "./index";
import { ensureValidBlocks } from "../../lib/template-utils";
import PeopleListingBlock from "../blocks/PeopleListingBlock";

interface PeopleTemplateProps extends TemplateProps {
  children?: React.ReactNode;
}

export default function PeopleTemplate({
  data,
  children,
}: PeopleTemplateProps) {
  // Extract people data from template data and ensure it's in the correct format
  const rawPeopleData = Array.isArray(data?.people) ? data.people : [];

  // Transform the data to ensure it matches the expected format
  const peopleData = rawPeopleData.map((person) => ({
    id: person?.id || `person-${Math.random().toString(36).substr(2, 9)}`,
    name: person?.name || "Unknown Name",
    title: person?.title || "",
    bio: person?.bio || "",
    image: person?.image || { src: "", alt: "" },
    contact: person?.contact || {},
    social: person?.social || {},
    specialties: Array.isArray(person?.specialties) ? person.specialties : [],
    location: person?.location || "",
  }));

  const title = data?.title || "Our Team";
  const description =
    data?.description || "Meet the people behind our organization";

  const peopleType =
    data?.peopleType === "practitioners" ||
    data?.peopleType === "clients" ||
    data?.peopleType === "team"
      ? data.peopleType
      : "practitioners";

  console.log("headerBlocks", data?.headerBlocks);

  return (
    <div className="people-template">
      {/* Header section with header blocks or default */}
      <div className="people-header bg-gradient-to-r from-bg-contrast to-bg-contrast-light text-white">
        <Section className="py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl max-w-3xl mx-auto">{description}</p>
        </Section>
      </div>

      {/* People listing section */}
      <Section className="py-16 bg-[var(--color-bg)]">
        <PeopleListingBlock people={peopleData} peopleType={peopleType} />
      </Section>

      {/* Dynamic blocks from Tina CMS */}
      <Section className="people-content">
        <Blocks blocks={ensureValidBlocks(data?.blocks)} />
      </Section>

      {/* Render any children passed to the template */}
      {children && <Section className="template-children">{children}</Section>}
    </div>
  );
}
