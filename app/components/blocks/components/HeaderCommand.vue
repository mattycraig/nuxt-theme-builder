<script setup lang="ts">
const links = [
  { label: "Docs", to: "#" },
  { label: "API", to: "#" },
  { label: "Changelog", to: "#" },
];
</script>

<template>
  <header class="relative bg-(--ui-bg) border-b border-(--ui-border)">
    <!-- Subtle grid texture -->
    <div
      class="pointer-events-none absolute inset-0 header-grid opacity-[0.02]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 gap-4">
        <!-- Brand (monospace accent) -->
        <div class="flex items-center gap-2 shrink-0">
          <UIcon
            name="i-lucide-terminal"
            class="size-5 text-(--ui-primary)"
            aria-hidden="true"
          />
          <span
            class="font-bold text-(--ui-text-highlighted) font-mono tracking-tight"
          >
            theme<span class="text-(--ui-primary)">.</span>build
          </span>
        </div>

        <!-- Search bar (centerpiece) -->
        <div class="hidden sm:flex flex-1 max-w-md mx-auto">
          <div
            class="group flex items-center w-full gap-2 px-3 py-1.5 rounded-lg border border-(--ui-border) bg-(--ui-bg-elevated)/50 text-sm text-(--ui-text-muted) transition-all duration-200 hover:border-(--ui-primary)/30 hover:shadow-sm cursor-pointer"
            role="button"
            tabindex="0"
            aria-label="Open command palette, press Ctrl K"
          >
            <UIcon
              name="i-lucide-search"
              class="size-4 shrink-0 text-(--ui-text-dimmed) group-hover:text-(--ui-primary) transition-colors"
              aria-hidden="true"
            />
            <span class="flex-1 text-left truncate">
              Search docs, components, APIs...
            </span>
            <div class="flex items-center gap-0.5 shrink-0" aria-hidden="true">
              <UKbd value="meta" size="sm" />
              <UKbd value="K" size="sm" />
            </div>
          </div>
        </div>

        <!-- Navigation + Actions -->
        <div class="flex items-center gap-1 shrink-0">
          <nav aria-label="Main navigation">
            <ul class="hidden md:flex items-center gap-0.5">
              <li v-for="link in links" :key="link.label">
                <a
                  :href="link.to"
                  class="px-3 py-1.5 text-sm text-(--ui-text-muted) rounded-md transition-colors duration-200 hover:text-(--ui-text-highlighted) hover:bg-(--ui-bg-elevated)"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </nav>
          <USeparator orientation="vertical" class="h-5 mx-2 hidden md:block" />
          <UButton
            icon="i-lucide-github"
            variant="ghost"
            color="neutral"
            size="sm"
            aria-label="View on GitHub"
          />
          <UButton
            icon="i-lucide-sun"
            variant="ghost"
            color="neutral"
            size="sm"
            aria-label="Toggle color mode"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-grid {
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
