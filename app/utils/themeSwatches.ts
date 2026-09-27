/**
 * Resolve a ThemeConfig into concrete CSS color values for one color mode.
 *
 * The theme gallery (`/themes`) and the generated share images render a
 * theme that isn't the one being edited, so they can't use the live
 * `--ui-*` variables and need literal colors instead.
 */
import type { ThemeConfig } from "~/types/theme";
import { SEMANTIC_COLOR_KEYS } from "~/types/theme";
import { NEUTRAL_HEX_MAP } from "~/utils/colorPalettes";
import { getPaletteShadeMap } from "~/utils/customPalettes";

export type SwatchMode = "light" | "dark";

export interface SemanticSwatch {
  key: (typeof SEMANTIC_COLOR_KEYS)[number];
  palette: string;
  shade: string;
  color: string;
}

export interface ModeSwatches {
  mode: SwatchMode;
  semantic: SemanticSwatch[];
  neutral: string;
  bg: string;
  bgElevated: string;
  border: string;
  text: string;
  textHighlighted: string;
  textMuted: string;
  /** Label color on solid semantic fills (Nuxt UI's `text-inverted`). */
  textInverted: string;
  radius: number;
  font: string;
}

function paletteColor(
  config: ThemeConfig,
  palette: string,
  shade: string,
): string {
  return (
    getPaletteShadeMap(palette, config.customPalettes)[shade] ?? "transparent"
  );
}

function neutralColor(neutral: string, shade: string): string {
  return (
    NEUTRAL_HEX_MAP[neutral]?.[shade] ??
    NEUTRAL_HEX_MAP.neutral?.[shade] ??
    "transparent"
  );
}

export function resolveModeSwatches(
  config: ThemeConfig,
  mode: SwatchMode,
): ModeSwatches {
  const dark = mode === "dark";
  const colors = dark ? config.darkColors : config.colors;
  const shades = dark ? config.darkColorShades : config.colorShades;
  const neutral = dark ? config.darkNeutral : config.neutral;
  const tokens = dark ? config.darkOverrides : config.lightOverrides;

  return {
    mode,
    semantic: SEMANTIC_COLOR_KEYS.map((key) => ({
      key,
      palette: colors[key],
      shade: shades[key],
      color: paletteColor(config, colors[key], shades[key]),
    })),
    neutral,
    bg: neutralColor(neutral, tokens.bg.default),
    bgElevated: neutralColor(neutral, tokens.bg.elevated),
    border: neutralColor(neutral, tokens.border.default),
    text: neutralColor(neutral, tokens.text.default),
    textHighlighted: neutralColor(neutral, tokens.text.highlighted),
    textMuted: neutralColor(neutral, tokens.text.muted),
    textInverted: neutralColor(neutral, tokens.text.inverted),
    radius: dark ? config.darkRadius : config.radius,
    font: dark ? config.darkFont : config.font,
  };
}
