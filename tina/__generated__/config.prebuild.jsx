// tina/config.ts
import { defineConfig } from "tinacms";

// tina/global.ts
import { defineSchema } from "tinacms";
import * as LucideIcons from "lucide-react";
var lucideIconNames = Object.keys(LucideIcons).filter(
  (name) => name !== "LucideIcon" && name !== "default"
);
var globalSchema = defineSchema({
  collections: [
    {
      name: "global",
      label: "Global",
      path: "content/global",
      format: "yaml",
      fields: [
        {
          type: "object",
          name: "alertBanner",
          label: "Alert Banner",
          fields: [
            {
              type: "string",
              name: "alertLabel",
              label: "Alert Label",
              required: true
            },
            {
              type: "string",
              name: "alertLink",
              label: "Alert Link",
              required: true
            },
            {
              type: "string",
              name: "alertLinkText",
              label: "Alert Link Text",
              required: true
            }
          ]
        },
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
                  required: true
                },
                {
                  type: "string",
                  name: "href",
                  label: "Link",
                  required: false
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
                          required: true
                        },
                        {
                          type: "string",
                          name: "alt",
                          label: "Alt Text",
                          required: true
                        }
                      ]
                    },
                    {
                      type: "string",
                      name: "title",
                      label: "Title",
                      required: true
                    },
                    {
                      type: "string",
                      name: "description",
                      label: "Description",
                      required: true
                    },
                    {
                      type: "string",
                      name: "ctaText",
                      label: "CTA Text",
                      required: true
                    },
                    {
                      type: "string",
                      name: "ctaLink",
                      label: "CTA Link",
                      required: true
                    },
                    {
                      type: "string",
                      name: "layout",
                      label: "Layout",
                      options: ["vertical", "horizontal"],
                      required: false
                    }
                  ]
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
                      required: true
                    },
                    {
                      type: "string",
                      name: "href",
                      label: "Link",
                      required: true
                    },
                    {
                      type: "string",
                      name: "icon",
                      label: "Icon",
                      required: false,
                      options: lucideIconNames
                    },
                    {
                      type: "string",
                      name: "variant",
                      label: "Variant",
                      required: false,
                      options: ["large", "small"]
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
                        }
                      }
                    }
                  ]
                }
              ]
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
                      label: "Phone Number"
                    },
                    {
                      type: "string",
                      name: "textNumber",
                      label: "Text Number"
                    },
                    {
                      type: "string",
                      name: "email",
                      label: "Email Address"
                    }
                  ]
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
                      options: ["facebook", "instagram", "twitter", "linkedin"]
                    },
                    {
                      type: "string",
                      name: "url",
                      label: "URL"
                    }
                  ]
                },
                {
                  type: "string",
                  name: "companyName",
                  label: "Company Name"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});

