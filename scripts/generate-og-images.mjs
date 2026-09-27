/**
 * Generate the social share images for learn articles and theme pages.
 *
 *   public/og/learn/<category>/<slug>.png   one per content/learn article
 *   public/og/themes/<slug>.png             one per built-in preset
 *
 * Run after adding or renaming an article or preset:
 *   pnpm og:generate
 *
 * The PNGs are committed, so builds don't need a renderer. Text uses
 * whatever sans-serif fonts the machine has, so only regenerate the files
 * whose content changed if you want the rest to stay byte-identical.
 * tests/unit/scripts/og-images.test.ts fails when an image is missing.
 */
import sharp from "sharp";
import { createRequire } from "node:module";
import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");

// Load the app's TypeScript utils (presets, swatches) the way Nuxt resolves them.
const nuxtRequire = createRequire(fileURLToPath(import.meta.resolve("nuxt")));
const { createJiti } = nuxtRequire("jiti");
const jiti = createJiti(import.meta.url, {
  alias: {
    "~~": root,
    "~": join(root, "app"),
    vue: dirname(nuxtRequire.resolve("vue/package.json")),
  },
});
const { BUILT_IN_PRESETS, presetSlug } = await jiti.import("~/utils/presets");
const { resolveModeSwatches } = await jiti.import("~/utils/themeSwatches");
const { parseColor, rgbToHex } = await jiti.import("~/utils/colorConversion");

const WIDTH = 1200;
const HEIGHT = 630;
const FONT = "'Inter', 'Liberation Sans', 'DejaVu Sans', Arial, sans-serif";
const BRAND_DOTS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#f43f5e"];

const CATEGORY_LABELS = {
  theming: "Theming",
  components: "Components",
  tailwind: "Tailwind CSS",
  "best-practices": "Best Practices",
};
const FORMAT_LABELS = { guide: "Guide", reference: "Reference", tip: "Quick Tip" };

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** librsvg doesn't understand oklch(), so flatten every color to hex. */
function hex(color) {
  const parsed = parseColor(color);
  return parsed ? rgbToHex(parsed.rgb) : "#000000";
}

/** Greedy word wrap by an average glyph width. */
function wrap(text, maxChars, maxLines) {
  const lines = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[\s,.:;-]+$/, "")}…`;
    return kept;
  }
  return lines;
}

function readFrontmatter(file) {
  const source = readFileSync(file, "utf8");
  const block = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  const field = (name) => {
    const raw = block.match(new RegExp(`^${name}:\\s*(.+)$`, "m"))?.[1] ?? "";
    return raw.trim().replace(/^["']|["']$/g, "");
  };
  return {
    title: field("title"),
    category: field("category"),
    format: field("format") || "guide",
  };
}

function listArticles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return listArticles(full);
    return entry.name.endsWith(".md") ? [full] : [];
  });
}

function articleSvg({ title, category, format }) {
  const lines = wrap(title, 26, 3);
  const titleSize = 68;
  const lineHeight = 80;
  const titleTop = 300;
  const pill = `${CATEGORY_LABELS[category] ?? category} · ${FORMAT_LABELS[format] ?? format}`;
  const pillWidth = pill.length * 14 + 48;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <radialGradient id="bg" cx="30%" cy="20%" r="90%">
      <stop offset="0%" stop-color="#1a1744"/>
      <stop offset="100%" stop-color="#080620"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#0ea5e9"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect x="0" y="0" width="${WIDTH}" height="8" fill="url(#bar)"/>
  <text x="80" y="110" font-family="${FONT}" font-size="30" font-weight="700" fill="#e0e7ff">Nuxt UI Theme Builder</text>
  <text x="${WIDTH - 80}" y="110" text-anchor="end" font-family="${FONT}" font-size="26" fill="#a5b4fc">Learning Hub</text>
  <rect x="80" y="170" width="${pillWidth}" height="46" rx="23" fill="#6366f1" fill-opacity="0.22" stroke="#818cf8" stroke-opacity="0.5"/>
  <text x="${80 + pillWidth / 2}" y="201" text-anchor="middle" font-family="${FONT}" font-size="22" font-weight="600" fill="#c7d2fe">${escapeXml(pill)}</text>
  ${lines
    .map(
      (line, i) =>
        `<text x="80" y="${titleTop + i * lineHeight}" font-family="${FONT}" font-size="${titleSize}" font-weight="700" fill="#ffffff">${escapeXml(line)}</text>`,
    )
    .join("\n  ")}
  <text x="80" y="560" font-family="${FONT}" font-size="26" fill="#94a3b8">nuxt-ui-themes.com/learn</text>
  ${BRAND_DOTS.map(
    (color, i) =>
      `<circle cx="${WIDTH - 80 - (BRAND_DOTS.length - 1 - i) * 44}" cy="551" r="14" fill="${color}"/>`,
  ).join("\n  ")}
</svg>`;
}

