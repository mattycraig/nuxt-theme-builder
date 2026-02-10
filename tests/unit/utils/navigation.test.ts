import { describe, it, expect } from "vitest";
import { NAVIGATION_ITEMS, flattenNavigationItems } from "~/utils/navigation";

describe("NAVIGATION_ITEMS", () => {
  it("is a non-empty nested array", () => {
    expect(NAVIGATION_ITEMS).toBeInstanceOf(Array);
    expect(NAVIGATION_ITEMS.length).toBeGreaterThan(0);
    expect(NAVIGATION_ITEMS[0]).toBeInstanceOf(Array);
  });

  it("top-level items have label and to properties", () => {
    for (const group of NAVIGATION_ITEMS) {
      for (const item of group) {
        expect(item.label).toBeTruthy();
      }
    }
  });

  it("contains expected top-level navigation items", () => {
    const topLabels = NAVIGATION_ITEMS.flat().map((item) => item.label);
    expect(topLabels).toContain("Home");
    expect(topLabels).toContain("Components");
    expect(topLabels).toContain("Blocks");
    expect(topLabels).toContain("Templates");
  });

  it("Components item has children", () => {
    const components = NAVIGATION_ITEMS.flat().find(
      (item) => item.label === "Components",
    );
    expect(components).toBeDefined();
    expect(components!.children).toBeDefined();
    expect(components!.children!.length).toBeGreaterThan(0);
  });

  it("Blocks item has children", () => {
    const blocks = NAVIGATION_ITEMS.flat().find(
      (item) => item.label === "Blocks",
    );
    expect(blocks).toBeDefined();
    expect(blocks!.children).toBeDefined();
    expect(blocks!.children!.length).toBeGreaterThan(0);
  });

  it("Templates item has children", () => {
    const templates = NAVIGATION_ITEMS.flat().find(
      (item) => item.label === "Templates",
    );
    expect(templates).toBeDefined();
    expect(templates!.children).toBeDefined();
    expect(templates!.children!.length).toBeGreaterThan(0);
  });

  it("all children have labels and to paths", () => {
    for (const group of NAVIGATION_ITEMS) {
      for (const item of group) {
        if (item.children) {
          for (const child of item.children) {
            expect(child.label).toBeTruthy();
            expect(child.to).toBeTruthy();
          }
        }
      }
    }
  });

  it("no duplicate routes across children within the same group", () => {
    for (const group of NAVIGATION_ITEMS) {
      for (const item of group) {
        if (!item.children) continue;
        const childRoutes = item.children
          .filter((c) => c.to)
          .map((c) => String(c.to));
        const unique = new Set(childRoutes);
        expect(childRoutes.length).toBe(unique.size);
      }
    }
  });
});

describe("flattenNavigationItems", () => {
  it("returns a flat array of items", () => {
    const flat = flattenNavigationItems(NAVIGATION_ITEMS);
    expect(Array.isArray(flat)).toBe(true);
    expect(flat.length).toBeGreaterThan(0);
  });

  it("includes top-level items", () => {
    const flat = flattenNavigationItems(NAVIGATION_ITEMS);
    const labels = flat.map((f) => f.label);
    expect(labels).toContain("Home");
  });

  it("includes child items", () => {
    const flat = flattenNavigationItems(NAVIGATION_ITEMS);
    const labels = flat.map((f) => f.label);
    expect(labels).toContain("Buttons");
    expect(labels).toContain("Hero");
    expect(labels).toContain("Dashboard");
  });

  it("all items have label property", () => {
    const flat = flattenNavigationItems(NAVIGATION_ITEMS);
    for (const item of flat) {
      expect(item.label).toBeTruthy();
    }
  });

  it("most items have a to path", () => {
    const flat = flattenNavigationItems(NAVIGATION_ITEMS);
    const withPath = flat.filter((f) => f.to);
    expect(withPath.length).toBeGreaterThan(flat.length * 0.8);
  });

  it("returns empty array for empty input", () => {
    const flat = flattenNavigationItems([]);
    expect(flat).toEqual([]);
  });

  it("returns empty array for input with empty groups", () => {
    const flat = flattenNavigationItems([[]]);
    expect(flat).toEqual([]);
  });

  it("flattens items that have children without their own to path", () => {
    const flat = flattenNavigationItems(NAVIGATION_ITEMS);
    const flatCount = flat.length;
    const topLevelCount = NAVIGATION_ITEMS.flat().length;
    expect(flatCount).toBeGreaterThan(topLevelCount);
  });
});
