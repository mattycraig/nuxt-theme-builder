import type { ComponentCategory } from "~/types/components";

/**
 * Shared search/filter logic used by the component, block, and template
 * index pages. Accepts any array of categories that follow the common
 * ComponentCategory shape and returns reactive filter state + helpers.
 */
export function useCategoryFilter(categories: ComponentCategory[]) {
  const searchQuery = ref("");
  const selectedCategory = ref<string | null>(null);

  const totalCount = categories.reduce((sum, cat) => sum + cat.items.length, 0);

  const filteredCategories = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();

    let result: ComponentCategory[] = categories;

    if (selectedCategory.value) {
      result = result.filter((cat) => cat.slug === selectedCategory.value);
    }

    if (query) {
      result = result
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (item) =>
              item.label?.toLowerCase().includes(query) ||
              item.description?.toLowerCase().includes(query),
          ),
        }))
        .filter((cat) => cat.items.length > 0);
    }

    return result;
  });

  const filteredTotalCount = computed(() =>
    filteredCategories.value.reduce((sum, cat) => sum + cat.items.length, 0),
  );

  const hasResults = computed(() => filteredCategories.value.length > 0);

  function toggleCategory(slug: string) {
    selectedCategory.value = selectedCategory.value === slug ? null : slug;
  }

  function clearFilters() {
    searchQuery.value = "";
    selectedCategory.value = null;
  }

  return {
    searchQuery,
    selectedCategory,
    totalCount,
    filteredCategories,
    filteredTotalCount,
    hasResults,
    toggleCategory,
    clearFilters,
  };
}