function modePanel(swatches, x, width, heading) {
  const radius = Math.min(swatches.radius * 16, 24);
  const primary = swatches.semantic[0];
  const dots = swatches.semantic
    .map(
      (s, i) =>
        `<circle cx="${x + 108 + i * 74}" cy="330" r="28" fill="${hex(s.color)}"/>`,
    )
    .join("\n  ");
  return `<rect x="${x}" y="0" width="${width}" height="${HEIGHT}" fill="${hex(swatches.bg)}"/>
  <text x="${x + 52}" y="${HEIGHT - 60}" font-family="${FONT}" font-size="24" font-weight="600" fill="${hex(swatches.textMuted)}">${heading}</text>
  <rect x="${x + 52}" y="250" width="${width - 104}" height="250" rx="${radius}" fill="${hex(swatches.bgElevated)}" stroke="${hex(swatches.border)}" stroke-width="2"/>
  ${dots}
  <rect x="${x + 52 + 28}" y="400" width="210" height="64" rx="${radius}" fill="${hex(primary.color)}"/>
  <text x="${x + 52 + 28 + 105}" y="441" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="600" fill="${hex(swatches.textInverted)}">Get started</text>
  <rect x="${x + 52 + 258}" y="400" width="190" height="64" rx="${radius}" fill="none" stroke="${hex(swatches.border)}" stroke-width="2"/>
  <text x="${x + 52 + 258 + 95}" y="441" text-anchor="middle" font-family="${FONT}" font-size="26" font-weight="600" fill="${hex(swatches.textHighlighted)}">Learn more</text>`;
}

function themeSvg(preset) {
  const light = resolveModeSwatches(preset.config, "light");
  const dark = resolveModeSwatches(preset.config, "dark");
  const half = WIDTH / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  ${modePanel(light, 0, half, "Light")}
  ${modePanel(dark, half, half, "Dark")}
  <text x="52" y="120" font-family="${FONT}" font-size="76" font-weight="700" fill="${hex(light.textHighlighted)}">${escapeXml(preset.name)}</text>
  <text x="52" y="175" font-family="${FONT}" font-size="30" fill="${hex(light.textMuted)}">Nuxt UI theme</text>
  <text x="${WIDTH - 52}" y="120" text-anchor="end" font-family="${FONT}" font-size="28" font-weight="700" fill="${hex(dark.textHighlighted)}">Nuxt UI Theme Builder</text>
  <text x="${WIDTH - 52}" y="${HEIGHT - 60}" text-anchor="end" font-family="${FONT}" font-size="24" fill="${hex(dark.textMuted)}">nuxt-ui-themes.com</text>
</svg>`;
}

async function writePng(svg, outFile, { palette = false } = {}) {
  mkdirSync(dirname(outFile), { recursive: true });
  // Palette mode keeps the flat theme images small but bands gradients.
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9, palette })
    .toFile(outFile);
  console.log(`  ✓ ${relative(root, outFile)}`);
}

const learnDir = join(root, "content", "learn");
for (const file of listArticles(learnDir)) {
  const path = relative(learnDir, file).replace(/\.md$/, "");
  await writePng(
    articleSvg(readFrontmatter(file)),
    join(publicDir, "og", "learn", `${path}.png`),
  );
}

for (const preset of BUILT_IN_PRESETS) {
  await writePng(
    themeSvg(preset),
    join(publicDir, "og", "themes", `${presetSlug(preset.name)}.png`),
    { palette: true },
  );
}
