<script setup lang="ts">
import { TOOL_CATEGORIES } from "~/utils/navigation";

const meta = TOOL_CATEGORIES[0]!.items.find(
  (i) => String(i.to) === "/tools/palette-generator",
);

useSchemaOrg([
  defineSoftwareApp({
    name: "Palette Generator — Nuxt UI Theme Builder",
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
        :title="String(meta?.label ?? 'Palette Generator')"
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
      <ToolsPaletteGenerator />
      <section
        aria-labelledby="palette-generator-guide"
        class="rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg-muted)/30 p-6 sm:p-8"
      >
        <div class="max-w-3xl space-y-4">
          <h2
            id="palette-generator-guide"
            class="text-2xl font-semibold text-(--ui-text-highlighted)"
          >
            Generate candidate palettes, then refine the one worth keeping
          </h2>
          <p class="text-sm leading-7 text-(--ui-text-muted)">
            The generator is best for exploration, not final approval. It helps
            you move quickly through different semantic combinations when you
            need fresh directions for a dashboard, marketing site, internal
            tool, or brand refresh without hand-picking every color family from
            scratch.
          </p>
          <p class="text-sm leading-7 text-(--ui-text-muted)">
            Once a palette feels close, treat it as a draft. Check whether the
            neutral scale supports long-form UI, make sure status colors remain
            distinguishable, and verify the palette still works in dark mode.
            After that, move into manual editing so the exported theme reflects
            deliberate decisions instead of a random combination.
          </p>
        </div>
      </section>
    </div>
  </UContainer>
</template>
