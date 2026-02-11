import { describe, it, expect } from "vitest";
import {
  shadeToCSS,
  cloneTheme,
  DEFAULT_THEME,
  DEFAULT_LIGHT_OVERRIDES,
  DEFAULT_DARK_OVERRIDES,
  NEUTRAL_HEX_MAP,
  CHROMATIC_SWATCH_HEX,
  CHROMATIC_HEX_MAP,
  NEUTRAL_SWATCH_HEX,
  ALL_SWATCH_HEX,
  ALL_HEX_MAP,
} from "~/utils/defaults";
import {
  CHROMATIC_PALETTES,
  NEUTRAL_PALETTES,
  NUMERIC_SHADE_KEYS,
  SEMANTIC_COLOR_KEYS,
  TEXT_TOKEN_KEYS,
  BG_TOKEN_KEYS,
  BORDER_TOKEN_KEYS,
} from "~/types/theme";

describe("DEFAULT_THEME completeness", () => {
  it("has all semantic color keys defined", () => {
    for (const key of SEMANTIC_COLOR_KEYS) {
      expect(DEFAULT_THEME.colors[key]).toBeTruthy();
      expect(DEFAULT_THEME.darkColors[key]).toBeTruthy();
    }
  });

  it("has all token override categories populated", () => {
    for (const key of TEXT_TOKEN_KEYS) {
      expect(DEFAULT_THEME.lightOverrides.text[key]).toBeTruthy();
      expect(DEFAULT_THEME.darkOverrides.text[key]).toBeTruthy();
    }
    for (const key of BG_TOKEN_KEYS) {
      expect(DEFAULT_THEME.lightOverrides.bg[key]).toBeTruthy();
      expect(DEFAULT_THEME.darkOverrides.bg[key]).toBeTruthy();
    }
    for (const key of BORDER_TOKEN_KEYS) {
      expect(DEFAULT_THEME.lightOverrides.border[key]).toBeTruthy();
      expect(DEFAULT_THEME.darkOverrides.border[key]).toBeTruthy();
    }
  });

  it("has valid number fields", () => {
    expect(DEFAULT_THEME.radius).toBeGreaterThanOrEqual(0);
    expect(DEFAULT_THEME.radius).toBeLessThanOrEqual(2);
    expect(DEFAULT_THEME.darkRadius).toBeGreaterThanOrEqual(0);
    expect(DEFAULT_THEME.darkRadius).toBeLessThanOrEqual(2);
  });

  it("has valid font names", () => {
    expect(DEFAULT_THEME.font).toBeTruthy();
    expect(DEFAULT_THEME.darkFont).toBeTruthy();
  });
});

describe("DEFAULT_LIGHT_OVERRIDES and DEFAULT_DARK_OVERRIDES", () => {
  it("are independent objects", () => {
    expect(DEFAULT_LIGHT_OVERRIDES).not.toBe(DEFAULT_DARK_OVERRIDES);
    expect(DEFAULT_LIGHT_OVERRIDES.text).not.toBe(DEFAULT_DARK_OVERRIDES.text);
  });

  it("have different default values for dark vs light", () => {
    expect(DEFAULT_LIGHT_OVERRIDES.text.default).not.toBe(
      DEFAULT_DARK_OVERRIDES.text.default,
    );
    expect(DEFAULT_LIGHT_OVERRIDES.bg.default).not.toBe(
      DEFAULT_DARK_OVERRIDES.bg.default,
    );
  });
});

