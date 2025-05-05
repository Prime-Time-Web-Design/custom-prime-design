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
                  name: "featuredCards",
                  label: "Featured Cards",
                  list: true,
                  fields: [
                    {
                      type: "object",
                      name: "image",
                      label: "Image",
                      fields: [
                        {
                          type: "string",
                          name: "src",
                          label: "Image Source",
                          required: true,
                        },
                        {
                          type: "string",
                          name: "alt",
                          label: "Alt Text",
                          required: true,
                        },
                      ],
                    },
                    {
                      type: "string",
                      name: "title",
                      label: "Title",
                      required: true,
                    },
                    {
                      type: "string",
                      name: "description",
                      label: "Description",
                      required: true,
                    },
                    {
                      type: "string",
                      name: "ctaText",
                      label: "CTA Text",
                      required: true,
                    },
                    {
                      type: "string",
                      name: "ctaLink",
                      label: "CTA Link",
                      required: true,
                    },
                    {
                      type: "string",
                      name: "layout",
                      label: "Layout",
                      options: ["vertical", "horizontal"],
                      required: false,
                    },
                  ],
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
            {
              type: "object",
              name: "footer",
              label: "Footer Settings",
              fields: [
                {
                  type: "object",
                  name: "contact",
                  label: "Contact Information",
                  fields: [
                    {
                      type: "string",
                      name: "phone",
                      label: "Phone Number",
                    },
                    {
                      type: "string",
                      name: "textNumber",
                      label: "Text Number",
                    },
                    {
                      type: "string",
                      name: "email",
                      label: "Email Address",
                    },
                  ],
                },
                {
                  type: "object",
                  name: "social",
                  label: "Social Media",
                  list: true,
                  fields: [
                    {
                      type: "string",
                      name: "platform",
                      label: "Platform",
                      options: ["facebook", "instagram", "twitter", "linkedin"],
                    },
                    {
                      type: "string",
                      name: "url",
                      label: "URL",
                    },
                  ],
                },
                {
                  type: "string",
                  name: "companyName",
                  label: "Company Name",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
