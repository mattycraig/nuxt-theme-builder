import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    learn: defineCollection({
      type: "page",
      source: "learn/**/*.md",
      schema: z.object({
        category: z.enum([
          "theming",
          "components",
          "tailwind",
          "best-practices",
        ]),
        format: z.enum(["guide", "reference", "tip"]).default("guide"),
        date: z.string(),
        tags: z.array(z.string()).optional(),
        description: z.string(),
        image: z.string().optional(),
        order: z.number().default(999),
        featured: z.boolean().default(false),
      }),
    }),
  },
});
