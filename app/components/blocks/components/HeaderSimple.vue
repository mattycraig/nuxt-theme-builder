<script setup lang="ts">
const links = [
  { label: "Features", to: "#" },
  { label: "Pricing", to: "#" },
  { label: "Blog", to: "#" },
  { label: "Docs", to: "#" },
];
</script>

<template>
  <header class="border-b border-(--ui-border) bg-(--ui-bg)">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-palette"
            class="size-6 text-(--ui-primary)"
            aria-hidden="true"
          />
          <span class="font-bold text-(--ui-text-highlighted)"
            >ThemeBuilder</span
          >
        </div>
        <nav aria-label="Main navigation">
          <ul class="hidden sm:flex items-center gap-6">
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
        <UButton label="Get Started" color="primary" size="sm" />
      </div>
    </div>
  </header>
</template>
