<script setup lang="ts">
const sections = [
  {
    headline: "Design",
    title: "Visual theme editor",
    description:
      "Point-and-click controls for every design token — colors, typography, spacing, and radius. See results in real time without writing a single line of CSS.",
    icon: "i-lucide-palette",
    links: [
      {
        label: "Learn more",
        icon: "i-lucide-arrow-right",
        trailing: true,
        variant: "link" as const,
        color: "primary" as const,
      },
    ],
  },
  {
    headline: "Preview",
    title: "Live component previews",
    description:
      "Browse 125+ real components, blocks, and full-page templates — all rendered live with your active theme. Toggle dark mode and viewport size instantly.",
    icon: "i-lucide-eye",
    links: [
      {
        label: "Learn more",
        icon: "i-lucide-arrow-right",
        trailing: true,
        variant: "link" as const,
        color: "primary" as const,
      },
    ],
  },
  {
    headline: "Export",
    title: "One-click export",
    description:
      "Generate app.config.ts, CSS variables, or JSON with a single click. Copy the output and paste it into any Nuxt UI project for instant theming.",
    icon: "i-lucide-download",
    links: [
      {
        label: "Learn more",
        icon: "i-lucide-arrow-right",
        trailing: true,
        variant: "link" as const,
        color: "primary" as const,
      },
    ],
  },
];
</script>

<template>
  <div>
    <UPageSection
      v-for="(section, i) in sections"
      :key="section.title"
      :headline="section.headline"
      :title="section.title"
      :description="section.description"
      :icon="section.icon"
      :links="section.links"
      orientation="horizontal"
      :reverse="i % 2 === 1"
    >
      <div
        class="aspect-[4/3] rounded-lg bg-(--ui-bg-elevated) border border-(--ui-border) flex items-center justify-center"
      >
        <div class="text-center text-(--ui-text-muted)">
          <UIcon
            :name="section.icon"
            class="size-12 mb-2 mx-auto opacity-40"
            aria-hidden="true"
          />
          <p class="text-sm">{{ section.title }} preview</p>
        </div>
      </div>
    </UPageSection>
  </div>
</template>
