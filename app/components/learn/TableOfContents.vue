<script setup lang="ts">
interface TocLink {
  id: string;
  text: string;
  depth: number;
  children?: TocLink[];
}

defineProps<{
  links: TocLink[];
}>();
</script>

<template>
  <nav v-if="links.length" aria-label="Table of contents">
    <h2 class="text-sm font-semibold text-(--ui-text-highlighted) mb-3">
      On this page
    </h2>
    <ul class="space-y-1.5 text-sm">
      <li v-for="link in links" :key="link.id">
        <a
          :href="`#${link.id}`"
          class="text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors block py-0.5"
        >
          {{ link.text }}
        </a>
        <ul
          v-if="link.children?.length"
          class="ml-3 mt-1 space-y-1 border-l border-(--ui-border) pl-3"
        >
          <li v-for="child in link.children" :key="child.id">
            <a
              :href="`#${child.id}`"
              class="text-(--ui-text-dimmed) hover:text-(--ui-text-highlighted) transition-colors block py-0.5 text-xs"
            >
              {{ child.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
