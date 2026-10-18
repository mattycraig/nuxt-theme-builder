/**
 * Exports for tools outside Nuxt UI: a Design Tokens JSON file (Tokens Studio
 * / Figma variables, W3C DTCG `$value` / `$type` syntax) and a standalone
 * Tailwind CSS v4 theme. Both use the literal hex values Nuxt UI renders in
 * each mode (see `themeResolve.ts`).
 */
import type { ThemeConfig } from "~/types/theme";
import {
  BG_TOKEN_KEYS,
  BORDER_TOKEN_KEYS,
  NUMERIC_SHADE_KEYS,
  SEMANTIC_COLOR_KEYS,
  TEXT_TOKEN_KEYS,
  getFontFallbackStack,
} from "~/types/theme";
import type { ColorMode } from "~/utils/themeResolve";
import {
  resolveNeutralScale,
  resolveRoleColor,
  resolveRoleScale,
  resolveTokens,
} from "~/utils/themeResolve";

const MODES: readonly ColorMode[] = ["light", "dark"];

/** Nuxt UI's radius scale, as multiples of `--ui-radius`. */
export const RADIUS_SCALE = {
  xs: 0.5,
  sm: 1,
  md: 1.5,
  lg: 2,
  xl: 3,
  "2xl": 4,
  "3xl": 6,
} as const;

function modeRadius(config: ThemeConfig, mode: ColorMode): number {
  const value = mode === "dark" ? config.darkRadius : config.radius;
  return Math.max(0, Math.min(Number(value) || 0, 2));
}

function rem(value: number): string {
  return `${+value.toFixed(4)}rem`;
}

/** Font name plus its fallback stack, without quotes. */
function fontStack(config: ThemeConfig, mode: ColorMode): string[] {
  const font = mode === "dark" ? config.darkFont : config.font;
  const fallbacks = getFontFallbackStack(font)
    .split(",")
    .map((f) => f.trim().replace(/^['"]|['"]$/g, ""));
  return [font.replace(/['"\\;{}<>]/g, ""), ...fallbacks];
}

function cssFontStack(config: ThemeConfig, mode: ColorMode): string {
  return fontStack(config, mode)
    .map((f) => (/\s/.test(f) ? `'${f}'` : f))
    .join(", ");
}

/** CSS variable → value for one mode of the Tailwind theme. */
function tailwindVariables(
  config: ThemeConfig,
  mode: ColorMode,
): [string, string][] {
  const vars: [string, string][] = [
    ["--font-sans", cssFontStack(config, mode)],
  ];
  for (const role of SEMANTIC_COLOR_KEYS) {
    vars.push([`--color-${role}`, resolveRoleColor(config, mode, role)]);
    const scale = resolveRoleScale(config, mode, role);
    for (const shade of NUMERIC_SHADE_KEYS) {
      vars.push([`--color-${role}-${shade}`, scale[shade]]);
    }
  }
  const neutral = resolveNeutralScale(config, mode);
  for (const shade of NUMERIC_SHADE_KEYS) {
    vars.push([`--color-neutral-${shade}`, neutral[shade]]);
  }
  const tokens = resolveTokens(config, mode);
  for (const key of TEXT_TOKEN_KEYS) {
    vars.push([`--text-color-${key}`, tokens.text[key]]);
  }
  for (const key of BG_TOKEN_KEYS) {
    vars.push([`--background-color-${key}`, tokens.bg[key]]);
  }
  for (const key of BORDER_TOKEN_KEYS) {
    vars.push([`--border-color-${key}`, tokens.border[key]]);
  }
  const radius = modeRadius(config, mode);
  for (const [size, factor] of Object.entries(RADIUS_SCALE)) {
    vars.push([`--radius-${size}`, rem(radius * factor)]);
  }
  return vars;
}

/**
 * A standalone Tailwind CSS v4 theme for projects without Nuxt UI. Utility
 * names match Nuxt UI's (`bg-primary`, `text-muted`, `bg-elevated`,
 * `border-accented`, `rounded-md`), and dark mode follows a `.dark` class.
 */
export function generateTailwindTheme(config: ThemeConfig): string {
  const light = tailwindVariables(config, "light");
  const lightValues = new Map(light);
  const darkDiff = tailwindVariables(config, "dark").filter(
    ([name, value]) => lightValues.get(name) !== value,
  );

  const lines = [
    `/*`,
    ` * Tailwind CSS v4 theme from Nuxt UI Theme Builder (nuxt-ui-themes.com).`,
    ` * Works without Nuxt UI. Utilities match Nuxt UI's names: bg-primary,`,
    ` * text-muted, bg-elevated, border-accented, rounded-md, and so on.`,
    ` * Dark mode applies when <html> has the "dark" class.`,
    ` */`,
    `@import "tailwindcss";`,
    ``,
    `@custom-variant dark (&:where(.dark, .dark *));`,
    ``,
    `@theme {`,
    ...light.map(([name, value]) => `  ${name}: ${value};`),
    `}`,
  ];
  if (darkDiff.length) {
    lines.push(
      ``,
      `.dark {`,
      ...darkDiff.map(([name, value]) => `  ${name}: ${value};`),
      `}`,
    );
  }
  lines.push(
    ``,
    `@layer base {`,
    `  body {`,
    `    background-color: var(--background-color-default);`,
    `    color: var(--text-color-default);`,
    `  }`,
    `}`,
  );
  return lines.join("\n");
}

interface Token {
  $type: "color" | "dimension" | "fontFamily";
  $value: string | string[];
}

const color = (value: string): Token => ({ $type: "color", $value: value });

function modeTokens(config: ThemeConfig, mode: ColorMode) {
  const colorGroup: Record<string, Record<string, Token>> = {};
  for (const role of SEMANTIC_COLOR_KEYS) {
    const scale = resolveRoleScale(config, mode, role);
    colorGroup[role] = {
      DEFAULT: color(resolveRoleColor(config, mode, role)),
      ...Object.fromEntries(
        NUMERIC_SHADE_KEYS.map((shade) => [shade, color(scale[shade])]),
      ),
    };
  }
  const neutral = resolveNeutralScale(config, mode);
  colorGroup.neutral = Object.fromEntries(
    NUMERIC_SHADE_KEYS.map((shade) => [shade, color(neutral[shade])]),
  );

  const tokens = resolveTokens(config, mode);
  const group = (values: Record<string, string>) =>
    Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, color(value)]),
    );
  const radius = modeRadius(config, mode);

  return {
    color: colorGroup,
    text: group(tokens.text),
    bg: group(tokens.bg),
    border: group(tokens.border),
    radius: Object.fromEntries(
      Object.entries(RADIUS_SCALE).map(([size, factor]) => [
        size,
        { $type: "dimension", $value: rem(radius * factor) } satisfies Token,
      ]),
    ),
    font: {
      sans: { $type: "fontFamily", $value: fontStack(config, mode) } satisfies Token,
    },
  };
}

/**
 * Design tokens for both modes as JSON, one top-level group per mode
 * (`light`, `dark`), which Tokens Studio imports as two token sets.
 */
export function generateDesignTokens(config: ThemeConfig): string {
  const tokens = {
    $description:
      "Nuxt UI theme from Nuxt UI Theme Builder (nuxt-ui-themes.com). color.<role>.DEFAULT is the role's main color (--ui-<role>); text, bg, and border mirror Nuxt UI's --ui-text-*, --ui-bg-*, and --ui-border-* tokens.",
    ...Object.fromEntries(MODES.map((mode) => [mode, modeTokens(config, mode)])),
  };
  return JSON.stringify(tokens, null, 2);
}
