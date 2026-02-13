<script setup lang="ts">
import { COMPONENT_CATEGORIES } from "~/utils/navigation";

const searchQuery = ref("");
const selectedCategory = ref<string | null>(null);

const totalCount = COMPONENT_CATEGORIES.reduce(
  (sum, cat) => sum + cat.items.length,
  0,
);

const filteredCategories = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();

  let categories = COMPONENT_CATEGORIES;

  // Filter by selected category first
  if (selectedCategory.value) {
    categories = categories.filter(
      (cat) => cat.slug === selectedCategory.value,
    );
  }

  // Then filter by search query
  if (query) {
    categories = categories
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

  return categories;
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
</script>

<template>
  <UContainer>
    <div class="space-y-8">
      <UPageHeader
        headline="Theme Builder"
        title="Components"
        :links="[
          {
            label: 'Back to Home',
            icon: 'i-lucide-arrow-left',
            to: '/',
            variant: 'ghost',
            color: 'neutral',
          },
        ]"
      >
        <template #description>
          {{ totalCount }} UI components across
          {{ COMPONENT_CATEGORIES.length }}
          categories — showcasing your current theme settings.
        </template>
      </UPageHeader>

      <!-- Filters Section -->
      <section aria-label="Component filters" class="space-y-4">
        <!-- Search & Clear Controls -->
        <div
          class="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between"
        >
          <div class="w-full sm:max-w-md">
            <label for="component-search" class="sr-only">
              Search components by name or description
            </label>
            <UInput
              id="component-search"
              v-model="searchQuery"
              icon="i-lucide-search"
              size="lg"
              placeholder="Search components..."
            >
              <template v-if="searchQuery" #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  icon="i-lucide-x"
                  :padded="false"
                  aria-label="Clear search"
                  @click="searchQuery = ''"
                />
              </template>
            </UInput>
          </div>

          <!-- Results & Clear Actions -->
          <div
            v-if="searchQuery || selectedCategory"
            class="flex items-center gap-3"
          >
            <span
              id="filter-results-count"
              class="text-sm text-(--ui-text-muted)"
              role="status"
              aria-live="polite"
            >
              {{ filteredTotalCount }} of {{ totalCount }} components
            </span>
            <UButton
              label="Clear filters"
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              size="sm"
              :aria-label="`Clear all filters. Currently showing ${filteredTotalCount} of ${totalCount} components.`"
              @click="clearFilters"
            />
          </div>
        </div>

        <!-- Category Filter Chips -->
        <div>
          <label
            id="category-filter-label"
            class="text-xs font-medium text-(--ui-text-muted) mb-2 block"
          >
            Filter by category
          </label>
          <div
            role="group"
            aria-labelledby="category-filter-label"
            class="flex flex-wrap gap-2"
          >
            <UButton
              v-for="cat in COMPONENT_CATEGORIES"
              :key="cat.slug"
              :label="`${cat.label} (${cat.items.length})`"
              :icon="cat.icon"
              :variant="selectedCategory === cat.slug ? 'solid' : 'soft'"
              :aria-pressed="selectedCategory === cat.slug"
              :aria-label="`Filter by ${cat.label}. ${cat.items.length} components. ${selectedCategory === cat.slug ? 'Currently selected' : 'Not selected'}.`"
              color="neutral"
              size="sm"
              @click="toggleCategory(cat.slug)"
            />
          </div>
        </div>
      </section>

      <!-- No results message -->
      <UEmpty
        v-if="!hasResults"
        icon="i-lucide-search-x"
        title="No components found"
        description="Try adjusting your search term or clear all filters to see all components."
      >
        <template #body>
          <UButton
            label="Clear all filters"
            color="neutral"
            variant="subtle"
            @click="clearFilters"
          />
        </template>
      </UEmpty>

      <!-- Category sections -->
      <section
        v-for="cat in filteredCategories"
        :id="`category-${cat.slug}`"
        :key="cat.slug"
        :aria-labelledby="`heading-${cat.slug}`"
      >
        <div class="flex items-center gap-3 mb-6">
          <div>
            <h2
              :id="`heading-${cat.slug}`"
              class="text-2xl font-semibold text-(--ui-text-highlighted)"
            >
              {{ cat.label }}
            </h2>
            <p class="text-xs text-(--ui-text-muted)">
              {{ cat.description }} — {{ cat.items.length }} components
            </p>
          </div>
        </div>

        <ul
          class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-3"
          role="list"
        >
          <li v-for="item in cat.items" :key="String(item.to)">
            <NuxtLink
              :to="String(item.to)"
              class="block h-full"
              :aria-label="`View ${item.label} component. ${item.description || ''}`"
            >
              <UCard
                class="h-full hover:ring-2 hover:ring-(--ui-primary)/40 transition-all cursor-pointer"
              >
                <div class="flex items-start gap-3">
                  <div
                    class="shrink-0 size-8 rounded-md bg-(--ui-primary)/10 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <UIcon
                      :name="item.icon || cat.icon"
                      class="size-4 text-(--ui-primary)"
                    />
                  </div>
                  <div class="min-w-0">
                    <h3
                      class="text-sm font-semibold text-(--ui-text-highlighted) truncate"
                    >
                      {{ item.label }}
                    </h3>
                    <p class="text-xs text-(--ui-text-muted) line-clamp-2">
                      {{ item.description }}
                    </p>
                  </div>
                </div>
              </UCard>
            </NuxtLink>
          </li>
        </ul>

        <USeparator class="my-8" />
      </section>
    </div>
  </UContainer>
</template>

<style scoped>
.sr-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>
