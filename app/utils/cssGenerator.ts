import type {
  ThemeConfig,
  TokenOverrides,
  NeutralShade,
  TextTokenOverrides,
  BgTokenOverrides,
  BorderTokenOverrides,
  SemanticColorKey,
  ChromaticPalette,
} from "~/types/theme";
import { SEMANTIC_COLOR_KEYS, NUMERIC_SHADE_KEYS } from "~/types/theme";
import { shadeToCSS, CHROMATIC_HEX_MAP } from "~/utils/defaults";
import { typedEntries } from "~/utils/helpers";

type TokenCategory = "text" | "bg" | "border";

/** Strip characters that could break out of a CSS string or inject rules */
function sanitizeCSSValue(value: string): string {
  return value.replace(/[;<>{}()\\/"'`]/g, "");
}

const CSS_PREFIX_MAP: Record<TokenCategory, string> = {
  text: "--ui-text",
  bg: "--ui-bg",
  border: "--ui-border",
};

/**
 * Generate CSS variable lines for a single token category (text, bg, or border),
 * only emitting overrides that differ from defaults.
 */
function generateCategoryLines(
  category: TokenCategory,
  overrides: Record<string, NeutralShade>,
  defaults: Record<string, NeutralShade>,
  indent: string = "  ",
): string[] {
  const prefix = CSS_PREFIX_MAP[category];
  const lines: string[] = [];

  for (const [key, shade] of typedEntries(overrides)) {
    if (shade !== defaults[key]) {
      const varName = key === "default" ? prefix : `${prefix}-${key}`;
      lines.push(`${indent}${varName}: ${shadeToCSS(shade)};`);
    }
  }

  return lines;
}

type CategoryOverrideMap = {
  text: TextTokenOverrides;
  bg: BgTokenOverrides;
  border: BorderTokenOverrides;
};

/**
 * Generate all CSS variable override lines for a set of token overrides.
 */
export function generateOverrideLines(
  overrides: TokenOverrides,
  defaults: TokenOverrides,
  indent: string = "  ",
): string[] {
  const lines: string[] = [];
  const categories: TokenCategory[] = ["text", "bg", "border"];

  for (const cat of categories) {
    lines.push(
      ...generateCategoryLines(
        cat,
        overrides[cat] as CategoryOverrideMap[typeof cat] &
          Record<string, NeutralShade>,
        defaults[cat] as CategoryOverrideMap[typeof cat] &
          Record<string, NeutralShade>,
        indent,
      ),
    );
  }

  return lines;
}

export interface ThemeCSSResult {
  /** CSS for :root (light mode + global tokens) */
  rootCSS: string;
  /** CSS for .dark {} block */
  darkCSS: string;
}

const DEFAULT_SHADE_INDEX = NUMERIC_SHADE_KEYS.indexOf("500");

/**
 * Generate CSS variable overrides that remap a semantic color's palette shades.
 * When the user selects a shade other than 500, the palette is shifted so the
 * selected shade becomes the "center" (500) of the output palette.
 *
 * For example, selecting 400 for primary=indigo means:
 *   --ui-color-primary-500 gets indigo-400's hex value
 *   --ui-color-primary-600 gets indigo-500's hex value
 *   (clamped at palette boundaries)
 */
export function generateShadeOverrideLines(
  colors: Record<SemanticColorKey, ChromaticPalette>,
  colorShades: Record<SemanticColorKey, NeutralShade>,
  indent: string = "  ",
): string[] {
  const lines: string[] = [];

  for (const key of SEMANTIC_COLOR_KEYS) {
    const shade = colorShades[key];
    if (shade === "500") continue;

    // White/black: flatten entire palette to a single color
    if (shade === "white" || shade === "black") {
      const hex = shade === "white" ? "#ffffff" : "#000000";
      for (const targetShade of NUMERIC_SHADE_KEYS) {
        lines.push(`${indent}--ui-color-${key}-${targetShade}: ${hex};`);
      }
      continue;
    }

    const palette = colors[key];
    const hexMap = CHROMATIC_HEX_MAP[palette];
    if (!hexMap) continue;

    const selectedIdx = NUMERIC_SHADE_KEYS.indexOf(shade);
    const offset = selectedIdx - DEFAULT_SHADE_INDEX;

    for (let i = 0; i < NUMERIC_SHADE_KEYS.length; i++) {
      const targetShade = NUMERIC_SHADE_KEYS[i];
      const sourceIdx = Math.max(
        0,
        Math.min(i + offset, NUMERIC_SHADE_KEYS.length - 1),
      );
      const sourceShade = NUMERIC_SHADE_KEYS[sourceIdx]!;
      const hex = hexMap[sourceShade];
      if (hex) {
        lines.push(`${indent}--ui-color-${key}-${targetShade}: ${hex};`);
      }
    }
  }

  return lines;
}

/**
 * Generate the complete theme CSS override string for both light and dark modes.
 * Used by both useThemeApply (DOM injection) and useThemeExport (export output).
 */
export function generateThemeCSS(
  config: ThemeConfig,
  lightDefaults: TokenOverrides,
  darkDefaults: TokenOverrides,
): ThemeCSSResult {
  const rootLines: string[] = [];
  rootLines.push(`:root {`);
  rootLines.push(
    `  --font-sans: '${sanitizeCSSValue(config.font)}', ui-sans-serif, system-ui, sans-serif;`,
  );
  const safeRadius = Math.max(0, Math.min(Number(config.radius) || 0, 2));
  rootLines.push(`  --ui-radius: ${safeRadius}rem;`);

  rootLines.push(
    ...generateOverrideLines(config.lightOverrides, lightDefaults),
  );

  // Shade-shifted palette overrides (when any semantic color uses a non-default shade)
  rootLines.push(
    ...generateShadeOverrideLines(config.colors, config.colorShades),
  );

  rootLines.push(`}`);

  const darkOverrideLines = generateOverrideLines(
    config.darkOverrides,
    darkDefaults,
  );
  const darkLines: string[] = [];
  if (darkOverrideLines.length > 0) {
    darkLines.push(`.dark {`);
    darkLines.push(...darkOverrideLines);
    darkLines.push(`}`);
  }

  return {
    rootCSS: rootLines.join("\n"),
    darkCSS: darkLines.join("\n"),
  };
}
