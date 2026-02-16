/**
 * Shared theme constants used by both app/ and server/ layers.
 *
 * Nuxt 4 auto-imports from shared/ into both runtime contexts, eliminating
 * the need to duplicate palette arrays, shade values, font options, and
 * radius options between the client-side types and the server API route.
 *
 * Import convention:
 *   - From app/ layer:    import { ... } from '~~/shared/constants/theme'
 *   - From server/ layer: import { ... } from '~~/shared/constants/theme'
 *
 * @module shared/constants/theme
 */

// ─── Color Palettes ────────────────────────────────────────────────────

/** All chromatic (non-neutral) Tailwind CSS palette names. */
export const CHROMATIC_PALETTES = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const;

/** Neutral Tailwind CSS palette names. */
export const NEUTRAL_PALETTES = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
] as const;

/** Combined list of all chromatic + neutral palettes. */
export const ALL_PALETTES = [
  ...CHROMATIC_PALETTES,
  ...NEUTRAL_PALETTES,
] as const;

// ─── Shade Values ───────────────────────────────────────────────────────

/**
 * Neutral shade scale used for text, background, and border token overrides.
 * Includes special `white` and `black` values in addition to numeric shades.
 */
export const SHADE_VALUES = [
  "white",
  "black",
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const;

// ─── Font Options ──────────────────────────────────────────────────────

/** Font category classification for fallback stack selection. */
export type FontCategory = "sans-serif" | "serif" | "monospace" | "display";

/** A font entry pairing a font name with its typographic category. */
export interface FontEntry {
  name: string;
  category: FontCategory;
}

/** All available font options with their categories. Must stay in sync with `nuxt.config.ts` font families. */
export const FONT_ENTRIES: FontEntry[] = [
  // Sans-serif
  { name: "Public Sans", category: "sans-serif" },
  { name: "DM Sans", category: "sans-serif" },
  { name: "Figtree", category: "sans-serif" },
  { name: "Geist", category: "sans-serif" },
  { name: "Inter", category: "sans-serif" },
  { name: "Lato", category: "sans-serif" },
  { name: "Montserrat", category: "sans-serif" },
  { name: "Nunito", category: "sans-serif" },
  { name: "Open Sans", category: "sans-serif" },
  { name: "Outfit", category: "sans-serif" },
  { name: "Plus Jakarta Sans", category: "sans-serif" },
  { name: "Poppins", category: "sans-serif" },
  { name: "Raleway", category: "sans-serif" },
  { name: "Roboto", category: "sans-serif" },
  { name: "Source Sans 3", category: "sans-serif" },
  { name: "Space Grotesk", category: "sans-serif" },
  { name: "Work Sans", category: "sans-serif" },
  // Serif
  { name: "Lora", category: "serif" },
  { name: "Merriweather", category: "serif" },
  { name: "Playfair Display", category: "serif" },
  { name: "Source Serif 4", category: "serif" },
  { name: "Libre Baskerville", category: "serif" },
  { name: "DM Serif Display", category: "serif" },
  { name: "Crimson Text", category: "serif" },
  // Monospace
  { name: "JetBrains Mono", category: "monospace" },
  { name: "Fira Code", category: "monospace" },
  { name: "Source Code Pro", category: "monospace" },
  { name: "IBM Plex Mono", category: "monospace" },
  { name: "Space Mono", category: "monospace" },
  // Display
  { name: "Sora", category: "display" },
  { name: "Archivo", category: "display" },
  { name: "Lexend", category: "display" },
  { name: "Urbanist", category: "display" },
  { name: "Bricolage Grotesque", category: "display" },
] as const;

/**
 * Flat list of font names suitable for Zod `z.enum()`.
 *
 * Cast required so Zod receives a readonly tuple `[string, ...string[]]`
 * (at least one element). `FONT_ENTRIES.map()` returns `string[]`, which
 * doesn't satisfy the tuple constraint.
 */
export const FONT_OPTIONS = FONT_ENTRIES.map(
  (f) => f.name,
) as unknown as readonly string[] & readonly [string, ...string[]];

// ─── Radius ─────────────────────────────────────────────────────────────

/** Valid border-radius range boundaries (in rem). */
export const RADIUS_MIN = 0;
export const RADIUS_MAX = 2;

// ─── Semantic Color Keys ────────────────────────────────────────────────

/** The named color roles that Nuxt UI uses across components. */
export const SEMANTIC_COLOR_KEYS = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
] as const;

// ─── Default Color Shades ───────────────────────────────────────────────

/**
 * Default shade value for each semantic color role.
 * Used as the initial value when loading a theme config that omits shade data.
 */
export const DEFAULT_COLOR_SHADES = {
  primary: "500" as const,
  secondary: "500" as const,
  success: "500" as const,
  info: "500" as const,
  warning: "500" as const,
  error: "500" as const,
};
