import { ALL_DYNAMIC_ROUTES } from "~~/shared/constants/routes";

/**
 * Provides all dynamic route URLs to @nuxtjs/sitemap.
 *
 * Static pages (templates, tools, top-level) are discovered automatically
 * from the pages/ directory. Dynamic routes using [slug] or [...slug]
 * patterns need explicit URL lists since the sitemap module cannot
 * resolve which slug values exist at build time.
 */
export default defineEventHandler(() => {
  return ALL_DYNAMIC_ROUTES.map((loc) => ({
    loc,
    changefreq: "weekly",
    priority: 0.7,
  }));
});
