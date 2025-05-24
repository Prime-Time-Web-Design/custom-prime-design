import { defineSchema } from "tinacms";

export const postSchema = defineSchema({
  collections: [
    {
      name: "post",
      label: "Posts",
      path: "content/posts",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
          isTitle: true,
          required: true,
        },
        {
          type: "rich-text",
          name: "body",
          label: "Body",
          isBody: true,
        },
      ],
      ui: {
        router: ({ document }) => `/demo/blog/${document._sys.filename}`,
      },
    },
  ],
});
