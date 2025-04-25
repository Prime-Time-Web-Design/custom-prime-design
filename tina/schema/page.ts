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
        },
        {
          name: "description",
          label: "Description",
          type: "string",
          required: true,
          ui: {
            component: "textarea",
          },
        },
        {
          name: "subtitle",
          label: "Subtitle",
          type: "string",
        },
        {
          type: "object",
          label: "Hero Section",
          name: "hero",
          fields: [
            {
              type: "string",
              label: "Heading",
              name: "heading",
              required: true,
            },
            {
              type: "string",
              label: "Subheading",
              name: "subheading",
              required: true,
              ui: {
                component: "textarea",
              },
            },
            {
              type: "string",
              label: "Button Text",
              name: "buttonText",
              required: true,
            },
            {
              type: "string",
              label: "Button Link",
              name: "buttonLink",
              required: true,
            },
          ],
        },
      ],
    },
  ],
});
