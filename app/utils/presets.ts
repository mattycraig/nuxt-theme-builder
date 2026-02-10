import type { ThemePreset, ThemeConfig } from "~/types/theme";
import {
  DEFAULT_THEME,
  DEFAULT_LIGHT_OVERRIDES,
  DEFAULT_DARK_OVERRIDES,
  DEFAULT_COLOR_SHADES,
} from "~/utils/defaults";

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

export const BUILT_IN_PRESETS: ThemePreset[] = [
  {
    name: "Default",
    builtIn: true,
    config: DEFAULT_THEME,
  },
  {
    name: "Ocean",
    builtIn: true,
    config: preset({
      colors: {
        primary: "cyan",
        secondary: "blue",
        success: "teal",
        info: "sky",
        warning: "amber",
        error: "rose",
      },
      neutral: "slate",
      radius: 0.375,
      font: "Inter",
      lightOverrides: DEFAULT_LIGHT_OVERRIDES,
      darkOverrides: DEFAULT_DARK_OVERRIDES,
    }),
  },
  {
    name: "Forest",
    builtIn: true,
    config: preset({
      colors: {
        primary: "emerald",
        secondary: "lime",
        success: "green",
        info: "teal",
        warning: "amber",
        error: "red",
      },
      neutral: "stone",
      radius: 0.5,
      font: "DM Sans",
      lightOverrides: DEFAULT_LIGHT_OVERRIDES,
      darkOverrides: DEFAULT_DARK_OVERRIDES,
    }),
  },
  {
    name: "Sunset",
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
      neutral: "zinc",
      radius: 0.375,
      font: "Poppins",
      lightOverrides: DEFAULT_LIGHT_OVERRIDES,
      darkOverrides: DEFAULT_DARK_OVERRIDES,
    }),
  },
  {
    name: "Dark Mono",
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
      neutral: "neutral",
      radius: 0.25,
      font: "Geist",
      lightOverrides: {
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
          inverted: "950",
        },
        border: {
          default: "200",
          muted: "200",
          accented: "300",
          inverted: "950",
        },
      },
      darkOverrides: {
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
      },
    }),
  },
  {
    name: "Rose Gold",
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
      neutral: "stone",
      radius: 0.5,
      font: "Outfit",
      lightOverrides: DEFAULT_LIGHT_OVERRIDES,
      darkOverrides: DEFAULT_DARK_OVERRIDES,
    }),
  },
  {
    name: "Corporate",
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
      neutral: "gray",
      radius: 0.25,
      font: "Inter",
      lightOverrides: DEFAULT_LIGHT_OVERRIDES,
      darkOverrides: DEFAULT_DARK_OVERRIDES,
    }),
  },
  {
    name: "Lavender",
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
      neutral: "zinc",
      radius: 0.5,
      font: "Poppins",
      lightOverrides: DEFAULT_LIGHT_OVERRIDES,
      darkOverrides: DEFAULT_DARK_OVERRIDES,
    }),
  },
  {
    name: "Minimal",
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
      neutral: "neutral",
      radius: 0,
      font: "Geist",
      lightOverrides: {
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
      },
      darkOverrides: {
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
      },
    }),
  },
  {
    name: "Sahara",
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
      neutral: "stone",
      radius: 0.375,
      font: "Raleway",
      lightOverrides: DEFAULT_LIGHT_OVERRIDES,
      darkOverrides: DEFAULT_DARK_OVERRIDES,
    }),
  },
  {
    name: "Arctic",
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
      neutral: "slate",
      radius: 0.5,
      font: "Public Sans",
      lightOverrides: DEFAULT_LIGHT_OVERRIDES,
      darkOverrides: DEFAULT_DARK_OVERRIDES,
    }),
  },
  {
    name: "Neon",
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
      neutral: "zinc",
      radius: 0.75,
      font: "Outfit",
      lightOverrides: DEFAULT_LIGHT_OVERRIDES,
      darkOverrides: DEFAULT_DARK_OVERRIDES,
    }),
  },
  {
    name: "Midnight",
    builtIn: true,
    config: preset({
      colors: {
        primary: "blue",
        secondary: "indigo",
        success: "emerald",
        info: "cyan",
        warning: "amber",
        error: "rose",
      },
      neutral: "gray",
      radius: 0.375,
      font: "Geist",
      lightOverrides: DEFAULT_LIGHT_OVERRIDES,
      darkOverrides: {
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
      },
    }),
  },
];
