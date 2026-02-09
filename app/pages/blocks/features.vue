<script setup lang="ts">
const features = [
  {
    icon: "i-lucide-zap",
    title: "Lightning Fast",
    description:
      "Optimized for performance with lazy loading and tree-shaking out of the box.",
  },
  {
    icon: "i-lucide-shield-check",
    title: "Secure by Default",
    description:
      "Built-in security headers, CSRF protection, and input validation.",
  },
  {
    icon: "i-lucide-palette",
    title: "Fully Themeable",
    description:
      "Customize every design token — colors, radius, fonts — with a visual builder.",
  },
  {
    icon: "i-lucide-smartphone",
    title: "Responsive Design",
    description:
      "Every component adapts beautifully from mobile to ultra-wide screens.",
  },
  {
    icon: "i-lucide-accessibility",
    title: "Accessible",
    description:
      "WCAG 2.2 AA compliant with keyboard navigation and screen reader support.",
  },
  {
    icon: "i-lucide-code",
    title: "Developer Experience",
    description: "TypeScript, auto-imports, and composable-first architecture.",
  },
];

const compactFeatures = [
  {
    icon: "i-lucide-brush",
    title: "Design Tokens",
    description: "Semantic colors, radius, fonts.",
  },
  {
    icon: "i-lucide-moon",
    title: "Dark Mode",
    description: "Independent light and dark overrides.",
  },
  {
    icon: "i-lucide-download",
    title: "One-Click Export",
    description: "app.config.ts, CSS, or JSON.",
  },
  {
    icon: "i-lucide-history",
    title: "Undo / Redo",
    description: "Full history for every change.",
  },
];
</script>

<template>
  <div class="p-6 space-y-12 max-w-5xl mx-auto">
    <UPageHeader
      headline="Blocks"
      title="Features Grid"
      description="Showcase product features in different grid layouts."
      :links="[
        {
          label: 'All Blocks',
          icon: 'i-lucide-arrow-left',
          to: '/blocks',
          variant: 'ghost',
          color: 'neutral',
        },
      ]"
    />

    <!-- Variant 1: 3-column icon grid -->
    <section
      class="rounded-xl border border-(--ui-border) bg-(--ui-bg) p-6 sm:p-10"
    >
      <div class="text-center mb-10">
        <h3 class="text-2xl font-bold text-(--ui-text-highlighted) mb-2">
          Everything you need
        </h3>
        <p class="text-(--ui-text-muted) max-w-xl mx-auto">
          A batteries-included toolkit for building modern web applications.
        </p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex items-start gap-4"
        >
          <div
            class="shrink-0 size-10 rounded-lg bg-(--ui-primary)/10 flex items-center justify-center"
          >
            <UIcon :name="feature.icon" class="size-5 text-(--ui-primary)" />
          </div>
          <div>
            <h4 class="font-semibold text-(--ui-text-highlighted) mb-1">
              {{ feature.title }}
            </h4>
            <p class="text-sm text-(--ui-text-muted)">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Variant 2: Card grid -->
    <section
      class="rounded-xl border border-(--ui-border) bg-(--ui-bg) p-6 sm:p-10"
    >
      <div class="text-center mb-10">
        <h3 class="text-2xl font-bold text-(--ui-text-highlighted) mb-2">
          Built for developers
        </h3>
        <p class="text-(--ui-text-muted) max-w-xl mx-auto">
          The theme builder is designed around your workflow.
        </p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <UCard v-for="f in compactFeatures" :key="f.title">
          <div class="text-center py-2">
            <UIcon :name="f.icon" class="size-8 text-(--ui-primary) mb-3" />
            <h4 class="font-semibold text-(--ui-text-highlighted) mb-1">
              {{ f.title }}
            </h4>
            <p class="text-sm text-(--ui-text-muted)">{{ f.description }}</p>
          </div>
        </UCard>
      </div>
    </section>
  </div>
</template>
