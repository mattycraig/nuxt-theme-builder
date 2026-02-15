import type {
  ThemePreset,
  ThemeConfig,
  TokenOverrides,
  SemanticShades,
} from "~/types/theme";
import {
  DEFAULT_THEME,
  DEFAULT_LIGHT_OVERRIDES,
  DEFAULT_DARK_OVERRIDES,
  DEFAULT_COLOR_SHADES,
} from "~/utils/defaults";

// Reusable token override sets ────────────────────────────────────────────
// Each set is designed with WCAG 2.2 contrast ratios in mind.
// Light mode: dark text on light backgrounds. Dark mode: light text on dark backgrounds.

/** Standard light — balanced readability, ~4.5:1+ for body text on white */
const LIGHT_STANDARD: TokenOverrides = {
  ...DEFAULT_LIGHT_OVERRIDES,
};

/** Standard dark — balanced readability on 900-level backgrounds */
const DARK_STANDARD: TokenOverrides = {
  ...DEFAULT_DARK_OVERRIDES,
};

/** High-contrast light — bolder text, stronger borders */
const LIGHT_HIGH_CONTRAST: TokenOverrides = {
  text: {
    dimmed: "500",
    muted: "600",
    toned: "700",
    default: "800",
    highlighted: "950",
    inverted: "white",
  },
  bg: {
    default: "white",
    muted: "50",
    elevated: "100",
    accented: "200",
    inverted: "950",
  },
  border: {
    default: "300",
    muted: "200",
    accented: "400",
    inverted: "950",
  },
};

/** High-contrast dark — brighter text, 950 base */
const DARK_HIGH_CONTRAST: TokenOverrides = {
  text: {
    dimmed: "400",
    muted: "300",
    toned: "200",
    default: "100",
    highlighted: "white",
    inverted: "950",
  },
  bg: {
    default: "950",
    muted: "900",
    elevated: "900",
    accented: "800",
    inverted: "white",
  },
  border: {
    default: "700",
    muted: "800",
    accented: "600",
    inverted: "white",
  },
};

/** Soft light — subtle elevation differences, clean feel */
const LIGHT_SOFT: TokenOverrides = {
  text: {
    dimmed: "400",
    muted: "500",
    toned: "600",
    default: "700",
    highlighted: "950",
    inverted: "white",
  },
  bg: {
    default: "white",
    muted: "50",
    elevated: "50",
    accented: "100",
    inverted: "950",
  },
  border: {
    default: "200",
    muted: "100",
    accented: "200",
    inverted: "950",
  },
};

/** Deep dark — 950 base, maximum depth separation */
const DARK_DEEP: TokenOverrides = {
  text: {
    dimmed: "500",
    muted: "400",
    toned: "300",
    default: "200",
    highlighted: "white",
    inverted: "950",
  },
  bg: {
    default: "950",
    muted: "900",
    elevated: "900",
    accented: "800",
    inverted: "white",
  },
  border: {
    default: "800",
    muted: "800",
    accented: "700",
    inverted: "white",
  },
};

/** Warm light — slightly elevated muted tones for a cozy feel */
const LIGHT_WARM: TokenOverrides = {
  text: {
    dimmed: "400",
    muted: "500",
    toned: "600",
    default: "800",
    highlighted: "950",
    inverted: "white",
  },
  bg: {
    default: "white",
    muted: "50",
    elevated: "100",
    accented: "200",
    inverted: "900",
  },
  border: {
    default: "200",
    muted: "200",
    accented: "300",
    inverted: "900",
  },
};

/** shadcn light — near-black text, clean whites, subtle zinc borders */
const LIGHT_SHADCN: TokenOverrides = {
  text: {
    dimmed: "400",
    muted: "500",
    toned: "600",
    default: "950",
    highlighted: "950",
    inverted: "white",
  },
  bg: {
    default: "white",
    muted: "50",
    elevated: "100",
    accented: "100",
    inverted: "950",
  },
  border: {
    default: "200",
    muted: "100",
    accented: "300",
    inverted: "950",
  },
};

