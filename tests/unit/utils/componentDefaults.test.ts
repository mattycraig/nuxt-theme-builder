import { describe, it, expect } from "vitest";
import {
  ThemeConfigSchema,
  normalizeComponentDefaults,
  COMPONENT_DEFAULT_TARGETS,
} from "~/types/theme";
import {
  applyComponentDefaults,
  getComponentDefaultVariants,
} from "~/utils/componentDefaults";
import { generateAppConfigExport } from "~/utils/appConfigGenerator";
import { DEFAULT_THEME, cloneTheme } from "~/utils/defaults";

describe("normalizeComponentDefaults", () => {
  it("drops unset props and empty groups", () => {
    expect(
      normalizeComponentDefaults({
        button: { variant: "soft", color: undefined },
        badge: {},
      }),
    ).toEqual({ button: { variant: "soft" } });
  });

  it("returns undefined when nothing is set", () => {
    expect(normalizeComponentDefaults(undefined)).toBeUndefined();
    expect(normalizeComponentDefaults({ card: {} })).toBeUndefined();
  });
});

describe("ThemeConfigSchema components", () => {
  const withComponents = (components: unknown) => ({
    ...cloneTheme(DEFAULT_THEME),
    components,
  });

  it("accepts themes without component defaults and leaves the field out", () => {
    const result = ThemeConfigSchema.parse(cloneTheme(DEFAULT_THEME));
    expect("components" in result).toBe(false);
  });

  it("keeps valid component defaults", () => {
    const components = {
      button: { color: "neutral", variant: "soft", size: "lg" },
      field: { variant: "subtle" },
      card: { variant: "soft" },
    };
    expect(ThemeConfigSchema.parse(withComponents(components)).components).toEqual(
      components,
    );
  });

  it("omits the field when every group is empty", () => {
    const result = ThemeConfigSchema.parse(
      withComponents({ button: {}, card: {} }),
    );
    expect("components" in result).toBe(false);
  });

  it("rejects values Nuxt UI doesn't accept", () => {
    expect(
      ThemeConfigSchema.safeParse(withComponents({ button: { variant: "huge" } }))
        .success,
    ).toBe(false);
    expect(
      ThemeConfigSchema.safeParse(withComponents({ card: { variant: "link" } }))
        .success,
    ).toBe(false);
    expect(
      ThemeConfigSchema.safeParse(withComponents({ button: { color: "blue" } }))
        .success,
    ).toBe(false);
  });

  it("strips unknown groups and props", () => {
    const result = ThemeConfigSchema.parse(
      withComponents({
        button: { variant: "ghost", class: "evil" },
        modal: { size: "xl" },
      }),
    );
    expect(result.components).toEqual({ button: { variant: "ghost" } });
  });
});

describe("getComponentDefaultVariants", () => {
  it("returns an empty object for every target when nothing is set", () => {
    const result = getComponentDefaultVariants(undefined);
    const targets = Object.values(COMPONENT_DEFAULT_TARGETS).flat();
    expect(Object.keys(result).sort()).toEqual([...targets].sort());
    for (const variants of Object.values(result)) expect(variants).toEqual({});
  });

  it("applies the field group to every form field component", () => {
    const result = getComponentDefaultVariants({
      field: { variant: "soft", size: "lg" },
    });
    for (const key of COMPONENT_DEFAULT_TARGETS.field) {
      expect(result[key]).toEqual({ variant: "soft", size: "lg" });
    }
    expect(result.button).toEqual({});
  });
});

describe("applyComponentDefaults", () => {
  it("sets defaultVariants without touching other app config", () => {
    const ui: Record<string, unknown> = {
      colors: { primary: "indigo" },
      button: { slots: { base: "x" } },
    };
    applyComponentDefaults(ui, { button: { variant: "outline" } });
    expect(ui.colors).toEqual({ primary: "indigo" });
    expect(ui.button).toEqual({
      slots: { base: "x" },
      defaultVariants: { variant: "outline" },
    });
    expect(ui.selectMenu).toEqual({ defaultVariants: {} });
  });

  it("clears defaults that were removed", () => {
    const ui: Record<string, unknown> = {};
    applyComponentDefaults(ui, { badge: { size: "sm" } });
    applyComponentDefaults(ui, undefined);
    expect(ui.badge).toEqual({ defaultVariants: {} });
  });
});

describe("generateAppConfigExport component defaults", () => {
  it("adds defaultVariants entries for the components that have them", () => {
    const output = generateAppConfigExport({
      ...cloneTheme(DEFAULT_THEME),
      components: {
        button: { color: "neutral", variant: "soft" },
        field: { size: "lg" },
      },
    });
    expect(output).toContain(
      [
        `    button: {`,
        `      defaultVariants: {`,
        `        color: 'neutral',`,
        `        variant: 'soft',`,
        `      },`,
        `    },`,
      ].join("\n"),
    );
    for (const key of COMPONENT_DEFAULT_TARGETS.field) {
      expect(output).toContain(`    ${key}: {\n      defaultVariants: {\n        size: 'lg',`);
    }
    expect(output).not.toContain("badge:");
    expect(output).not.toContain("card:");
  });

  it("is unchanged for themes without component defaults", () => {
    expect(generateAppConfigExport(cloneTheme(DEFAULT_THEME))).not.toContain(
      "defaultVariants",
    );
  });
});
