<script setup lang="ts">
const links = [
  { label: "Features", to: "#" },
  { label: "Pricing", to: "#" },
  { label: "Blog", to: "#" },
];
</script>

<template>
  <header class="border-b border-(--ui-border) bg-(--ui-bg)">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-8">
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
        </div>
        <div class="flex items-center gap-3">
          <UButton label="Sign In" variant="ghost" size="sm" />
          <UButton label="Start Free" color="primary" size="sm" />
        </div>
      </div>
    </div>
  </header>
</template>
