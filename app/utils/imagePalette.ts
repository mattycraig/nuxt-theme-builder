/**
 * Pull the main colors out of a logo or brand image, and turn them into a
 * primary / secondary / neutral suggestion for the theme. Runs entirely in
 * the browser: the image is drawn to a small canvas and never uploaded.
 */
import type { NeutralPalette } from "~/types/theme";
import { NEUTRAL_PALETTES } from "~/types/theme";
import {
  oklchToRgb,
  rgbToHex,
  rgbToOklch,
} from "~/utils/colorConversion";
import type { OKLCH, RGB } from "~/utils/colorConversion";
import { generatePalette } from "~/utils/paletteGenerator";

export interface ExtractedColor {
  hex: string;
  /** Share of the image's opaque pixels, 0–1. */
  weight: number;
  oklch: OKLCH;
}

export interface LogoSuggestion {
  primary: string;
  secondary?: string;
  neutral: NeutralPalette;
}

/** Largest file accepted (larger images gain nothing at 96 px). */
export const MAX_LOGO_FILE_BYTES = 5 * 1024 * 1024;

/** The image is scaled to fit this square before its pixels are read. */
const SAMPLE_SIZE = 96;

/** Colors closer than this in OKLab are merged into one. */
const MERGE_DISTANCE = 0.08;
/** Colors covering less of the image than this are edge noise (anti-aliasing). */
const MIN_WEIGHT = 0.02;
/** At or above this chroma a color counts as a brand color, not a gray. */
const CHROMATIC_MIN = 0.04;
/** Hue gap a secondary color needs from the primary, in degrees. */
const SECONDARY_HUE_GAP = 30;
/** Weight a gray needs to set the neutral palette by itself. */
const NEUTRAL_MIN_WEIGHT = 0.05;

interface Cluster {
  count: number;
  r: number;
  g: number;
  b: number;
}

function toLab({ l, c, h }: OKLCH) {
  const rad = (h * Math.PI) / 180;
  return { l, a: c * Math.cos(rad), b: c * Math.sin(rad) };
}

function labDistance(x: OKLCH, y: OKLCH): number {
  const p = toLab(x);
  const q = toLab(y);
  return Math.hypot(p.l - q.l, p.a - q.a, p.b - q.b);
}

function hueGap(a: number, b: number): number {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

function average(cluster: Cluster): RGB {
  return {
    r: cluster.r / cluster.count,
    g: cluster.g / cluster.count,
    b: cluster.b / cluster.count,
  };
}

/**
 * Main colors of an RGBA pixel buffer, most common first. Transparent pixels
 * are skipped, similar colors (gradients) are merged, and slivers under 2%
 * of the image (anti-aliased edges) are dropped.
 */
export function extractColors(
  data: Uint8ClampedArray,
  max = 6,
): ExtractedColor[] {
  // Bucket by 4 bits per channel, keeping exact sums for the average
  const buckets = new Map<number, Cluster>();
  let opaque = 0;
  for (let i = 0; i + 3 < data.length; i += 4) {
    if (data[i + 3]! < 128) continue;
    const r = data[i]!;
    const g = data[i + 1]!;
    const b = data[i + 2]!;
    const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
    const bucket = buckets.get(key) ?? { count: 0, r: 0, g: 0, b: 0 };
    bucket.count++;
    bucket.r += r;
    bucket.g += g;
    bucket.b += b;
    buckets.set(key, bucket);
    opaque++;
  }
  if (!opaque) return [];

  const merged: { cluster: Cluster; oklch: OKLCH }[] = [];
  for (const bucket of [...buckets.values()].sort((a, b) => b.count - a.count)) {
    const oklch = rgbToOklch(average(bucket));
    const near = merged.find((m) => labDistance(m.oklch, oklch) < MERGE_DISTANCE);
    if (near) {
      near.cluster.count += bucket.count;
      near.cluster.r += bucket.r;
      near.cluster.g += bucket.g;
      near.cluster.b += bucket.b;
    } else {
      merged.push({ cluster: { ...bucket }, oklch });
    }
  }

  return merged
    .map(({ cluster }) => {
      const rgb = average(cluster);
      return {
        hex: rgbToHex(rgb),
        weight: cluster.count / opaque,
        oklch: rgbToOklch(rgb),
      };
    })
    .sort((a, b) => b.weight - a.weight)
    .filter((color, i) => i === 0 || color.weight >= MIN_WEIGHT)
    .slice(0, max);
}

function isChromatic(color: ExtractedColor): boolean {
  return (
    color.oklch.c >= CHROMATIC_MIN &&
    color.oklch.l > 0.2 &&
    color.oklch.l < 0.95
  );
}

function neutralFor(hex: string): NeutralPalette {
  const reference = generatePalette(hex)?.reference;
  return reference && (NEUTRAL_PALETTES as readonly string[]).includes(reference)
    ? (reference as NeutralPalette)
    : "neutral";
}

/**
 * Suggest theme colors from extracted ones: the most common brand color is
 * primary, the next one with a clearly different hue is secondary, and the
 * neutral follows a prominent gray in the image, or else a gray tinted
 * toward the primary hue. `primary` overrides the automatic pick.
 */
export function suggestThemeColors(
  colors: readonly ExtractedColor[],
  primary?: string,
): LogoSuggestion | null {
  const chromatic = colors.filter(isChromatic);
  const picked =
    colors.find((c) => c.hex === primary) ??
    chromatic[0] ??
    // A monochrome logo: use its most common non-white color
    colors.find((c) => c.oklch.l < 0.95);
  if (!picked) return null;

  const secondary = chromatic.find(
    (c) =>
      c.hex !== picked.hex &&
      hueGap(c.oklch.h, picked.oklch.h) >= SECONDARY_HUE_GAP,
  );

  const gray = colors.find(
    (c) =>
      c.weight >= NEUTRAL_MIN_WEIGHT &&
      c.oklch.c >= 0.005 &&
      c.oklch.c < CHROMATIC_MIN &&
      c.oklch.l > 0.2 &&
      c.oklch.l < 0.9,
  );
  const tint = rgbToHex(
    oklchToRgb({ l: 0.55, c: 0.02, h: picked.oklch.h }),
  );
  const neutral =
    picked.oklch.c < CHROMATIC_MIN && !gray
      ? neutralFor(picked.hex)
      : neutralFor(gray?.hex ?? tint);

  return { primary: picked.hex, secondary: secondary?.hex, neutral };
}

/** Read a picked image file into RGBA pixels, scaled down to 96 px. */
export async function readImagePixels(file: File): Promise<{
  pixels: Uint8ClampedArray;
  dataUrl: string;
}> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
  const image = new Image();
  image.src = dataUrl;
  await image.decode();

  const width = image.naturalWidth || SAMPLE_SIZE;
  const height = image.naturalHeight || SAMPLE_SIZE;
  const scale = Math.min(1, SAMPLE_SIZE / Math.max(width, height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Canvas is not available");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return {
    pixels: context.getImageData(0, 0, canvas.width, canvas.height).data,
    dataUrl,
  };
}
