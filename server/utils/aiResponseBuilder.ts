import { DEFAULT_COLOR_SHADES } from "~~/shared/constants/theme";
import {
  AI_FALLBACK_LIGHT_OVERRIDES,
  AI_FALLBACK_DARK_OVERRIDES,
} from "~~/shared/constants/aiDefaults";

export interface AiGeneratedObject {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    info: string;
    warning: string;
    error: string;
  };
  neutral: string;
  radius: number;
  font: string;
  darkColors: {
    primary: string;
    secondary: string;
    success: string;
    info: string;
    warning: string;
    error: string;
  } | null;
  darkNeutral: string | null;
  darkRadius: number | null;
  darkFont: string | null;
  lightOverrides: Record<string, Record<string, string>> | null;
  darkOverrides: Record<string, Record<string, string>> | null;
  explanation: string;
}

export function buildThemeConfig(raw: AiGeneratedObject) {
  const {
    explanation,
    lightOverrides,
    darkOverrides,
    darkColors,
    darkNeutral,
    darkRadius,
    darkFont,
    ...lightFields
  } = raw;

  return {
    themeConfig: {
      ...lightFields,
      lightOverrides: lightOverrides ?? AI_FALLBACK_LIGHT_OVERRIDES,
      darkOverrides: darkOverrides ?? AI_FALLBACK_DARK_OVERRIDES,
      colorShades: { ...DEFAULT_COLOR_SHADES },
      darkColors: darkColors ?? lightFields.colors,
      darkColorShades: { ...DEFAULT_COLOR_SHADES },
      darkNeutral: darkNeutral ?? lightFields.neutral,
      darkRadius: darkRadius ?? lightFields.radius,
      darkFont: darkFont ?? lightFields.font,
    },
    explanation,
  };
}
