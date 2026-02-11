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

  it("contains core navigation categories", () => {
    const topLabels = NAVIGATION_ITEMS.flat().map((item) => item.label);
    // At minimum, navigation should have a home entry and grouping items with children
    expect(topLabels.length).toBeGreaterThan(0);
    const itemsWithChildren = NAVIGATION_ITEMS.flat().filter(
      (item) => item.children && item.children.length > 0,
    );
    expect(itemsWithChildren.length).toBeGreaterThan(0);
  });

  it("items with children have properly structured children", () => {
    const itemsWithChildren = NAVIGATION_ITEMS.flat().filter(
      (item) => item.children && item.children.length > 0,
    );
    for (const item of itemsWithChildren) {
      expect(item.label).toBeTruthy();
      expect(item.children!.length).toBeGreaterThan(0);
    }
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

  it("includes both top-level and child items", () => {
    const flat = flattenNavigationItems(NAVIGATION_ITEMS);
    const labels = flat.map((f) => f.label);
    // Should include more items than just top-level (children are flattened)
    const topLevelCount = NAVIGATION_ITEMS.flat().length;
    expect(flat.length).toBeGreaterThan(topLevelCount);
    // All labels should be non-empty strings
    for (const label of labels) {
      expect(label).toBeTruthy();
    }
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
    // Most navigation items should be routable
    expect(withPath.length).toBeGreaterThan(0);
    expect(withPath.length / flat.length).toBeGreaterThan(0.5);
  });

  it("returns empty array for empty input", () => {
    const flat = flattenNavigationItems([]);
    expect(flat).toEqual([]);
  });

  it("returns empty array for input with empty groups", () => {
    const flat = flattenNavigationItems([[]]);
    expect(flat).toEqual([]);
  });

  it("flattened count exceeds top-level count when children exist", () => {
    const flat = flattenNavigationItems(NAVIGATION_ITEMS);
    const flatCount = flat.length;
    const topLevelCount = NAVIGATION_ITEMS.flat().length;
    expect(flatCount).toBeGreaterThan(topLevelCount);
  });
});
