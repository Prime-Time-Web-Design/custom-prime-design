import { defineSchema } from "tinacms";

export default defineSchema({
  collections: [
    {
      label: "Home Page",
      name: "home",
      path: "content/home",
      format: "yaml",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
          required: true,
        },
        {
          type: "string",
          label: "Description",
          name: "description",
          required: true,
          ui: {
            component: "textarea",
          },
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
