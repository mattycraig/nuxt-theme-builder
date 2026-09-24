/**
 * App-layer theme types, schemas, and derived unions.
 *
 * Import convention:
 *   - From app/ layer only: import { ... } from '~/types/theme'
 *   - NOT available in server/ layer — use shared/constants/theme for cross-layer values.
 */
import { z } from "zod";
import {
  CHROMATIC_PALETTES,
  NEUTRAL_PALETTES,
  ALL_PALETTES,
  SHADE_VALUES,
  FONT_ENTRIES,
  FONT_OPTIONS,
  SEMANTIC_COLOR_KEYS,
  DEFAULT_COLOR_SHADES,
  RADIUS_MIN,
  RADIUS_MAX,
  CUSTOM_PALETTE_MAX,
  CUSTOM_PALETTE_NAME_MAX_LENGTH,
  CUSTOM_PALETTE_NAME_PATTERN,
  RESERVED_PALETTE_NAMES,
} from "~~/shared/constants/theme";
import type { FontCategory, FontEntry } from "~~/shared/constants/theme";

// Re-export shared constants so existing app/ imports continue to work
export {
  CHROMATIC_PALETTES,
  NEUTRAL_PALETTES,
  ALL_PALETTES,
  SHADE_VALUES,
  FONT_ENTRIES,
  FONT_OPTIONS,
  SEMANTIC_COLOR_KEYS,
  DEFAULT_COLOR_SHADES,
  RADIUS_MIN,
  RADIUS_MAX,
  CUSTOM_PALETTE_MAX,
  CUSTOM_PALETTE_NAME_MAX_LENGTH,
  CUSTOM_PALETTE_NAME_PATTERN,
  RESERVED_PALETTE_NAMES,
};
export type { FontCategory, FontEntry };

// Color Palette Constants ─────────────────────────────────────────────────
// Tailwind CSS color palette names available for semantic color assignment.

export type ChromaticPalette = (typeof CHROMATIC_PALETTES)[number];

export type NeutralPalette = (typeof NEUTRAL_PALETTES)[number];

export type AnyPalette = ChromaticPalette | NeutralPalette;

/**
 * A palette a semantic role can use: a built-in Tailwind palette or the name
 * of one of the theme's custom palettes (see `ThemeConfig.customPalettes`).
 */
export type PaletteName = AnyPalette | (string & {});

/** A user-defined palette, generated from one base color. */
export interface CustomPalette {
  /** Lowercase kebab-case slug, used as `--color-<name>-*` and in app.config. */
  name: string;
  /** Base color as lowercase `#rrggbb`; the 50–950 shades are derived from it. */
  color: string;
}

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
  Neutral: [
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "taupe",
    "mauve",
    "mist",
    "olive",
  ],
};

// Semantic Color Keys ─────────────────────────────────────────────────────
// The named color roles that Nuxt UI uses across components.
// (re-exported from shared/ above)

export type SemanticColorKey = (typeof SEMANTIC_COLOR_KEYS)[number];

// Shade Values ────────────────────────────────────────────────────────────
// Neutral shade scale used for text, background, and border token overrides.
// (re-exported from shared/ above)

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

export type SemanticColors = Record<SemanticColorKey, PaletteName>;
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

  // Shared by both modes. Omitted (not `[]`) when the theme has none, so
  // themes without custom palettes serialize exactly as before.
  customPalettes?: CustomPalette[];
}

