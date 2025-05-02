import { defineSchema } from "tinacms";
import * as LucideIcons from "lucide-react";

// Get all Lucide icon names
const lucideIconNames = Object.keys(LucideIcons).filter(
  (name) => name !== "LucideIcon" && name !== "default"
);

export const globalSchema = defineSchema({
  collections: [
    {
      name: "global",
      label: "Global",
      path: "content/global",
      format: "yaml",
      fields: [
        {
          type: "object",
          name: "navigation",
          label: "Navigation",
          fields: [
            {
              type: "object",
              name: "mainNav",
              label: "Main Navigation",
              list: true,
              fields: [
                {
                  type: "string",
                  name: "label",
                  label: "Label",
                  required: true,
                },
                {
                  type: "string",
                  name: "href",
                  label: "Link",
                  required: false,
                },
                {
                  type: "object",
                  name: "subItems",
                  label: "Sub Items",
                  list: true,
                  required: false,
                  fields: [
                    {
                      type: "string",
                      name: "label",
                      label: "Label",
                      required: true,
                    },
                    {
                      type: "string",
                      name: "href",
                      label: "Link",
                      required: true,
                    },
                    {
                      type: "string",
                      name: "icon",
                      label: "Icon",
                      required: false,
                      options: lucideIconNames,
                    },
                    {
                      type: "string",
                      name: "variant",
                      label: "Variant",
                      required: false,
                      options: ["large", "small"],
                    },
                    {
                      type: "string",
                      name: "description",
                      label: "Description",
                      required: false,
                      ui: {
                        validate: (value) => {
                          if (value && value.length > 80) {
                            return "Description must be 80 characters or less";
                          }
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
