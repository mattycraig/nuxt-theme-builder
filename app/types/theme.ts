import { z } from "zod";

// Color Palette Constants ─────────────────────────────────────────────────
// Tailwind CSS color palette names available for semantic color assignment.

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

export type ChromaticPalette = (typeof CHROMATIC_PALETTES)[number];

export const NEUTRAL_PALETTES = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
] as const;

export type NeutralPalette = (typeof NEUTRAL_PALETTES)[number];

export const ALL_PALETTES = [
  ...CHROMATIC_PALETTES,
  ...NEUTRAL_PALETTES,
] as const;
export type AnyPalette = ChromaticPalette | NeutralPalette;

// Color Category Groupings ────────────────────────────────────────────────
// Logical groupings of palettes for categorized dropdown display.

export type PaletteCategory = "Warm" | "Green" | "Blue" | "Purple" | "Neutral";

export const PALETTE_CATEGORY_ORDER: PaletteCategory[] = [
  "Warm",
  "Green",
  "Blue",
  "Purple",
  "Neutral",
];

export const PALETTE_CATEGORIES: Record<
  PaletteCategory,
  readonly AnyPalette[]
> = {
  Warm: ["red", "orange", "amber", "yellow"],
  Green: ["lime", "green", "emerald", "teal"],
  Blue: ["cyan", "sky", "blue", "indigo"],
  Purple: ["violet", "purple", "fuchsia", "pink", "rose"],
  Neutral: ["slate", "gray", "zinc", "neutral", "stone"],
};

// Semantic Color Keys ─────────────────────────────────────────────────────
// The named color roles that Nuxt UI uses across components.

export const SEMANTIC_COLOR_KEYS = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
] as const;

export type SemanticColorKey = (typeof SEMANTIC_COLOR_KEYS)[number];

// Shade Values ────────────────────────────────────────────────────────────
// Neutral shade scale used for text, background, and border token overrides.

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

export type NeutralShade = (typeof SHADE_VALUES)[number];

