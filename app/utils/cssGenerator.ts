import type {
  ThemeConfig,
  TokenOverrides,
  NeutralShade,
  NeutralPalette,
  TextTokenOverrides,
  BgTokenOverrides,
  BorderTokenOverrides,
  SemanticColorKey,
  SemanticColors,
  SemanticShades,
  ChromaticPalette,
} from "~/types/theme";
import { SEMANTIC_COLOR_KEYS, NUMERIC_SHADE_KEYS } from "~/types/theme";
import {
  shadeToCSS,
  CHROMATIC_HEX_MAP,
  NEUTRAL_HEX_MAP,
} from "~/utils/defaults";
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
 * Generate full palette hex CSS variable overrides for semantic colors
 * when the dark mode uses a different palette than light mode.
 * This remaps all shades of the semantic color to the dark palette's hex values.
 */
export function generateDarkPaletteOverrideLines(
  lightColors: SemanticColors,
  lightShades: SemanticShades,
  darkColors: SemanticColors,
  darkShades: SemanticShades,
  indent: string = "  ",
): string[] {
  const lines: string[] = [];

  for (const key of SEMANTIC_COLOR_KEYS) {
    const lightPalette = lightColors[key];
    const lightShade = lightShades[key];
    const darkPalette = darkColors[key];
    const darkShade = darkShades[key];

    // Only emit overrides if the dark palette or shade differs from light
    if (darkPalette === lightPalette && darkShade === lightShade) continue;

    // White/black: flatten entire palette to a single color
    if (darkShade === "white" || darkShade === "black") {
      const hex = darkShade === "white" ? "#ffffff" : "#000000";
      for (const targetShade of NUMERIC_SHADE_KEYS) {
        lines.push(`${indent}--ui-color-${key}-${targetShade}: ${hex};`);
      }
      continue;
    }

    const hexMap = CHROMATIC_HEX_MAP[darkPalette];
    if (!hexMap) continue;

    if (darkShade === "500" && darkPalette !== lightPalette) {
      // Simple remap: dark uses a different palette at default shade
      for (const shade of NUMERIC_SHADE_KEYS) {
        const hex = hexMap[shade];
        if (hex) {
          lines.push(`${indent}--ui-color-${key}-${shade}: ${hex};`);
        }
      }
    } else {
      // Shade-shifted remap
      const selectedIdx = NUMERIC_SHADE_KEYS.indexOf(darkShade);
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
  }

  return lines;
}

/**
 * Generate CSS variable overrides for the neutral palette in dark mode
 * when it differs from the light mode neutral.
 */
export function generateDarkNeutralOverrideLines(
  lightNeutral: NeutralPalette,
  darkNeutral: NeutralPalette,
  indent: string = "  ",
): string[] {
  if (darkNeutral === lightNeutral) return [];
  const hexMap = NEUTRAL_HEX_MAP[darkNeutral];
  if (!hexMap) return [];

  const lines: string[] = [];
  for (const shade of NUMERIC_SHADE_KEYS) {
    const hex = hexMap[shade];
    if (hex) {
      lines.push(`${indent}--ui-color-neutral-${shade}: ${hex};`);
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

  // Shade-shifted palette overrides for light mode
  rootLines.push(
    ...generateShadeOverrideLines(config.colors, config.colorShades),
  );

  rootLines.push(`}`);

  // Dark mode block: token overrides + palette/neutral/radius/font differences
  const darkLines: string[] = [];

  // Dark radius (if different from light)
  const safeDarkRadius = Math.max(
    0,
    Math.min(Number(config.darkRadius) || 0, 2),
  );
  if (safeDarkRadius !== safeRadius) {
    darkLines.push(`  --ui-radius: ${safeDarkRadius}rem;`);
  }

  // Dark font (if different from light)
  if (config.darkFont !== config.font) {
    darkLines.push(
      `  --font-sans: '${sanitizeCSSValue(config.darkFont)}', ui-sans-serif, system-ui, sans-serif;`,
    );
  }

  // Dark token overrides (text/bg/border shades)
  darkLines.push(...generateOverrideLines(config.darkOverrides, darkDefaults));

  // Dark palette overrides (when dark colors/shades differ from light)
  darkLines.push(
    ...generateDarkPaletteOverrideLines(
      config.colors,
      config.colorShades,
      config.darkColors,
      config.darkColorShades,
    ),
  );

  // Dark neutral overrides (when dark neutral differs from light)
  darkLines.push(
    ...generateDarkNeutralOverrideLines(config.neutral, config.darkNeutral),
  );

  const darkCSS =
    darkLines.length > 0 ? [`.dark {`, ...darkLines, `}`].join("\n") : "";

  return {
    rootCSS: rootLines.join("\n"),
    darkCSS,
  };
}
