/**
 * Color conversion utilities for HEX, RGB, HSL, and OKLCH formats.
 * Used by the Contrast Checker, Color Converter, and Palette Generator tools.
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface OKLCH {
  l: number;
  c: number;
  h: number;
}

// HEX ↔ RGB ───────────────────────────────────────────────────────────────

export function hexToRgb(hex: string): RGB | null {
  const cleaned = hex.replace(/^#/, "");
  let r: number, g: number, b: number;

  if (cleaned.length === 3) {
    r = parseInt(cleaned[0]! + cleaned[0]!, 16);
    g = parseInt(cleaned[1]! + cleaned[1]!, 16);
    b = parseInt(cleaned[2]! + cleaned[2]!, 16);
  } else if (cleaned.length === 6) {
    r = parseInt(cleaned.slice(0, 2), 16);
    g = parseInt(cleaned.slice(2, 4), 16);
    b = parseInt(cleaned.slice(4, 6), 16);
  } else {
    return null;
  }

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
  return { r, g, b };
}

export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) =>
    Math.round(Math.max(0, Math.min(255, n)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

// RGB ↔ HSL ───────────────────────────────────────────────────────────────

export function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l: round(l * 100) };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;

  return { h: round(h * 360), s: round(s * 100), l: round(l * 100) };
}

export function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  };
}

// sRGB ↔ Linear RGB ──────────────────────────────────────────────────────

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
  return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

// RGB ↔ OKLCH (via OKLab) ────────────────────────────────────────────────

function rgbToOklab(rgb: RGB): { L: number; a: number; b: number } {
  const r = srgbToLinear(rgb.r / 255);
  const g = srgbToLinear(rgb.g / 255);
  const b = srgbToLinear(rgb.b / 255);

  const l_ = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m_ = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s_ = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);

  return {
    L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  };
}

function oklabToRgb(lab: { L: number; a: number; b: number }): RGB {
  const l_ = lab.L + 0.3963377774 * lab.a + 0.2158037573 * lab.b;
  const m_ = lab.L - 0.1055613458 * lab.a - 0.0638541728 * lab.b;
  const s_ = lab.L - 0.0894841775 * lab.a - 1.291485548 * lab.b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const b = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  return {
    r: Math.round(Math.max(0, Math.min(1, linearToSrgb(r))) * 255),
    g: Math.round(Math.max(0, Math.min(1, linearToSrgb(g))) * 255),
    b: Math.round(Math.max(0, Math.min(1, linearToSrgb(b))) * 255),
  };
}

export function rgbToOklch(rgb: RGB): OKLCH {
  const lab = rgbToOklab(rgb);
  const c = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  let h = (Math.atan2(lab.b, lab.a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { l: round(lab.L, 4), c: round(c, 4), h: round(h, 2) };
}

export function oklchToRgb(oklch: OKLCH): RGB {
  const hRad = (oklch.h * Math.PI) / 180;
  const lab = {
    L: oklch.l,
    a: oklch.c * Math.cos(hRad),
    b: oklch.c * Math.sin(hRad),
  };
  return oklabToRgb(lab);
}

// WCAG Contrast ───────────────────────────────────────────────────────────

export function getRelativeLuminance(rgb: RGB): number {
  const r = srgbToLinear(rgb.r / 255);
  const g = srgbToLinear(rgb.g / 255);
  const b = srgbToLinear(rgb.b / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastRatio(color1: RGB, color2: RGB): number {
  const l1 = getRelativeLuminance(color1);
  const l2 = getRelativeLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return round((lighter + 0.05) / (darker + 0.05), 2);
}

// OKLCH String Parsing ────────────────────────────────────────────────────

/**
 * Parse an `oklch(L C H)` value string from colorPalettes.ts
 * into an RGB object for display and conversion.
 */
export function parseOklchString(value: string): RGB | null {
  const match = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/i);
  if (!match) return null;
  return oklchToRgb({
    l: parseFloat(match[1]!),
    c: parseFloat(match[2]!),
    h: parseFloat(match[3]!),
  });
}

// Auto-detect Input Format ────────────────────────────────────────────────

export type ColorFormat = "hex" | "rgb" | "hsl" | "oklch";

export interface ParsedColor {
  rgb: RGB;
  format: ColorFormat;
}

export function parseColor(input: string): ParsedColor | null {
  const trimmed = input.trim();

  // HEX
  if (/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(trimmed)) {
    const rgb = hexToRgb(trimmed.startsWith("#") ? trimmed : `#${trimmed}`);
    if (rgb) return { rgb, format: "hex" };
  }

  // rgb(r, g, b) or rgb(r g b)
  const rgbMatch = trimmed.match(
    /rgba?\(\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*\)/i,
  );
  if (rgbMatch) {
    const rgb: RGB = {
      r: parseInt(rgbMatch[1]!),
      g: parseInt(rgbMatch[2]!),
      b: parseInt(rgbMatch[3]!),
    };
    if (rgb.r <= 255 && rgb.g <= 255 && rgb.b <= 255)
      return { rgb, format: "rgb" };
  }

  // hsl(h, s%, l%) or hsl(h s% l%)
  const hslMatch = trimmed.match(
    /hsla?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)%?\s*[,\s]\s*([\d.]+)%?\s*\)/i,
  );
  if (hslMatch) {
    const hsl: HSL = {
      h: parseFloat(hslMatch[1]!),
      s: parseFloat(hslMatch[2]!),
      l: parseFloat(hslMatch[3]!),
    };
    return { rgb: hslToRgb(hsl), format: "hsl" };
  }

  // oklch(L C H)
  const oklchMatch = trimmed.match(
    /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/i,
  );
  if (oklchMatch) {
    const oklch: OKLCH = {
      l: parseFloat(oklchMatch[1]!),
      c: parseFloat(oklchMatch[2]!),
      h: parseFloat(oklchMatch[3]!),
    };
    return { rgb: oklchToRgb(oklch), format: "oklch" };
  }

  return null;
}

// Formatting Helpers ──────────────────────────────────────────────────────

export function formatRgb(rgb: RGB): string {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

export function formatHsl(hsl: HSL): string {
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

export function formatOklch(oklch: OKLCH): string {
  return `oklch(${oklch.l} ${oklch.c} ${oklch.h})`;
}

function round(value: number, decimals = 1): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

// Helpers ──────────────────────────────────────────────────────────────────

export function sanitizeHexInput(value: string): string {
  let hex = value.trim();
  if (!hex.startsWith("#")) hex = `#${hex}`;
  return hex;
}
