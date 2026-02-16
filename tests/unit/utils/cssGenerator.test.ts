import { describe, it, expect } from "vitest";
import {
  generateOverrideLines,
  generateThemeCSS,
  generateExportCSS,
  generateShadeOverrideLines,
  generateDarkPaletteOverrideLines,
  generateDarkNeutralOverrideLines,
  getOverriddenTokenKeys,
} from "~/utils/cssGenerator";
import {
  DEFAULT_LIGHT_OVERRIDES,
  DEFAULT_DARK_OVERRIDES,
  DEFAULT_THEME,
  cloneTheme,
} from "~/utils/defaults";
import { DEFAULT_COLOR_SHADES, NUMERIC_SHADE_KEYS } from "~/types/theme";

describe("generateOverrideLines", () => {
  it("returns empty array when overrides match defaults", () => {
    const lines = generateOverrideLines(
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_LIGHT_OVERRIDES,
    );
    expect(lines).toEqual([]);
  });

  it("returns CSS lines for overrides that differ from defaults", () => {
    const custom = {
      ...DEFAULT_LIGHT_OVERRIDES,
      text: { ...DEFAULT_LIGHT_OVERRIDES.text, dimmed: "950" as const },
    };
    const lines = generateOverrideLines(custom, DEFAULT_LIGHT_OVERRIDES);
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some((l) => l.includes("--ui-text-dimmed"))).toBe(true);
    expect(lines.some((l) => l.includes("950"))).toBe(true);
  });

  it("uses bare variable name for 'default' token key", () => {
    const custom = {
      ...DEFAULT_LIGHT_OVERRIDES,
      text: { ...DEFAULT_LIGHT_OVERRIDES.text, default: "950" as const },
    };
    const lines = generateOverrideLines(custom, DEFAULT_LIGHT_OVERRIDES);
    // Should produce --ui-text, not --ui-text-default
    expect(
      lines.some((l) => l.includes("--ui-text:") || l.includes("--ui-text ")),
    ).toBe(true);
    expect(lines.some((l) => l.includes("--ui-text-default"))).toBe(false);
  });
});

