/**
 * Resolve palette names that may point at a theme's custom palettes, and
 * validate / combine custom palette lists. Shared by the CSS generator, the
 * theme store, and the editor UI.
 */
import type {
  AnyPalette,
  CustomPalette,
  NumericShade,
  PaletteName,
} from "~/types/theme";
import {
  ALL_PALETTES,
  CUSTOM_PALETTE_MAX,
  CUSTOM_PALETTE_NAME_MAX_LENGTH,
  CUSTOM_PALETTE_NAME_PATTERN,
  RESERVED_PALETTE_NAMES,
} from "~/types/theme";
import { ALL_HEX_MAP, ALL_SWATCH_HEX } from "~/utils/colorPalettes";
import { generatePalette } from "~/utils/paletteGenerator";

const BUILT_IN_PALETTES: ReadonlySet<string> = new Set(ALL_PALETTES);

export function isBuiltInPalette(name: string): name is AnyPalette {
  return BUILT_IN_PALETTES.has(name);
}

export function findCustomPalette(
  name: string,
  customPalettes: readonly CustomPalette[] = [],
): CustomPalette | undefined {
  if (isBuiltInPalette(name)) return undefined;
  return customPalettes.find((p) => p.name === name);
}

/**
 * Shade → CSS color map for a built-in or custom palette. Returns `{}` for
 * an unknown name so callers can skip it.
 */
export function getPaletteShadeMap(
  name: PaletteName,
  customPalettes: readonly CustomPalette[] = [],
): Record<string, string> {
  const builtIn = ALL_HEX_MAP[name];
  if (builtIn) return builtIn;
  const custom = findCustomPalette(name, customPalettes);
  return (custom && generatePalette(custom.color)?.shades) || {};
}

/** Representative swatch color: shade 500 for built-ins, the base color for custom palettes. */
export function getPaletteSwatch(
  name: PaletteName,
  customPalettes: readonly CustomPalette[] = [],
): string | undefined {
  return ALL_SWATCH_HEX[name] ?? findCustomPalette(name, customPalettes)?.color;
}

/** Shade holding a custom palette's exact base color (undefined for built-ins). */
export function getCustomPaletteAnchor(
  name: PaletteName,
  customPalettes: readonly CustomPalette[] = [],
): NumericShade | undefined {
  const custom = findCustomPalette(name, customPalettes);
  return custom ? generatePalette(custom.color)?.anchor : undefined;
}

/**
 * Lowercase free text and turn spaces/underscores into dashes while the user
 * types ("Brand Yellow" → "brand-yellow"). Trailing dashes are kept so typing
 * isn't interrupted; `getCustomPaletteNameError` rejects them.
 */
export function normalizePaletteNameInput(value: string): string {
  return value
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, CUSTOM_PALETTE_NAME_MAX_LENGTH);
}

/** User-facing reason `name` can't be used, or `null` when it's fine. */
export function getCustomPaletteNameError(
  name: string,
  existing: readonly CustomPalette[],
  currentName?: string,
): string | null {
  if (!name) return "Enter a name";
  if (name.length > CUSTOM_PALETTE_NAME_MAX_LENGTH) {
    return `Use ${CUSTOM_PALETTE_NAME_MAX_LENGTH} characters or fewer`;
  }
  if (!CUSTOM_PALETTE_NAME_PATTERN.test(name)) {
    return "Start with a letter; use lowercase letters, numbers, and single dashes";
  }
  if (RESERVED_PALETTE_NAMES.has(name)) {
    return `"${name}" is a built-in palette or role name`;
  }
  if (name !== currentName && existing.some((p) => p.name === name)) {
    return `A palette named "${name}" already exists`;
  }
  return null;
}

/** First unused name of the form `brand`, `brand-2`, `brand-3`, … */
export function suggestCustomPaletteName(
  existing: readonly CustomPalette[],
  base = "brand",
): string {
  const taken = new Set(existing.map((p) => p.name));
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}

/**
 * Keep the user's custom palettes when another theme replaces the config
 * (built-in preset, randomize, AI). Incoming definitions win on name clashes;
 * current extras are appended up to the limit. `undefined` when empty.
 */
export function mergeCustomPalettes(
  incoming: readonly CustomPalette[] | undefined,
  current: readonly CustomPalette[] | undefined,
): CustomPalette[] | undefined {
  const merged = [...(incoming ?? [])];
  for (const palette of current ?? []) {
    if (merged.length >= CUSTOM_PALETTE_MAX) break;
    if (!merged.some((p) => p.name === palette.name)) merged.push(palette);
  }
  return merged.length ? merged.map((p) => ({ ...p })) : undefined;
}
