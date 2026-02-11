import { defineNuxtModule } from "nuxt/kit";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

/**
 * Reads all .vue page source files at build/dev time and embeds them
 * as a Nitro virtual module so the source code API works in production
 * where raw .vue files aren't available on disk.
 */
export default defineNuxtModule({
  meta: {
    name: "source-code-embed",
  },
  setup(_options, nuxt) {
    const pagesDir = join(nuxt.options.rootDir, "app/pages");
    const sourceMap: Record<string, string> = {};

    function walkDir(dir: string) {
      for (const entry of readdirSync(dir)) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
          walkDir(fullPath);
        } else if (entry.endsWith(".vue")) {
          const key = relative(pagesDir, fullPath).replace(/\\/g, "/");
          sourceMap[key] = readFileSync(fullPath, "utf-8");
        }
      }
    }

    walkDir(pagesDir);

    nuxt.options.nitro.virtual = nuxt.options.nitro.virtual || {};
    nuxt.options.nitro.virtual["#source-code-map"] = `export default ${JSON.stringify(sourceMap)}`;
  },
});
