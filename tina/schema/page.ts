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
                  required: true,
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
                  required: true,
                },
                {
                  type: "string",
                  name: "buttonLink",
                  label: "Button Link",
                  required: true,
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
              name: "hero",
              label: "Hero Section",
              fields: [
                {
                  type: "string",
                  name: "heading",
                  label: "Heading",
                  required: true,
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
                  required: true,
                },
                {
                  type: "string",
                  name: "buttonLink",
                  label: "Button Link",
                  required: true,
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
                  required: true,
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
          ],
        },
      ],
      ui: {
        router: ({ document }) => `/pages/${document._sys.filename}`,
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
