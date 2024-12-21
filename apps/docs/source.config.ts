import { defineCollections, metaSchema } from "fumadocs-mdx/config";

export const docs = defineCollections({
  type: "doc",
  dir: "src/content/docs",
});

export const meta = defineCollections({
  type: "meta",
  dir: "src/content/docs",
  schema: metaSchema,
});