// tina/page.ts
import { defineSchema as defineSchema2 } from "tinacms";
var pageSchema = defineSchema2({
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
          isTitle: true
        },
        {
          name: "description",
          label: "Description",
          type: "string",
          required: true,
          ui: { component: "textarea" }
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
            { label: "People Listing", value: "people" },
            { label: "Pricing Page", value: "pricing" }
          ],
          description: "Select the template to use for this page",
          required: true
        },
        {
          name: "subtitle",
          label: "Subtitle",
          type: "string"
        },
        {
          name: "peopleType",
          label: "People Type",
          type: "string",
          options: [
            { label: "Team Members", value: "team" },
            { label: "Clients", value: "clients" },
            { label: "Practitioners", value: "practitioners" }
          ],
          description: "The type of people to display on this page",
          ui: {
            // @ts-expect-error - Tina CMS supports this but TypeScript doesn't recognize it
            hidden: ({ values }) => values.template !== "people"
          }
        },
        {
          name: "people",
          label: "People",
          type: "object",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item.name || "Person" }),
            // @ts-expect-error - Tina CMS supports this but TypeScript doesn't recognize it
            hidden: ({ values }) => values.template !== "people"
          },
          fields: [
            {
              name: "id",
              label: "ID",
              type: "string",
              required: true
            },
            {
              name: "name",
              label: "Name",
              type: "string",
              required: true
            },
            {
              name: "title",
              label: "Title / Position",
              type: "string"
            },
            {
              name: "bio",
              label: "Biography",
              type: "string",
              ui: { component: "textarea" }
            },
            {
              name: "image",
              label: "Image",
              type: "object",
              fields: [
                {
                  name: "src",
                  label: "Image Source",
                  type: "image"
                },
                {
                  name: "alt",
                  label: "Alt Text",
                  type: "string"
                }
              ]
            },
            {
              name: "contact",
              label: "Contact Information",
              type: "object",
              fields: [
                {
                  name: "email",
                  label: "Email",
                  type: "string"
                },
                {
                  name: "phone",
                  label: "Phone",
                  type: "string"
                },
                {
                  name: "website",
                  label: "Website",
                  type: "string"
                }
              ]
            },
            {
              name: "social",
              label: "Social Media",
              type: "object",
              fields: [
                {
                  name: "linkedin",
                  label: "LinkedIn URL",
                  type: "string"
                },
                {
                  name: "twitter",
                  label: "Twitter URL",
                  type: "string"
                },
                {
                  name: "instagram",
                  label: "Instagram URL",
                  type: "string"
                },
                {
                  name: "facebook",
                  label: "Facebook URL",
                  type: "string"
                }
              ]
            },
            {
              name: "specialties",
              label: "Specialties",
              type: "string",
              list: true
            },
            {
              name: "location",
              label: "Location",
              type: "string"
            }
          ]
        },
        // We're removing the separate headerBlocks field since it's redundant
        // and causes type conflicts with the headerBlock template in the regular blocks array
        {
          type: "object",
          list: true,
          name: "blocks",
          label: "Page Blocks",
          templates: [
            {
              name: "ctaBlock",
              label: "CTA Block",
              fields: [
                {
                  type: "string",
                  name: "heading",
                  label: "Heading"
                },
                {
                  type: "string",
                  name: "subheading",
                  label: "Subheading"
                },
                {
                  type: "rich-text",
                  name: "content",
                  label: "Content",
                  description: "Text content shown on one side of the CTA block"
                },
                {
                  type: "string",
                  name: "buttonText",
                  label: "Button Text"
                },
                {
                  type: "string",
                  name: "buttonLink",
                  label: "Button Link"
                },
                {
                  type: "boolean",
                  name: "imageLeft",
                  label: "Image on Left Side",
                  description: "Toggle to switch image position between left and right sides",
                  ui: {
                    defaultValue: true
                  }
                },
                {
                  type: "string",
                  name: "mediaType",
                  label: "Media Type",
                  description: "Choose whether to display an image or video",
                  options: [
                    { label: "Image", value: "image" },
                    { label: "Video", value: "video" }
                  ],
                  ui: {
                    defaultValue: "image"
                  }
                },
                {
                  type: "image",
                  name: "imageSrc",
                  label: "Image",
                  description: "Image for the CTA section (if Media Type is image)"
                },
                {
                  type: "string",
                  name: "imageAlt",
                  label: "Image Alt Text",
                  description: "Alternative text for the image"
                },
                {
                  type: "string",
                  name: "videoUrl",
                  label: "Video URL",
                  description: "URL to a video (YouTube, Vimeo, etc.) if Media Type is video"
                },
                {
                  type: "string",
                  name: "cardTitle",
                  label: "Card Title",
                  description: "Title displayed in the media card",
                  ui: {
                    defaultValue: "Prime Therapy Annual Outcomes"
                  }
                },
                {
                  type: "string",
                  name: "cardLinkText",
                  label: "Card Link Text",
                  description: "Text for the link in the media card",
                  ui: {
                    defaultValue: "Report"
                  }
                },
                {
                  type: "string",
                  name: "cardLinkUrl",
                  label: "Card Link URL",
                  description: "URL for the card's link (optional)"
                },
                {
                  type: "string",
                  name: "cardDescription",
                  label: "Card Description",
                  description: "Description text shown in the media card",
                  ui: {
                    component: "textarea",
                    defaultValue: "Read more about our latest clinical research and industry-leading outcomes"
                  }
                },
                {
                  type: "string",
                  name: "backgroundColor",
                  label: "Background Color",
                  description: "CSS class for the background color (e.g., bg-bg-contrast)",
                  ui: {
                    defaultValue: "bg-bg-contrast"
                  }
                }
              ]
            },
            {
              name: "hero",
              label: "Hero Section",
              fields: [
                {
                  type: "string",
                  name: "heading",
                  label: "Heading"
                },
                {
                  type: "string",
                  name: "subheading",
                  label: "Subheading",
                  ui: { component: "textarea" }
                },
                {
                  type: "string",
                  name: "buttonText",
                  label: "Button Text"
                },
                {
                  type: "string",
                  name: "buttonLink",
                  label: "Button Link"
                },
                {
                  type: "object",
                  list: true,
                  name: "collageImages",
                  label: "Collage Images",
                  fields: [
                    {
                      type: "image",
                      name: "src",
                      label: "Image"
                    }
                  ]
                }
              ]
            },
            {
              name: "richTextBlock",
              label: "Rich Text Block",
              fields: [
                {
                  type: "string",
                  name: "heading",
                  label: "Heading"
                },
                { type: "string", name: "subheading", label: "Subheading" },
                {
                  type: "object",
                  name: "features",
                  label: "Features",
                  list: true,
                  ui: {
                    itemProps: (item) => ({ label: item.title || "Feature" })
                  },
                  fields: [
                    {
                      type: "string",
                      name: "icon",
                      label: "Icon",
                      required: false,
                      options: lucideIconNames
                    },
                    {
                      type: "string",
                      name: "title",
                      label: "Title",
                      required: true
                    },
                    {
                      type: "rich-text",
                      name: "description",
                      label: "Description",
                      isBody: true
                    }
                  ]
                }
              ]
            },
            {
              name: "carouselBlock",
              label: "Carousel Block",
              fields: [
                {
                  type: "string",
                  name: "blockTitle",
                  label: "Block Title",
                  description: "Main heading for the testimonials section"
                },
                {
                  type: "string",
                  name: "blockSubtitle",
                  label: "Block Subtitle",
                  ui: { component: "textarea" },
                  description: "Descriptive text below the main heading"
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
                      description: "Profile photo of the client (optional)"
                    },
                    {
                      type: "string",
                      name: "alt",
                      label: "Alt Text",
                      description: "Description of the photo for accessibility"
                    },
                    {
                      type: "string",
                      name: "testimonialText",
                      label: "Testimonial Text",
                      ui: { component: "textarea" },
                      required: true
                    },
                    {
                      type: "string",
                      name: "clientName",
                      label: "Client Name",
                      required: true
                    },
                    {
                      type: "string",
                      name: "clientType",
                      label: "Client Type",
                      description: "Client description, position, or service they received"
                    }
                  ]
                },
                {
                  type: "boolean",
                  name: "options_loop",
                  nameOverride: "options.loop",
                  label: "Loop Slides",
                  description: "Enable infinite looping"
                },
                {
                  type: "number",
                  name: "autoplayInterval",
                  label: "Autoplay Interval (ms)",
                  description: "Time between auto-scroll (leave blank to disable)"
                }
              ]
            },
            {
              name: "serviceListingBlock",
              label: "Service Listing Block",
              fields: [
                {
                  type: "string",
                  name: "title",
                  label: "Block Title",
                  description: "Main heading for the services section",
                  ui: {
                    defaultValue: "We have therapists that specialize in:"
                  }
                },
                {
                  type: "object",
                  list: true,
                  name: "services",
                  label: "Services",
                  ui: {
                    itemProps: (item) => ({ label: item.name || "Service" })
                  },
                  fields: [
                    {
                      type: "string",
                      name: "name",
                      label: "Service Name",
                      required: true
                    },
                    {
                      type: "string",
                      name: "slug",
                      label: "Service Page Link",
                      description: "URL to the service page (e.g., /services/anxiety)",
                      required: true
                    },
                    {
                      type: "rich-text",
                      name: "examples",
                      label: "Examples",
                      description: "Examples of this condition (e.g., Generalized anxiety, social anxiety, panic attacks)"
                    },
                    {
                      type: "rich-text",
                      name: "description",
                      label: "Treatment Description",
                      description: "Description of how you treat this condition"
                    }
                  ]
                },
                {
                  type: "string",
                  name: "ctaText",
                  label: "CTA Button Text",
                  description: "Text for the call-to-action button",
                  ui: {
                    defaultValue: "Find Your Ellie"
                  }
                },
                {
                  type: "string",
                  name: "ctaLink",
                  label: "CTA Button Link",
                  description: "URL for the call-to-action button",
                  ui: {
                    defaultValue: "/locations"
                  }
                },
                {
                  type: "string",
                  name: "ctaContent",
                  label: "CTA Content",
                  description: "Text shown above the CTA button",
                  ui: {
                    component: "textarea",
                    defaultValue: "Don't see what you're looking for? We can help with a wide range of challenges. Find your Ellie location to learn what your local Ellie therapists specialize in and more!"
                  }
                },
                {
                  type: "string",
                  name: "backgroundColor",
                  label: "Background Color",
                  description: "CSS class for background color",
                  ui: {
                    defaultValue: "bg-[var(--color-bg-secondary)]"
                  }
                }
              ]
            },
            {
              name: "bannerBlock",
              label: "Banner Block",
              fields: [
                {
                  type: "string",
                  name: "title",
                  label: "Title",
                  description: "Main title for the banner section"
                },
                {
                  type: "string",
                  name: "subtitle",
                  label: "Subtitle",
                  description: "Optional subtitle text for the banner",
                  required: false
                },
                {
                  type: "object",
                  list: true,
                  name: "benefits",
                  label: "Benefits",
                  ui: {
                    itemProps: (item) => ({ label: item.heading || "Benefit" })
                  },
                  fields: [
                    {
                      type: "string",
                      name: "icon",
                      label: "Icon",
                      required: false,
                      options: lucideIconNames
                    },
                    {
                      type: "string",
                      name: "heading",
                      label: "Benefit Heading",
                      required: true
                    },
                    {
                      type: "string",
                      name: "text",
                      label: "Benefit Text",
                      required: true,
                      ui: { component: "textarea" }
                    },
                    {
                      type: "string",
                      name: "backgroundColor",
                      label: "Background Color",
                      description: "Card background color (e.g. #e6f3f1, rgb(x,y,z), or CSS variable)",
                      required: false
                    },
                    {
                      type: "string",
                      name: "buttonText",
                      label: "Button Text",
                      description: "Optional button text (e.g. 'Learn More')",
                      required: false
                    },
                    {
                      type: "string",
                      name: "buttonLink",
                      label: "Button Link",
                      description: "URL for the button",
                      required: false
                    }
                  ]
                }
              ]
            },
            {
              name: "credentialsBlock",
              label: "Credentials Block",
              fields: [
                {
                  type: "string",
                  name: "heading",
                  label: "Heading",
                  ui: {
                    defaultValue: "Licensed & Experienced"
                  }
                },
                {
                  type: "string",
                  name: "subheading",
                  label: "Subheading",
                  ui: {
                    component: "textarea",
                    defaultValue: "Professional qualifications and expertise you can trust"
                  }
                },
                {
                  type: "object",
                  name: "credentials",
                  label: "Credentials",
                  list: true,
                  ui: {
                    itemProps: (item) => ({ label: item.title || "Credential" })
                  },
                  fields: [
                    {
                      type: "string",
                      name: "icon",
                      label: "Icon",
                      options: lucideIconNames
                    },
                    {
                      type: "string",
                      name: "title",
                      label: "Title",
                      required: true
                    },
                    {
                      type: "string",
                      name: "description",
                      label: "Description",
                      ui: { component: "textarea" }
                    }
                  ]
                },
                {
                  type: "string",
                  name: "backgroundColor",
                  label: "Background Color",
                  ui: {
                    defaultValue: "bg-bg"
                  }
                }
              ]
            },
            {
              name: "newsletterSignupBlock",
              label: "Newsletter Signup Block",
              fields: [
                {
                  type: "string",
                  name: "title",
                  label: "Title",
                  description: "Main heading for the newsletter signup",
                  ui: {
                    defaultValue: "Sign up for our email newsletter"
                  }
                },
                {
                  type: "string",
                  name: "description",
                  label: "Description",
                  description: "Descriptive text about the newsletter",
                  ui: {
                    component: "textarea",
                    defaultValue: "Sign up for free and stay up to date on research advancements, mental health tips, mental health in the news, and expertise on managing mental health."
                  }
                },
                {
                  type: "string",
                  name: "backgroundColor",
                  label: "Background Color",
                  description: "CSS class or color value for the background",
                  ui: {
                    defaultValue: "bg-[#252042]"
                  }
                },
                {
                  type: "string",
                  name: "textColor",
                  label: "Text Color",
                  description: "CSS class or color value for the text",
                  ui: {
                    defaultValue: "text-white"
                  }
                },
                {
                  type: "string",
                  name: "buttonBgColor",
                  label: "Button Background Color",
                  description: "CSS class or color value for the button background",
                  ui: {
                    defaultValue: "bg-[#cd98d8]"
                  }
                },
                {
                  type: "string",
                  name: "buttonTextColor",
                  label: "Button Text Color",
                  description: "CSS class or color value for the button text",
                  ui: {
                    defaultValue: "text-[#252042]"
                  }
                }
              ]
            },
            {
              name: "headerBlock",
              label: "Header Block",
              fields: [
                {
                  type: "string",
                  name: "heading",
                  label: "Heading",
                  description: "Main heading for the header section",
                  ui: {
                    defaultValue: "About Us"
                  }
                },
                {
                  type: "string",
                  name: "tagline",
                  label: "Tagline",
                  description: "A short tagline displayed below the heading",
                  required: false
                },
                {
                  type: "string",
                  name: "subtitle",
                  label: "Subtitle",
                  description: "Descriptive text below the tagline",
                  ui: { component: "textarea" },
                  required: false
                },
                {
                  type: "object",
                  name: "logoImage",
                  label: "Logo Image",
                  fields: [
                    {
                      type: "image",
                      name: "src",
                      label: "Image Source"
                    },
                    {
                      type: "string",
                      name: "alt",
                      label: "Alt Text"
                    }
                  ]
                },
                {
                  type: "string",
                  name: "backgroundColor",
                  label: "Background Color",
                  description: "CSS class for the background (e.g., bg-bg-contrast)",
                  ui: {
                    defaultValue: "bg-bg-contrast"
                  }
                },
                {
                  type: "object",
                  name: "highlightWords",
                  label: "Highlighted Words",
                  list: true,
                  ui: {
                    itemProps: (item) => ({
                      label: item.word || "Highlighted Word"
                    })
                  },
                  fields: [
                    {
                      type: "string",
                      name: "word",
                      label: "Word",
                      description: "Word to highlight in the heading or tagline",
                      required: true
                    },
                    {
                      type: "string",
                      name: "color",
                      label: "Color Scheme",
                      options: [
                        { label: "Primary", value: "primary" },
                        { label: "Secondary", value: "secondary" },
                        { label: "Tertiary", value: "tertiary" },
                        { label: "Accent", value: "accent" }
                      ],
                      required: true,
                      ui: {
                        defaultValue: "primary"
                      }
                    }
                  ]
                },
                {
                  type: "object",
                  name: "features",
                  label: "Feature Highlights",
                  list: true,
                  ui: {
                    itemProps: (item) => ({ label: item.title || "Feature" })
                  },
                  fields: [
                    {
                      type: "string",
                      name: "title",
                      label: "Title",
                      required: true
                    },
                    {
                      type: "rich-text",
                      name: "content",
                      label: "Content"
                    }
                  ]
                }
              ]
            },
            {
              name: "appointmentBookingBlock",
              label: "Appointment Booking Block",
              fields: [
                {
                  type: "string",
                  name: "title",
                  label: "Title",
                  description: "Main heading for the appointment booking section",
                  ui: {
                    defaultValue: "Book Your Appointment"
                  }
                },
                {
                  type: "string",
                  name: "subtitle",
                  label: "Subtitle",
                  description: "Descriptive text below the title",
                  ui: {
                    component: "textarea",
                    defaultValue: "Schedule a consultation with our team"
                  }
                },
                {
                  type: "object",
                  list: true,
                  name: "services",
                  label: "Available Services",
                  ui: {
                    itemProps: (item) => ({ label: item.name || "Service" })
                  },
                  fields: [
                    {
                      type: "string",
                      name: "id",
                      label: "Service ID",
                      description: "Unique identifier for the service",
                      required: true
                    },
                    {
                      type: "string",
                      name: "name",
                      label: "Service Name",
                      required: true
                    },
                    {
                      type: "string",
                      name: "duration",
                      label: "Duration",
                      description: "How long the service takes (e.g., '30 minutes', '1 hour')",
                      required: true
                    },
                    {
                      type: "string",
                      name: "price",
                      label: "Price",
                      description: "Service price (optional, e.g., '$150', 'Contact for pricing')"
                    }
                  ]
                },
                {
                  type: "string",
                  name: "backgroundColor",
                  label: "Background Color",
                  description: "CSS class for the background",
                  ui: {
                    defaultValue: "bg-bg"
                  }
                },
                {
                  type: "string",
                  name: "textColor",
                  label: "Text Color",
                  description: "CSS class for the text color",
                  ui: {
                    defaultValue: "text-text"
                  }
                },
                {
                  type: "string",
                  name: "buttonText",
                  label: "Submit Button Text",
                  ui: {
                    defaultValue: "Book Appointment"
                  }
                },
                {
                  type: "string",
                  list: true,
                  name: "availableDays",
                  label: "Available Days",
                  description: "Days of the week when appointments are available",
                  options: [
                    { label: "Monday", value: "Monday" },
                    { label: "Tuesday", value: "Tuesday" },
                    { label: "Wednesday", value: "Wednesday" },
                    { label: "Thursday", value: "Thursday" },
                    { label: "Friday", value: "Friday" },
                    { label: "Saturday", value: "Saturday" },
                    { label: "Sunday", value: "Sunday" }
                  ],
                  ui: {
                    defaultValue: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday"
                    ]
                  }
                },
                {
                  type: "string",
                  list: true,
                  name: "timeSlots",
                  label: "Available Time Slots",
                  description: "Time slots available for booking",
                  ui: {
                    defaultValue: [
                      "9:00 AM",
                      "10:00 AM",
                      "11:00 AM",
                      "2:00 PM",
                      "3:00 PM",
                      "4:00 PM"
                    ]
                  }
                },
                {
                  type: "boolean",
                  name: "requiresPhone",
                  label: "Require Phone Number",
                  description: "Make phone number a required field",
                  ui: {
                    defaultValue: true
                  }
                },
                {
                  type: "boolean",
                  name: "requiresNotes",
                  label: "Show Notes Field",
                  description: "Display an optional notes/comments field",
                  ui: {
                    defaultValue: false
                  }
                },
                {
                  type: "string",
                  name: "successMessage",
                  label: "Success Message",
                  description: "Message shown after successful appointment submission",
                  ui: {
                    component: "textarea",
                    defaultValue: "Thank you! Your appointment request has been submitted."
                  }
                }
              ]
            },
            {
              name: "pricingBlock",
              label: "Pricing Block",
              fields: [
                {
                  type: "string",
                  name: "heading",
                  label: "Heading",
                  ui: {
                    defaultValue: "Choose Your Plan"
                  }
                },
                {
                  type: "string",
                  name: "subheading",
                  label: "Subheading",
                  ui: {
                    component: "textarea",
                    defaultValue: "Select the perfect plan for your mental health journey"
                  }
                },
                {
                  type: "string",
                  name: "backgroundColor",
                  label: "Background Color",
                  options: [
                    {
                      label: "Default Background",
                      value: "bg-[var(--color-bg)]"
                    },
                    {
                      label: "Light Background",
                      value: "bg-[var(--color-bg-light)]"
                    },
                    {
                      label: "Beige Background",
                      value: "bg-[var(--color-bg-beige)]"
                    },
                    {
                      label: "Contrast Background",
                      value: "bg-[var(--color-bg-contrast)]"
                    }
                  ],
                  ui: {
                    defaultValue: "bg-[var(--color-bg)]"
                  }
                }
              ]
            }
          ]
        }
      ],
      ui: {
        router: ({ document }) => {
          if (document._sys.filename && document._sys.filename.endsWith(".yaml") || /^[a-z0-9-]+$/.test(document._sys.filename)) {
            return `/pages/${document._sys.filename}`;
          }
          return "";
        },
        filename: {
          slugify: (values) => values?.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50) || "untitled"
        }
      }
    }
  ]
});

// tina/config.ts
var localMode = {
  clientId: null,
  token: null,
  branch: "main",
  local: true
};
var productionMode = {
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  branch: "main"
};
var config_default = defineConfig({
  ...process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT === "1" ? localMode : productionMode,
  build: {
    outputFolder: "admin",
    // This will still build the local admin UI
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      ...globalSchema.collections,
      ...pageSchema.collections
      // ...postSchema.collections,
    ]
  }
});
export {
  config_default as default
};
