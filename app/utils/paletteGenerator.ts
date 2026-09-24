/**
 * Generates a Tailwind-style 50–950 palette from a single base color.
 *
 * The base color is matched to the built-in Tailwind palette with the closest
 * hue (or a neutral one for near-gray colors). That palette's lightness,
 * chroma, and hue curves are then bent so the base color lands exactly on the
 * shade with the closest lightness (the "anchor"), easing back to Tailwind's
 * curve toward 50 and 950. Every shade is mapped into sRGB by reducing chroma.
 *
 * Custom palettes only store their base color, so this output must stay
 * stable: changing it shifts every saved theme that uses a custom palette.
 */
import type { AnyPalette, NumericShade } from "~/types/theme";
import {
  CHROMATIC_PALETTES,
  NEUTRAL_PALETTES,
  NUMERIC_SHADE_KEYS,
} from "~/types/theme";
import { ALL_HEX_MAP } from "~/utils/colorPalettes";
import {
  hexToRgb,
  isOklchInSrgbGamut,
  oklchToRgb,
  rgbToHex,
  rgbToOklch,
} from "~/utils/colorConversion";
import type { OKLCH } from "~/utils/colorConversion";

export interface GeneratedPalette {
  /** Hex value for every shade, 50–950. */
  shades: Record<NumericShade, string>;
  /** Shade that holds the exact base color. */
  anchor: NumericShade;
  /** Built-in palette whose curves the scale follows. */
  reference: AnyPalette;
}

/** Below this chroma a color reads as gray and follows the `neutral` palette. */
const GRAY_CHROMA = 0.01;
/** Below this chroma a color follows the closest tinted neutral palette. */
const LOW_CHROMA = 0.04;
/** Reference chroma below which scaling by ratio is meaningless. */
const MIN_REFERENCE_CHROMA = 0.005;

const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;
const OKLCH_PATTERN = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/i;

/** Normalize a 3- or 6-digit hex color to lowercase `#rrggbb`, or `null`. */
export function normalizeHexColor(value: string): string | null {
  const match = value.trim().match(HEX_PATTERN);
  if (!match) return null;
  const digits = match[1]!.toLowerCase();
  const full =
    digits.length === 3
      ? digits
          .split("")
          .map((d) => d + d)
          .join("")
      : digits;
  return `#${full}`;
}

let referenceCurves: Map<AnyPalette, OKLCH[]> | null = null;

/** Parse the built-in OKLCH palette strings once, on first use. */
function getReferenceCurves(): Map<AnyPalette, OKLCH[]> {
  if (referenceCurves) return referenceCurves;
  referenceCurves = new Map();
  for (const palette of [...CHROMATIC_PALETTES, ...NEUTRAL_PALETTES]) {
    const hexMap = ALL_HEX_MAP[palette];
    if (!hexMap) continue;
    const curve = NUMERIC_SHADE_KEYS.map((shade) => {
      const match = hexMap[shade]?.match(OKLCH_PATTERN);
      return {
        l: match ? parseFloat(match[1]!) : 0.5,
        c: match ? parseFloat(match[2]!) : 0,
        h: match ? parseFloat(match[3]!) : 0,
      };
    });
    referenceCurves.set(palette, curve);
  }
  return referenceCurves;
}

/** Signed shortest distance between two hues, in degrees (−180 to 180). */
function hueDelta(from: number, to: number): number {
  return ((to - from + 540) % 360) - 180;
}

const MID_INDEX = NUMERIC_SHADE_KEYS.indexOf("500");

function pickReference(base: OKLCH): AnyPalette {
  if (base.c < GRAY_CHROMA) return "neutral";
  const candidates: readonly AnyPalette[] =
    base.c < LOW_CHROMA
      ? NEUTRAL_PALETTES.filter((p) => p !== "neutral")
      : CHROMATIC_PALETTES;
  const curves = getReferenceCurves();
  let best = candidates[0]!;
  let bestDistance = Infinity;
  for (const palette of candidates) {
    const mid = curves.get(palette)?.[MID_INDEX];
    if (!mid) continue;
    const distance = Math.abs(hueDelta(mid.h, base.h));
    if (distance < bestDistance) {
      bestDistance = distance;
      best = palette;
    }
  }
  return best;
}

/** Reduce chroma (keeping lightness and hue) until the color fits in sRGB. */
function toSrgbGamut(color: OKLCH): OKLCH {
  if (isOklchInSrgbGamut(color)) return color;
  let low = 0;
  let high = color.c;
  for (let i = 0; i < 20; i++) {
    const mid = (low + high) / 2;
    if (isOklchInSrgbGamut({ ...color, c: mid })) low = mid;
    else high = mid;
  }
  return { ...color, c: low };
}

const cache = new Map<string, GeneratedPalette>();
const CACHE_LIMIT = 64;

/**
 * Build a 50–950 palette around `baseColor` (hex). The anchor shade holds the
 * exact base color. Returns `null` when `baseColor` isn't a valid hex color.
 */
export function generatePalette(baseColor: string): GeneratedPalette | null {
  const hex = normalizeHexColor(baseColor);
  if (!hex) return null;
  const cached = cache.get(hex);
  if (cached) return cached;

  const base = rgbToOklch(hexToRgb(hex)!);
  const reference = pickReference(base);
  const curve = getReferenceCurves().get(reference)!;
  const lastIndex = curve.length - 1;

  let anchorIndex = 0;
  for (let i = 1; i < curve.length; i++) {
    if (
      Math.abs(curve[i]!.l - base.l) < Math.abs(curve[anchorIndex]!.l - base.l)
    ) {
      anchorIndex = i;
    }
  }
  const anchorRef = curve[anchorIndex]!;
  const lightnessShift = base.l - anchorRef.l;
  const chromaScale =
    anchorRef.c > MIN_REFERENCE_CHROMA ? base.c / anchorRef.c : null;

  const shades = {} as Record<NumericShade, string>;
  curve.forEach((ref, i) => {
    const shade = NUMERIC_SHADE_KEYS[i]!;
    if (i === anchorIndex) {
      shades[shade] = hex;
      return;
    }
    // 1 at the anchor, easing linearly to 0 at 50 and 950
    const weight =
      i < anchorIndex
        ? i / anchorIndex
        : (lastIndex - i) / (lastIndex - anchorIndex);
    const color = toSrgbGamut({
      l: Math.min(1, Math.max(0, ref.l + lightnessShift * weight)),
      c: chromaScale === null ? base.c : ref.c * chromaScale,
      h: (base.h + hueDelta(anchorRef.h, ref.h) + 360) % 360,
    });
    shades[shade] = rgbToHex(oklchToRgb(color));
  });

  const result: GeneratedPalette = {
    shades,
    anchor: NUMERIC_SHADE_KEYS[anchorIndex]!,
    reference,
  };
  if (cache.size >= CACHE_LIMIT) cache.clear();
  cache.set(hex, result);
  return result;
}
