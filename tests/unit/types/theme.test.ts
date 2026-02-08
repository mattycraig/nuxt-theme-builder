import { describe, it, expect } from "vitest";
import { ThemeConfigSchema } from "~/types/theme";
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
