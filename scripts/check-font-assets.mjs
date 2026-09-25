/**
 * Fail if a production build published no font files, or any empty ones.
 * Empty .woff2 files show up in Chrome as "Failed to decode downloaded font".
 * Run after `pnpm build`: node scripts/check-font-assets.mjs
 */
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// node-server / default preset, then the Vercel preset
const publicDirs = [".output/public", ".vercel/output/static"]
  .map((dir) => join(root, dir))
  .filter((dir) => existsSync(dir));

function listFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  });
}

const fontFiles = publicDirs
  .map((dir) => join(dir, "_fonts"))
  .filter((dir) => existsSync(dir))
  .flatMap(listFiles)
  .filter((file) => /\.(woff2?|ttf|otf)$/.test(file));

if (fontFiles.length === 0) {
  console.error(
    "No font files found under _fonts/ in the build output. Run `pnpm build` first.",
  );
  process.exit(1);
}

const empty = fontFiles.filter((file) => statSync(file).size === 0);

if (empty.length > 0) {
  console.error(`${empty.length} of ${fontFiles.length} font files are empty:`);
  for (const file of empty) console.error(`  ${relative(root, file)}`);
  process.exit(1);
}

console.log(`All ${fontFiles.length} font files are non-empty.`);
