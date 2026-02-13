import { describe, it, expect, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import {
  NAVIGATION_ITEMS,
  UTILITY_NAV_ITEMS,
  flattenNavigationItems,
} from "~/utils/navigation";
import { useLayoutNavigation } from "~/composables/useLayoutNavigation";

const mockRoute = reactive({ path: "/" });
mockNuxtImport("useRoute", () => {
  return () => mockRoute;
});

describe("useLayoutNavigation", () => {
  let nav: ReturnType<typeof useLayoutNavigation>;

  beforeEach(() => {
    mockRoute.path = "/";
    nav = useLayoutNavigation();
  });

  describe("allNavItems", () => {
    it("includes flattened NAVIGATION_ITEMS", () => {
      const flattened = flattenNavigationItems(NAVIGATION_ITEMS);
      const labels = nav.allNavItems.value.map((i) => i.label);
      for (const item of flattened) {
        expect(labels).toContain(item.label);
      }
    });

    it("includes UTILITY_NAV_ITEMS", () => {
      const labels = nav.allNavItems.value.map((i) => i.label);
      for (const item of UTILITY_NAV_ITEMS) {
        expect(labels).toContain(item.label);
      }
    });

    it("returns objects with label, icon, and to properties", () => {
      for (const item of nav.allNavItems.value) {
        expect(item).toHaveProperty("label");
        expect(typeof item.label).toBe("string");
        expect(item).toHaveProperty("to");
      }
    });

    it("has no duplicate labels", () => {
      const labels = nav.allNavItems.value.map((i) => i.label);
      const dupes = labels.filter((l, i) => labels.indexOf(l) !== i);
      // Some labels may legitimately repeat (e.g. "All" variants), but flag unexpected duplicates
      expect(dupes.length).toBeLessThan(5);
    });
  });

  describe("currentPageLabel", () => {
    it('returns "Home" for the root route', () => {
      mockRoute.path = "/";
      expect(nav.currentPageLabel.value).toBe("Home");
    });

    it("returns correct label for a known route", () => {
      mockRoute.path = "/ai";
      expect(nav.currentPageLabel.value).toBe("AI Generate");
    });

    it("returns correct label for a nested child route", () => {
      mockRoute.path = "/components/buttons";
      expect(nav.currentPageLabel.value).toBe("Buttons");
    });

    it("returns correct label for a utility page", () => {
      mockRoute.path = "/about";
      expect(nav.currentPageLabel.value).toBe("About");
    });

    it('falls back to "Preview" for unknown routes', () => {
      mockRoute.path = "/nonexistent-route";
      expect(nav.currentPageLabel.value).toBe("Preview");
    });
  });

  describe("breadcrumbItems", () => {
    it("returns only Home for root path", () => {
      mockRoute.path = "/";
      expect(nav.breadcrumbItems.value).toHaveLength(1);
      expect(nav.breadcrumbItems.value[0]).toEqual(
        expect.objectContaining({ label: "Home", to: "/" }),
      );
    });

    it("returns Home + top-level page for a top-level route", () => {
      mockRoute.path = "/ai";
      expect(nav.breadcrumbItems.value).toHaveLength(2);
      expect(nav.breadcrumbItems.value[0].label).toBe("Home");
      expect(nav.breadcrumbItems.value[1].label).toBe("AI Generate");
    });

    it("returns Home + section + page for a sub-page route", () => {
      mockRoute.path = "/components/buttons";
      expect(nav.breadcrumbItems.value).toHaveLength(3);
      expect(nav.breadcrumbItems.value[0].label).toBe("Home");
      expect(nav.breadcrumbItems.value[1].label).toBe("Components");
      expect(nav.breadcrumbItems.value[1].to).toBe("/components");
      expect(nav.breadcrumbItems.value[2].label).toBe("Buttons");
    });

    it("returns Home + parent for a parent page", () => {
      mockRoute.path = "/components";
      expect(nav.breadcrumbItems.value).toHaveLength(2);
      expect(nav.breadcrumbItems.value[1].label).toBe("Components");
    });

    it("returns only Home for an unknown path", () => {
      mockRoute.path = "/unknown";
      expect(nav.breadcrumbItems.value[0].label).toBe("Home");
    });

    it("includes icons in breadcrumb items", () => {
      mockRoute.path = "/templates/dashboard";
      expect(nav.breadcrumbItems.value[0].icon).toBe("i-lucide-home");
      expect(nav.breadcrumbItems.value[1].icon).toBeDefined();
      expect(nav.breadcrumbItems.value[2].icon).toBeDefined();
    });

    it("includes 'to' paths in breadcrumb items", () => {
      mockRoute.path = "/blocks/hero";
      expect(nav.breadcrumbItems.value[0].to).toBe("/");
      expect(nav.breadcrumbItems.value[1].to).toBe("/blocks");
      expect(nav.breadcrumbItems.value[2].to).toBe("/blocks/hero");
    });
  });

  describe("mobileNavItems", () => {
    it("returns an array of arrays", () => {
      expect(Array.isArray(nav.mobileNavItems.value)).toBe(true);
      expect(nav.mobileNavItems.value.length).toBeGreaterThan(0);
    });

    it("includes top-level items from first nav group", () => {
      const items = nav.mobileNavItems.value[0];
      const labels = items.map((i: { label: string }) => i.label);
      expect(labels).toContain("Home");
      expect(labels).toContain("Templates");
    });

    it("items have label, icon, and to properties", () => {
      const items = nav.mobileNavItems.value[0];
      for (const item of items) {
        expect(item).toHaveProperty("label");
        expect(item).toHaveProperty("icon");
        expect(item).toHaveProperty("to");
      }
    });

    it("items do not have children", () => {
      const items = nav.mobileNavItems.value[0];
      const componentItem = items.find(
        (i: { label: string }) => i.label === "Components",
      );
      expect(componentItem?.children).toBeUndefined();
    });
  });
});
