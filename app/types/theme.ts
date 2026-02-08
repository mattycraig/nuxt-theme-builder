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

export const SEMANTIC_COLOR_KEYS = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
] as const;

export type SemanticColorKey = (typeof SEMANTIC_COLOR_KEYS)[number];

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

export interface TextTokenOverrides {
  dimmed: NeutralShade;
  muted: NeutralShade;
  toned: NeutralShade;
  default: NeutralShade;
  highlighted: NeutralShade;
  inverted: NeutralShade;
}

export interface BgTokenOverrides {
  default: NeutralShade;
  muted: NeutralShade;
  elevated: NeutralShade;
  accented: NeutralShade;
  inverted: NeutralShade;
}

export interface BorderTokenOverrides {
  default: NeutralShade;
  muted: NeutralShade;
  accented: NeutralShade;
  inverted: NeutralShade;
}

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
}

export const FONT_OPTIONS = [
  "Public Sans",
  "DM Sans",
  "Geist",
  "Inter",
  "Poppins",
  "Outfit",
  "Raleway",
] as const;

import { z } from "zod";

const chromaticPaletteSchema = z.enum(CHROMATIC_PALETTES);
const neutralPaletteSchema = z.enum(NEUTRAL_PALETTES);
const neutralShadeSchema = z.enum(SHADE_VALUES);

const textTokenOverridesSchema = z.object({
  dimmed: neutralShadeSchema,
  muted: neutralShadeSchema,
  toned: neutralShadeSchema,
  default: neutralShadeSchema,
  highlighted: neutralShadeSchema,
  inverted: neutralShadeSchema,
});

const bgTokenOverridesSchema = z.object({
  default: neutralShadeSchema,
  muted: neutralShadeSchema,
  elevated: neutralShadeSchema,
  accented: neutralShadeSchema,
  inverted: neutralShadeSchema,
});

const borderTokenOverridesSchema = z.object({
  default: neutralShadeSchema,
  muted: neutralShadeSchema,
  accented: neutralShadeSchema,
  inverted: neutralShadeSchema,
});

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
  radius: z.number().min(0).max(2),
  font: z.string().min(1),
  lightOverrides: tokenOverridesSchema,
  darkOverrides: tokenOverridesSchema,
});
