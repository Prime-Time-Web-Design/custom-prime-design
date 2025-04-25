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
                  required: true,
                },
                {
                  type: "object",
                  name: "subItems",
                  label: "Sub Items",
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
                      required: true,
                    },
                    {
                      type: "string",
                      name: "icon",
                      label: "Icon",
                      options: lucideIconNames,
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
