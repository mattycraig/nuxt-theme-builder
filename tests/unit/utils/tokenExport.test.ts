import { describe, it, expect } from "vitest";
import { DEFAULT_THEME, cloneTheme } from "~/utils/defaults";
import {
  RADIUS_SCALE,
  generateDesignTokens,
  generateTailwindTheme,
} from "~/utils/tokenExport";
import {
  resolveRoleColor,
  resolveRoleScale,
  resolveTokens,
} from "~/utils/themeResolve";

describe("generateDesignTokens", () => {
  const tokens = JSON.parse(generateDesignTokens(DEFAULT_THEME));

  it("has one token group per color mode", () => {
    expect(Object.keys(tokens)).toEqual(["$description", "light", "dark"]);
  });

  it("uses DTCG $type / $value tokens with the rendered colors", () => {
    expect(tokens.light.color.primary.DEFAULT).toEqual({
      $type: "color",
      $value: resolveRoleColor(DEFAULT_THEME, "light", "primary"),
    });
    expect(tokens.dark.color.primary["950"].$value).toBe(
      resolveRoleScale(DEFAULT_THEME, "dark", "primary")["950"],
    );
    expect(tokens.light.text.muted.$value).toBe(
      resolveTokens(DEFAULT_THEME, "light").text.muted,
    );
    expect(tokens.dark.bg.default.$value).toBe(
      resolveTokens(DEFAULT_THEME, "dark").bg.default,
    );
  });

  it("includes every role, the neutral scale, and border tokens", () => {
    expect(Object.keys(tokens.light.color)).toEqual([
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "error",
      "neutral",
    ]);
    expect(Object.keys(tokens.light.color.neutral)).toHaveLength(11);
    expect(tokens.light.border.accented.$type).toBe("color");
  });

  it("exports the radius scale and font stack per mode", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.radius = 0.5;
    config.darkRadius = 1;
    config.darkFont = "Lora";
    const out = JSON.parse(generateDesignTokens(config));

    expect(out.light.radius.md).toEqual({ $type: "dimension", $value: "0.75rem" });
    expect(out.dark.radius.md.$value).toBe("1.5rem");
    expect(Object.keys(out.light.radius)).toEqual(Object.keys(RADIUS_SCALE));
    expect(out.dark.font.sans).toEqual({
      $type: "fontFamily",
      $value: [
        "Lora",
        "ui-serif",
        "Georgia",
        "Cambria",
        "Times New Roman",
        "Times",
        "serif",
      ],
    });
  });

  it("resolves custom palettes to hex", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.customPalettes = [{ name: "brand", color: "#f5c518" }];
    config.colors.primary = "brand";
    const out = JSON.parse(generateDesignTokens(config));

    expect(Object.values(out.light.color.primary).map((t) => (t as { $value: string }).$value)).toContain(
      "#f5c518",
    );
  });
});

describe("generateTailwindTheme", () => {
  it("defines Nuxt UI-style utilities in a Tailwind @theme", () => {
    const css = generateTailwindTheme(DEFAULT_THEME);

    expect(css).toContain(`@import "tailwindcss";`);
    expect(css).toContain("@custom-variant dark (&:where(.dark, .dark *));");
    expect(css).toContain(
      `  --color-primary: ${resolveRoleColor(DEFAULT_THEME, "light", "primary")};`,
    );
    expect(css).toMatch(/ {2}--color-neutral-500: #[0-9a-f]{6};/);
    expect(css).toContain("  --text-color-muted:");
    expect(css).toContain("  --background-color-elevated:");
    expect(css).toContain("  --border-color-accented:");
    expect(css).toContain("  --radius-md: 0.5625rem;");
    expect(css).not.toContain("@nuxt/ui");
  });

  it("overrides only what changes in dark mode", () => {
    const css = generateTailwindTheme(DEFAULT_THEME);
    const dark = css.slice(css.indexOf(".dark {"), css.indexOf("@layer base"));

    expect(dark).toContain(
      `--color-primary: ${resolveRoleColor(DEFAULT_THEME, "dark", "primary")};`,
    );
    expect(dark).toContain(
      `--background-color-default: ${resolveTokens(DEFAULT_THEME, "dark").bg.default};`,
    );
    // Same radius and font in both modes by default
    expect(dark).not.toContain("--radius-");
    expect(dark).not.toContain("--font-sans");
  });

  it("quotes font names with spaces", () => {
    const config = cloneTheme(DEFAULT_THEME);
    config.font = "Public Sans";
    expect(generateTailwindTheme(config)).toContain(
      "  --font-sans: 'Public Sans', ui-sans-serif, system-ui, sans-serif;",
    );
  });
});