describe("generateThemeCSS", () => {
  it("includes :root block with font and radius", () => {
    const { rootCSS } = generateThemeCSS(
      DEFAULT_THEME,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    expect(rootCSS).toContain(":root {");
    expect(rootCSS).toContain("--font-sans:");
    expect(rootCSS).toContain(`${DEFAULT_THEME.font}`);
    expect(rootCSS).toContain(`--ui-radius: ${DEFAULT_THEME.radius}rem`);
  });

  it("returns empty darkCSS when dark overrides match defaults", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.darkColors = { ...config.colors };
    config.darkColorShades = { ...config.colorShades };
    config.darkNeutral = config.neutral;
    const { darkCSS } = generateThemeCSS(
      config,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    expect(darkCSS).toBe("");
  });

  it("returns .dark block when dark overrides differ from defaults", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.darkOverrides.text.dimmed = "950";

    const { darkCSS } = generateThemeCSS(
      config,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    expect(darkCSS).toContain(".dark {");
    expect(darkCSS).toContain("--ui-text-dimmed");
  });
});

describe("generateExportCSS", () => {
  it("includes @import preamble and @theme block", () => {
    const output = generateExportCSS(
      DEFAULT_THEME,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    expect(output).toContain('@import "tailwindcss"');
    expect(output).toContain('@import "@nuxt/ui"');
    expect(output).toContain("@theme {");
    expect(output).toContain(`--font-sans: '${DEFAULT_THEME.font}'`);
  });

  it("includes :root block with radius", () => {
    const output = generateExportCSS(
      DEFAULT_THEME,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    expect(output).toContain(":root {");
    expect(output).toContain(`--ui-radius: ${DEFAULT_THEME.radius}rem`);
  });

  it("includes .dark block when dark overrides differ", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.darkOverrides.text.dimmed = "950";
    const output = generateExportCSS(
      config,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    expect(output).toContain(".dark {");
    expect(output).toContain("--ui-text-dimmed");
  });

  it("omits .dark block when dark matches defaults", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.darkColors = { ...config.colors };
    config.darkColorShades = { ...config.colorShades };
    config.darkNeutral = config.neutral;
    const output = generateExportCSS(
      config,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    expect(output).not.toContain(".dark {");
  });
});

describe("generateShadeOverrideLines", () => {
  it("returns empty array when all shades are default (500)", () => {
    const lines = generateShadeOverrideLines(DEFAULT_THEME.colors, {
      ...DEFAULT_COLOR_SHADES,
    });
    expect(lines).toEqual([]);
  });

  it("generates shifted palette overrides for non-500 shade", () => {
    const shades = { ...DEFAULT_COLOR_SHADES, primary: "400" as const };
    const lines = generateShadeOverrideLines(DEFAULT_THEME.colors, shades);
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some((l) => l.includes("--ui-color-primary-"))).toBe(true);
  });

  it("does not generate overrides for colors still at 500", () => {
    const shades = { ...DEFAULT_COLOR_SHADES, primary: "600" as const };
    const lines = generateShadeOverrideLines(DEFAULT_THEME.colors, shades);
    expect(lines.every((l) => l.includes("--ui-color-primary-"))).toBe(true);
    expect(lines.some((l) => l.includes("--ui-color-secondary-"))).toBe(false);
  });

  it("flattens palette to white for shade 'white'", () => {
    const shades = { ...DEFAULT_COLOR_SHADES, primary: "white" as const };
    const lines = generateShadeOverrideLines(DEFAULT_THEME.colors, shades);
    expect(lines.length).toBe(NUMERIC_SHADE_KEYS.length);
    expect(lines.every((l) => l.includes("#ffffff"))).toBe(true);
  });

  it("flattens palette to black for shade 'black'", () => {
    const shades = { ...DEFAULT_COLOR_SHADES, primary: "black" as const };
    const lines = generateShadeOverrideLines(DEFAULT_THEME.colors, shades);
    expect(lines.length).toBe(NUMERIC_SHADE_KEYS.length);
    expect(lines.every((l) => l.includes("#000000"))).toBe(true);
  });

  it("respects custom indent", () => {
    const shades = { ...DEFAULT_COLOR_SHADES, primary: "400" as const };
    const lines = generateShadeOverrideLines(
      DEFAULT_THEME.colors,
      shades,
      "    ",
    );
    expect(lines.every((l) => l.startsWith("    "))).toBe(true);
  });
});

describe("generateDarkPaletteOverrideLines", () => {
  it("returns empty array when dark palettes match light", () => {
    const lines = generateDarkPaletteOverrideLines(
      DEFAULT_THEME.colors,
      { ...DEFAULT_COLOR_SHADES },
      DEFAULT_THEME.colors,
      { ...DEFAULT_COLOR_SHADES },
    );
    expect(lines).toEqual([]);
  });

  it("generates overrides when dark uses a different palette", () => {
    const darkColors = { ...DEFAULT_THEME.colors, primary: "red" as const };
    const lines = generateDarkPaletteOverrideLines(
      DEFAULT_THEME.colors,
      { ...DEFAULT_COLOR_SHADES },
      darkColors,
      { ...DEFAULT_COLOR_SHADES },
    );
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some((l) => l.includes("--ui-color-primary-"))).toBe(true);
  });

  it("generates overrides when dark uses a different shade", () => {
    const darkShades = { ...DEFAULT_COLOR_SHADES, secondary: "600" as const };
    const lines = generateDarkPaletteOverrideLines(
      DEFAULT_THEME.colors,
      { ...DEFAULT_COLOR_SHADES },
      DEFAULT_THEME.colors,
      darkShades,
    );
    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some((l) => l.includes("--ui-color-secondary-"))).toBe(true);
  });

  it("handles dark shade 'white' by flattening to white hex", () => {
    const darkShades = { ...DEFAULT_COLOR_SHADES, primary: "white" as const };
    const lines = generateDarkPaletteOverrideLines(
      DEFAULT_THEME.colors,
      { ...DEFAULT_COLOR_SHADES },
      DEFAULT_THEME.colors,
      darkShades,
    );
    const primaryLines = lines.filter((l) => l.includes("--ui-color-primary-"));
    expect(primaryLines.length).toBe(NUMERIC_SHADE_KEYS.length);
    expect(primaryLines.every((l) => l.includes("#ffffff"))).toBe(true);
  });
});

describe("generateDarkNeutralOverrideLines", () => {
  it("returns empty array when dark neutral matches light", () => {
    const lines = generateDarkNeutralOverrideLines("slate", "slate");
    expect(lines).toEqual([]);
  });

  it("generates neutral shade overrides when dark differs", () => {
    const lines = generateDarkNeutralOverrideLines("slate", "zinc");
    expect(lines.length).toBe(NUMERIC_SHADE_KEYS.length);
    expect(lines.every((l) => l.includes("--ui-color-neutral-"))).toBe(true);
  });

  it("uses color values from the dark neutral palette", () => {
    const lines = generateDarkNeutralOverrideLines("slate", "stone");
    expect(lines.some((l) => l.includes("oklch(0.709 0.01 56.259)"))).toBe(
      true,
    );
  });
});