// Numeric shade scale for palette shade selection (no white/black).
export const NUMERIC_SHADE_KEYS = [
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

export type NumericShade = (typeof NUMERIC_SHADE_KEYS)[number];

export type SemanticColors = Record<SemanticColorKey, AnyPalette>;
export type SemanticShades = Record<SemanticColorKey, NeutralShade>;

// Token Override Keys ─────────────────────────────────────────────────────
// CSS variable token names that can be overridden per light/dark mode.

export const TEXT_TOKEN_KEYS = [
  "dimmed",
  "muted",
  "toned",
  "default",
  "highlighted",
  "inverted",
] as const;

export type TextTokenKey = (typeof TEXT_TOKEN_KEYS)[number];

export const BG_TOKEN_KEYS = [
  "default",
  "muted",
  "elevated",
  "accented",
  "inverted",
] as const;

export type BgTokenKey = (typeof BG_TOKEN_KEYS)[number];

export const BORDER_TOKEN_KEYS = [
  "default",
  "muted",
  "accented",
  "inverted",
] as const;

export type BorderTokenKey = (typeof BORDER_TOKEN_KEYS)[number];

// Core Interfaces ─────────────────────────────────────────────────────────

export type TextTokenOverrides = Record<TextTokenKey, NeutralShade>;
export type BgTokenOverrides = Record<BgTokenKey, NeutralShade>;
export type BorderTokenOverrides = Record<BorderTokenKey, NeutralShade>;

export interface TokenOverrides {
  text: TextTokenOverrides;
  bg: BgTokenOverrides;
  border: BorderTokenOverrides;
}

export interface ThemeConfig {
  // Base / light mode settings
  colors: SemanticColors;
  colorShades: SemanticShades;
  neutral: NeutralPalette;
  radius: number;
  font: string;
  lightOverrides: TokenOverrides;
  darkOverrides: TokenOverrides;

  // Per-dark-mode overrides (can differ from light)
  darkColors: SemanticColors;
  darkColorShades: SemanticShades;
  darkNeutral: NeutralPalette;
  darkRadius: number;
  darkFont: string;
}

export const PRESET_CATEGORIES = [
  "Essentials",
  "Warm",
  "Nature",
  "Cool",
  "Bold",
] as const;

export type PresetCategory = (typeof PRESET_CATEGORIES)[number];

export interface ThemePreset {
  name: string;
  description?: string;
  category?: PresetCategory;
  config: ThemeConfig;
  builtIn?: boolean;
  createdAt?: number;
  updatedAt?: number;
}

// Font Options ────────────────────────────────────────────────────────────
// Must match fonts registered in nuxt.config.ts `fonts.families`.

export type FontCategory = "sans-serif" | "serif" | "monospace" | "display";

export interface FontEntry {
  name: string;
  category: FontCategory;
}

const FONT_ENTRIES: FontEntry[] = [
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

export { FONT_ENTRIES };

export const FONT_OPTIONS = FONT_ENTRIES.map(
  (f) => f.name,
) as unknown as readonly string[] & readonly [string, ...string[]];

const FONT_CATEGORY_MAP = new Map<string, FontCategory>(
  FONT_ENTRIES.map((f) => [f.name, f.category]),
);

const FALLBACK_STACKS: Record<FontCategory, string> = {
  "sans-serif": "ui-sans-serif, system-ui, sans-serif",
  serif: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
  monospace:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  display: "ui-sans-serif, system-ui, sans-serif",
};

export function getFontCategory(fontName: string): FontCategory {
  return FONT_CATEGORY_MAP.get(fontName) ?? "sans-serif";
}

export function getFontFallbackStack(fontName: string): string {
  return FALLBACK_STACKS[getFontCategory(fontName)];
}

// Zod Validation Schemas ──────────────────────────────────────────────────
// Used by the store to validate persisted state and imported configs.

export const DEFAULT_COLOR_SHADES: SemanticShades = {
  primary: "500",
  secondary: "500",
  success: "500",
  info: "500",
  warning: "500",
  error: "500",
};

const _chromaticPaletteSchema = z.enum(CHROMATIC_PALETTES);
const neutralPaletteSchema = z.enum(NEUTRAL_PALETTES);
const anyPaletteSchema = z.enum(ALL_PALETTES);
const neutralShadeSchema = z.enum(SHADE_VALUES);

function shadeRecordSchema<T extends readonly string[]>(keys: T) {
  const shape = {} as Record<string, z.ZodType<string>>;
  for (const key of keys) {
    shape[key] = neutralShadeSchema;
  }
  return z.object(shape);
}

const textTokenOverridesSchema = shadeRecordSchema(TEXT_TOKEN_KEYS);
const bgTokenOverridesSchema = shadeRecordSchema(BG_TOKEN_KEYS);
const borderTokenOverridesSchema = shadeRecordSchema(BORDER_TOKEN_KEYS);

const tokenOverridesSchema = z.object({
  text: textTokenOverridesSchema,
  bg: bgTokenOverridesSchema,
  border: borderTokenOverridesSchema,
});

const semanticColorsSchema = z.object({
  primary: anyPaletteSchema,
  secondary: anyPaletteSchema,
  success: anyPaletteSchema,
  info: anyPaletteSchema,
  warning: anyPaletteSchema,
  error: anyPaletteSchema,
});

const semanticShadesSchema = z
  .object({
    primary: neutralShadeSchema,
    secondary: neutralShadeSchema,
    success: neutralShadeSchema,
    info: neutralShadeSchema,
    warning: neutralShadeSchema,
    error: neutralShadeSchema,
  })
  .default(DEFAULT_COLOR_SHADES);

const rawThemeSchema = z.object({
  colors: semanticColorsSchema,
  colorShades: semanticShadesSchema,
  neutral: neutralPaletteSchema,
  radius: z.number().finite().min(0).max(2),
  font: z.enum(FONT_OPTIONS),
  lightOverrides: tokenOverridesSchema,
  darkOverrides: tokenOverridesSchema,

  // Dark-mode-specific overrides — optional for backward compatibility
  darkColors: semanticColorsSchema.optional(),
  darkColorShades: semanticShadesSchema.optional(),
  darkNeutral: neutralPaletteSchema.optional(),
  darkRadius: z.number().finite().min(0).max(2).optional(),
  darkFont: z.enum(FONT_OPTIONS).optional(),
});

export const ThemeConfigSchema = rawThemeSchema.transform((data) => ({
  ...data,
  darkColors: data.darkColors ?? { ...data.colors },
  darkColorShades: data.darkColorShades ?? { ...data.colorShades },
  darkNeutral: data.darkNeutral ?? data.neutral,
  darkRadius: data.darkRadius ?? data.radius,
  darkFont: data.darkFont ?? data.font,
}));
