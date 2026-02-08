import { describe, it, expect } from "vitest";
import { shadeToCSS, cloneTheme, DEFAULT_THEME } from "~/utils/defaults";

describe("shadeToCSS", () => {
  it("returns 'white' for shade 'white'", () => {
    expect(shadeToCSS("white")).toBe("white");
  });

  it("returns 'black' for shade 'black'", () => {
    expect(shadeToCSS("black")).toBe("black");
  });

  it("returns CSS variable reference for numeric shades", () => {
    expect(shadeToCSS("500")).toBe("var(--ui-color-neutral-500)");
    expect(shadeToCSS("50")).toBe("var(--ui-color-neutral-50)");
    expect(shadeToCSS("950")).toBe("var(--ui-color-neutral-950)");
  });
});

describe("cloneTheme", () => {
  it("produces a deep copy with no shared references", () => {
    const original = cloneTheme(DEFAULT_THEME);
    const clone = cloneTheme(original);

    expect(clone).toEqual(original);
    expect(clone).not.toBe(original);
    expect(clone.colors).not.toBe(original.colors);
    expect(clone.lightOverrides).not.toBe(original.lightOverrides);
    expect(clone.darkOverrides).not.toBe(original.darkOverrides);
  });

  it("does not propagate mutations from clone to original", () => {
    const original = cloneTheme(DEFAULT_THEME);
    const clone = cloneTheme(original);

    clone.colors.primary = "red";
    clone.radius = 1;
    clone.lightOverrides.text.dimmed = "950";

    expect(original.colors.primary).toBe(DEFAULT_THEME.colors.primary);
    expect(original.radius).toBe(DEFAULT_THEME.radius);
    expect(original.lightOverrides.text.dimmed).toBe(
      DEFAULT_THEME.lightOverrides.text.dimmed,
    );
  });
});
