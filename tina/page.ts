import { defineSchema } from "tinacms";

export const pageSchema = defineSchema({
  collections: [
    {
      name: "page",
      label: "Pages",
      path: "content/pages",
      format: "yaml",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
          required: true,
          isTitle: true,
        },
        {
          name: "description",
          label: "Description",
          type: "string",
          required: true,
          ui: { component: "textarea" },
        },
        {
          name: "template",
          label: "Page Template",
          type: "string",
          options: [
            { label: "Standard Page", value: "standard" },
            { label: "Landing Page", value: "landing" },
            { label: "Service Page", value: "service" },
            { label: "Contact Page", value: "contact" },
            { label: "People Listing", value: "people" },
          ],
          description: "Select the template to use for this page",
          required: true,
        },
        {
          name: "subtitle",
          label: "Subtitle",
          type: "string",
        },
        {
          name: "peopleType",
          label: "People Type",
          type: "string",
          options: [
            { label: "Team Members", value: "team" },
            { label: "Clients", value: "clients" },
            { label: "Practitioners", value: "practitioners" },
          ],
          description: "The type of people to display on this page",
          ui: {
            // @ts-expect-error - Tina CMS supports this but TypeScript doesn't recognize it
            hidden: ({ values }) => values.template !== "people",
          },
        },
        {
          name: "people",
          label: "People",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item.name || "Person" }),
            // @ts-expect-error - Tina CMS supports this but TypeScript doesn't recognize it
            hidden: ({ values }) => values.template !== "people",
          },
          fields: [
            {
              name: "id",
              label: "ID",
              type: "string",
              required: true,
            },
            {
              name: "name",
              label: "Name",
              type: "string",
              required: true,
            },
            {
              name: "title",
              label: "Title / Position",
              type: "string",
            },
            {
              name: "bio",
              label: "Biography",
              type: "string",
              ui: { component: "textarea" },
            },
            {
              name: "image",
              label: "Image",
              type: "object",
              fields: [
                {
                  name: "src",
                  label: "Image Source",
                  type: "image",
                },
                {
                  name: "alt",
                  label: "Alt Text",
                  type: "string",
                },
              ],
            },
            {
              name: "contact",
              label: "Contact Information",
              type: "object",
              fields: [
                {
                  name: "email",
                  label: "Email",
                  type: "string",
                },
                {
                  name: "phone",
                  label: "Phone",
                  type: "string",
                },
                {
                  name: "website",
                  label: "Website",
                  type: "string",
                },
              ],
            },
            {
              name: "social",
              label: "Social Media",
              type: "object",
              fields: [
                {
                  name: "linkedin",
                  label: "LinkedIn URL",
                  type: "string",
                },
                {
                  name: "twitter",
                  label: "Twitter URL",
                  type: "string",
                },
                {
                  name: "instagram",
                  label: "Instagram URL",
                  type: "string",
                },
                {
                  name: "facebook",
                  label: "Facebook URL",
                  type: "string",
                },
              ],
            },
            {
              name: "specialties",
              label: "Specialties",
              type: "string",
              list: true,
            },
            {
              name: "location",
              label: "Location",
              type: "string",
            },
          ],
        },
        {
          name: "headerBlocks",
          label: "Header Section Blocks",
          type: "object",
          list: true,
          templates: [
            {
              name: "hero",
              label: "Hero Section",
              fields: [
                {
                  type: "string",
                  name: "heading",
                  label: "Heading",
                },
                {
                  type: "string",
                  name: "subheading",
                  label: "Subheading",
                  ui: { component: "textarea" },
                },
                {
                  type: "string",
                  name: "buttonText",
                  label: "Button Text",
                },
                {
                  type: "string",
                  name: "buttonLink",
                  label: "Button Link",
                },
              ],
            },
          ],
        },
        {
          type: "object",
          list: true,
          name: "blocks",
          label: "Page Blocks",
          templates: [
            {
              name: "ctaBlock",
              label: "CTA Block",
              fields: [
                {
                  type: "string",
                  name: "heading",
                  label: "Heading",
                },
                {
                  type: "string",
                  name: "subheading",
                  label: "Subheading",
                },
                {
                  type: "rich-text",
                  name: "content",
                  label: "Content",
                  description:
                    "Text content shown on one side of the CTA block",
                },
                {
                  type: "string",
                  name: "buttonText",
                  label: "Button Text",
                },
                {
                  type: "string",
                  name: "buttonLink",
                  label: "Button Link",
                },
                {
                  type: "boolean",
                  name: "imageLeft",
                  label: "Image on Left Side",
                  description:
                    "Toggle to switch image position between left and right sides",
                  ui: {
                    defaultValue: true,
                  },
                },
                {
                  type: "image",
                  name: "imageSrc",
                  label: "Image",
                  description: "Image for the CTA section (optional)",
                },
                {
                  type: "string",
                  name: "imageAlt",
                  label: "Image Alt Text",
                  description: "Alternative text for the image",
                },
                {
                  type: "string",
                  name: "backgroundColor",
                  label: "Background Color",
                  description:
                    "CSS class for the background color (e.g., bg-bg-contrast)",
                  ui: {
                    defaultValue: "bg-bg-contrast",
                  },
                },
              ],
            },
            {
              name: "hero",
              label: "Hero Section",
              fields: [
                {
                  type: "string",
                  name: "heading",
                  label: "Heading",
                },
                {
                  type: "string",
                  name: "subheading",
                  label: "Subheading",
                  ui: { component: "textarea" },
                },
                {
                  type: "string",
                  name: "buttonText",
                  label: "Button Text",
                },
                {
                  type: "string",
                  name: "buttonLink",
                  label: "Button Link",
                },
                {
                  type: "image",
                  name: "src",
                  label: "Hero Image",
                  description: "Image for the hero section (optional)",
                },
              ],
            },
            {
              name: "richTextBlock",
              label: "Rich Text Block",
              fields: [
                {
                  type: "string",
                  name: "heading",
                  label: "Heading",
                },
                { type: "string", name: "subheading", label: "Subheading" },
                {
                  type: "object",
                  name: "features",
                  label: "Features",
                  list: true,
                  ui: {
                    itemProps: (item) => ({ label: item.title || "Feature" }),
                  },
                  fields: [
                    {
                      type: "image",
                      name: "src",
                      label: "illustration",
                      description: "Image for the feature (optional)",
                    },
                    { type: "string", name: "title", label: "Title" },
                    {
                      type: "rich-text",
                      name: "description",
                      label: "Description",
                      isBody: true,
                    },
                  ],
                },
              ],
            },
            {
              name: "carouselBlock",
              label: "Carousel Block",
              fields: [
                {
                  type: "string",
                  name: "blockTitle",
                  label: "Block Title",
                  description: "Main heading for the testimonials section",
                },
                {
                  type: "string",
                  name: "blockSubtitle",
                  label: "Block Subtitle",
                  ui: { component: "textarea" },
                  description: "Descriptive text below the main heading",
                },
                {
                  type: "object",
                  list: true,
                  name: "slides",
                  label: "Testimonial Slides",
                  fields: [
                    {
                      type: "image",
                      name: "src",
                      label: "Client Photo",
                      description: "Profile photo of the client (optional)",
                    },
                    {
                      type: "string",
                      name: "alt",
                      label: "Alt Text",
                      description: "Description of the photo for accessibility",
                    },
                    {
                      type: "string",
                      name: "testimonialText",
                      label: "Testimonial Text",
                      ui: { component: "textarea" },
                      required: true,
                    },
                    {
                      type: "string",
                      name: "clientName",
                      label: "Client Name",
                      required: true,
                    },
                    {
                      type: "string",
                      name: "clientType",
                      label: "Client Type",
                      description:
                        "Client description, position, or service they received",
                    },
                  ],
                },
                {
                  type: "boolean",
                  name: "options_loop",
                  nameOverride: "options.loop",
                  label: "Loop Slides",
                  description: "Enable infinite looping",
                },
                {
                  type: "number",
                  name: "autoplayInterval",
                  label: "Autoplay Interval (ms)",
                  description:
                    "Time between auto-scroll (leave blank to disable)",
                },
              ],
            },
            {
              name: "serviceListingBlock",
              label: "Service Listing Block",
              fields: [
                {
                  type: "string",
                  name: "title",
                  label: "Block Title",
                  description: "Main heading for the services section",
                  ui: {
                    defaultValue: "We have therapists that specialize in:",
                  },
                },
                {
                  type: "object",
                  list: true,
                  name: "services",
                  label: "Services",
                  ui: {
                    itemProps: (item) => ({ label: item.name || "Service" }),
                  },
                  fields: [
                    {
                      type: "string",
                      name: "name",
                      label: "Service Name",
                      required: true,
                    },
                    {
                      type: "string",
                      name: "slug",
                      label: "Service Page Link",
                      description:
                        "URL to the service page (e.g., /services/anxiety)",
                      required: true,
                    },
                  ],
                },
                {
                  type: "string",
                  name: "ctaText",
                  label: "CTA Button Text",
                  description: "Text for the call-to-action button",
                  ui: {
                    defaultValue: "Find Your Ellie",
                  },
                },
                {
                  type: "string",
                  name: "ctaLink",
                  label: "CTA Button Link",
                  description: "URL for the call-to-action button",
                  ui: {
                    defaultValue: "/locations",
                  },
                },
                {
                  type: "string",
                  name: "ctaContent",
                  label: "CTA Content",
                  description: "Text shown above the CTA button",
                  ui: {
                    component: "textarea",
                    defaultValue:
                      "Don't see what you're looking for? We can help with a wide range of challenges. Find your Ellie location to learn what your local Ellie therapists specialize in and more!",
                  },
                },
                {
                  type: "string",
                  name: "backgroundColor",
                  label: "Background Color",
                  description: "CSS class for background color",
                  ui: {
                    defaultValue: "bg-[var(--color-bg-secondary)]",
                  },
                },
              ],
            },
          ],
        },
      ],
      ui: {
        router: ({ document }) => {
          // Check if the filename is a valid YAML file before generating a route
          if (
            (document._sys.filename &&
              document._sys.filename.endsWith(".yaml")) ||
            /^[a-z0-9-]+$/.test(document._sys.filename)
          ) {
            return `/pages/${document._sys.filename}`;
          }
          // Skip URL generation for non-YAML files or invalid filenames
          return "";
        },
        filename: {
          slugify: (values) =>
            values?.title
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, "-") // kebab-case
              .replace(/^-+|-+$/g, "") // trim hyphens
              .slice(0, 50) || "untitled",
        },
      },
    },
  ],
});
