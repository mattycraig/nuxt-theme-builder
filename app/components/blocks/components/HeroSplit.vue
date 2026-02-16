<script setup lang="ts">
const links = [
  {
    label: "Open Builder",
    size: "xl" as const,
    color: "primary" as const,
    icon: "i-lucide-arrow-right",
    trailing: true,
  },
  {
    label: "View on GitHub",
    size: "xl" as const,
    variant: "ghost" as const,
    color: "neutral" as const,
    icon: "i-lucide-external-link",
    trailing: true,
  },
];
</script>

<template>
  <section class="relative overflow-hidden">
    <UPageHero
      headline="v4.0"
      description="Visually configure every color, radius, and font — then export a single config file for your project."
      :links="links"
      orientation="horizontal"
    >
      <template #title>
        <h2 class="text-5xl sm:text-7xl font-bold tracking-tight text-(--ui-text-highlighted)">
          Design tokens, your way
        </h2>
      </template>
      <!-- Mock app screenshot card -->
      <div class="relative hero-slide-in">
        <div
          class="rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) shadow-2xl overflow-hidden"
        >
          <!-- Window chrome -->
          <div
            class="flex items-center gap-2 px-4 py-3 border-b border-(--ui-border)"
          >
            <span
              class="size-3 rounded-full bg-red-400/80"
              aria-hidden="true"
            />
            <span
              class="size-3 rounded-full bg-yellow-400/80"
              aria-hidden="true"
            />
            <span
              class="size-3 rounded-full bg-green-400/80"
              aria-hidden="true"
            />
            <span
              class="ml-3 text-xs text-(--ui-text-muted) font-mono truncate"
            >
              theme-builder.config
            </span>
          </div>

          <!-- Mock content -->
          <div class="p-5 space-y-4">
            <div class="flex items-center gap-3">
              <div
                class="size-9 rounded-lg bg-(--ui-primary)/15 flex items-center justify-center shrink-0"
              >
                <UIcon
                  name="i-lucide-palette"
                  class="size-4 text-(--ui-primary)"
                  aria-hidden="true"
                />
              </div>
              <div class="flex-1 min-w-0 space-y-1.5">
                <div
                  class="h-2.5 w-24 rounded-full bg-(--ui-primary)/25"
                  aria-hidden="true"
                />
                <div
                  class="h-2 w-16 rounded-full bg-(--ui-border)"
                  aria-hidden="true"
                />
              </div>
              <UBadge
                label="Active"
                color="success"
                variant="subtle"
                size="xs"
              />
            </div>

            <div class="flex items-center gap-3">
              <div
                class="size-9 rounded-lg bg-(--ui-secondary)/15 flex items-center justify-center shrink-0"
              >
                <UIcon
                  name="i-lucide-type"
                  class="size-4 text-(--ui-secondary)"
                  aria-hidden="true"
                />
              </div>
              <div class="flex-1 min-w-0 space-y-1.5">
                <div
                  class="h-2.5 w-20 rounded-full bg-(--ui-secondary)/25"
                  aria-hidden="true"
                />
                <div
                  class="h-2 w-28 rounded-full bg-(--ui-border)"
                  aria-hidden="true"
                />
              </div>
              <UBadge
                label="Custom"
                color="warning"
                variant="subtle"
                size="xs"
              />
            </div>

            <div class="border-t border-(--ui-border)" aria-hidden="true" />

            <!-- Color swatch strip -->
            <div class="flex gap-1.5" aria-hidden="true">
              <div class="flex-1 h-9 rounded-lg bg-(--ui-color-primary-600)" />
              <div class="flex-1 h-9 rounded-lg bg-(--ui-color-primary-500)" />
              <div class="flex-1 h-9 rounded-lg bg-(--ui-color-primary-400)" />
              <div class="flex-1 h-9 rounded-lg bg-(--ui-color-primary-300)" />
              <div class="flex-1 h-9 rounded-lg bg-(--ui-color-primary-200)" />
            </div>
          </div>
        </div>

        <!-- Floating success notification -->
        <div
          class="absolute -bottom-3 -left-3 rounded-xl border border-(--ui-border) bg-(--ui-bg) shadow-lg px-4 py-2.5 flex items-center gap-2.5 hero-float"
        >
          <UIcon
            name="i-lucide-check-circle"
            class="size-5 text-green-500 shrink-0"
            aria-hidden="true"
          />
          <span class="text-sm font-medium text-(--ui-text-highlighted)">
            Theme exported!
          </span>
        </div>
      </div>
    </UPageHero>
  </section>
</template>

<style scoped>
.hero-slide-in {
  animation: slideInRight 0.8s ease-out both;
  animation-delay: 0.2s;
}

.hero-float {
  animation: floatUp 0.5s ease-out both;
  animation-delay: 0.9s;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes floatUp {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-slide-in,
  .hero-float {
    animation: none;
  }
}
</style>
