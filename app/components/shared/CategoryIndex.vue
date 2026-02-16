<script setup lang="ts">
import type { ComponentCategory } from "~/types/components";

const props = withDefaults(
  defineProps<{
    /** Page headline shown above the title */
    headline: string;
    /** Page title (e.g. "Components", "Blocks", "Templates") */
    title: string;
    /** Singular item label used in result counts and aria text */
    itemLabel: string;
    /** The navigation categories to display */
    categories: ComponentCategory[];
    /** Back link target (e.g. "/") */
    backTo?: string;
    /** Search input id for accessibility */
    searchId?: string;
    /** Use compact card style (smaller icons/text, extra grid column). Good for large catalogs. */
    compact?: boolean;
    /** Total item count before any external (parent-side) filtering. When provided, used for the "X of Y" display. */
    unfilteredTotal?: number;
  }>(),
  {
    backTo: "/",
    compact: false,
    searchId: undefined,
    unfilteredTotal: undefined,
  },
);

const emit = defineEmits<{
  /** Emitted when "Clear filters" is clicked, so parent can reset external filters. */
  "clear-filters": [];
}>();

const {
  searchQuery,
  selectedCategory,
  totalCount,
  filteredCategories,
  filteredTotalCount,
  hasResults,
  toggleCategory,
  clearFilters,
} = useCategoryFilter(() => props.categories);

const pluralLabel = computed(() => props.itemLabel + "s");
const resolvedSearchId = computed(
  () => props.searchId ?? `${props.itemLabel}-search`,
);

const displayTotal = computed(() => props.unfilteredTotal ?? totalCount.value);
const isFiltered = computed(
  () =>
    !!searchQuery.value ||
    !!selectedCategory.value ||
    filteredTotalCount.value < displayTotal.value,
);

function handleClearFilters() {
  clearFilters();
  emit("clear-filters");
}
</script>

<template>
  <UContainer>
    <div class="space-y-8">
      <UPageHeader
        :headline="headline"
        :title="title"
        :links="[
          {
            label: 'Back to Home',
            icon: 'i-lucide-arrow-left',
            to: backTo ?? '/',
            variant: 'ghost',
            color: 'neutral',
          },
        ]"
      >
        <template #description>
          <slot name="description" :total-count="totalCount">
            {{ totalCount }} {{ pluralLabel }} across
            {{ categories.length }}
            {{ categories.length === 1 ? "category" : "categories" }}
            — showcasing your current theme settings.
          </slot>
        </template>
      </UPageHeader>

      <!-- Filters Section -->
      <section :aria-label="`${title} filters`" class="space-y-4">
        <!-- Search & Clear Controls -->
        <div
          class="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between"
        >
          <div class="w-full sm:max-w-md">
            <label :for="resolvedSearchId" class="sr-only">
              Search {{ pluralLabel }} by name or description
            </label>
            <UInput
              :id="resolvedSearchId"
              v-model="searchQuery"
              icon="i-lucide-search"
              size="lg"
              :placeholder="`Search ${pluralLabel}...`"
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
          <div v-if="isFiltered" class="flex items-center gap-3">
            <span
              id="filter-results-count"
              class="text-sm text-(--ui-text-muted)"
              role="status"
              aria-live="polite"
            >
              {{ filteredTotalCount }} of {{ displayTotal }} {{ pluralLabel }}
            </span>
            <UButton
              label="Clear filters"
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              size="sm"
              :aria-label="`Clear all filters. Currently showing ${filteredTotalCount} of ${displayTotal} ${pluralLabel}.`"
              @click="handleClearFilters"
            />
          </div>
        </div>

        <!-- Category Filter Chips (shown only when multiple categories exist) -->
        <div v-if="categories.length > 1">
          <label
            id="category-filter-label"
            class="text-xs font-medium text-(--ui-text-muted) mb-2 block"
          >
            Filter by category
          </label>
          <div
            role="group"
            aria-labelledby="category-filter-label"
            class="flex flex-wrap items-center gap-2"
          >
            <slot name="filters" />
            <USeparator
              v-if="$slots.filters"
              orientation="vertical"
              class="h-5"
            />
            <UButton
              v-for="cat in categories"
              :key="cat.slug"
              :label="`${cat.label} (${cat.items.length})`"
              :icon="cat.icon"
              :variant="selectedCategory === cat.slug ? 'solid' : 'soft'"
              :aria-pressed="selectedCategory === cat.slug"
              :aria-label="`${cat.label} (${cat.items.length}). Filter by ${cat.label}. ${selectedCategory === cat.slug ? 'Currently selected' : 'Not selected'}.`"
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
        :title="`No ${pluralLabel} found`"
        :description="`Try adjusting your search term or clear all filters to see all ${pluralLabel}.`"
      >
        <template #body>
          <UButton
            label="Clear all filters"
            color="neutral"
            variant="subtle"
            @click="handleClearFilters"
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
              {{ cat.description }} — {{ cat.items.length }} {{ pluralLabel }}
            </p>
          </div>
        </div>

        <slot name="grid" :category="cat">
          <ul
            :class="
              compact
                ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'
                : 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4'
            "
            role="list"
          >
            <li v-for="item in cat.items" :key="String(item.to)">
              <NuxtLink
                :to="String(item.to)"
                class="block h-full"
                :aria-label="`${item.label}. ${item.description || ''}`"
              >
                <UCard
                  class="h-full hover:ring-2 hover:ring-(--ui-primary)/40 transition-all cursor-pointer"
                >
                  <div class="flex items-start gap-3">
                    <div
                      :class="
                        compact
                          ? 'shrink-0 size-8 rounded-md'
                          : 'shrink-0 size-10 rounded-lg'
                      "
                      class="bg-(--ui-primary)/10 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <UIcon
                        :name="item.icon || cat.icon"
                        :class="compact ? 'size-4' : 'size-5'"
                        class="text-(--ui-primary)"
                      />
                    </div>
                    <div class="min-w-0">
                      <h3
                        :class="
                          compact
                            ? 'text-sm font-semibold'
                            : 'font-semibold mb-1'
                        "
                        class="text-(--ui-text-highlighted) truncate"
                      >
                        {{ item.label }}
                      </h3>
                      <p
                        :class="compact ? 'text-xs' : 'text-sm'"
                        class="text-(--ui-text-muted) line-clamp-2"
                      >
                        {{ item.description }}
                      </p>
                    </div>
                  </div>
                </UCard>
              </NuxtLink>
            </li>
          </ul>
        </slot>

        <USeparator class="my-8" />
      </section>
    </div>
  </UContainer>
</template>
