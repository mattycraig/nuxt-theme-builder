import type {
  ThemeConfig,
  TokenOverrides,
  TextTokenOverrides,
  BgTokenOverrides,
  BorderTokenOverrides,
} from "~/types/theme";
import { DEFAULT_COLOR_SHADES } from "~/types/theme";
import { toRaw } from "vue";

// Light Mode Token Defaults ──────────────────────────────────────────────
// Shade assignments for text, background, and border in light mode.

const DEFAULT_TEXT_LIGHT: TextTokenOverrides = {
  dimmed: "400",
  muted: "500",
  toned: "600",
  default: "700",
  highlighted: "900",
  inverted: "white",
};

// Dark Mode Token Defaults ───────────────────────────────────────────────

const DEFAULT_TEXT_DARK: TextTokenOverrides = {
  dimmed: "500",
  muted: "400",
  toned: "300",
  default: "200",
  highlighted: "white",
  inverted: "900",
};

const DEFAULT_BG_LIGHT: BgTokenOverrides = {
  default: "white",
  muted: "50",
  elevated: "100",
  accented: "200",
  inverted: "900",
};

const DEFAULT_BG_DARK: BgTokenOverrides = {
  default: "900",
  muted: "800",
  elevated: "800",
  accented: "700",
  inverted: "white",
};

const DEFAULT_BORDER_LIGHT: BorderTokenOverrides = {
  default: "200",
  muted: "200",
  accented: "300",
  inverted: "900",
};

const DEFAULT_BORDER_DARK: BorderTokenOverrides = {
  default: "800",
  muted: "700",
  accented: "700",
  inverted: "white",
};

// Composed Default Theme ─────────────────────────────────────────────────

export const DEFAULT_LIGHT_OVERRIDES: TokenOverrides = {
  text: { ...DEFAULT_TEXT_LIGHT },
  bg: { ...DEFAULT_BG_LIGHT },
  border: { ...DEFAULT_BORDER_LIGHT },
};

export const DEFAULT_DARK_OVERRIDES: TokenOverrides = {
  text: { ...DEFAULT_TEXT_DARK },
  bg: { ...DEFAULT_BG_DARK },
  border: { ...DEFAULT_BORDER_DARK },
};

// Re-export DEFAULT_COLOR_SHADES from types for backward compatibility
export { DEFAULT_COLOR_SHADES } from "~/types/theme";

export const DEFAULT_THEME: ThemeConfig = {
  colors: {
    primary: "indigo",
    secondary: "sky",
    success: "emerald",
    info: "blue",
    warning: "amber",
    error: "rose",
  },
  colorShades: {
    primary: "600",
    secondary: "600",
    success: "600",
    info: "600",
    warning: "600",
    error: "600",
  },
  neutral: "zinc",
  radius: 0.375,
  font: "Geist",
  lightOverrides: { ...DEFAULT_LIGHT_OVERRIDES },
  darkOverrides: { ...DEFAULT_DARK_OVERRIDES },

  // Dark mode defaults — same as light
  darkColors: {
    primary: "indigo",
    secondary: "sky",
    success: "emerald",
    info: "blue",
    warning: "orange",
    error: "rose",
  },
  darkColorShades: { ...DEFAULT_COLOR_SHADES },
  darkNeutral: "zinc",
  darkRadius: 0.375,
  darkFont: "Geist",
};

// Utility Functions ───────────────────────────────────────────────────────

/**
 * Convert a shade token value to the CSS value
 */
export function shadeToCSS(shade: string): string {
  if (shade === "white") return "white";
  if (shade === "black") return "black";
  return `var(--ui-color-neutral-${shade})`;
}

/**
 * Deep clone a ThemeConfig
 */
export function cloneTheme(theme: ThemeConfig): ThemeConfig {
  return structuredClone(toRaw(theme));
}
