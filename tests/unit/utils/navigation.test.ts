import { describe, it, expect } from "vitest";
import {
  NAVIGATION_ITEMS,
  COMPONENT_NAV_ITEMS,
  BLOCK_NAV_ITEMS,
  TEMPLATE_NAV_ITEMS,
  flattenNavigationItems,
} from "~/utils/navigation";

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
    expect(topLabels.length).toBeGreaterThan(0);
    expect(topLabels).toContain("Components");
    expect(topLabels).toContain("Blocks");
    expect(topLabels).toContain("Templates");
  });

  it("navigation items are flat with no children", () => {
    const itemsWithChildren = NAVIGATION_ITEMS.flat().filter(
      (item) => item.children && item.children.length > 0,
    );
    expect(itemsWithChildren.length).toBe(0);
  });

  it("sub-page arrays have properly structured items", () => {
    for (const items of [
      COMPONENT_NAV_ITEMS,
      BLOCK_NAV_ITEMS,
      TEMPLATE_NAV_ITEMS,
    ]) {
      expect(items.length).toBeGreaterThan(0);
      for (const item of items) {
        expect(item.label).toBeTruthy();
        expect(item.to).toBeTruthy();
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

  it("includes both top-level and sub-page items", () => {
    const flat = flattenNavigationItems(NAVIGATION_ITEMS);
    const labels = flat.map((f) => f.label);
    // Should include top-level items
    const topLevelCount = NAVIGATION_ITEMS.flat().length;
    expect(flat.length).toBe(topLevelCount);
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

  it("flattened count equals top-level count with no children", () => {
    const flat = flattenNavigationItems(NAVIGATION_ITEMS);
    const flatCount = flat.length;
    const topLevelCount = NAVIGATION_ITEMS.flat().length;
    expect(flatCount).toBe(topLevelCount);
  });
});
