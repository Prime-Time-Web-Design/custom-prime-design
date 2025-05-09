import { defineSchema } from "tinacms";

export const pageSchema = defineSchema({
  collections: [
    {
      name: "page",
      label: "Pages",
      path: "content/pages",
      format: "yaml",
      fields: [
        { name: "title", label: "Title", type: "string", required: true },
        {
          name: "description",
          label: "Description",
          type: "string",
          required: true,
          ui: { component: "textarea" },
        },
        { name: "subtitle", label: "Subtitle", type: "string" },

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
              name: "text",
              label: "Rich Text",
              fields: [
                {
                  type: "rich-text",
                  name: "body",
                  label: "Body Content",
                  isBody: true,
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
                    // ——— Fixed Rating Field ———
                    // {
                    //   type: "number",
                    //   name: "rating",
                    //   label: "Rating",
                    //   description: "Client rating from 1–5",
                    //   required: true,
                    //   // native numeric limits:
                    //   min: 1,
                    //   max: 5,
                    //   // top-level validator,
                    //   // Tina calls this with the plain number value
                    //   validate: (value) => {
                    //     if (typeof value !== "number") {
                    //       return "Rating must be a number";
                    //     }
                    //     if (value < 1 || value > 5) {
                    //       return "Rating must be between 1 and 5";
                    //     }
                    //   },
                    // },
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
            // ... other block templates ...
          ],
        },
        // ... other top-level page fields ...
      ],
    },
    // ... other collections ...
  ],
});
