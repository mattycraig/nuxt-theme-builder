import { describe, it, expect } from "vitest";
import {
  ThemeConfigSchema,
  CHROMATIC_PALETTES,
  NEUTRAL_PALETTES,
  SEMANTIC_COLOR_KEYS,
  SHADE_VALUES,
  NUMERIC_SHADE_KEYS,
  TEXT_TOKEN_KEYS,
  BG_TOKEN_KEYS,
  BORDER_TOKEN_KEYS,
  FONT_OPTIONS,
} from "~/types/theme";
import { DEFAULT_THEME, cloneTheme } from "~/utils/defaults";

describe("ThemeConfigSchema", () => {
  it("accepts a valid theme config", () => {
    const result = ThemeConfigSchema.safeParse(DEFAULT_THEME);
    expect(result.success).toBe(true);
  });

  it("accepts a cloned theme config", () => {
    const clone = cloneTheme(DEFAULT_THEME);
    const result = ThemeConfigSchema.safeParse(clone);
    expect(result.success).toBe(true);
  });

  it("rejects config with invalid chromatic palette", () => {
    const bad = cloneTheme(DEFAULT_THEME);
    // @ts-expect-error — intentionally invalid for test
    bad.colors.primary = "neon";
    const result = ThemeConfigSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("rejects config with invalid neutral palette", () => {
    const bad = cloneTheme(DEFAULT_THEME);
    // @ts-expect-error — intentionally invalid for test
    bad.neutral = "charcoal";
    const result = ThemeConfigSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("rejects config with missing colors field", () => {
    const { colors: _, ...rest } = DEFAULT_THEME;
    const result = ThemeConfigSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("rejects config with negative radius", () => {
    const bad = cloneTheme(DEFAULT_THEME);
    bad.radius = -1;
    const result = ThemeConfigSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("rejects config with radius > 2", () => {
    const bad = cloneTheme(DEFAULT_THEME);
    bad.radius = 5;
    const result = ThemeConfigSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("rejects config with empty font string", () => {
    const bad = cloneTheme(DEFAULT_THEME);
    bad.font = "";
    const result = ThemeConfigSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("rejects config with invalid shade value in overrides", () => {
    const bad = cloneTheme(DEFAULT_THEME);
    // @ts-expect-error — intentionally invalid for test
    bad.lightOverrides.text.dimmed = "999";
    const result = ThemeConfigSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("rejects completely empty object", () => {
    const result = ThemeConfigSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("rejects null input", () => {
    const result = ThemeConfigSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  it("provides meaningful error paths on failure", () => {
    const bad = cloneTheme(DEFAULT_THEME);
    // @ts-expect-error — intentionally invalid for test
    bad.colors.primary = "neon";
    const result = ThemeConfigSchema.safeParse(bad);
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join("."));
      expect(paths.some((p) => p.includes("primary"))).toBe(true);
    }
  });
});

describe("ThemeConfigSchema — backward compatibility transform", () => {
  it("fills in dark-mode fields from light when omitted", () => {
    const {
      darkColors,
      darkColorShades,
      darkNeutral,
      darkRadius,
      darkFont,
      ...rest
    } = cloneTheme(DEFAULT_THEME);
    const result = ThemeConfigSchema.safeParse(rest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.darkColors).toEqual(rest.colors);
      expect(result.data.darkNeutral).toBe(rest.neutral);
      expect(result.data.darkRadius).toBe(rest.radius);
      expect(result.data.darkFont).toBe(rest.font);
    }
  });

  it("preserves explicit dark-mode fields when provided", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.darkColors.primary = "red";
    config.darkNeutral = "zinc";
    config.darkRadius = 1.0;
    config.darkFont = "Geist";
    const result = ThemeConfigSchema.safeParse(config);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.darkColors.primary).toBe("red");
      expect(result.data.darkNeutral).toBe("zinc");
      expect(result.data.darkRadius).toBe(1.0);
      expect(result.data.darkFont).toBe("Geist");
    }
  });

  it("defaults colorShades when omitted", () => {
    const config = cloneTheme(DEFAULT_THEME);
    const { colorShades, darkColorShades, ...rest } = config;
    const result = ThemeConfigSchema.safeParse(rest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.colorShades.primary).toBe("500");
    }
  });
});

describe("const array integrity", () => {
  it("CHROMATIC_PALETTES has no duplicates and includes core colors", () => {
    expect(CHROMATIC_PALETTES.length).toBeGreaterThan(0);
    expect(new Set(CHROMATIC_PALETTES).size).toBe(CHROMATIC_PALETTES.length);
    expect(CHROMATIC_PALETTES).toContain("red");
    expect(CHROMATIC_PALETTES).toContain("rose");
    expect(CHROMATIC_PALETTES).toContain("indigo");
  });

  it("NEUTRAL_PALETTES has no duplicates and includes core neutrals", () => {
    expect(NEUTRAL_PALETTES.length).toBeGreaterThan(0);
    expect(new Set(NEUTRAL_PALETTES).size).toBe(NEUTRAL_PALETTES.length);
    expect(NEUTRAL_PALETTES).toContain("slate");
    expect(NEUTRAL_PALETTES).toContain("stone");
  });

  it("SEMANTIC_COLOR_KEYS includes required semantic keys", () => {
    expect(SEMANTIC_COLOR_KEYS.length).toBeGreaterThan(0);
    expect(new Set(SEMANTIC_COLOR_KEYS).size).toBe(SEMANTIC_COLOR_KEYS.length);
    expect(SEMANTIC_COLOR_KEYS).toContain("primary");
    expect(SEMANTIC_COLOR_KEYS).toContain("secondary");
    expect(SEMANTIC_COLOR_KEYS).toContain("success");
    expect(SEMANTIC_COLOR_KEYS).toContain("error");
  });

  it("SHADE_VALUES includes white, black, and numeric shades without duplicates", () => {
    expect(SHADE_VALUES).toContain("white");
    expect(SHADE_VALUES).toContain("black");
    expect(SHADE_VALUES).toContain("500");
    expect(new Set(SHADE_VALUES).size).toBe(SHADE_VALUES.length);
  });

  it("NUMERIC_SHADE_KEYS excludes white and black", () => {
    expect(NUMERIC_SHADE_KEYS).not.toContain("white");
    expect(NUMERIC_SHADE_KEYS).not.toContain("black");
    expect(NUMERIC_SHADE_KEYS.length).toBeGreaterThan(0);
    expect(new Set(NUMERIC_SHADE_KEYS).size).toBe(NUMERIC_SHADE_KEYS.length);
  });

  it("TEXT_TOKEN_KEYS includes required keys without duplicates", () => {
    expect(TEXT_TOKEN_KEYS).toContain("dimmed");
    expect(TEXT_TOKEN_KEYS).toContain("inverted");
    expect(TEXT_TOKEN_KEYS.length).toBeGreaterThan(0);
    expect(new Set(TEXT_TOKEN_KEYS).size).toBe(TEXT_TOKEN_KEYS.length);
  });

  it("BG_TOKEN_KEYS includes required keys without duplicates", () => {
    expect(BG_TOKEN_KEYS).toContain("default");
    expect(BG_TOKEN_KEYS).toContain("inverted");
    expect(BG_TOKEN_KEYS.length).toBeGreaterThan(0);
    expect(new Set(BG_TOKEN_KEYS).size).toBe(BG_TOKEN_KEYS.length);
  });

  it("BORDER_TOKEN_KEYS includes required keys without duplicates", () => {
    expect(BORDER_TOKEN_KEYS).toContain("default");
    expect(BORDER_TOKEN_KEYS).toContain("inverted");
    expect(BORDER_TOKEN_KEYS.length).toBeGreaterThan(0);
    expect(new Set(BORDER_TOKEN_KEYS).size).toBe(BORDER_TOKEN_KEYS.length);
  });

  it("FONT_OPTIONS includes core fonts without duplicates", () => {
    expect(FONT_OPTIONS).toContain("Inter");
    expect(FONT_OPTIONS).toContain("Geist");
    expect(FONT_OPTIONS.length).toBeGreaterThan(0);
    expect(new Set(FONT_OPTIONS).size).toBe(FONT_OPTIONS.length);
  });
});
