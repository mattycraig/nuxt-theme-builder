<script setup lang="ts">
const links = [
  { label: "Product", to: "#" },
  { label: "Solutions", to: "#" },
  { label: "Resources", to: "#" },
  { label: "Pricing", to: "#" },
];
</script>

<template>
  <header class="relative">
    <!-- Gradient accent strip -->
    <div
      class="h-1 bg-gradient-to-r from-[var(--ui-primary)] via-[var(--ui-secondary)] to-[var(--ui-primary)]"
      aria-hidden="true"
    />

    <!-- Subtle gradient background wash -->
    <div class="relative bg-(--ui-bg) border-b border-(--ui-border)/40">
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--ui-primary)]/[0.03] to-transparent"
        aria-hidden="true"
      />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Brand -->
          <div class="flex items-center gap-2.5">
            <UIcon
              name="i-lucide-palette"
              class="size-6 text-(--ui-primary)"
              aria-hidden="true"
            />
            <span class="font-bold text-(--ui-text-highlighted)">
              ThemeBuilder
            </span>
          </div>

          <!-- Navigation with animated underlines -->
          <nav aria-label="Main navigation">
            <ul class="hidden sm:flex items-center gap-1">
              <li v-for="(link, index) in links" :key="link.label">
                <a
                  :href="link.to"
                  class="nav-link group relative px-4 py-2 text-sm font-medium text-(--ui-text-muted) transition-colors duration-200 hover:text-(--ui-text-highlighted)"
                  :style="{ '--stagger': `${index * 60}ms` }"
                >
                  {{ link.label }}
                  <!-- Animated underline -->
                  <span
                    class="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] transition-all duration-300 group-hover:w-3/4"
                    aria-hidden="true"
                  />
                </a>
              </li>
            </ul>
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <UButton
              label="Sign In"
              variant="ghost"
              color="neutral"
              size="sm"
            />
            <UButton
              label="Start Free"
              color="primary"
              size="sm"
              class="shadow-sm shadow-(--ui-primary)/20"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  animation: navFadeIn 0.4s ease-out both;
  animation-delay: var(--stagger);
}

@keyframes navFadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-link {
    animation: none;
  }
}
</style>
