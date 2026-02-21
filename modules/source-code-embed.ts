import { defineNuxtModule } from "nuxt/kit";
import { readFile, readdir } from "node:fs/promises";
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
  async setup(_options, nuxt) {
    const pagesDir = join(nuxt.options.rootDir, "app/pages");
    const sourceMap: Record<string, string> = {};

    async function walkDir(dir: string) {
      const entries = await readdir(dir, { withFileTypes: true });
      await Promise.all(
        entries.map(async (dirent) => {
          const fullPath = join(dir, dirent.name);
          if (dirent.isDirectory()) {
            await walkDir(fullPath);
          } else if (dirent.isFile() && dirent.name.endsWith(".vue")) {
            const key = relative(pagesDir, fullPath).replace(/\\/g, "/");
            sourceMap[key] = await readFile(fullPath, "utf-8");
          }
        }),
      );
    }

    await walkDir(pagesDir);

    nuxt.options.nitro.virtual = nuxt.options.nitro.virtual || {};
    nuxt.options.nitro.virtual["#source-code-map"] =
      `export default ${JSON.stringify(sourceMap)}`;
  },
});
