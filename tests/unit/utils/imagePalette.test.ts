import { describe, it, expect } from "vitest";
import { NEUTRAL_PALETTES } from "~/types/theme";
import { extractColors, suggestThemeColors } from "~/utils/imagePalette";

type Pixel = [number, number, number, number?];

/** RGBA buffer with `count` copies of each pixel. */
function pixels(...runs: [Pixel, number][]): Uint8ClampedArray {
  const data: number[] = [];
  for (const [[r, g, b, a = 255], count] of runs) {
    for (let i = 0; i < count; i++) data.push(r, g, b, a);
  }
  return new Uint8ClampedArray(data);
}

const WHITE: Pixel = [255, 255, 255];
const RED: Pixel = [228, 0, 43];
const BLUE: Pixel = [0, 87, 184];

describe("extractColors", () => {
  it("returns colors by share of opaque pixels", () => {
    const colors = extractColors(pixels([WHITE, 60], [RED, 30], [BLUE, 10]));

    expect(colors.map((c) => c.hex)).toEqual(["#ffffff", "#e4002b", "#0057b8"]);
    expect(colors[1]!.weight).toBeCloseTo(0.3);
  });

  it("skips transparent pixels", () => {
    const colors = extractColors(pixels([[0, 0, 0, 0], 90], [RED, 10]));

    expect(colors).toHaveLength(1);
    expect(colors[0]!.weight).toBe(1);
  });

  it("returns nothing for a fully transparent image", () => {
    expect(extractColors(pixels([[10, 10, 10, 0], 5]))).toEqual([]);
  });

  it("merges near-identical shades such as anti-aliasing", () => {
    const colors = extractColors(pixels([RED, 50], [[226, 4, 46], 50]));

    expect(colors).toHaveLength(1);
    expect(colors[0]!.weight).toBe(1);
  });

  it("drops slivers of color such as anti-aliased edges", () => {
    const colors = extractColors(pixels([WHITE, 99], [BLUE, 1]));

    expect(colors.map((c) => c.hex)).toEqual(["#ffffff"]);
  });

  it("keeps at most `max` colors", () => {
    const runs: [Pixel, number][] = [
      [[255, 0, 0], 1],
      [[0, 255, 0], 1],
      [[0, 0, 255], 1],
      [[255, 255, 0], 1],
    ];
    expect(extractColors(pixels(...runs), 2)).toHaveLength(2);
  });
});

describe("suggestThemeColors", () => {
  it("picks the main brand color as primary and a different hue as secondary", () => {
    const colors = extractColors(pixels([WHITE, 60], [RED, 30], [BLUE, 10]));

    const suggestion = suggestThemeColors(colors);

    expect(suggestion?.primary).toBe("#e4002b");
    expect(suggestion?.secondary).toBe("#0057b8");
    expect(NEUTRAL_PALETTES).toContain(suggestion?.neutral);
  });

  it("skips a second color with a similar hue", () => {
    const colors = extractColors(pixels([RED, 50], [[200, 40, 20], 50]));

    expect(suggestThemeColors(colors)?.secondary).toBeUndefined();
  });

  it("lets the user choose the primary", () => {
    const colors = extractColors(pixels([RED, 60], [BLUE, 40]));

    const suggestion = suggestThemeColors(colors, "#0057b8");

    expect(suggestion?.primary).toBe("#0057b8");
    expect(suggestion?.secondary).toBe("#e4002b");
  });

  it("tints the neutral toward the primary hue", () => {
    const blue = suggestThemeColors(extractColors(pixels([BLUE, 1])));
    const red = suggestThemeColors(extractColors(pixels([RED, 1])));

    expect(blue?.neutral).not.toBe(red?.neutral);
    expect(blue?.neutral).not.toBe("neutral");
  });

  it("uses a monochrome logo's color as primary with a plain neutral", () => {
    const colors = extractColors(pixels([WHITE, 70], [[24, 24, 27], 30]));

    const suggestion = suggestThemeColors(colors);

    expect(suggestion?.primary).toBe("#18181b");
    expect(suggestion?.secondary).toBeUndefined();
    expect(NEUTRAL_PALETTES).toContain(suggestion?.neutral);
  });

  it("returns null when there is nothing but white", () => {
    expect(suggestThemeColors(extractColors(pixels([WHITE, 10])))).toBeNull();
  });
});
