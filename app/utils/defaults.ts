import type {
  ThemeConfig,
  TokenOverrides,
  TextTokenOverrides,
  BgTokenOverrides,
  BorderTokenOverrides,
} from "~/types/theme";
import { toRaw } from "vue";

const DEFAULT_TEXT_LIGHT: TextTokenOverrides = {
  dimmed: "400",
  muted: "500",
  toned: "600",
  default: "700",
  highlighted: "900",
  inverted: "white",
};

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

export const DEFAULT_THEME: ThemeConfig = {
  colors: {
    primary: "green",
    secondary: "blue",
    success: "green",
    info: "blue",
    warning: "yellow",
    error: "red",
  },
  neutral: "slate",
  radius: 0.25,
  font: "Public Sans",
  lightOverrides: { ...DEFAULT_LIGHT_OVERRIDES },
  darkOverrides: { ...DEFAULT_DARK_OVERRIDES },
};

export const NEUTRAL_HEX_MAP: Record<string, Record<string, string>> = {
  slate: {
    "50": "#f8fafc",
    "100": "#f1f5f9",
    "200": "#e2e8f0",
    "300": "#cbd5e1",
    "400": "#94a3b8",
    "500": "#64748b",
    "600": "#475569",
    "700": "#334155",
    "800": "#1e293b",
    "900": "#0f172a",
    "950": "#020617",
    white: "#ffffff",
    black: "#000000",
  },
  gray: {
    "50": "#f9fafb",
    "100": "#f3f4f6",
    "200": "#e5e7eb",
    "300": "#d1d5db",
    "400": "#9ca3af",
    "500": "#6b7280",
    "600": "#4b5563",
    "700": "#374151",
    "800": "#1f2937",
    "900": "#111827",
    "950": "#030712",
    white: "#ffffff",
    black: "#000000",
  },
  zinc: {
    "50": "#fafafa",
    "100": "#f4f4f5",
    "200": "#e4e4e7",
    "300": "#d4d4d8",
    "400": "#a1a1aa",
    "500": "#71717a",
    "600": "#52525b",
    "700": "#3f3f46",
    "800": "#27272a",
    "900": "#18181b",
    "950": "#09090b",
    white: "#ffffff",
    black: "#000000",
  },
  neutral: {
    "50": "#fafafa",
    "100": "#f5f5f5",
    "200": "#e5e5e5",
    "300": "#d4d4d4",
    "400": "#a3a3a3",
    "500": "#737373",
    "600": "#525252",
    "700": "#404040",
    "800": "#262626",
    "900": "#171717",
    "950": "#0a0a0a",
    white: "#ffffff",
    black: "#000000",
  },
  stone: {
    "50": "#fafaf9",
    "100": "#f5f5f4",
    "200": "#e7e5e4",
    "300": "#d6d3d1",
    "400": "#a8a29e",
    "500": "#78716c",
    "600": "#57534e",
    "700": "#44403c",
    "800": "#292524",
    "900": "#1c1917",
    "950": "#0c0a09",
    white: "#ffffff",
    black: "#000000",
  },
};

export const CHROMATIC_SWATCH_HEX: Record<string, string> = {
  red: "#ef4444",
  orange: "#f97316",
  amber: "#f59e0b",
  yellow: "#eab308",
  lime: "#84cc16",
  green: "#22c55e",
  emerald: "#10b981",
  teal: "#14b8a6",
  cyan: "#06b6d4",
  sky: "#0ea5e9",
  blue: "#3b82f6",
  indigo: "#6366f1",
  violet: "#8b5cf6",
  purple: "#a855f7",
  fuchsia: "#d946ef",
  pink: "#ec4899",
  rose: "#f43f5e",
};

export const NEUTRAL_SWATCH_HEX: Record<string, string> = {
  slate: "#64748b",
  gray: "#6b7280",
  zinc: "#71717a",
  neutral: "#737373",
  stone: "#78716c",
};

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
