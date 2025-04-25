import { defineConfig } from "tinacms";
import { globalSchema } from "./schema/global";
import { pageSchema } from "./schema/page";
import { postSchema } from "./schema/post";
import homeSchema from "./schema/home";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Your hosting provider
const branch = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      ...globalSchema.collections,
      ...pageSchema.collections,
      ...postSchema.collections,
      ...homeSchema.collections,
    ],
  },
});
