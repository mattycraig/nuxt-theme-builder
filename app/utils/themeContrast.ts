/**
 * WCAG contrast checks for the text and color pairs a Nuxt UI theme actually
 * renders in one color mode, plus the nearest shade change that fixes each
 * failing pair.
 */
import type {
  BgTokenKey,
  NeutralShade,
  NumericShade,
  SemanticColorKey,
  TextTokenKey,
  ThemeConfig,
} from "~/types/theme";
import {
  NUMERIC_SHADE_KEYS,
  SEMANTIC_COLOR_KEYS,
} from "~/types/theme";
import { getContrastRatio, hexToRgb } from "~/utils/colorConversion";
import { capitalize } from "~/utils/helpers";
import { cloneTheme } from "~/utils/defaults";
import type { ColorMode } from "~/utils/themeResolve";
import { resolveRoleColor, resolveTokens } from "~/utils/themeResolve";

/** WCAG 2.2 AA minimum for normal-size text. */
export const WCAG_AA = 4.5;
/** WCAG 2.2 AAA minimum for normal-size text. */
export const WCAG_AAA = 7;
/** WCAG 2.2 AA minimum for large text (18pt, or 14pt bold). */
export const WCAG_AA_LARGE = 3;

export type ContrastRating = "AAA" | "AA" | "AA Large" | "Fail";

export function rateContrast(ratio: number): ContrastRating {
  if (ratio >= WCAG_AAA) return "AAA";
  if (ratio >= WCAG_AA) return "AA";
  if (ratio >= WCAG_AA_LARGE) return "AA Large";
  return "Fail";
}

export type ContrastFix =
  | { kind: "role"; role: SemanticColorKey; shade: NumericShade }
  | { kind: "text"; token: TextTokenKey; shade: NeutralShade };

export interface ContrastCheck {
  id: string;
  label: string;
  foreground: string;
  background: string;
  ratio: number;
  rating: ContrastRating;
  /** Meets AA for normal text (4.5:1). */
  passes: boolean;
  /** Nearest shade change that makes this pair pass, when one exists. */
  fix?: ContrastFix;
}

/** Text tokens checked, and the surfaces each is checked on. */
const TEXT_PAIRS: { token: TextTokenKey; bg: BgTokenKey; label: string }[] = [
  { token: "default", bg: "default", label: "Body text" },
  { token: "muted", bg: "default", label: "Muted text" },
  { token: "default", bg: "elevated", label: "Body text on cards" },
  { token: "muted", bg: "elevated", label: "Muted text on cards" },
];

/** Neutral shades from lightest to darkest, for finding the nearest fix. */
const SHADE_SCALE: readonly NeutralShade[] = [
  "white",
  ...NUMERIC_SHADE_KEYS,
  "black",
];

function ratio(foreground: string, background: string): number {
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);
  return fg && bg ? getContrastRatio(fg, bg) : 1;
}

/** `candidates` ordered by distance from `current` along `scale`, current first. */
function byDistance<T extends string>(
  scale: readonly string[],
  candidates: readonly T[],
  current: string,
): T[] {
  const at = scale.indexOf(current);
  return [...candidates].sort(
    (a, b) =>
      Math.abs(scale.indexOf(a) - at) - Math.abs(scale.indexOf(b) - at),
  );
}

function textPairsPass(
  config: ThemeConfig,
  mode: ColorMode,
  token: TextTokenKey,
): boolean {
  const tokens = resolveTokens(config, mode);
  return TEXT_PAIRS.filter((p) => p.token === token).every(
    (p) => ratio(tokens.text[token], tokens.bg[p.bg]) >= WCAG_AA,
  );
}

function rolePairsPass(
  config: ThemeConfig,
  mode: ColorMode,
  role: SemanticColorKey,
): boolean {
  const tokens = resolveTokens(config, mode);
  const color = resolveRoleColor(config, mode, role);
  return (
    ratio(tokens.text.inverted, color) >= WCAG_AA &&
    ratio(color, tokens.bg.default) >= WCAG_AA
  );
}

function findTextFix(
  config: ThemeConfig,
  mode: ColorMode,
  token: TextTokenKey,
): ContrastFix | undefined {
  const overrides =
    mode === "dark" ? "darkOverrides" : "lightOverrides";
  const draft = cloneTheme(config);
  for (const shade of byDistance(
    SHADE_SCALE,
    SHADE_SCALE,
    config[overrides].text[token],
  )) {
    draft[overrides].text[token] = shade;
    if (textPairsPass(draft, mode, token)) {
      return { kind: "text", token, shade };
    }
  }
  return undefined;
}

function findRoleFix(
  config: ThemeConfig,
  mode: ColorMode,
  role: SemanticColorKey,
): ContrastFix | undefined {
  const shadesKey = mode === "dark" ? "darkColorShades" : "colorShades";
  const draft = cloneTheme(config);
  for (const shade of byDistance(
    SHADE_SCALE,
    NUMERIC_SHADE_KEYS,
    config[shadesKey][role],
  )) {
    draft[shadesKey][role] = shade;
    if (rolePairsPass(draft, mode, role)) {
      return { kind: "role", role, shade };
    }
  }
  return undefined;
}

function check(
  id: string,
  label: string,
  foreground: string,
  background: string,
  getFix: () => ContrastFix | undefined,
): ContrastCheck {
  const value = ratio(foreground, background);
  const passes = value >= WCAG_AA;
  return {
    id,
    label,
    foreground,
    background,
    ratio: value,
    rating: rateContrast(value),
    passes,
    fix: passes ? undefined : getFix(),
  };
}

/**
 * Contrast of the theme's main text and color pairs in one mode: body and
 * muted text on the page and on cards, each role's solid button label
 * (`text-inverted` on `--ui-<role>`), and each role used as text or links
 * on the page background. Failing pairs come with the nearest passing shade.
 */
export function getThemeContrastChecks(
  config: ThemeConfig,
  mode: ColorMode,
): ContrastCheck[] {
  const tokens = resolveTokens(config, mode);
  const fixes = new Map<string, ContrastFix | undefined>();
  const memo = (key: string, find: () => ContrastFix | undefined) => () => {
    if (!fixes.has(key)) fixes.set(key, find());
    return fixes.get(key);
  };

  const textChecks = TEXT_PAIRS.map(({ token, bg, label }) =>
    check(
      `text-${token}-on-bg-${bg}`,
      label,
      tokens.text[token],
      tokens.bg[bg],
      memo(`text-${token}`, () => findTextFix(config, mode, token)),
    ),
  );

  const roleChecks = SEMANTIC_COLOR_KEYS.flatMap((role) => {
    const color = resolveRoleColor(config, mode, role);
    const getFix = memo(role, () => findRoleFix(config, mode, role));
    const name = capitalize(role);
    return [
      check(
        `${role}-solid`,
        `${name} button`,
        tokens.text.inverted,
        color,
        getFix,
      ),
      check(`${role}-text`, `${name} text`, color, tokens.bg.default, getFix),
    ];
  });

  return [...textChecks, ...roleChecks];
}
