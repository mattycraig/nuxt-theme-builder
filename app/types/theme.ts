// ─── Color Palette Constants ─────────────────────────────────────────────────
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

// ─── Semantic Color Keys ─────────────────────────────────────────────────────
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

// ─── Shade Values ────────────────────────────────────────────────────────────
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

export type SemanticColors = Record<SemanticColorKey, ChromaticPalette>;

// ─── Token Override Keys ─────────────────────────────────────────────────────
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

// ─── Core Interfaces ─────────────────────────────────────────────────────────

export type TextTokenOverrides = Record<TextTokenKey, NeutralShade>;
export type BgTokenOverrides = Record<BgTokenKey, NeutralShade>;
export type BorderTokenOverrides = Record<BorderTokenKey, NeutralShade>;

export interface TokenOverrides {
  text: TextTokenOverrides;
  bg: BgTokenOverrides;
  border: BorderTokenOverrides;
}

export interface ThemeConfig {
  colors: SemanticColors;
  neutral: NeutralPalette;
  radius: number;
  font: string;
  lightOverrides: TokenOverrides;
  darkOverrides: TokenOverrides;
}

export interface ThemePreset {
  name: string;
  config: ThemeConfig;
  builtIn?: boolean;
  createdAt?: number;
  updatedAt?: number;
}

// ─── Font Options ────────────────────────────────────────────────────────────
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

// ─── Zod Validation Schemas ──────────────────────────────────────────────────
// Used by the store to validate persisted state and imported configs.

import { z } from "zod";

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

export const ThemeConfigSchema = z.object({
  colors: z.object({
    primary: chromaticPaletteSchema,
    secondary: chromaticPaletteSchema,
    success: chromaticPaletteSchema,
    info: chromaticPaletteSchema,
    warning: chromaticPaletteSchema,
    error: chromaticPaletteSchema,
  }),
  neutral: neutralPaletteSchema,
  radius: z.number().finite().min(0).max(2),
  font: z.enum(FONT_OPTIONS),
  lightOverrides: tokenOverridesSchema,
  darkOverrides: tokenOverridesSchema,
});
