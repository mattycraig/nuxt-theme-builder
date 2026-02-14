<script setup lang="ts">
const links = [
  { label: "Features", to: "#" },
  { label: "Pricing", to: "#" },
  { label: "Blog", to: "#" },
  { label: "Docs", to: "#" },
];
</script>

<template>
  <div class="relative px-4 pt-4">
    <!-- Glow beneath the floating bar -->
    <div
      class="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 w-[60%] h-12 rounded-full bg-(--ui-primary)/10 blur-2xl"
      aria-hidden="true"
    />

    <header
      class="header-float relative mx-auto max-w-5xl rounded-2xl border border-(--ui-border)/50 bg-(--ui-bg)/70 backdrop-blur-xl shadow-lg px-5 py-3"
    >
      <div class="flex items-center justify-between gap-6">
        <!-- Brand -->
        <div class="flex items-center gap-2.5">
          <div
            class="size-8 rounded-lg bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-secondary)] flex items-center justify-center shadow-sm"
          >
            <UIcon
              name="i-lucide-palette"
              class="size-4 text-white"
              aria-hidden="true"
            />
          </div>
          <span class="font-bold text-(--ui-text-highlighted) tracking-tight">
            ThemeBuilder
          </span>
        </div>

        <!-- Navigation -->
        <nav aria-label="Main navigation">
          <ul class="hidden sm:flex items-center gap-1">
            <li v-for="link in links" :key="link.label">
              <a
                :href="link.to"
                class="px-3 py-1.5 text-sm font-medium text-(--ui-text-muted) rounded-lg transition-all duration-200 hover:text-(--ui-text-highlighted) hover:bg-(--ui-bg-elevated)/80"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <UButton
            icon="i-lucide-sun"
            variant="ghost"
            color="neutral"
            size="sm"
            aria-label="Toggle color mode"
            class="hidden sm:inline-flex"
          />
          <UButton label="Get Started" color="primary" size="sm" />
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped>
.header-float {
  animation: headerDropIn 0.5s ease-out both;
}

@keyframes headerDropIn {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .header-float {
    animation: none;
  }
}
</style>