describe("Hex maps", () => {
  it("NEUTRAL_HEX_MAP has all neutral palettes", () => {
    for (const palette of NEUTRAL_PALETTES) {
      expect(NEUTRAL_HEX_MAP[palette]).toBeDefined();
    }
  });

  it("NEUTRAL_HEX_MAP entries have all shade keys plus white/black", () => {
    for (const palette of NEUTRAL_PALETTES) {
      const shades = NEUTRAL_HEX_MAP[palette]!;
      for (const shade of NUMERIC_SHADE_KEYS) {
        expect(shades[shade]).toBeDefined();
        expect(shades[shade]).toMatch(/^(#[0-9a-f]{6}|oklch\(.+\))$/i);
      }
      expect(shades.white).toBe("#ffffff");
      expect(shades.black).toBe("#000000");
    }
  });

  it("CHROMATIC_HEX_MAP has all chromatic palettes", () => {
    for (const palette of CHROMATIC_PALETTES) {
      expect(CHROMATIC_HEX_MAP[palette]).toBeDefined();
    }
  });

  it("CHROMATIC_HEX_MAP entries have all numeric shade keys", () => {
    for (const palette of CHROMATIC_PALETTES) {
      const shades = CHROMATIC_HEX_MAP[palette]!;
      for (const shade of NUMERIC_SHADE_KEYS) {
        expect(shades[shade]).toBeDefined();
        expect(shades[shade]).toMatch(/^(#[0-9a-f]{6}|oklch\(.+\))$/i);
      }
    }
  });

  it("CHROMATIC_SWATCH_HEX has all chromatic palettes", () => {
    for (const palette of CHROMATIC_PALETTES) {
      expect(CHROMATIC_SWATCH_HEX[palette]).toBeDefined();
      expect(CHROMATIC_SWATCH_HEX[palette]).toMatch(
        /^(#[0-9a-f]{6}|oklch\(.+\))$/i,
      );
    }
  });

  it("NEUTRAL_SWATCH_HEX has all neutral palettes", () => {
    for (const palette of NEUTRAL_PALETTES) {
      expect(NEUTRAL_SWATCH_HEX[palette]).toBeDefined();
    }
  });

  it("ALL_SWATCH_HEX merges both chromatic and neutral swatches", () => {
    for (const palette of CHROMATIC_PALETTES) {
      expect(ALL_SWATCH_HEX[palette]).toBeDefined();
    }
    for (const palette of NEUTRAL_PALETTES) {
      expect(ALL_SWATCH_HEX[palette]).toBeDefined();
    }
  });

  it("ALL_HEX_MAP merges both chromatic and neutral maps", () => {
    for (const palette of CHROMATIC_PALETTES) {
      expect(ALL_HEX_MAP[palette]).toBeDefined();
    }
    for (const palette of NEUTRAL_PALETTES) {
      expect(ALL_HEX_MAP[palette]).toBeDefined();
    }
  });
});

describe("shadeToCSS edge cases", () => {
  it("handles all numeric shade values", () => {
    for (const shade of NUMERIC_SHADE_KEYS) {
      const result = shadeToCSS(shade);
      expect(result).toBe(`var(--ui-color-neutral-${shade})`);
    }
  });

  it("handles arbitrary string as numeric shade", () => {
    expect(shadeToCSS("123")).toBe("var(--ui-color-neutral-123)");
  });
});

describe("cloneTheme edge cases", () => {
  it("handles nested darkOverrides independently", () => {
    const original = cloneTheme(DEFAULT_THEME);
    const clone = cloneTheme(original);

    clone.darkOverrides.text.dimmed = "950";
    expect(original.darkOverrides.text.dimmed).toBe(
      DEFAULT_THEME.darkOverrides.text.dimmed,
    );
  });

  it("handles darkColors independently", () => {
    const original = cloneTheme(DEFAULT_THEME);
    const clone = cloneTheme(original);

    clone.darkColors.primary = "red";
    expect(original.darkColors.primary).toBe(DEFAULT_THEME.darkColors.primary);
  });

  it("preserves all fields through clone", () => {
    const custom = cloneTheme(DEFAULT_THEME);
    custom.colors.primary = "red";
    custom.darkColors.primary = "blue";
    custom.neutral = "zinc";
    custom.darkNeutral = "stone";
    custom.radius = 1.5;
    custom.darkRadius = 0.25;
    custom.font = "Geist";
    custom.darkFont = "Lora";

    const clone = cloneTheme(custom);
    expect(clone.colors.primary).toBe("red");
    expect(clone.darkColors.primary).toBe("blue");
    expect(clone.neutral).toBe("zinc");
    expect(clone.darkNeutral).toBe("stone");
    expect(clone.radius).toBe(1.5);
    expect(clone.darkRadius).toBe(0.25);
    expect(clone.font).toBe("Geist");
    expect(clone.darkFont).toBe("Lora");
  });
});
