<script setup lang="ts">
import { TOOL_CATEGORIES } from "~/utils/navigation";

const meta = TOOL_CATEGORIES[0]!.items.find(
  (i) => String(i.to) === "/tools/color-converter",
);

useSchemaOrg([
  defineSoftwareApp({
    name: "Color Converter — Nuxt UI Theme Builder",
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
        :title="String(meta?.label ?? 'Color Converter')"
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
      <ToolsColorConverter />
      <section
        aria-labelledby="color-converter-guide"
        class="rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg-muted)/30 p-6 sm:p-8"
      >
        <div class="max-w-3xl space-y-4">
          <h2
            id="color-converter-guide"
            class="text-2xl font-semibold text-(--ui-text-highlighted)"
          >
            When to use the color converter
          </h2>
          <p class="text-sm leading-7 text-(--ui-text-muted)">
            Use this tool when design files, inspiration boards, and existing
            code all describe the same color in different formats. Nuxt UI work
            often involves HEX values from brand guidelines, RGB or HSL values
            from browser tooling, and OKLCH values from Tailwind CSS v4, so
            converting precisely helps you keep one source of truth.
          </p>
          <p class="text-sm leading-7 text-(--ui-text-muted)">
            It is especially useful when you are migrating an older theme or
            matching a palette supplied by a designer. Convert the final value,
            confirm the numeric channels look correct, and then move that result
            into your theme config or contrast checks without retyping it by
            hand.
          </p>
        </div>
      </section>
    </div>
  </UContainer>
</template>
