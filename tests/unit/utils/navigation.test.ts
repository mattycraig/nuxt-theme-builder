import { describe, it, expect } from "vitest";
import {
  NAVIGATION_ITEMS,
  COMPONENT_NAV_ITEMS,
  BLOCK_NAV_ITEMS,
  BLOCK_CATEGORIES,
  TEMPLATE_NAV_ITEMS,
  TEMPLATE_CATEGORIES,
  LEARN_NAV_ITEMS,
  TOOL_NAV_ITEMS,
  UTILITY_NAV_ITEMS,
  flattenNavigationItems,
  flattenCategories,
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

  describe("children branch", () => {
    it("flattens items with children", () => {
      const input = [[{
        label: "Parent",
        to: "/parent",
        icon: "i-parent",
        children: [
          { label: "Child1", to: "/child1" },
          { label: "Child2", icon: "i-child", to: "/child2" },
        ],
      }]];
      const flat = flattenNavigationItems(input as never);
      expect(flat).toHaveLength(3);
      expect(flat[0].label).toBe("Parent");
      expect(flat[1].label).toBe("Child1");
      expect(flat[2].label).toBe("Child2");
    });

    it("child inherits parent icon when it has none", () => {
      const input = [[{
        label: "P",
        to: "/p",
        icon: "i-parent",
        children: [{ label: "C", to: "/c" }],
      }]];
      const flat = flattenNavigationItems(input as never);
      expect(flat[1].icon).toBe("i-parent");
    });

    it("child keeps its own icon when present", () => {
      const input = [[{
        label: "P",
        to: "/p",
        icon: "i-parent",
        children: [{ label: "C", to: "/c", icon: "i-child" }],
      }]];
      const flat = flattenNavigationItems(input as never);
      expect(flat[1].icon).toBe("i-child");
    });

    it("skips children without label", () => {
      const input = [[{
        label: "P",
        to: "/p",
        children: [{ to: "/no-label" }],
      }]];
      const flat = flattenNavigationItems(input as never);
      expect(flat).toHaveLength(1);
    });

    it("skips items without to or label", () => {
      const input = [[{ label: "NoRoute" }, { to: "/orphan" }]];
      const flat = flattenNavigationItems(input as never);
      expect(flat).toHaveLength(0);
    });
  });
});

describe("LEARN_NAV_ITEMS", () => {
  it("is non-empty", () => {
    expect(LEARN_NAV_ITEMS.length).toBeGreaterThan(0);
  });

  it("includes All Articles entry", () => {
    expect(LEARN_NAV_ITEMS[0].label).toBe("All Articles");
    expect(LEARN_NAV_ITEMS[0].to).toBe("/learn");
  });

  it("all items have labels and routes starting with /learn", () => {
    for (const item of LEARN_NAV_ITEMS) {
      expect(item.label).toBeTruthy();
      expect(String(item.to)).toMatch(/^\/learn/);
    }
  });
});

describe("TOOL_NAV_ITEMS", () => {
  it("is non-empty", () => {
    expect(TOOL_NAV_ITEMS.length).toBeGreaterThan(0);
  });

  it("includes All Tools entry", () => {
    expect(TOOL_NAV_ITEMS[0].label).toBe("All Tools");
    expect(TOOL_NAV_ITEMS[0].to).toBe("/tools");
  });

  it("all items have labels and routes starting with /tools", () => {
    for (const item of TOOL_NAV_ITEMS) {
      expect(item.label).toBeTruthy();
      expect(String(item.to)).toMatch(/^\/tools/);
    }
  });
});

describe("UTILITY_NAV_ITEMS", () => {
  it("contains 4 items", () => {
    expect(UTILITY_NAV_ITEMS).toHaveLength(4);
  });

  it("has About, Help, Privacy, Contact", () => {
    const labels = UTILITY_NAV_ITEMS.map((i) => i.label);
    expect(labels).toEqual(["About", "Help", "Privacy", "Contact"]);
  });

  it("all have correct icon prefix", () => {
    for (const item of UTILITY_NAV_ITEMS) {
      expect(String(item.icon)).toMatch(/^i-lucide-/);
    }
  });
});

describe("flattenCategories", () => {
  it("prepends 'All' entry with custom params", () => {
    const categories = [{
      label: "Cat",
      icon: "i-test",
      slug: "cat",
      description: "Test category",
      items: [{ label: "Item1", to: "/cat/item1", icon: "i-item" }],
    }];
    const result = flattenCategories(
      categories as never,
      "All Items",
      "i-all",
      "/all",
    );
    expect(result[0].label).toBe("All Items");
    expect(result[0].icon).toBe("i-all");
    expect(result[0].to).toBe("/all");
  });

  it("includes all category items after the All entry", () => {
    const categories = [{
      label: "Cat",
      icon: "i-test",
      slug: "cat",
      description: "Test",
      items: [
        { label: "A", to: "/a", icon: "i-a" },
        { label: "B", to: "/b", icon: "i-b" },
      ],
    }];
    const result = flattenCategories(categories as never);
    expect(result).toHaveLength(3);
    expect(result[1].label).toBe("A");
    expect(result[2].label).toBe("B");
  });

  it("uses default params when not specified", () => {
    const result = flattenCategories([] as never);
    expect(result[0].label).toBe("All Components");
    expect(result[0].to).toBe("/components/all");
  });
});

describe("cross-cutting navigation integrity", () => {
  it("no duplicate routes within each nav array", () => {
    for (const [name, items] of [
      ["COMPONENT_NAV_ITEMS", COMPONENT_NAV_ITEMS],
      ["BLOCK_NAV_ITEMS", BLOCK_NAV_ITEMS],
      ["TEMPLATE_NAV_ITEMS", TEMPLATE_NAV_ITEMS],
      ["LEARN_NAV_ITEMS", LEARN_NAV_ITEMS],
      ["TOOL_NAV_ITEMS", TOOL_NAV_ITEMS],
      ["UTILITY_NAV_ITEMS", UTILITY_NAV_ITEMS],
    ] as const) {
      const paths = (items as typeof COMPONENT_NAV_ITEMS)
        .map((i) => String(i.to))
        .filter(Boolean);
      const dupes = paths.filter((p, i) => paths.indexOf(p) !== i);
      expect(dupes, `Duplicate routes in ${name}: ${dupes.join(", ")}`).toEqual([]);
    }
  });

  it("all icons follow i-lucide-* pattern", () => {
    const allItems = [
      ...COMPONENT_NAV_ITEMS,
      ...BLOCK_NAV_ITEMS,
      ...TEMPLATE_NAV_ITEMS,
      ...LEARN_NAV_ITEMS,
      ...TOOL_NAV_ITEMS,
      ...UTILITY_NAV_ITEMS,
      ...NAVIGATION_ITEMS.flat(),
    ];
    for (const item of allItems) {
      if (item.icon) {
        expect(String(item.icon), `${item.label} icon: ${item.icon}`).toMatch(
          /^i-lucide-/,
        );
      }
    }
  });

  it("all block items have a 'new' badge", () => {
    for (const cat of BLOCK_CATEGORIES) {
      for (const item of cat.items) {
        expect(
          item.badge,
          `Block item "${item.label}" should have badge: "new"`,
        ).toBe("new");
      }
    }
  });

  it("all template items have a 'new' badge", () => {
    for (const cat of TEMPLATE_CATEGORIES) {
      for (const item of cat.items) {
        expect(
          item.badge,
          `Template item "${item.label}" should have badge: "new"`,
        ).toBe("new");
      }
    }
  });
});
