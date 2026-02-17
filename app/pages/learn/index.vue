<script setup lang="ts">
import { LEARN_CATEGORIES } from "~/utils/navigation";
import { PAGE_DESCRIPTIONS } from "~/utils/seoDescriptions";

const articles = await queryCollection("learn").order("order", "ASC").all();

useSchemaOrg([
  defineWebPage({
    "@type": "CollectionPage",
    name: "Learning Hub — Nuxt UI Theme Builder",
    description: PAGE_DESCRIPTIONS["/learn"],
  }),
]);

const articleByPath = computed(() => {
  const map = new Map<string, (typeof articles)[number]>();
  for (const a of articles) {
    map.set(a.path, a);
  }
  return map;
});

const featuredOnly = ref(false);
const selectedFormat = ref<string | null>(null);

const FORMAT_META: Record<string, { label: string; icon: string }> = {
  guide: { label: "Guide", icon: "i-lucide-book-open" },
  reference: { label: "Reference", icon: "i-lucide-file-text" },
  tip: { label: "Quick Tip", icon: "i-lucide-lightbulb" },
};

const availableFormats = computed(() => {
  const counts = new Map<string, number>();
  for (const a of articles) {
    if (a.format) counts.set(a.format, (counts.get(a.format) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([format, count]) => ({
      format,
      count,
      ...(FORMAT_META[format] ?? { label: format, icon: "i-lucide-tag" }),
    }))
    .sort((a, b) => b.count - a.count);
});

const featuredPaths = computed(() => {
  const paths = new Set<string>();
  for (const a of articles) {
    if (a.featured) paths.add(a.path);
  }
  return paths;
});

const formatPaths = computed(() => {
  if (!selectedFormat.value) return null;
  const paths = new Set<string>();
  for (const a of articles) {
    if (a.format === selectedFormat.value) paths.add(a.path);
  }
  return paths;
});

const hasFeatured = computed(() => featuredPaths.value.size > 0);

const fullTotal = LEARN_CATEGORIES.reduce(
  (sum, cat) => sum + cat.items.length,
  0,
);

const effectiveCategories = computed(() => {
  let cats = LEARN_CATEGORIES;

  if (featuredOnly.value) {
    cats = cats
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) =>
          featuredPaths.value.has(String(item.to)),
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }

  if (formatPaths.value) {
    cats = cats
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) =>
          formatPaths.value!.has(String(item.to)),
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }

  return cats;
});

function toggleFormat(format: string) {
  selectedFormat.value = selectedFormat.value === format ? null : format;
}

function clearExternalFilters() {
  featuredOnly.value = false;
  selectedFormat.value = null;
}
</script>

<template>
  <SharedCategoryIndex
    headline="Learn"
    title="Guides, References & Tips"
    item-label="article"
    :categories="effectiveCategories"
    :unfiltered-total="fullTotal"
    @clear-filters="clearExternalFilters"
  >
    <template #description="{ totalCount }">
      {{ totalCount }} articles across
      {{ LEARN_CATEGORIES.length }}
      {{ LEARN_CATEGORIES.length === 1 ? "category" : "categories" }}
      — everything you need to master Nuxt UI v4 theming.
    </template>

    <template #filters>
      <UButton
        v-if="hasFeatured"
        label="Featured"
        icon="i-lucide-star"
        :variant="featuredOnly ? 'solid' : 'soft'"
        :aria-pressed="featuredOnly"
        :aria-label="`Featured. Show featured articles only. ${featuredOnly ? 'Currently active' : 'Not active'}.`"
        color="warning"
        size="sm"
        @click="featuredOnly = !featuredOnly"
      />
      <USeparator
        v-if="hasFeatured && availableFormats.length"
        orientation="vertical"
        class="h-5"
      />
      <UButton
        v-for="f in availableFormats"
        :key="f.format"
        :label="`${f.label} (${f.count})`"
        :icon="f.icon"
        :variant="selectedFormat === f.format ? 'solid' : 'subtle'"
        :aria-pressed="selectedFormat === f.format"
        :aria-label="`${f.label} (${f.count}). Filter by ${f.label}. ${selectedFormat === f.format ? 'Currently selected' : 'Not selected'}.`"
        color="primary"
        size="sm"
        @click="toggleFormat(f.format)"
      />
    </template>

    <template #grid="{ category }">
      <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
        <li v-for="item in category.items" :key="String(item.to)">
          <LearnArticleCard
            :title="item.label ?? ''"
            :description="item.description ?? ''"
            :to="String(item.to)"
            :icon="item.icon"
            :date="articleByPath.get(String(item.to))?.date"
            :category="articleByPath.get(String(item.to))?.category"
            :format="articleByPath.get(String(item.to))?.format"
            :featured="articleByPath.get(String(item.to))?.featured"
          />
        </li>
      </ul>
    </template>
  </SharedCategoryIndex>
</template>
