import { describe, it, expect } from "vitest";
import {
  findCustomPalette,
  getCustomPaletteAnchor,
  getCustomPaletteNameError,
  getPaletteShadeMap,
  getPaletteSwatch,
  isBuiltInPalette,
  mergeCustomPalettes,
  normalizePaletteNameInput,
  suggestCustomPaletteName,
} from "~/utils/customPalettes";
import { generatePalette } from "~/utils/paletteGenerator";
import { ALL_HEX_MAP, ALL_SWATCH_HEX } from "~/utils/colorPalettes";
import { CUSTOM_PALETTE_MAX } from "~/types/theme";
import type { CustomPalette } from "~/types/theme";

const BRAND: CustomPalette = { name: "brand", color: "#f5c518" };

describe("palette lookup", () => {
  it("identifies built-in palettes", () => {
    expect(isBuiltInPalette("indigo")).toBe(true);
    expect(isBuiltInPalette("zinc")).toBe(true);
    expect(isBuiltInPalette("brand")).toBe(false);
  });

  it("finds custom palettes by name, never shadowing built-ins", () => {
    expect(findCustomPalette("brand", [BRAND])).toEqual(BRAND);
    expect(findCustomPalette("missing", [BRAND])).toBeUndefined();
    expect(
      findCustomPalette("indigo", [{ name: "indigo", color: "#000000" }]),
    ).toBeUndefined();
  });

  it("returns built-in shade maps unchanged", () => {
    expect(getPaletteShadeMap("indigo")).toBe(ALL_HEX_MAP.indigo);
  });

  it("generates shade maps for custom palettes", () => {
    expect(getPaletteShadeMap("brand", [BRAND])).toEqual(
      generatePalette("#f5c518")!.shades,
    );
  });

  it("returns an empty map for unknown palettes", () => {
    expect(getPaletteShadeMap("brand")).toEqual({});
  });

  it("uses shade 500 for built-in swatches and the base color for custom ones", () => {
    expect(getPaletteSwatch("indigo")).toBe(ALL_SWATCH_HEX.indigo);
    expect(getPaletteSwatch("brand", [BRAND])).toBe("#f5c518");
    expect(getPaletteSwatch("brand")).toBeUndefined();
  });

  it("reports the anchor shade for custom palettes only", () => {
    expect(getCustomPaletteAnchor("brand", [BRAND])).toBe("400");
    expect(getCustomPaletteAnchor("indigo", [BRAND])).toBeUndefined();
  });
});

describe("palette names", () => {
  it("normalizes typed names toward a valid slug", () => {
    expect(normalizePaletteNameInput("Brand Yellow")).toBe("brand-yellow");
    expect(normalizePaletteNameInput("my_brand!!")).toBe("my-brand");
    expect(normalizePaletteNameInput("a  -  b")).toBe("a-b");
    expect(normalizePaletteNameInput("brand-")).toBe("brand-");
    expect(normalizePaletteNameInput("x".repeat(40))).toHaveLength(24);
  });

  it("explains why a name can't be used", () => {
    expect(getCustomPaletteNameError("", [])).toMatch(/Enter a name/);
    expect(getCustomPaletteNameError("brand-", [])).toMatch(/single dashes/);
    expect(getCustomPaletteNameError("yellow", [])).toMatch(/built-in/);
    expect(getCustomPaletteNameError("primary", [])).toMatch(/role/);
    expect(getCustomPaletteNameError("brand", [BRAND])).toMatch(/already exists/);
    expect(getCustomPaletteNameError("brand-yellow", [BRAND])).toBeNull();
  });

  it("allows keeping the current name when renaming", () => {
    expect(getCustomPaletteNameError("brand", [BRAND], "brand")).toBeNull();
  });

  it("suggests the first free name", () => {
    expect(suggestCustomPaletteName([])).toBe("brand");
    expect(suggestCustomPaletteName([BRAND])).toBe("brand-2");
    expect(
      suggestCustomPaletteName([BRAND, { name: "brand-2", color: "#000000" }]),
    ).toBe("brand-3");
  });
});

describe("mergeCustomPalettes", () => {
  it("keeps current palettes when the incoming theme has none", () => {
    expect(mergeCustomPalettes(undefined, [BRAND])).toEqual([BRAND]);
  });

  it("prefers incoming definitions on name clashes", () => {
    const incoming = [{ name: "brand", color: "#000000" }];
    const other = { name: "accent", color: "#ff0000" };
    expect(mergeCustomPalettes(incoming, [BRAND, other])).toEqual([
      { name: "brand", color: "#000000" },
      other,
    ]);
  });

  it(`caps the result at ${CUSTOM_PALETTE_MAX} palettes`, () => {
    const make = (prefix: string) =>
      Array.from({ length: CUSTOM_PALETTE_MAX }, (_, i) => ({
        name: `${prefix}-${i}`,
        color: "#f5c518",
      }));
    const merged = mergeCustomPalettes(make("a"), make("b"));
    expect(merged).toHaveLength(CUSTOM_PALETTE_MAX);
    expect(merged!.every((p) => p.name.startsWith("a-"))).toBe(true);
  });

  it("returns undefined when there is nothing to keep", () => {
    expect(mergeCustomPalettes(undefined, undefined)).toBeUndefined();
    expect(mergeCustomPalettes([], [])).toBeUndefined();
  });

  it("returns copies, not the original objects", () => {
    const merged = mergeCustomPalettes(undefined, [BRAND])!;
    expect(merged[0]).not.toBe(BRAND);
  });
});
