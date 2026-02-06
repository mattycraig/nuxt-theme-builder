// All available Tailwind CSS v4 chromatic color palettes (17)
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

// Available neutral palettes (5)
export const NEUTRAL_PALETTES = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
] as const;

export type NeutralPalette = (typeof NEUTRAL_PALETTES)[number];

// All palettes combined
export type AnyPalette = ChromaticPalette | NeutralPalette;

// Semantic color alias names
export const SEMANTIC_COLOR_KEYS = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
] as const;

export type SemanticColorKey = (typeof SEMANTIC_COLOR_KEYS)[number];

// Neutral shade options for token overrides
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

// Semantic color mappings (e.g., primary → 'blue')
export type SemanticColors = Record<SemanticColorKey, ChromaticPalette>;

// Token override: maps a CSS variable token name to a neutral shade
// Separate light and dark values

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

// Full theme configuration
export interface ThemeConfig {
  // Semantic color palette mappings
  colors: SemanticColors;
  // Neutral palette
  neutral: NeutralPalette;
  // Border radius in rem
  radius: number;
  // Font family name
  font: string;
  // Token overrides for light mode
  lightOverrides: TokenOverrides;
  // Token overrides for dark mode
  darkOverrides: TokenOverrides;
}

// Saved preset
export interface ThemePreset {
  name: string;
  config: ThemeConfig;
  builtIn?: boolean;
}

// Available fonts
export const FONT_OPTIONS = [
  "Public Sans",
  "DM Sans",
  "Geist",
  "Inter",
  "Poppins",
  "Outfit",
  "Raleway",
] as const;

export type FontOption = (typeof FONT_OPTIONS)[number];
