import { describe, it, expect } from "vitest";
import {
  CHROMATIC_PALETTES,
  NEUTRAL_PALETTES,
  ALL_PALETTES,
  SHADE_VALUES,
  FONT_ENTRIES,
  FONT_OPTIONS,
  RADIUS_MIN,
  RADIUS_MAX,
  SEMANTIC_COLOR_KEYS,
  DEFAULT_COLOR_SHADES,
} from "~~/shared/constants/theme";

describe("shared/constants/theme", () => {
  describe("CHROMATIC_PALETTES", () => {
    it("contains 17 palettes", () => {
      expect(CHROMATIC_PALETTES).toHaveLength(17);
    });

    it("has no duplicates", () => {
      expect(new Set(CHROMATIC_PALETTES).size).toBe(CHROMATIC_PALETTES.length);
    });

    it("includes expected palettes", () => {
      expect(CHROMATIC_PALETTES).toContain("red");
      expect(CHROMATIC_PALETTES).toContain("blue");
      expect(CHROMATIC_PALETTES).toContain("green");
    });

    it("does not include neutral palettes", () => {
      for (const n of NEUTRAL_PALETTES) {
        expect(CHROMATIC_PALETTES).not.toContain(n);
      }
    });
  });

  describe("NEUTRAL_PALETTES", () => {
    it("contains 5 palettes", () => {
      expect(NEUTRAL_PALETTES).toHaveLength(5);
    });

    it("has no duplicates", () => {
      expect(new Set(NEUTRAL_PALETTES).size).toBe(NEUTRAL_PALETTES.length);
    });

    it("includes expected palettes", () => {
      expect(NEUTRAL_PALETTES).toContain("slate");
      expect(NEUTRAL_PALETTES).toContain("zinc");
      expect(NEUTRAL_PALETTES).toContain("neutral");
    });
  });

  describe("ALL_PALETTES", () => {
    it("equals spread of chromatic + neutral", () => {
      expect([...ALL_PALETTES]).toEqual([
        ...CHROMATIC_PALETTES,
        ...NEUTRAL_PALETTES,
      ]);
    });

    it("has no duplicates", () => {
      expect(new Set(ALL_PALETTES).size).toBe(ALL_PALETTES.length);
    });
  });

  describe("SHADE_VALUES", () => {
    it("contains white and black", () => {
      expect(SHADE_VALUES).toContain("white");
      expect(SHADE_VALUES).toContain("black");
    });

    it("contains numeric shades from 50 to 950", () => {
      for (const s of ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]) {
        expect(SHADE_VALUES).toContain(s);
      }
    });

    it("has no duplicates", () => {
      expect(new Set(SHADE_VALUES).size).toBe(SHADE_VALUES.length);
    });
  });

  describe("FONT_ENTRIES", () => {
    it("is non-empty", () => {
      expect(FONT_ENTRIES.length).toBeGreaterThan(0);
    });

    it("every entry has a name and valid category", () => {
      const validCategories = ["sans-serif", "serif", "monospace", "display"];
      for (const entry of FONT_ENTRIES) {
        expect(entry.name).toBeTruthy();
        expect(validCategories).toContain(entry.category);
      }
    });

    it("has no duplicate font names", () => {
      const names = FONT_ENTRIES.map((f) => f.name);
      expect(new Set(names).size).toBe(names.length);
    });

    it("includes fonts from each category", () => {
      const categories = new Set(FONT_ENTRIES.map((f) => f.category));
      expect(categories).toContain("sans-serif");
      expect(categories).toContain("serif");
      expect(categories).toContain("monospace");
      expect(categories).toContain("display");
    });
  });

  describe("FONT_OPTIONS", () => {
    it("has same length as FONT_ENTRIES", () => {
      expect(FONT_OPTIONS).toHaveLength(FONT_ENTRIES.length);
    });

    it("contains all font names from FONT_ENTRIES", () => {
      for (const entry of FONT_ENTRIES) {
        expect(FONT_OPTIONS).toContain(entry.name);
      }
    });

    it("contains only strings", () => {
      for (const name of FONT_OPTIONS) {
        expect(typeof name).toBe("string");
      }
    });
  });

  describe("RADIUS_MIN / RADIUS_MAX", () => {
    it("RADIUS_MIN is 0", () => {
      expect(RADIUS_MIN).toBe(0);
    });

    it("RADIUS_MAX is 2", () => {
      expect(RADIUS_MAX).toBe(2);
    });

    it("min is less than max", () => {
      expect(RADIUS_MIN).toBeLessThan(RADIUS_MAX);
    });
  });

  describe("SEMANTIC_COLOR_KEYS", () => {
    it("contains all 6 semantic roles", () => {
      expect([...SEMANTIC_COLOR_KEYS]).toEqual([
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "error",
      ]);
    });

    it("has no duplicates", () => {
      expect(new Set(SEMANTIC_COLOR_KEYS).size).toBe(SEMANTIC_COLOR_KEYS.length);
    });
  });

  describe("DEFAULT_COLOR_SHADES", () => {
    it("has a key for each semantic color", () => {
      for (const key of SEMANTIC_COLOR_KEYS) {
        expect(DEFAULT_COLOR_SHADES).toHaveProperty(key);
      }
    });

    it("all default to '500'", () => {
      for (const key of SEMANTIC_COLOR_KEYS) {
        expect(DEFAULT_COLOR_SHADES[key]).toBe("500");
      }
    });
  });
});
