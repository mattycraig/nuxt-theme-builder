import { describe, it, expect } from "vitest";
import {
  FONT_ENTRIES,
  FONT_OPTIONS,
  getFontCategory,
  getFontFallbackStack,
  PALETTE_CATEGORIES,
  PALETTE_CATEGORY_ORDER,
  ALL_PALETTES,
  CHROMATIC_PALETTES,
  NEUTRAL_PALETTES,
  PRESET_CATEGORIES,
  type FontCategory,
} from "~/types/theme";

describe("FONT_ENTRIES", () => {
  it("has entries for every font in FONT_OPTIONS", () => {
    const entryNames = FONT_ENTRIES.map((f) => f.name);
    for (const font of FONT_OPTIONS) {
      expect(entryNames).toContain(font);
    }
  });

  it("every entry has a name and a valid category", () => {
    const validCategories: FontCategory[] = [
      "sans-serif",
      "serif",
      "monospace",
      "display",
    ];
    for (const entry of FONT_ENTRIES) {
      expect(entry.name).toBeTruthy();
      expect(validCategories).toContain(entry.category);
    }
  });

  it("contains at least one font from each category", () => {
    const categories = new Set(FONT_ENTRIES.map((f) => f.category));
    expect(categories).toContain("sans-serif");
    expect(categories).toContain("serif");
    expect(categories).toContain("monospace");
    expect(categories).toContain("display");
  });

  it("has no duplicate font names", () => {
    const names = FONT_ENTRIES.map((f) => f.name);
    const unique = new Set(names);
    expect(names.length).toBe(unique.size);
  });
});

describe("getFontCategory", () => {
  it("returns correct category for known sans-serif font", () => {
    expect(getFontCategory("Inter")).toBe("sans-serif");
  });

  it("returns correct category for known serif font", () => {
    expect(getFontCategory("Lora")).toBe("serif");
  });

  it("returns correct category for known monospace font", () => {
    expect(getFontCategory("JetBrains Mono")).toBe("monospace");
  });

  it("returns correct category for known display font", () => {
    expect(getFontCategory("Sora")).toBe("display");
  });

  it("defaults to sans-serif for unknown fonts", () => {
    expect(getFontCategory("UnknownFont")).toBe("sans-serif");
    expect(getFontCategory("")).toBe("sans-serif");
  });
});

describe("getFontFallbackStack", () => {
  it("returns sans-serif fallback for sans-serif fonts", () => {
    const fallback = getFontFallbackStack("Inter");
    expect(fallback).toContain("sans-serif");
    expect(fallback).toContain("system-ui");
  });

  it("returns serif fallback for serif fonts", () => {
    const fallback = getFontFallbackStack("Lora");
    expect(fallback).toContain("serif");
    expect(fallback).toContain("Georgia");
  });

  it("returns monospace fallback for monospace fonts", () => {
    const fallback = getFontFallbackStack("Fira Code");
    expect(fallback).toContain("monospace");
    expect(fallback).toContain("Consolas");
  });

  it("returns sans-serif fallback for display fonts", () => {
    const fallback = getFontFallbackStack("Sora");
    expect(fallback).toContain("sans-serif");
  });

  it("returns sans-serif fallback for unknown fonts", () => {
    const fallback = getFontFallbackStack("UnknownFont");
    expect(fallback).toContain("sans-serif");
  });
});

describe("PALETTE_CATEGORIES", () => {
  it("every palette in ALL_PALETTES appears in exactly one category", () => {
    const allCategorized = Object.values(PALETTE_CATEGORIES).flat();
    for (const palette of ALL_PALETTES) {
      expect(allCategorized).toContain(palette);
    }
    expect(allCategorized.length).toBe(ALL_PALETTES.length);
  });

  it("categories contain only valid palettes", () => {
    for (const palettes of Object.values(PALETTE_CATEGORIES)) {
      for (const palette of palettes) {
        expect(ALL_PALETTES).toContain(palette);
      }
    }
  });

  it("PALETTE_CATEGORY_ORDER matches the keys of PALETTE_CATEGORIES", () => {
    const categoryKeys = Object.keys(PALETTE_CATEGORIES);
    expect(PALETTE_CATEGORY_ORDER).toEqual(categoryKeys);
  });

  it("Neutral category contains all neutral palettes", () => {
    for (const palette of NEUTRAL_PALETTES) {
      expect(PALETTE_CATEGORIES.Neutral).toContain(palette);
    }
  });

  it("non-Neutral categories contain only chromatic palettes", () => {
    const nonNeutral = PALETTE_CATEGORY_ORDER.filter((c) => c !== "Neutral");
    for (const cat of nonNeutral) {
      for (const palette of PALETTE_CATEGORIES[cat]) {
        expect(CHROMATIC_PALETTES).toContain(palette);
      }
    }
  });
});

describe("PRESET_CATEGORIES", () => {
  it("contains at least 3 categories", () => {
    expect(PRESET_CATEGORIES.length).toBeGreaterThanOrEqual(3);
  });

  it("includes Essentials category", () => {
    expect(PRESET_CATEGORIES).toContain("Essentials");
  });
});
