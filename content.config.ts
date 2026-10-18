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
        /** Last substantive edit (YYYY-MM-DD). Feeds dateModified and the sitemap lastmod. */
        updated: z.string().optional(),
        tags: z.array(z.string()).optional(),
        description: z.string(),
        image: z.string().optional(),
        order: z.number().default(999),
        featured: z.boolean().default(false),
      }),
    }),
    // One entry per user-facing feature on /whats-new, newest first by file
    // name (YYYY-MM-DD-slug.md).
    changelog: defineCollection({
      type: "page",
      source: "changelog/*.md",
      schema: z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        description: z.string(),
        badge: z.enum(["new", "improved", "fixed"]),
        image: z
          .object({
            src: z.string(),
            alt: z.string(),
          })
          .optional(),
        links: z
          .array(
            z.object({
              label: z.string(),
              to: z.string(),
              icon: z.string().optional(),
            }),
          )
          .optional(),
      }),
    }),
  },
});
