import {
  INDEXABLE_DYNAMIC_ROUTES,
  LEARN_ROUTES,
} from "~~/shared/constants/routes";

const learnRoutes = new Set<string>(LEARN_ROUTES);

/**
 * Last-modified date per learn route, from each article's `updated` (or
 * `date`) frontmatter. Articles are bundled as server assets (see
 * `nitro.serverAssets` in nuxt.config.ts) because the Nuxt Content database
 * isn't available in the serverless runtime.
 */
async function learnLastmod(): Promise<Map<string, string>> {
  const storage = useStorage("assets:learn");
  const lastmod = new Map<string, string>();
  for (const key of await storage.getKeys()) {
    if (!key.endsWith(".md")) continue;
    const raw = await storage.getItemRaw(key);
    const source = raw ? String(raw) : "";
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
    const field = (name: string) =>
      frontmatter
        .match(new RegExp(`^${name}:\\s*["']?(\\d{4}-\\d{2}-\\d{2})`, "m"))
        ?.at(1);
    const date = field("updated") ?? field("date");
    if (date) {
      lastmod.set(`/learn/${key.replace(/\.md$/, "").replaceAll(":", "/")}`, date);
    }
  }
  return lastmod;
}

/**
 * Provides all dynamic route URLs to @nuxtjs/sitemap.
 *
 * Static pages (templates, tools, top-level) are discovered automatically
 * from the pages/ directory. Dynamic routes using [slug] or [...slug]
 * patterns need explicit URL lists since the sitemap module cannot
 * resolve which slug values exist at build time.
 */
export default defineEventHandler(async () => {
  const lastmod = await learnLastmod();
  return INDEXABLE_DYNAMIC_ROUTES.map((loc) => ({
    loc,
    lastmod: lastmod.get(loc),
    changefreq: "weekly" as const,
    priority: learnRoutes.has(loc) ? 0.7 : 0.6,
  }));
});
