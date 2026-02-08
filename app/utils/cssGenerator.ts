import type {
  ThemeConfig,
  TokenOverrides,
  NeutralShade,
  TextTokenOverrides,
  BgTokenOverrides,
  BorderTokenOverrides,
} from "~/types/theme";
import { shadeToCSS } from "~/utils/defaults";
import { typedEntries } from "~/utils/helpers";

type TokenCategory = "text" | "bg" | "border";

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
        overrides[cat] as CategoryOverrideMap[typeof cat] & Record<string, NeutralShade>,
        defaults[cat] as CategoryOverrideMap[typeof cat] & Record<string, NeutralShade>,
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
    `  --font-sans: '${config.font}', ui-sans-serif, system-ui, sans-serif;`,
  );
  rootLines.push(`  --ui-radius: ${config.radius}rem;`);

  rootLines.push(
    ...generateOverrideLines(config.lightOverrides, lightDefaults),
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
