<script setup lang="ts">
import { TOOL_CATEGORIES } from "~/utils/navigation";

const meta = TOOL_CATEGORIES[0]!.items.find(
  (i) => String(i.to) === "/tools/contrast-checker",
);

useSchemaOrg([
  defineSoftwareApp({
    name: "Contrast Checker — Nuxt UI Theme Builder",
    description: String(meta?.description ?? ""),
    applicationCategory: "DesignApplication",
    operatingSystem: "Any",
    offers: { price: 0, priceCurrency: "USD" },
  }),
]);
</script>

<template>
  <UContainer>
    <div class="space-y-8">
      <UPageHeader
        headline="Tools"
        :title="String(meta?.label ?? 'Contrast Checker')"
        :description="String(meta?.description ?? '')"
        :links="[
          {
            label: 'All Tools',
            icon: 'i-lucide-arrow-left',
            to: '/tools',
            color: 'neutral' as const,
            variant: 'ghost' as const,
          },
        ]"
      />
      <ToolsContrastChecker />
      <section
        aria-labelledby="contrast-checker-guide"
        class="rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg-muted)/30 p-6 sm:p-8"
      >
        <div class="max-w-3xl space-y-4">
          <h2
            id="contrast-checker-guide"
            class="text-2xl font-semibold text-(--ui-text-highlighted)"
          >
            Use contrast checks before tokens spread through the whole UI
          </h2>
          <p class="text-sm leading-7 text-(--ui-text-muted)">
            Contrast problems usually start small and then repeat across alerts,
            buttons, inputs, navigation, and data displays. This checker is the
            fastest place to test text-on-surface, icon-on-fill, and muted copy
            combinations before those colors get mapped to semantic roles in the
            wider theme.
          </p>
          <p class="text-sm leading-7 text-(--ui-text-muted)">
            For the most reliable results, test more than the primary palette.
            Review body text on backgrounds, button labels on solid fills,
            dimmed supporting text, focus states, and dark-mode variants. That
            catches accessibility regressions earlier than relying on visual
            inspection alone.
          </p>
        </div>
      </section>
    </div>
  </UContainer>
</template>