export const PRESET_CATEGORIES = [
  "Essentials",
  "Warm",
  "Nature",
  "Cool",
  "Bold",
  "Brands",
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
// Constants (FONT_ENTRIES, FONT_OPTIONS) and types (FontCategory, FontEntry)
// are re-exported from shared/ above.

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

// DEFAULT_COLOR_SHADES re-exported from shared/ above.

const neutralPaletteSchema = z.enum(NEUTRAL_PALETTES);
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

const BUILT_IN_PALETTES: ReadonlySet<string> = new Set(ALL_PALETTES);

/** Whether `name` is usable as a custom palette name (format + not reserved). */
export function isValidCustomPaletteName(name: string): boolean {
  return (
    name.length <= CUSTOM_PALETTE_NAME_MAX_LENGTH &&
    CUSTOM_PALETTE_NAME_PATTERN.test(name) &&
    !RESERVED_PALETTE_NAMES.has(name)
  );
}

// Built-in palette, or a custom palette name (existence is checked against
// `customPalettes` in the theme-level refinement below).
const paletteNameSchema = z
  .string()
  .refine(
    (name) => BUILT_IN_PALETTES.has(name) || isValidCustomPaletteName(name),
    { message: "Unknown palette" },
  );

const semanticColorsSchema = z.object({
  primary: paletteNameSchema,
  secondary: paletteNameSchema,
  success: paletteNameSchema,
  info: paletteNameSchema,
  warning: paletteNameSchema,
  error: paletteNameSchema,
});

const customPaletteSchema = z.object({
  name: z.string().refine(isValidCustomPaletteName, {
    message: `Palette names must be lowercase letters, numbers, and dashes (max ${CUSTOM_PALETTE_NAME_MAX_LENGTH}), and can't reuse a built-in palette or role name`,
  }),
  color: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Palette color must be a #rrggbb hex color")
    .transform((hex) => hex.toLowerCase()),
});

const customPalettesSchema = z
  .array(customPaletteSchema)
  .max(CUSTOM_PALETTE_MAX)
  .refine(
    (palettes) => new Set(palettes.map((p) => p.name)).size === palettes.length,
    { message: "Custom palette names must be unique" },
  );

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
  radius: z.number().finite().min(RADIUS_MIN).max(RADIUS_MAX),
  font: z.enum(FONT_OPTIONS),
  lightOverrides: tokenOverridesSchema,
  darkOverrides: tokenOverridesSchema,

  // Dark-mode-specific overrides — optional for backward compatibility
  darkColors: semanticColorsSchema.optional(),
  darkColorShades: semanticShadesSchema.optional(),
  darkNeutral: neutralPaletteSchema.optional(),
  darkRadius: z.number().finite().min(RADIUS_MIN).max(RADIUS_MAX).optional(),
  darkFont: z.enum(FONT_OPTIONS).optional(),

  // Custom palettes — optional for backward compatibility
  customPalettes: customPalettesSchema.optional(),
});

/** Every semantic role must point at a built-in or a defined custom palette. */
const referencedPalettesSchema = rawThemeSchema.superRefine((data, ctx) => {
  const defined = new Set((data.customPalettes ?? []).map((p) => p.name));
  for (const field of ["colors", "darkColors"] as const) {
    const colors = data[field];
    if (!colors) continue;
    for (const key of SEMANTIC_COLOR_KEYS) {
      const name = colors[key];
      if (!BUILT_IN_PALETTES.has(name) && !defined.has(name)) {
        ctx.addIssue({
          code: "custom",
          path: [field, key],
          message: `Custom palette "${name}" is not defined in customPalettes`,
        });
      }
    }
  }
});

/**
 * Backward-compatibility transform: dark-mode fields were added after
 * launch, so persisted configs may lack them. `.optional()` + `.transform()`
 * fills missing dark-mode values by mirroring the light-mode counterpart.
 * `customPalettes` stays absent when empty, so older themes (and saved
 * presets compared by JSON in `hasUnsavedChanges`) serialize unchanged.
 */
export const ThemeConfigSchema = referencedPalettesSchema.transform((data) => {
  const { customPalettes, ...rest } = data;
  return {
    ...rest,
    darkColors: data.darkColors ?? { ...data.colors },
    darkColorShades: data.darkColorShades ?? { ...data.colorShades },
    darkNeutral: data.darkNeutral ?? data.neutral,
    darkRadius: data.darkRadius ?? data.radius,
    darkFont: data.darkFont ?? data.font,
    ...(customPalettes?.length ? { customPalettes } : {}),
  };
});
