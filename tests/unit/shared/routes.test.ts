import { describe, it, expect } from "vitest";
import {
  BLOCK_ROUTES,
  COMPONENT_ROUTES,
  LEARN_ROUTES,
  ALL_DYNAMIC_ROUTES,
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

  it("has no duplicate routes", () => {
    const unique = new Set(ALL_DYNAMIC_ROUTES);
    expect(unique.size).toBe(ALL_DYNAMIC_ROUTES.length);
  });

  it("all routes start with a forward slash", () => {
    for (const route of ALL_DYNAMIC_ROUTES) {
      expect(route).toMatch(/^\//);
    }
  });
});