/** shadcn dark — 950 near-black base, bright text, muted borders */
const DARK_SHADCN: TokenOverrides = {
  text: {
    dimmed: "500",
    muted: "400",
    toned: "300",
    default: "50",
    highlighted: "white",
    inverted: "950",
  },
  bg: {
    default: "950",
    muted: "900",
    elevated: "900",
    accented: "800",
    inverted: "50",
  },
  border: {
    default: "800",
    muted: "800",
    accented: "700",
    inverted: "50",
  },
};

/** Warm dark — rich dark tones with good separation */
const DARK_WARM: TokenOverrides = {
  text: {
    dimmed: "500",
    muted: "400",
    toned: "300",
    default: "200",
    highlighted: "white",
    inverted: "900",
  },
  bg: {
    default: "900",
    muted: "800",
    elevated: "800",
    accented: "700",
    inverted: "white",
  },
  border: {
    default: "700",
    muted: "700",
    accented: "600",
    inverted: "white",
  },
};

// Default shade sets ─────────────────────────────────────────────────────

const SHADES_DEFAULT: SemanticShades = { ...DEFAULT_COLOR_SHADES };

/** Brighter shades for dark mode — 400-level pops more on dark backgrounds */
const SHADES_BRIGHT: SemanticShades = {
  primary: "400",
  secondary: "400",
  success: "400",
  info: "400",
  warning: "400",
  error: "400",
};

/** Deeper shades for light mode — 600-level for stronger presence on white */
const SHADES_DEEP: SemanticShades = {
  primary: "600",
  secondary: "600",
  success: "600",
  info: "600",
  warning: "600",
  error: "600",
};

// Preset builder ─────────────────────────────────────────────────────────

/** Build a full preset config, filling dark-mode fields from light when not specified */
function preset(
  base: Omit<
    ThemeConfig,
    "darkColors" | "darkColorShades" | "darkNeutral" | "darkRadius" | "darkFont"
  > &
    Partial<
      Pick<
        ThemeConfig,
        | "darkColors"
        | "darkColorShades"
        | "darkNeutral"
        | "darkRadius"
        | "darkFont"
      >
    >,
): ThemeConfig {
  return {
    ...base,
    colorShades: base.colorShades ?? { ...DEFAULT_COLOR_SHADES },
    darkColors: base.darkColors ?? { ...base.colors },
    darkColorShades: base.darkColorShades ??
      base.colorShades ?? { ...DEFAULT_COLOR_SHADES },
    darkNeutral: base.darkNeutral ?? base.neutral,
    darkRadius: base.darkRadius ?? base.radius,
    darkFont: base.darkFont ?? base.font,
  };
}

// ═════════════════════════════════════════════════════════════════════════
// Built-in Presets — one per chromatic primary colour
// ═════════════════════════════════════════════════════════════════════════

