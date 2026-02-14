<script setup lang="ts">
const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Changelog", "Roadmap"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Blog", "Tutorials", "Community"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Partners"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookie Policy", "GDPR"],
  },
];
</script>

<template>
  <footer class="border-t border-(--ui-border) bg-(--ui-bg) py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
        <div v-for="col in columns" :key="col.title">
          <h3 class="text-sm font-semibold text-(--ui-text-highlighted) mb-4">
            {{ col.title }}
          </h3>
          <ul class="space-y-2">
            <li v-for="link in col.links" :key="link">
              <a
                href="#"
                class="text-sm text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors"
              >
                {{ link }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <USeparator />
      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
      >
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-palette"
            class="size-5 text-(--ui-primary)"
            aria-hidden="true"
          />
          <span class="font-semibold text-(--ui-text-highlighted)"
            >ThemeBuilder</span
          >
        </div>
        <p class="text-sm text-(--ui-text-muted)">
          &copy; 2025 ThemeBuilder. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
