import { describe, it, expect } from "vitest";
import {
  BLOCK_ROUTES,
  COMPONENT_ROUTES,
  INDEXABLE_DYNAMIC_ROUTES,
  LEARN_ROUTES,
  NOINDEX_DEMO_ROUTES,
  TEMPLATE_ROUTES,
  TOOL_ROUTES,
  PUBLIC_STATIC_ROUTES,
  ALL_DYNAMIC_ROUTES,
  PREVIEW_SHELL_PATH,
  isFramedRoute,
} from "~~/shared/constants/routes";
import { BLOCK_CATEGORIES } from "~/utils/navigation/blocks";
import { COMPONENT_CATEGORIES } from "~/utils/navigation/components";
import { LEARN_CATEGORIES } from "~/utils/navigation/learn";

describe("shared/constants/routes", () => {
  it("BLOCK_ROUTES matches every block navigation item", () => {
    const navPaths = BLOCK_CATEGORIES.flatMap((cat) =>
      cat.items.map((item) => String(item.to)),
    );
    expect([...BLOCK_ROUTES].sort()).toEqual(navPaths.sort());
  });

  it("COMPONENT_ROUTES matches every component navigation item", () => {
    const navPaths = COMPONENT_CATEGORIES.flatMap((cat) =>
      cat.items.map((item) => String(item.to)),
    );
    expect([...COMPONENT_ROUTES].sort()).toEqual(navPaths.sort());
  });

  it("LEARN_ROUTES matches every learn navigation item", () => {
    const navPaths = LEARN_CATEGORIES.flatMap((cat) =>
      cat.items.map((item) => String(item.to)),
    );
    expect([...LEARN_ROUTES].sort()).toEqual(navPaths.sort());
  });

  it("ALL_DYNAMIC_ROUTES is the union of all route arrays", () => {
    const expected = [...BLOCK_ROUTES, ...COMPONENT_ROUTES, ...LEARN_ROUTES];
    expect([...ALL_DYNAMIC_ROUTES]).toEqual(expected);
  });

  it("NOINDEX_DEMO_ROUTES contains the demo detail routes only", () => {
    const expected = [...BLOCK_ROUTES, ...COMPONENT_ROUTES, ...TEMPLATE_ROUTES];
    expect([...NOINDEX_DEMO_ROUTES]).toEqual(expected);
  });

  it("INDEXABLE_DYNAMIC_ROUTES only contains dynamic learn routes", () => {
    expect([...INDEXABLE_DYNAMIC_ROUTES]).toEqual([...LEARN_ROUTES]);
  });

  it("has no duplicate routes", () => {
    const unique = new Set(ALL_DYNAMIC_ROUTES);
    expect(unique.size).toBe(ALL_DYNAMIC_ROUTES.length);
  });

  it("all routes start with a forward slash", () => {
    for (const route of ALL_DYNAMIC_ROUTES) {
      expect(route).toMatch(/^\//);
    }
  });

  describe("isFramedRoute", () => {
    it("frames every demo route and the AI app", () => {
      for (const route of [...NOINDEX_DEMO_ROUTES, "/ai"]) {
        expect(isFramedRoute(route), route).toBe(true);
      }
    });

    it("renders every other public page directly", () => {
      const direct = [
        ...PUBLIC_STATIC_ROUTES.filter((route) => route !== "/ai"),
        ...LEARN_ROUTES,
        ...TOOL_ROUTES,
        PREVIEW_SHELL_PATH,
      ];
      for (const route of direct) {
        expect(isFramedRoute(route), route).toBe(false);
      }
    });

    it("treats a trailing slash like the bare path", () => {
      expect(isFramedRoute("/components/button/")).toBe(true);
      expect(isFramedRoute("/components/")).toBe(false);
      expect(isFramedRoute("/ai/")).toBe(true);
    });

    it("does not frame nested or look-alike paths", () => {
      expect(isFramedRoute("/components/button/extra")).toBe(false);
      expect(isFramedRoute("/componentsx/button")).toBe(false);
      expect(isFramedRoute("/aim")).toBe(false);
    });
  });
});
