import type { ThemeConfig } from "~/types/theme";
import { SEMANTIC_COLOR_KEYS } from "~/types/theme";
import { NEUTRAL_HEX_MAP } from "~/utils/colorPalettes";
import { getPaletteShadeMap } from "~/utils/customPalettes";

export type SwatchMode = "light" | "dark";

export interface ModeSwatch {
  /** Semantic role, or "neutral". */
  key: string;
  palette: string;
  shade: string;
  /** CSS color value. */
  color: string;
}

const FALLBACK_COLOR = "#71717a";

function shadeColor(
  palette: string,
  shade: string,
  config: ThemeConfig,
): string {
  if (shade === "white") return "#ffffff";
  if (shade === "black") return "#000000";
  return getPaletteShadeMap(palette, config.customPalettes)[shade] ?? FALLBACK_COLOR;
}

/**
 * The color each semantic role (plus neutral at 500) resolves to in one color
 * mode, following the same palette + shade pick as the preset swatch strips.
 */
export function getModeSwatches(
  config: ThemeConfig,
  mode: SwatchMode,
): ModeSwatch[] {
  const colors = mode === "dark" ? config.darkColors : config.colors;
  const shades = mode === "dark" ? config.darkColorShades : config.colorShades;
  const neutral = mode === "dark" ? config.darkNeutral : config.neutral;

  return [
    ...SEMANTIC_COLOR_KEYS.map((key) => ({
      key,
      palette: colors[key],
      shade: shades[key],
      color: shadeColor(colors[key], shades[key], config),
    })),
    {
      key: "neutral",
      palette: neutral,
      shade: "500",
      color: NEUTRAL_HEX_MAP[neutral]?.["500"] ?? FALLBACK_COLOR,
    },
  ];
}

/**
 * The mode's page background (`--ui-bg`), from its `bg.default` token and
 * neutral palette, so each row of swatches sits on the surface it will
 * actually appear on.
 */
export function getModeSurface(config: ThemeConfig, mode: SwatchMode): string {
  const overrides = mode === "dark" ? config.darkOverrides : config.lightOverrides;
  const neutral = mode === "dark" ? config.darkNeutral : config.neutral;
  const shade = overrides.bg.default;
  if (shade === "white") return "#ffffff";
  if (shade === "black") return "#000000";
  return (
    NEUTRAL_HEX_MAP[neutral]?.[shade] ??
    (mode === "dark" ? "#18181b" : "#ffffff")
  );
}
