import { defineConfig } from "tinacms";
import { globalSchema } from "./schema/global";
import { pageSchema } from "./schema/page";
import { postSchema } from "./schema/post";

// Your local configs
const localMode = {
  clientId: null,
  token: null,
  branch: "main",
  local: true,
};

// Your production configs
const productionMode = {
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  branch: "main",
};

export default defineConfig({
  ...(process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT === "1"
    ? localMode
    : productionMode),

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
