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

export type SemanticColors = Record<SemanticColorKey, ChromaticPalette>;
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

export interface ThemePreset {
  name: string;
  config: ThemeConfig;
  builtIn?: boolean;
  createdAt?: number;
  updatedAt?: number;
}

// Font Options ────────────────────────────────────────────────────────────
// Must match fonts registered in nuxt.config.ts `fonts.families`.

export const FONT_OPTIONS = [
  "Public Sans",
  "DM Sans",
  "Geist",
  "Inter",
  "Poppins",
  "Outfit",
  "Raleway",
] as const;

// Zod Validation Schemas ──────────────────────────────────────────────────
// Used by the store to validate persisted state and imported configs.

import { z } from "zod";

export const DEFAULT_COLOR_SHADES: SemanticShades = {
  primary: "500",
  secondary: "500",
  success: "500",
  info: "500",
  warning: "500",
  error: "500",
};

const chromaticPaletteSchema = z.enum(CHROMATIC_PALETTES);
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

const semanticColorsSchema = z.object({
  primary: chromaticPaletteSchema,
  secondary: chromaticPaletteSchema,
  success: chromaticPaletteSchema,
  info: chromaticPaletteSchema,
  warning: chromaticPaletteSchema,
  error: chromaticPaletteSchema,
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
