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
          name: "subtitle",
          label: "Subtitle",
          type: "string",
        },
      ],
    },
  ],
});
