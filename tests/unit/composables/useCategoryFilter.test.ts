import { describe, it, expect, beforeEach } from "vitest";
import { useCategoryFilter } from "~/composables/useCategoryFilter";
import { createMockCategories } from "../../setup/fixtures";
import type { ComponentCategory } from "~/types/components";

describe("useCategoryFilter", () => {
  let categories: ComponentCategory[];

  beforeEach(() => {
    categories = createMockCategories(3, 3);
  });

  describe("initial state", () => {
    it("returns empty search query and no selected category", () => {
      const { searchQuery, selectedCategory } = useCategoryFilter(categories);

      expect(searchQuery.value).toBe("");
      expect(selectedCategory.value).toBeNull();
    });

    it("returns all categories unfiltered", () => {
      const { filteredCategories, hasResults } =
        useCategoryFilter(categories);

      expect(filteredCategories.value).toHaveLength(3);
      expect(hasResults.value).toBe(true);
    });

    it("totalCount equals sum of all items", () => {
      const { totalCount } = useCategoryFilter(categories);
      // 3 categories × 3 items = 9
      expect(totalCount.value).toBe(9);
    });

    it("filteredTotalCount equals totalCount when unfiltered", () => {
      const { totalCount, filteredTotalCount } =
        useCategoryFilter(categories);

      expect(filteredTotalCount.value).toBe(totalCount.value);
    });
  });

  describe("search filtering", () => {
    it("filters items by label (case-insensitive)", () => {
      const { searchQuery, filteredCategories, filteredTotalCount } =
        useCategoryFilter(categories);

      searchQuery.value = "Item 1-1";

      expect(filteredTotalCount.value).toBe(1);
      expect(filteredCategories.value).toHaveLength(1);
      expect(filteredCategories.value[0].items[0].label).toBe("Item 1-1");
    });

    it("filters items by description", () => {
      const { searchQuery, filteredCategories } =
        useCategoryFilter(categories);

      searchQuery.value = "description for item 2-1";

      expect(filteredCategories.value).toHaveLength(1);
      expect(filteredCategories.value[0].slug).toBe("category-2");
    });

    it("is case-insensitive", () => {
      const { searchQuery, filteredTotalCount } =
        useCategoryFilter(categories);

      searchQuery.value = "ITEM 1-1";

      expect(filteredTotalCount.value).toBe(1);
    });

    it("trims whitespace from query", () => {
      const { searchQuery, filteredTotalCount } =
        useCategoryFilter(categories);

      searchQuery.value = "  Item 1-1  ";

      expect(filteredTotalCount.value).toBe(1);
    });

    it("returns empty results for non-matching query", () => {
      const { searchQuery, filteredCategories, hasResults } =
        useCategoryFilter(categories);

      searchQuery.value = "nonexistent widget xyz";

      expect(filteredCategories.value).toHaveLength(0);
      expect(hasResults.value).toBe(false);
    });

    it("matches partial labels", () => {
      const { searchQuery, filteredTotalCount } =
        useCategoryFilter(categories);

      // "Item 1-" matches Item 1-1, Item 1-2, Item 1-3
      searchQuery.value = "Item 1-";

      expect(filteredTotalCount.value).toBe(3);
    });

    it("excludes categories with zero matching items", () => {
      const { searchQuery, filteredCategories } =
        useCategoryFilter(categories);

      searchQuery.value = "Item 1-1";

      // Only category-1 has Item 1-1; categories 2 and 3 have no matches
      expect(filteredCategories.value).toHaveLength(1);
      expect(filteredCategories.value[0].slug).toBe("category-1");
    });
  });

  describe("category filtering", () => {
    it("filters by selected category slug", () => {
      const { selectedCategory, filteredCategories } =
        useCategoryFilter(categories);

      selectedCategory.value = "category-2";

      expect(filteredCategories.value).toHaveLength(1);
      expect(filteredCategories.value[0].slug).toBe("category-2");
    });

    it("shows all categories when selection is null", () => {
      const { selectedCategory, filteredCategories } =
        useCategoryFilter(categories);

      selectedCategory.value = "category-1";
      expect(filteredCategories.value).toHaveLength(1);

      selectedCategory.value = null;
      expect(filteredCategories.value).toHaveLength(3);
    });
  });

  describe("combined filtering", () => {
    it("applies both search and category filter", () => {
      const { searchQuery, selectedCategory, filteredTotalCount } =
        useCategoryFilter(categories);

      selectedCategory.value = "category-1";
      searchQuery.value = "Item 1-2";

      expect(filteredTotalCount.value).toBe(1);
    });

    it("returns empty when category matches but search does not", () => {
      const {
        searchQuery,
        selectedCategory,
        filteredCategories,
        hasResults,
      } = useCategoryFilter(categories);

      selectedCategory.value = "category-1";
      searchQuery.value = "Item 2-1";

      expect(filteredCategories.value).toHaveLength(0);
      expect(hasResults.value).toBe(false);
    });
  });

  describe("toggleCategory", () => {
    it("selects a category on first toggle", () => {
      const { selectedCategory, toggleCategory } =
        useCategoryFilter(categories);

      toggleCategory("category-2");

      expect(selectedCategory.value).toBe("category-2");
    });

    it("deselects when toggling the same category", () => {
      const { selectedCategory, toggleCategory } =
        useCategoryFilter(categories);

      toggleCategory("category-2");
      toggleCategory("category-2");

      expect(selectedCategory.value).toBeNull();
    });

    it("switches to a different category when toggling a new one", () => {
      const { selectedCategory, toggleCategory } =
        useCategoryFilter(categories);

      toggleCategory("category-1");
      toggleCategory("category-3");

      expect(selectedCategory.value).toBe("category-3");
    });
  });

  describe("clearFilters", () => {
    it("resets search query to empty string", () => {
      const { searchQuery, clearFilters } = useCategoryFilter(categories);

      searchQuery.value = "some query";
      clearFilters();

      expect(searchQuery.value).toBe("");
    });

    it("resets selected category to null", () => {
      const { selectedCategory, clearFilters } =
        useCategoryFilter(categories);

      selectedCategory.value = "category-1";
      clearFilters();

      expect(selectedCategory.value).toBeNull();
    });

    it("restores full results", () => {
      const {
        searchQuery,
        selectedCategory,
        filteredCategories,
        filteredTotalCount,
        totalCount,
        clearFilters,
      } = useCategoryFilter(categories);

      searchQuery.value = "Item 1-1";
      selectedCategory.value = "category-1";
      expect(filteredTotalCount.value).toBe(1);

      clearFilters();

      expect(filteredCategories.value).toHaveLength(3);
      expect(filteredTotalCount.value).toBe(totalCount.value);
    });
  });

  describe("reactive source", () => {
    it("accepts a ref as categories source", () => {
      const source = ref(createMockCategories(2, 1));
      const { totalCount, filteredCategories } = useCategoryFilter(source);

      expect(totalCount.value).toBe(2);
      expect(filteredCategories.value).toHaveLength(2);

      // Update the source reactively
      source.value = createMockCategories(4, 2);
      expect(totalCount.value).toBe(8);
      expect(filteredCategories.value).toHaveLength(4);
    });

    it("accepts a getter as categories source", () => {
      const count = ref(2);
      const { totalCount } = useCategoryFilter(
        () => createMockCategories(count.value, 1),
      );

      expect(totalCount.value).toBe(2);

      count.value = 5;
      expect(totalCount.value).toBe(5);
    });
  });

  describe("edge cases", () => {
    it("handles empty categories array", () => {
      const { totalCount, filteredCategories, hasResults } =
        useCategoryFilter([]);

      expect(totalCount.value).toBe(0);
      expect(filteredCategories.value).toHaveLength(0);
      expect(hasResults.value).toBe(false);
    });

    it("handles categories with empty items arrays", () => {
      const cats: ComponentCategory[] = [
        {
          label: "Empty Cat",
          icon: "i-lucide-box",
          slug: "empty",
          description: "No items",
          items: [],
        },
      ];
      const { totalCount, filteredTotalCount } = useCategoryFilter(cats);

      expect(totalCount.value).toBe(0);
      expect(filteredTotalCount.value).toBe(0);
    });

    it("handles items with undefined label or description", () => {
      const cats: ComponentCategory[] = [
        {
          label: "Test",
          icon: "i-lucide-box",
          slug: "test",
          description: "Test cat",
          items: [
            { to: "/test" } as any, // no label or description
          ],
        },
      ];
      const { searchQuery, filteredCategories } = useCategoryFilter(cats);

      searchQuery.value = "something";

      // Should not throw — undefined?.toLowerCase() handled by optional chaining
      expect(filteredCategories.value).toHaveLength(0);
    });
  });
});
