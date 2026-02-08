import type { ThemePreset } from "~/types/theme";
import {
  DEFAULT_THEME,
  DEFAULT_LIGHT_OVERRIDES,
  DEFAULT_DARK_OVERRIDES,
} from "~/utils/defaults";

export const BUILT_IN_PRESETS: ThemePreset[] = [
  {
    name: "Default",
    builtIn: true,
    config: DEFAULT_THEME,
  },
  {
    name: "Ocean",
    builtIn: true,
    config: {
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
    },
  },
  {
    name: "Forest",
    builtIn: true,
    config: {
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
    },
  },
  {
    name: "Sunset",
    builtIn: true,
    config: {
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
    },
  },
  {
    name: "Dark Mono",
    builtIn: true,
    config: {
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
    },
  },
];
