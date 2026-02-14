<script setup lang="ts">
const links = [
  { label: "Product", to: "#" },
  { label: "Solutions", to: "#" },
  { label: "Resources", to: "#" },
  { label: "Pricing", to: "#" },
];
</script>

<template>
  <header class="border-b border-(--ui-border) bg-(--ui-bg)">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center py-4 gap-3">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-palette"
            class="size-6 text-(--ui-primary)"
            aria-hidden="true"
          />
          <span class="font-bold text-lg text-(--ui-text-highlighted)"
            >ThemeBuilder</span
          >
        </div>
        <nav aria-label="Main navigation">
          <ul class="flex items-center gap-6">
            <li v-for="link in links" :key="link.label">
              <a
                :href="link.to"
                class="text-sm text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
