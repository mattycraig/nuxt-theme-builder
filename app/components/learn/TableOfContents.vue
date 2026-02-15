<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

defineProps<{
  links: ContentNavigationItem[];
}>();
</script>

<template>
  <nav aria-label="Table of contents">
    <h2 class="text-sm font-semibold text-(--ui-text-highlighted) mb-3">
      On this page
    </h2>
    <ul class="space-y-1.5 text-sm">
      <li v-for="link in links" :key="link.path">
        <a
          :href="`#${link.path}`"
          class="text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors block py-0.5"
        >
          {{ link.title }}
        </a>
        <ul
          v-if="link.children?.length"
          class="ml-3 mt-1 space-y-1 border-l border-(--ui-border) pl-3"
        >
          <li v-for="child in link.children" :key="child.path">
            <a
              :href="`#${child.path}`"
              class="text-(--ui-text-dimmed) hover:text-(--ui-text-highlighted) transition-colors block py-0.5 text-xs"
            >
              {{ child.title }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
