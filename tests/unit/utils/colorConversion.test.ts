import { describe, it, expect } from "vitest";
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  rgbToOklch,
  oklchToRgb,
  getRelativeLuminance,
  getContrastRatio,
  parseOklchString,
  parseColor,
  formatRgb,
  formatHsl,
  formatOklch,
  type RGB,
} from "~/utils/colorConversion";

// HEX ↔ RGB ───────────────────────────────────────────────────────────────

describe("hexToRgb", () => {
  it("parses 6-digit hex", () => {
    expect(hexToRgb("#3b82f6")).toEqual({ r: 59, g: 130, b: 246 });
  });

  it("parses 6-digit hex without #", () => {
    expect(hexToRgb("3b82f6")).toEqual({ r: 59, g: 130, b: 246 });
  });

  it("parses 3-digit hex", () => {
    expect(hexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 });
  });

  it("parses black", () => {
    expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
  });

  it("returns null for invalid hex", () => {
    expect(hexToRgb("#xyz")).toBeNull();
    expect(hexToRgb("")).toBeNull();
    expect(hexToRgb("#12345")).toBeNull();
  });
});

describe("rgbToHex", () => {
  it("converts RGB to hex", () => {
    expect(rgbToHex({ r: 59, g: 130, b: 246 })).toBe("#3b82f6");
  });

  it("handles black and white", () => {
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe("#000000");
    expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe("#ffffff");
  });

  it("clamps out-of-range values", () => {
    expect(rgbToHex({ r: -10, g: 300, b: 128 })).toBe("#00ff80");
  });
});

// RGB ↔ HSL ───────────────────────────────────────────────────────────────

describe("rgbToHsl", () => {
  it("converts pure red", () => {
    const hsl = rgbToHsl({ r: 255, g: 0, b: 0 });
    expect(hsl.h).toBe(0);
    expect(hsl.s).toBe(100);
    expect(hsl.l).toBe(50);
  });

  it("converts white", () => {
    const hsl = rgbToHsl({ r: 255, g: 255, b: 255 });
    expect(hsl.h).toBe(0);
    expect(hsl.s).toBe(0);
    expect(hsl.l).toBe(100);
  });

  it("converts black", () => {
    const hsl = rgbToHsl({ r: 0, g: 0, b: 0 });
    expect(hsl.l).toBe(0);
  });
});