describe("generateThemeCSS — dark mode integration", () => {
  it("includes dark radius when it differs from light", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.darkRadius = 1.0;
    const { darkCSS } = generateThemeCSS(
      config,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    expect(darkCSS).toContain(".dark {");
    expect(darkCSS).toContain("--ui-radius: 1rem");
  });

  it("includes dark font when it differs from light", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.darkFont = "DM Sans";
    const { darkCSS } = generateThemeCSS(
      config,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    expect(darkCSS).toContain(".dark {");
    expect(darkCSS).toContain("DM Sans");
  });

  it("includes dark palette overrides when colors differ", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.darkColors.primary = "red";
    const { darkCSS } = generateThemeCSS(
      config,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    expect(darkCSS).toContain("--ui-color-primary-");
  });

  it("includes dark neutral overrides when neutral differs", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.darkNeutral = "stone";
    const { darkCSS } = generateThemeCSS(
      config,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    expect(darkCSS).toContain("--ui-color-neutral-");
  });

  it("sanitizes font value in CSS output", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.font = "Inter";
    const { rootCSS } = generateThemeCSS(
      config,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    expect(rootCSS).toContain("--font-sans: 'Inter'");
    expect(rootCSS).not.toContain("<");
    expect(rootCSS).not.toContain(">");
  });

  it("clamps radius to valid range", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.radius = -5;
    const { rootCSS } = generateThemeCSS(
      config,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    expect(rootCSS).toContain("--ui-radius: 0rem");
  });
});

describe("getOverriddenTokenKeys", () => {
  it("returns empty set when overrides match defaults", () => {
    const keys = getOverriddenTokenKeys(
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_LIGHT_OVERRIDES,
    );
    expect(keys.size).toBe(0);
  });

  it("returns compound keys for overridden tokens", () => {
    const custom = {
      ...DEFAULT_LIGHT_OVERRIDES,
      text: { ...DEFAULT_LIGHT_OVERRIDES.text, default: "800" as const },
      bg: { ...DEFAULT_LIGHT_OVERRIDES.bg, muted: "100" as const },
    };
    const keys = getOverriddenTokenKeys(custom, DEFAULT_LIGHT_OVERRIDES);
    expect(keys.has("text.default")).toBe(true);
    expect(keys.has("bg.muted")).toBe(true);
    expect(keys.has("border.default")).toBe(false);
  });
});

describe("generateOverrideLines — forceEmitKeys", () => {
  it("emits forced keys even when overrides match defaults", () => {
    const forceKeys = new Set(["text.default", "bg.muted"]);
    const lines = generateOverrideLines(
      DEFAULT_DARK_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
      "  ",
      forceKeys,
    );
    expect(lines.some((l) => l.includes("--ui-text:"))).toBe(true);
    expect(lines.some((l) => l.includes("--ui-bg-muted:"))).toBe(true);
  });

  it("does not emit non-forced keys that match defaults", () => {
    const forceKeys = new Set(["text.default"]);
    const lines = generateOverrideLines(
      DEFAULT_DARK_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
      "  ",
      forceKeys,
    );
    expect(lines.some((l) => l.includes("--ui-text:"))).toBe(true);
    expect(lines.some((l) => l.includes("--ui-bg:"))).toBe(false);
  });
});

describe("generateThemeCSS — light-to-dark bleed-through prevention", () => {
  it("emits dark overrides for tokens customized in light mode", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.lightOverrides.text.default = "800";
    // Dark text.default matches DEFAULT_DARK_OVERRIDES ("200"),
    // but should still be emitted in .dark to override the :root value

    const { darkCSS } = generateThemeCSS(
      config,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    expect(darkCSS).toContain(".dark {");
    expect(darkCSS).toContain("--ui-text:");
  });

  it("produces correct dark value for forced keys", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.lightOverrides.text.highlighted = "950";
    // Dark highlighted is "white" (default) → should still emit

    const { darkCSS } = generateThemeCSS(
      config,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    expect(darkCSS).toContain("--ui-text-highlighted: white;");
  });

  it("does not force-emit when light overrides match light defaults", () => {
    // Both light and dark match their respective defaults → no dark CSS
    const config = cloneTheme(DEFAULT_THEME);
    config.darkColors = { ...config.colors };
    config.darkColorShades = { ...config.colorShades };
    config.darkNeutral = config.neutral;
    const { darkCSS } = generateThemeCSS(
      config,
      DEFAULT_LIGHT_OVERRIDES,
      DEFAULT_DARK_OVERRIDES,
    );
    expect(darkCSS).toBe("");
  });
});