export const BUILT_IN_PRESETS: ThemePreset[] = [
  // ── 1. Default (indigo) ──────────────────────────────────────────────
  {
    name: "Default",
    description:
      "Balanced indigo palette with standard contrast on zinc neutral. A versatile classic.",
    category: "Essentials",
    builtIn: true,
    config: DEFAULT_THEME,
  },

  // ── 2. Nuxt UI (green) ────────────────────────────────────────────────
  // Matches the official Nuxt UI out-of-the-box defaults.
  {
    name: "Nuxt UI",
    description:
      "Official Nuxt UI defaults. Green primary, blue secondary, slate neutral with standard shading.",
    category: "Essentials",
    builtIn: true,
    config: preset({
      colors: {
        primary: "green",
        secondary: "blue",
        success: "green",
        info: "blue",
        warning: "yellow",
        error: "red",
      },
      colorShades: SHADES_DEFAULT,
      neutral: "slate",
      radius: 0.25,
      font: "Public Sans",
      lightOverrides: LIGHT_STANDARD,
      darkOverrides: DARK_STANDARD,
      darkColorShades: SHADES_BRIGHT,
    }),
  },

  // ── shadcn (zinc) ────────────────────────────────────────────────────
  // Inspired by shadcn/ui: near-black dark mode, ultra-clean light mode,
  // zinc neutrals, minimal borders, and Geist typography.
  // Primary shade 950 in light = near-black buttons; 50 in dark = near-white buttons.
  {
    name: "shadcn",
    description:
      "Inspired by shadcn/ui. Near-black dark mode, zinc neutrals, Geist font, and minimal borders for a clean developer aesthetic.",
    category: "Essentials",
    builtIn: true,
    config: preset({
      colors: {
        primary: "zinc",
        secondary: "zinc",
        success: "emerald",
        info: "sky",
        warning: "amber",
        error: "red",
      },
      colorShades: {
        primary: "950",
        secondary: "600",
        success: "600",
        info: "600",
        warning: "600",
        error: "600",
      },
      neutral: "zinc",
      radius: 0.375,
      font: "Geist",
      lightOverrides: LIGHT_SHADCN,
      darkOverrides: DARK_SHADCN,
      darkColorShades: {
        primary: "50",
        secondary: "400",
        success: "400",
        info: "400",
        warning: "400",
        error: "400",
      },
    }),
  },

  // ── 3. Cherry (red) ──────────────────────────────────────────────────
  {
    name: "Cherry",
    description:
      "Bold red tones for high-energy, attention-grabbing interfaces.",
    category: "Warm",
    builtIn: true,
    config: preset({
      colors: {
        primary: "red",
        secondary: "orange",
        success: "emerald",
        info: "sky",
        warning: "amber",
        error: "rose",
      },
      colorShades: SHADES_DEFAULT,
      neutral: "zinc",
      radius: 0.375,
      font: "Poppins",
      lightOverrides: LIGHT_STANDARD,
      darkOverrides: DARK_STANDARD,
      darkColorShades: SHADES_BRIGHT,
    }),
  },

  // ── 3. Sunset (orange) — FULL DUAL PERSONALITY ────────────────────────
  // Light: warm orange palette. Dark: completely different cool violet
  // with different neutral, radius, font, and shades per mode.
  {
    name: "Sunset",
    description:
      "Dual personality — warm orange in light, cool violet in dark. Every setting transforms between modes.",
    category: "Warm",
    builtIn: true,
    config: preset({
      colors: {
        primary: "orange",
        secondary: "rose",
        success: "emerald",
        info: "sky",
        warning: "yellow",
        error: "red",
      },
      colorShades: SHADES_DEFAULT,
      neutral: "zinc",
      radius: 0.375,
      font: "Poppins",
      lightOverrides: LIGHT_STANDARD,
      darkOverrides: DARK_WARM,
      darkColors: {
        primary: "violet",
        secondary: "fuchsia",
        success: "teal",
        info: "cyan",
        warning: "amber",
        error: "pink",
      },
      darkColorShades: SHADES_BRIGHT,
      darkNeutral: "slate",
      darkRadius: 0.5,
      darkFont: "Outfit",
    }),
  },

  // ── 4. Sahara (amber) ────────────────────────────────────────────────
  {
    name: "Sahara",
    description:
      "Desert-inspired amber warmth on stone neutral. Rich and earthy.",
    category: "Warm",
    builtIn: true,
    config: preset({
      colors: {
        primary: "amber",
        secondary: "orange",
        success: "emerald",
        info: "sky",
        warning: "yellow",
        error: "red",
      },
      colorShades: SHADES_DEEP,
      neutral: "stone",
      radius: 0.375,
      font: "Lora",
      lightOverrides: LIGHT_WARM,
      darkOverrides: DARK_WARM,
      darkColorShades: SHADES_BRIGHT,
      darkNeutral: "zinc",
    }),
  },

  // ── 5. Sunflower (yellow) ─────────────────────────────────────────────
  {
    name: "Sunflower",
    description:
      "Bright yellow for cheerful, optimistic designs. Deeper shades ensure readability.",
    category: "Warm",
    builtIn: true,
    config: preset({
      colors: {
        primary: "yellow",
        secondary: "amber",
        success: "emerald",
        info: "sky",
        warning: "orange",
        error: "red",
      },
      colorShades: SHADES_DEEP,
      neutral: "zinc",
      radius: 0.5,
      font: "Lexend",
      lightOverrides: LIGHT_STANDARD,
      darkOverrides: DARK_WARM,
      darkColorShades: SHADES_BRIGHT,
    }),
  },

  // ── 6. Zest (lime) ───────────────────────────────────────────────────
  {
    name: "Zest",
    description: "Fresh lime green with modern energy and clean lines.",
    category: "Nature",
    builtIn: true,
    config: preset({
      colors: {
        primary: "lime",
        secondary: "green",
        success: "emerald",
        info: "teal",
        warning: "amber",
        error: "red",
      },
      colorShades: SHADES_DEEP,
      neutral: "neutral",
      radius: 0.375,
      font: "Sora",
      lightOverrides: LIGHT_STANDARD,
      darkOverrides: DARK_STANDARD,
      darkColorShades: SHADES_BRIGHT,
    }),
  },

  // ── 7. Forest (green) ────────────────────────────────────────────────
  {
    name: "Forest",
    description: "Natural green tones on warm stone. Earthy and grounded.",
    category: "Nature",
    builtIn: true,
    config: preset({
      colors: {
        primary: "green",
        secondary: "lime",
        success: "emerald",
        info: "teal",
        warning: "amber",
        error: "red",
      },
      colorShades: SHADES_DEEP,
      neutral: "stone",
      radius: 0.5,
      font: "Merriweather",
      lightOverrides: LIGHT_WARM,
      darkOverrides: DARK_WARM,
      darkColorShades: SHADES_BRIGHT,
      darkNeutral: "slate",
    }),
  },

  // ── 8. Emerald (emerald) ──────────────────────────────────────────────
  {
    name: "Emerald",
    description:
      "Rich emerald gemstone palette with Plus Jakarta Sans. Sophisticated and luxurious.",
    category: "Nature",
    builtIn: true,
    config: preset({
      colors: {
        primary: "emerald",
        secondary: "teal",
        success: "green",
        info: "sky",
        warning: "amber",
        error: "rose",
      },
      colorShades: SHADES_DEFAULT,
      neutral: "gray",
      radius: 0.375,
      font: "Plus Jakarta Sans",
      lightOverrides: LIGHT_STANDARD,
      darkOverrides: DARK_STANDARD,
      darkColorShades: SHADES_BRIGHT,
    }),
  },

  // ── 9. Coastal (teal) ────────────────────────────────────────────────
  {
    name: "Coastal",
    description: "Calm teal tones evoking ocean shores and open skies.",
    category: "Cool",
    builtIn: true,
    config: preset({
      colors: {
        primary: "teal",
        secondary: "cyan",
        success: "emerald",
        info: "sky",
        warning: "amber",
        error: "rose",
      },
      colorShades: SHADES_DEFAULT,
      neutral: "slate",
      radius: 0.5,
      font: "Nunito",
      lightOverrides: LIGHT_STANDARD,
      darkOverrides: DARK_STANDARD,
      darkColorShades: SHADES_BRIGHT,
    }),
  },

  // ── 10. Arctic (cyan) ────────────────────────────────────────────────
  {
    name: "Arctic",
    description: "Icy cyan on slate. Cool, crisp, and professional.",
    category: "Cool",
    builtIn: true,
    config: preset({
      colors: {
        primary: "cyan",
        secondary: "sky",
        success: "teal",
        info: "blue",
        warning: "amber",
        error: "rose",
      },
      colorShades: SHADES_DEFAULT,
      neutral: "slate",
      radius: 0.5,
      font: "Figtree",
      lightOverrides: LIGHT_STANDARD,
      darkOverrides: DARK_DEEP,
      darkColorShades: SHADES_BRIGHT,
      darkNeutral: "gray",
      darkFont: "Geist",
    }),
  },

  // ── 11. Minimal (sky) ────────────────────────────────────────────────
  {
    name: "Minimal",
    description:
      "Ultra-clean sky blue with zero radius. Content-focused design.",
    category: "Cool",
    builtIn: true,
    config: preset({
      colors: {
        primary: "sky",
        secondary: "blue",
        success: "emerald",
        info: "cyan",
        warning: "amber",
        error: "rose",
      },
      colorShades: SHADES_DEFAULT,
      neutral: "neutral",
      radius: 0,
      font: "Geist",
      lightOverrides: LIGHT_SOFT,
      darkOverrides: DARK_DEEP,
      darkColorShades: SHADES_BRIGHT,
    }),
  },

  // ── 12. Corporate (blue) ──────────────────────────────────────────────
  {
    name: "Corporate",
    description:
      "Professional blue with high contrast. Ideal for business applications.",
    category: "Cool",
    builtIn: true,
    config: preset({
      colors: {
        primary: "blue",
        secondary: "sky",
        success: "green",
        info: "indigo",
        warning: "amber",
        error: "red",
      },
      colorShades: SHADES_DEEP,
      neutral: "gray",
      radius: 0.25,
      font: "Source Sans 3",
      lightOverrides: LIGHT_HIGH_CONTRAST,
      darkOverrides: DARK_STANDARD,
      darkColorShades: SHADES_BRIGHT,
    }),
  },

  // ── 13. Dark Mono (violet) ────────────────────────────────────────────
  {
    name: "Dark Mono",
    description:
      "High-contrast violet with deep 950 dark base. Bold and dramatic.",
    category: "Bold",
    builtIn: true,
    config: preset({
      colors: {
        primary: "violet",
        secondary: "indigo",
        success: "emerald",
        info: "blue",
        warning: "amber",
        error: "rose",
      },
      colorShades: SHADES_DEFAULT,
      neutral: "neutral",
      radius: 0.25,
      font: "Archivo",
      lightOverrides: LIGHT_HIGH_CONTRAST,
      darkOverrides: DARK_HIGH_CONTRAST,
      darkColorShades: SHADES_BRIGHT,
    }),
  },

  // ── 14. Lavender (purple) ─────────────────────────────────────────────
  {
    name: "Lavender",
    description: "Soft purple tones deepening to rich violet in dark mode.",
    category: "Bold",
    builtIn: true,
    config: preset({
      colors: {
        primary: "purple",
        secondary: "fuchsia",
        success: "emerald",
        info: "sky",
        warning: "amber",
        error: "rose",
      },
      colorShades: SHADES_DEFAULT,
      neutral: "zinc",
      radius: 0.5,
      font: "Urbanist",
      lightOverrides: LIGHT_STANDARD,
      darkOverrides: DARK_DEEP,
      darkColors: {
        primary: "violet",
        secondary: "fuchsia",
        success: "emerald",
        info: "cyan",
        warning: "amber",
        error: "rose",
      },
      darkColorShades: SHADES_BRIGHT,
      darkNeutral: "neutral",
    }),
  },

  // ── 15. Neon (fuchsia) ────────────────────────────────────────────────
  {
    name: "Neon",
    description: "Vibrant fuchsia with bright shades. Playful and high-energy.",
    category: "Bold",
    builtIn: true,
    config: preset({
      colors: {
        primary: "fuchsia",
        secondary: "violet",
        success: "lime",
        info: "cyan",
        warning: "yellow",
        error: "rose",
      },
      colorShades: SHADES_BRIGHT,
      neutral: "zinc",
      radius: 0.75,
      font: "Space Grotesk",
      lightOverrides: LIGHT_STANDARD,
      darkOverrides: DARK_HIGH_CONTRAST,
      darkColors: {
        primary: "fuchsia",
        secondary: "cyan",
        success: "lime",
        info: "violet",
        warning: "yellow",
        error: "rose",
      },
      darkColorShades: SHADES_BRIGHT,
      darkRadius: 1,
    }),
  },

  // ── 16. Blush (pink) — FULL DUAL PERSONALITY ──────────────────────────
  // Light: soft pink warmth. Dark: completely different cool indigo
  // with different neutral, radius, font, colors, and shades.
  {
    name: "Blush",
    description:
      "Dual personality — soft pink in light transforms to cool indigo in dark. Colors, shape, and feel all change between modes.",
    category: "Warm",
    builtIn: true,
    config: preset({
      colors: {
        primary: "pink",
        secondary: "rose",
        success: "emerald",
        info: "sky",
        warning: "amber",
        error: "red",
      },
      colorShades: SHADES_DEFAULT,
      neutral: "stone",
      radius: 0.75,
      font: "Poppins",
      lightOverrides: LIGHT_SOFT,
      darkOverrides: DARK_DEEP,
      darkColors: {
        primary: "indigo",
        secondary: "cyan",
        success: "teal",
        info: "violet",
        warning: "yellow",
        error: "fuchsia",
      },
      darkColorShades: SHADES_BRIGHT,
      darkNeutral: "slate",
      darkRadius: 0.25,
      darkFont: "Geist",
    }),
  },

  // ── 17. Rose Gold (rose) ──────────────────────────────────────────────
  {
    name: "Rose Gold",
    description:
      "Elegant rose on warm stone neutral. Refined and sophisticated.",
    category: "Warm",
    builtIn: true,
    config: preset({
      colors: {
        primary: "rose",
        secondary: "pink",
        success: "emerald",
        info: "sky",
        warning: "amber",
        error: "red",
      },
      colorShades: SHADES_DEFAULT,
      neutral: "stone",
      radius: 0.5,
      font: "Playfair Display",
      lightOverrides: LIGHT_WARM,
      darkOverrides: DARK_WARM,
      darkColors: {
        primary: "rose",
        secondary: "fuchsia",
        success: "emerald",
        info: "sky",
        warning: "amber",
        error: "red",
      },
      darkColorShades: SHADES_BRIGHT,
      darkNeutral: "zinc",
    }),
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Brand-Inspired Presets
  // ═══════════════════════════════════════════════════════════════════════

  // ── Spotify ───────────────────────────────────────────────────────────
  {
    name: "Spotify",
    description:
      "Inspired by Spotify's iconic green-on-black aesthetic. High contrast with deep dark backgrounds.",
    category: "Brands",
    builtIn: true,
    config: preset({
      colors: {
        primary: "green",
        secondary: "emerald",
        success: "green",
        info: "sky",
        warning: "amber",
        error: "red",
      },
      colorShades: {
        primary: "500",
        secondary: "500",
        success: "500",
        info: "500",
        warning: "500",
        error: "500",
      },
      neutral: "neutral",
      radius: 0.5,
      font: "DM Sans",
      lightOverrides: LIGHT_HIGH_CONTRAST,
      darkOverrides: DARK_HIGH_CONTRAST,
      darkColorShades: {
        primary: "400",
        secondary: "400",
        success: "400",
        info: "400",
        warning: "400",
        error: "400",
      },
    }),
  },

  // ── YouTube ───────────────────────────────────────────────────────────
  {
    name: "YouTube",
    description:
      "Inspired by YouTube's bold red branding with clean, content-focused design.",
    category: "Brands",
    builtIn: true,
    config: preset({
      colors: {
        primary: "red",
        secondary: "sky",
        success: "emerald",
        info: "blue",
        warning: "amber",
        error: "rose",
      },
      colorShades: {
        primary: "600",
        secondary: "500",
        success: "500",
        info: "500",
        warning: "500",
        error: "500",
      },
      neutral: "neutral",
      radius: 0.5,
      font: "Roboto",
      lightOverrides: LIGHT_STANDARD,
      darkOverrides: DARK_HIGH_CONTRAST,
      darkColorShades: {
        primary: "500",
        secondary: "400",
        success: "400",
        info: "400",
        warning: "400",
        error: "400",
      },
    }),
  },

  // ── Slack ─────────────────────────────────────────────────────────────
  {
    name: "Slack",
    description:
      "Inspired by Slack's friendly purple palette with warm, collaborative energy.",
    category: "Brands",
    builtIn: true,
    config: preset({
      colors: {
        primary: "purple",
        secondary: "teal",
        success: "green",
        info: "sky",
        warning: "yellow",
        error: "red",
      },
      colorShades: {
        primary: "600",
        secondary: "500",
        success: "600",
        info: "500",
        warning: "500",
        error: "500",
      },
      neutral: "slate",
      radius: 0.375,
      font: "Lato",
      lightOverrides: LIGHT_STANDARD,
      darkOverrides: DARK_STANDARD,
      darkColorShades: SHADES_BRIGHT,
    }),
  },

  // ── Discord ───────────────────────────────────────────────────────────
  {
    name: "Discord",
    description:
      "Inspired by Discord's signature blurple with deep dark mode backgrounds.",
    category: "Brands",
    builtIn: true,
    config: preset({
      colors: {
        primary: "indigo",
        secondary: "violet",
        success: "green",
        info: "sky",
        warning: "amber",
        error: "red",
      },
      colorShades: {
        primary: "500",
        secondary: "500",
        success: "500",
        info: "500",
        warning: "500",
        error: "500",
      },
      neutral: "gray",
      radius: 0.375,
      font: "Open Sans",
      lightOverrides: LIGHT_STANDARD,
      darkOverrides: DARK_DEEP,
      darkColorShades: SHADES_BRIGHT,
    }),
  },

  // ── GitHub ────────────────────────────────────────────────────────────
  {
    name: "GitHub",
    description:
      "Inspired by GitHub's developer-focused design. Clean, minimal, and functional.",
    category: "Brands",
    builtIn: true,
    config: preset({
      colors: {
        primary: "blue",
        secondary: "green",
        success: "green",
        info: "blue",
        warning: "yellow",
        error: "red",
      },
      colorShades: {
        primary: "600",
        secondary: "600",
        success: "600",
        info: "500",
        warning: "500",
        error: "600",
      },
      neutral: "gray",
      radius: 0.375,
      font: "Inter",
      lightOverrides: LIGHT_STANDARD,
      darkOverrides: DARK_HIGH_CONTRAST,
      darkColorShades: SHADES_BRIGHT,
    }),
  },

  // ── Stripe ────────────────────────────────────────────────────────────
  {
    name: "Stripe",
    description:
      "Inspired by Stripe's polished violet-indigo palette. Premium and trustworthy.",
    category: "Brands",
    builtIn: true,
    config: preset({
      colors: {
        primary: "violet",
        secondary: "indigo",
        success: "emerald",
        info: "sky",
        warning: "amber",
        error: "red",
      },
      colorShades: {
        primary: "600",
        secondary: "500",
        success: "500",
        info: "500",
        warning: "500",
        error: "500",
      },
      neutral: "slate",
      radius: 0.375,
      font: "Inter",
      lightOverrides: LIGHT_SOFT,
      darkOverrides: DARK_DEEP,
      darkColorShades: SHADES_BRIGHT,
    }),
  },

  // ── Twitch ────────────────────────────────────────────────────────────
  {
    name: "Twitch",
    description:
      "Inspired by Twitch's vibrant purple with high-energy dark mode gaming aesthetic.",
    category: "Brands",
    builtIn: true,
    config: preset({
      colors: {
        primary: "violet",
        secondary: "purple",
        success: "emerald",
        info: "sky",
        warning: "amber",
        error: "red",
      },
      colorShades: {
        primary: "500",
        secondary: "500",
        success: "500",
        info: "500",
        warning: "500",
        error: "500",
      },
      neutral: "zinc",
      radius: 0.375,
      font: "Inter",
      lightOverrides: LIGHT_STANDARD,
      darkOverrides: DARK_HIGH_CONTRAST,
      darkColorShades: SHADES_BRIGHT,
    }),
  },

  // ── Netflix ───────────────────────────────────────────────────────────
  {
    name: "Netflix",
    description:
      "Inspired by Netflix's dramatic red-on-black design. Bold and cinematic.",
    category: "Brands",
    builtIn: true,
    config: preset({
      colors: {
        primary: "red",
        secondary: "rose",
        success: "emerald",
        info: "sky",
        warning: "amber",
        error: "red",
      },
      colorShades: {
        primary: "600",
        secondary: "500",
        success: "500",
        info: "500",
        warning: "500",
        error: "500",
      },
      neutral: "neutral",
      radius: 0.25,
      font: "Inter",
      lightOverrides: LIGHT_HIGH_CONTRAST,
      darkOverrides: DARK_HIGH_CONTRAST,
      darkColorShades: {
        primary: "500",
        secondary: "400",
        success: "400",
        info: "400",
        warning: "400",
        error: "400",
      },
    }),
  },

  // ── Linear ────────────────────────────────────────────────────────────
  {
    name: "Linear",
    description:
      "Inspired by Linear's sleek product design. Violet accents on minimal dark surfaces.",
    category: "Brands",
    builtIn: true,
    config: preset({
      colors: {
        primary: "violet",
        secondary: "blue",
        success: "emerald",
        info: "sky",
        warning: "amber",
        error: "red",
      },
      colorShades: {
        primary: "500",
        secondary: "500",
        success: "500",
        info: "500",
        warning: "500",
        error: "500",
      },
      neutral: "slate",
      radius: 0.375,
      font: "Inter",
      lightOverrides: LIGHT_SHADCN,
      darkOverrides: DARK_SHADCN,
      darkColorShades: SHADES_BRIGHT,
    }),
  },
];
