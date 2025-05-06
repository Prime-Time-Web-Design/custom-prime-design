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
          list: true, // ← important
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
            // …more block templates as you need
          ],
        },
      ],
    },
  ],
});
