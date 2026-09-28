<script setup lang="ts">
import { LEARN_CATEGORIES } from "~/utils/navigation";

const props = withDefaults(
  defineProps<{
    /** Learn article paths, in display order. */
    paths: string[];
    title?: string;
  }>(),
  { title: "Related guides" },
);

const guides = computed(() => {
  const items = LEARN_CATEGORIES.flatMap((category) => category.items);
  return props.paths
    .map((path) => items.find((item) => String(item.to) === path))
    .filter((item) => item !== undefined);
});

const headingId = useId();
</script>

<template>
  <section v-if="guides.length" :aria-labelledby="headingId">
    <h2
      :id="headingId"
      class="text-lg font-semibold text-(--ui-text-highlighted) mb-4"
    >
      {{ title }}
    </h2>
    <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="guide in guides" :key="String(guide.to)">
        <NuxtLink
          :to="guide.to"
          class="flex h-full gap-3 rounded-(--ui-radius) border border-(--ui-border) p-4 transition-colors hover:bg-(--ui-bg-elevated)/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-primary)"
        >
          <UIcon
            :name="String(guide.icon ?? 'i-lucide-book-open')"
            class="size-5 shrink-0 text-(--ui-primary)"
            aria-hidden="true"
          />
          <span class="min-w-0">
            <span class="block text-sm font-medium text-(--ui-text-highlighted)">
              {{ guide.label }}
            </span>
            <span class="mt-1 block text-sm text-(--ui-text-muted)">
              {{ guide.description }}
            </span>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