describe("hslToRgb", () => {
  it("converts pure red HSL back to RGB", () => {
    const rgb = hslToRgb({ h: 0, s: 100, l: 50 });
    expect(rgb).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("converts achromatic (gray)", () => {
    const rgb = hslToRgb({ h: 0, s: 0, l: 50 });
    expect(rgb).toEqual({ r: 128, g: 128, b: 128 });
  });

  it("roundtrips with rgbToHsl", () => {
    const original: RGB = { r: 59, g: 130, b: 246 };
    const hsl = rgbToHsl(original);
    const result = hslToRgb(hsl);
    expect(result.r).toBeCloseTo(original.r, -1);
    expect(result.g).toBeCloseTo(original.g, -1);
    expect(result.b).toBeCloseTo(original.b, -1);
  });
});

// RGB ↔ OKLCH ─────────────────────────────────────────────────────────────

describe("rgbToOklch", () => {
  it("converts a color to OKLCH", () => {
    const oklch = rgbToOklch({ r: 59, g: 130, b: 246 });
    expect(oklch.l).toBeGreaterThan(0);
    expect(oklch.l).toBeLessThan(1);
    expect(oklch.c).toBeGreaterThan(0);
    expect(oklch.h).toBeGreaterThanOrEqual(0);
    expect(oklch.h).toBeLessThanOrEqual(360);
  });

  it("converts black to near-zero lightness", () => {
    const oklch = rgbToOklch({ r: 0, g: 0, b: 0 });
    expect(oklch.l).toBeCloseTo(0, 1);
    expect(oklch.c).toBeCloseTo(0, 1);
  });

  it("converts white to near-1 lightness", () => {
    const oklch = rgbToOklch({ r: 255, g: 255, b: 255 });
    expect(oklch.l).toBeCloseTo(1, 1);
    expect(oklch.c).toBeCloseTo(0, 1);
  });
});

describe("oklchToRgb", () => {
  it("roundtrips with rgbToOklch", () => {
    const original: RGB = { r: 59, g: 130, b: 246 };
    const oklch = rgbToOklch(original);
    const result = oklchToRgb(oklch);
    expect(result.r).toBeCloseTo(original.r, -1);
    expect(result.g).toBeCloseTo(original.g, -1);
    expect(result.b).toBeCloseTo(original.b, -1);
  });
});

// WCAG Contrast ───────────────────────────────────────────────────────────

describe("getRelativeLuminance", () => {
  it("returns 0 for black", () => {
    expect(getRelativeLuminance({ r: 0, g: 0, b: 0 })).toBe(0);
  });

  it("returns 1 for white", () => {
    expect(getRelativeLuminance({ r: 255, g: 255, b: 255 })).toBe(1);
  });
});

describe("getContrastRatio", () => {
  it("returns 21 for black on white", () => {
    const black: RGB = { r: 0, g: 0, b: 0 };
    const white: RGB = { r: 255, g: 255, b: 255 };
    expect(getContrastRatio(black, white)).toBe(21);
  });

  it("returns 1 for same color", () => {
    const color: RGB = { r: 128, g: 128, b: 128 };
    expect(getContrastRatio(color, color)).toBe(1);
  });

  it("is commutative", () => {
    const c1: RGB = { r: 59, g: 130, b: 246 };
    const c2: RGB = { r: 255, g: 255, b: 255 };
    expect(getContrastRatio(c1, c2)).toBe(getContrastRatio(c2, c1));
  });

  it("meets AA for dark text on white", () => {
    const dark: RGB = { r: 30, g: 30, b: 30 };
    const white: RGB = { r: 255, g: 255, b: 255 };
    expect(getContrastRatio(dark, white)).toBeGreaterThanOrEqual(4.5);
  });
});

// OKLCH String Parsing ────────────────────────────────────────────────────

describe("parseOklchString", () => {
  it("parses an oklch() string from colorPalettes.ts", () => {
    const rgb = parseOklchString("oklch(0.637 0.237 25.331)");
    expect(rgb).not.toBeNull();
    expect(rgb!.r).toBeGreaterThanOrEqual(0);
    expect(rgb!.r).toBeLessThanOrEqual(255);
  });

  it("returns null for non-oklch string", () => {
    expect(parseOklchString("#ff0000")).toBeNull();
    expect(parseOklchString("rgb(255,0,0)")).toBeNull();
  });
});

// Auto-detect Parser ──────────────────────────────────────────────────────

describe("parseColor", () => {
  it("detects HEX format", () => {
    const result = parseColor("#3b82f6");
    expect(result).not.toBeNull();
    expect(result!.format).toBe("hex");
    expect(result!.rgb).toEqual({ r: 59, g: 130, b: 246 });
  });

  it("detects HEX without hash", () => {
    const result = parseColor("3b82f6");
    expect(result).not.toBeNull();
    expect(result!.format).toBe("hex");
  });

  it("detects RGB format", () => {
    const result = parseColor("rgb(59, 130, 246)");
    expect(result).not.toBeNull();
    expect(result!.format).toBe("rgb");
    expect(result!.rgb).toEqual({ r: 59, g: 130, b: 246 });
  });

  it("detects HSL format", () => {
    const result = parseColor("hsl(217, 91%, 60%)");
    expect(result).not.toBeNull();
    expect(result!.format).toBe("hsl");
  });

  it("detects OKLCH format", () => {
    const result = parseColor("oklch(0.623 0.214 259.815)");
    expect(result).not.toBeNull();
    expect(result!.format).toBe("oklch");
  });

  it("returns null for invalid input", () => {
    expect(parseColor("not a color")).toBeNull();
    expect(parseColor("")).toBeNull();
  });
});

// Format Helpers ──────────────────────────────────────────────────────────

describe("formatRgb", () => {
  it("formats RGB correctly", () => {
    expect(formatRgb({ r: 59, g: 130, b: 246 })).toBe("rgb(59, 130, 246)");
  });
});

describe("formatHsl", () => {
  it("formats HSL correctly", () => {
    expect(formatHsl({ h: 217, s: 91, l: 60 })).toBe("hsl(217, 91%, 60%)");
  });
});

describe("formatOklch", () => {
  it("formats OKLCH correctly", () => {
    expect(formatOklch({ l: 0.623, c: 0.214, h: 259.82 })).toBe(
      "oklch(0.623 0.214 259.82)",
    );
  });
});
