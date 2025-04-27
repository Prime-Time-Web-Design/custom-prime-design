import { defineConfig } from "tinacms";
import { globalSchema } from "./schema/global";
import { pageSchema } from "./schema/page";
import { postSchema } from "./schema/post";
import * as dotenv from "dotenv";

// Only load environment variables in non-browser environments
if (typeof window === "undefined") {
  dotenv.config({ path: ".env.local" });
}

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || "main",

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin", // This will still build the local admin UI
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
    ],
  },
});
