/**
 * Generate PNG icons from SVG sources.
 * Run: node scripts/generate-icons.mjs
 */
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "../public");

const faviconSvg = readFileSync(resolve(publicDir, "favicon.svg"));
const appleSvg = readFileSync(resolve(publicDir, "apple-touch-icon.svg"));
const ogSvg = readFileSync(resolve(publicDir, "og-image.svg"));

const sizes = [
  { name: "favicon-16x16.png", svg: faviconSvg, width: 16, height: 16 },
  { name: "favicon-32x32.png", svg: faviconSvg, width: 32, height: 32 },
  { name: "favicon-48x48.png", svg: faviconSvg, width: 48, height: 48 },
  {
    name: "android-chrome-192x192.png",
    svg: appleSvg,
    width: 192,
    height: 192,
  },
  {
    name: "android-chrome-512x512.png",
    svg: appleSvg,
    width: 512,
    height: 512,
  },
  { name: "apple-touch-icon.png", svg: appleSvg, width: 180, height: 180 },
  { name: "mstile-150x150.png", svg: appleSvg, width: 150, height: 150 },
  { name: "og-image.png", svg: ogSvg, width: 1200, height: 630 },
];

for (const { name, svg, width, height } of sizes) {
  await sharp(svg, { density: 300 })
    .resize(width, height)
    .png()
    .toFile(resolve(publicDir, name));

  console.log(`✓ ${name} (${width}x${height})`);
}

// Generate favicon.ico from 16, 32, 48 PNGs
// ICO format: just use the 32x32 PNG as the primary .ico
await sharp(faviconSvg, { density: 300 })
  .resize(32, 32)
  .toFormat("png")
  .toFile(resolve(publicDir, "favicon.ico"));

console.log("✓ favicon.ico (32x32)");
console.log("\nAll icons generated successfully!");
