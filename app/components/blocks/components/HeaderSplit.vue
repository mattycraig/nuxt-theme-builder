<script setup lang="ts">
const links = [
  { label: "Docs", to: "#" },
  { label: "Components", to: "#" },
  { label: "Templates", to: "#" },
];
</script>

<template>
  <header class="relative overflow-hidden">
    <div class="flex">
      <!-- Branded left panel -->
      <div
        class="relative flex items-center gap-3 px-6 py-4 bg-(--ui-primary)/10 border-r border-(--ui-primary)/15"
      >
        <!-- Subtle pattern overlay on branded panel -->
        <div
          class="pointer-events-none absolute inset-0 header-diagonal-lines opacity-[0.03]"
          aria-hidden="true"
        />

        <div class="relative flex items-center gap-3">
          <div
            class="size-9 rounded-xl bg-(--ui-primary) flex items-center justify-center shadow-md shadow-(--ui-primary)/25"
          >
            <UIcon
              name="i-lucide-palette"
              class="size-5 text-white"
              aria-hidden="true"
            />
          </div>
          <div class="leading-tight">
            <span
              class="block font-bold text-(--ui-text-highlighted) tracking-tight"
            >
              ThemeBuilder
            </span>
            <span class="block text-xs text-(--ui-primary) font-medium">
              Design System
            </span>
          </div>
        </div>
      </div>

      <!-- Main nav area -->
      <div
        class="flex-1 flex items-center justify-between px-6 bg-(--ui-bg) border-b border-(--ui-border)/40"
      >
        <nav aria-label="Main navigation">
          <ul class="hidden sm:flex items-center gap-1">
            <li v-for="link in links" :key="link.label">
              <a
                :href="link.to"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-(--ui-text-muted) rounded-md transition-all duration-200 hover:text-(--ui-text-highlighted) hover:bg-(--ui-bg-elevated)"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div class="flex items-center gap-2">
          <UBadge label="v4.0" color="primary" variant="subtle" size="sm" />
          <USeparator orientation="vertical" class="h-5 mx-1" />
          <UButton
            icon="i-lucide-github"
            variant="ghost"
            color="neutral"
            size="sm"
            aria-label="View on GitHub"
          />
          <UButton label="Open Builder" color="primary" size="sm" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-diagonal-lines {
  background-image: repeating-linear-gradient(
    -45deg,
    currentColor 0,
    currentColor 1px,
    transparent 0,
    transparent 8px
  );
}
</style>
