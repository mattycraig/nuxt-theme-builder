import { describe, it, expect } from "vitest";
import {
  generatePalette,
  normalizeHexColor,
} from "~/utils/paletteGenerator";
import {
  hexToRgb,
  isOklchInSrgbGamut,
  oklchToRgb,
  rgbToHex,
  rgbToOklch,
} from "~/utils/colorConversion";
import { CHROMATIC_HEX_MAP } from "~/utils/colorPalettes";
import { CHROMATIC_PALETTES, NUMERIC_SHADE_KEYS } from "~/types/theme";

function lightness(hex: string): number {
  return rgbToOklch(hexToRgb(hex)!).l;
}

/** Euclidean distance in OKLab (≈ perceptual difference; ~0.02 is barely visible). */
function oklabDistance(hexA: string, hexB: string): number {
  const toLab = (hex: string) => {
    const { l, c, h } = rgbToOklch(hexToRgb(hex)!);
    const rad = (h * Math.PI) / 180;
    return [l, c * Math.cos(rad), c * Math.sin(rad)];
  };
  const a = toLab(hexA);
  const b = toLab(hexB);
  return Math.hypot(a[0]! - b[0]!, a[1]! - b[1]!, a[2]! - b[2]!);
}

/**
 * A Tailwind shade as hex, brought into sRGB the way the generator does it
 * (reducing chroma, keeping lightness and hue). Some Tailwind shades are
 * Display P3 colors, and plain channel clamping would shift their hue.
 */
function tailwindHex(palette: string, shade: string): string {
  const [, l, c, h] = CHROMATIC_HEX_MAP[palette]![shade]!.match(
    /oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)/,
  )!.map(Number);
  let color = { l: l!, c: c!, h: h! };
  while (!isOklchInSrgbGamut(color)) color = { ...color, c: color.c - 0.001 };
  return rgbToHex(oklchToRgb(color));
}

/** Base colors spread across hue, lightness, and chroma. */
const SWEEP: string[] = [];
for (let h = 0; h < 360; h += 15) {
  for (const l of [0.25, 0.45, 0.65, 0.85, 0.95]) {
    for (const c of [0.02, 0.08, 0.2]) {
      SWEEP.push(rgbToHex(oklchToRgb({ l, c, h })));
    }
  }
}
SWEEP.push("#000000", "#ffffff", "#808080", "#f5c518", "#1e3a8a");

describe("normalizeHexColor", () => {
  it("lowercases and expands shorthand hex", () => {
    expect(normalizeHexColor("#F5C518")).toBe("#f5c518");
    expect(normalizeHexColor("abc")).toBe("#aabbcc");
    expect(normalizeHexColor("  #ABC ")).toBe("#aabbcc");
  });

  it("rejects anything that isn't a 3- or 6-digit hex color", () => {
    for (const value of ["", "#12345", "#1234567", "red", "#ggg", "#fff;"]) {
      expect(normalizeHexColor(value)).toBeNull();
    }
  });
});

describe("generatePalette", () => {
  it("returns null for invalid input", () => {
    expect(generatePalette("not-a-color")).toBeNull();
  });

  it("returns a hex value for every numeric shade", () => {
    const palette = generatePalette("#f5c518")!;
    expect(Object.keys(palette.shades)).toEqual([...NUMERIC_SHADE_KEYS]);
    for (const value of Object.values(palette.shades)) {
      expect(value).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("keeps the exact base color at the anchor shade", () => {
    for (const hex of SWEEP) {
      const palette = generatePalette(hex)!;
      expect(palette.shades[palette.anchor]).toBe(hex);
    }
  });

  it("accepts shorthand and uppercase input", () => {
    expect(generatePalette("#FC0")).toEqual(generatePalette("#ffcc00"));
    expect(generatePalette("#ffcc00")!.shades[
      generatePalette("#ffcc00")!.anchor
    ]).toBe("#ffcc00");
  });

  it("gets darker from 50 to 950 for every base color", () => {
    for (const hex of SWEEP) {
      const { shades } = generatePalette(hex)!;
      const values = NUMERIC_SHADE_KEYS.map((s) => lightness(shades[s]));
      for (let i = 1; i < values.length; i++) {
        expect(
          values[i],
          `${hex}: ${NUMERIC_SHADE_KEYS[i]} should be darker than ${NUMERIC_SHADE_KEYS[i - 1]}`,
        ).toBeLessThan(values[i - 1]!);
      }
    }
  });

  it("anchors a brand yellow in the light half of the scale", () => {
    const palette = generatePalette("#f5c518")!;
    expect(palette.reference).toBe("yellow");
    expect(palette.anchor).toBe("400");
  });

  it("anchors dark and light colors at the ends of the scale", () => {
    expect(generatePalette("#0b1026")!.anchor).toBe("950");
    expect(generatePalette("#fefefe")!.anchor).toBe("50");
  });

  it("follows the neutral palette for grays", () => {
    const palette = generatePalette("#808080")!;
    expect(palette.reference).toBe("neutral");
    for (const value of Object.values(palette.shades)) {
      const { c } = rgbToOklch(hexToRgb(value)!);
      expect(c).toBeLessThan(0.01);
    }
  });

  it("follows a tinted neutral palette for low-chroma colors", () => {
    const hex = rgbToHex(oklchToRgb({ l: 0.55, c: 0.03, h: 257 }));
    expect(generatePalette(hex)!.reference).toBe("slate");
  });

  // Worst case is lime (≈0.021): wide-gamut palettes lose some chroma when
  // their 500 shade is brought into sRGB hex, and the scale inherits that.
  it.each(CHROMATIC_PALETTES.map((p) => [p]))(
    "rebuilds the Tailwind %s palette from its 500 shade",
    (palette) => {
      const generated = generatePalette(tailwindHex(palette, "500"))!;
      expect(generated.reference).toBe(palette);
      for (const shade of NUMERIC_SHADE_KEYS) {
        expect(
          oklabDistance(generated.shades[shade], tailwindHex(palette, shade)),
          `${palette}-${shade}`,
        ).toBeLessThan(0.025);
      }
    },
  );

  // Custom palettes store only their base color, so a change here would
  // silently restyle every saved theme that uses one. Update deliberately.
  it("produces stable output", () => {
    expect(
      ["#f5c518", "#1e3a8a", "#00b894", "#808080"].map((hex) =>
        generatePalette(hex),
      ),
    ).toMatchSnapshot();
  });
});
