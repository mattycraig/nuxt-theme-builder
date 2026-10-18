/**
 * Resolve a ThemeConfig into the exact colors Nuxt UI renders in one color
 * mode, as hex: each role's shade-shifted 50–950 scale, the role's main color
 * (`--ui-<role>`), the neutral scale, and the text / background / border
 * tokens. Used where literal colors are needed (contrast checks, token
 * exports) and must match what `generateThemeCSS` produces.
 */
import type {
  BgTokenKey,
  BorderTokenKey,
  NeutralShade,
  NumericShade,
  SemanticColorKey,
  TextTokenKey,
  ThemeConfig,
} from "~/types/theme";
import {
  BG_TOKEN_KEYS,
  BORDER_TOKEN_KEYS,
  NUMERIC_SHADE_KEYS,
  TEXT_TOKEN_KEYS,
} from "~/types/theme";
import { NEUTRAL_HEX_MAP } from "~/utils/colorPalettes";
import { parseColor, rgbToHex } from "~/utils/colorConversion";
import { getPaletteShadeMap } from "~/utils/customPalettes";

export type ColorMode = "light" | "dark";

export type ShadeScale = Record<NumericShade, string>;

/**
 * Scale step Nuxt UI uses for `--ui-<role>`: `var(--ui-color-<role>-500)` in
 * light mode and `-400` in dark mode.
 */
export const ROLE_MAIN_SHADE: Record<ColorMode, NumericShade> = {
  light: "500",
  dark: "400",
};

const FALLBACK_HEX = "#71717a";
const DEFAULT_INDEX = NUMERIC_SHADE_KEYS.indexOf("500");

/** Any CSS color from the palette maps (hex or `oklch(…)`) as lowercase hex. */
export function toHex(value: string | undefined): string {
  const parsed = value ? parseColor(value) : null;
  return parsed ? rgbToHex(parsed.rgb) : FALLBACK_HEX;
}

function flatScale(hex: string): ShadeScale {
  return Object.fromEntries(
    NUMERIC_SHADE_KEYS.map((shade) => [shade, hex]),
  ) as ShadeScale;
}

/**
 * Shift a palette so `shade` lands on 500 (clamped at 50 and 950), the way
 * the editor's shade picker does. `white` / `black` flatten the scale.
 */
export function shiftScale(
  palette: Record<string, string>,
  shade: NeutralShade,
): ShadeScale {
  if (shade === "white") return flatScale("#ffffff");
  if (shade === "black") return flatScale("#000000");
  const offset = NUMERIC_SHADE_KEYS.indexOf(shade) - DEFAULT_INDEX;
  const last = NUMERIC_SHADE_KEYS.length - 1;
  return Object.fromEntries(
    NUMERIC_SHADE_KEYS.map((target, i) => {
      const source = NUMERIC_SHADE_KEYS[Math.max(0, Math.min(i + offset, last))]!;
      return [target, toHex(palette[source])];
    }),
  ) as ShadeScale;
}

/** `--ui-color-<role>-50…950` in one mode. */
export function resolveRoleScale(
  config: ThemeConfig,
  mode: ColorMode,
  role: SemanticColorKey,
): ShadeScale {
  const colors = mode === "dark" ? config.darkColors : config.colors;
  const shades = mode === "dark" ? config.darkColorShades : config.colorShades;
  return shiftScale(
    getPaletteShadeMap(colors[role], config.customPalettes),
    shades[role],
  );
}

/** `--ui-<role>`: the color of solid buttons, links, and `text-<role>`. */
export function resolveRoleColor(
  config: ThemeConfig,
  mode: ColorMode,
  role: SemanticColorKey,
): string {
  return resolveRoleScale(config, mode, role)[ROLE_MAIN_SHADE[mode]];
}

/** `--ui-color-neutral-50…950` in one mode. */
export function resolveNeutralScale(
  config: ThemeConfig,
  mode: ColorMode,
): ShadeScale {
  const neutral = mode === "dark" ? config.darkNeutral : config.neutral;
  const palette = NEUTRAL_HEX_MAP[neutral] ?? {};
  return Object.fromEntries(
    NUMERIC_SHADE_KEYS.map((shade) => [shade, toHex(palette[shade])]),
  ) as ShadeScale;
}

/** The color a text / bg / border token set to `shade` resolves to. */
export function resolveNeutralShade(
  config: ThemeConfig,
  mode: ColorMode,
  shade: NeutralShade,
): string {
  if (shade === "white") return "#ffffff";
  if (shade === "black") return "#000000";
  return resolveNeutralScale(config, mode)[shade];
}

export interface ResolvedTokens {
  text: Record<TextTokenKey, string>;
  bg: Record<BgTokenKey, string>;
  border: Record<BorderTokenKey, string>;
}

/** `--ui-text-*`, `--ui-bg-*`, and `--ui-border-*` in one mode. */
export function resolveTokens(
  config: ThemeConfig,
  mode: ColorMode,
): ResolvedTokens {
  const overrides =
    mode === "dark" ? config.darkOverrides : config.lightOverrides;
  const pick = <K extends string>(
    keys: readonly K[],
    shades: Record<K, NeutralShade>,
  ) =>
    Object.fromEntries(
      keys.map((key) => [key, resolveNeutralShade(config, mode, shades[key])]),
    ) as Record<K, string>;
  return {
    text: pick(TEXT_TOKEN_KEYS, overrides.text),
    bg: pick(BG_TOKEN_KEYS, overrides.bg),
    border: pick(BORDER_TOKEN_KEYS, overrides.border),
  };
}
