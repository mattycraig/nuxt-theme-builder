<script setup lang="ts">
import { TOOL_CATEGORIES } from "~/utils/navigation";

const meta = TOOL_CATEGORIES[0]!.items.find(
  (i) => String(i.to) === "/tools/palette-viewer",
);

useSchemaOrg([
  defineSoftwareApp({
    name: "Palette Viewer — Nuxt UI Theme Builder",
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
        :title="String(meta?.label ?? 'Palette Viewer')"
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
      <ToolsPaletteViewer />
      <section
        aria-labelledby="palette-viewer-guide"
        class="rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg-muted)/30 p-6 sm:p-8"
      >
        <div class="max-w-3xl space-y-4">
          <h2
            id="palette-viewer-guide"
            class="text-2xl font-semibold text-(--ui-text-highlighted)"
          >
            Compare full color ramps before you assign semantic roles
          </h2>
          <p class="text-sm leading-7 text-(--ui-text-muted)">
            This viewer is useful when you know the general hue family you want
            but still need to compare how each shade ramp behaves from lightest
            tint to darkest step. That is particularly helpful for choosing a
            neutral palette, deciding between similar brand colors, or spotting
            where one ramp becomes muddy, harsh, or too low-contrast.
          </p>
          <p class="text-sm leading-7 text-(--ui-text-muted)">
            Instead of selecting a palette only by its headline color, inspect
            how the middle shades read in buttons, badges, borders, and muted
            backgrounds. A ramp that looks attractive at one shade can still be
            a poor fit once it has to support interactive states across a full
            design system.
          </p>
        </div>
      </section>
    </div>
  </UContainer>
</template>
