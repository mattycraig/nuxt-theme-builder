import { describe, it, expect } from "vitest";
import { generateOverrideLines, generateThemeCSS } from "~/utils/cssGenerator";
import {
  DEFAULT_LIGHT_OVERRIDES,
  DEFAULT_DARK_OVERRIDES,
  DEFAULT_THEME,
  cloneTheme,
} from "~/utils/defaults";

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
    const { darkCSS } = generateThemeCSS(
      DEFAULT_THEME,
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
