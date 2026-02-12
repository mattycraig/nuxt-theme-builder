<script setup lang="ts">
const features = [
  {
    icon: "i-lucide-palette",
    title: "Visual Design Tokens",
    description:
      "Configure semantic colors, neutral palettes, border radius, and font families with live preview.",
  },
  {
    icon: "i-lucide-sun-moon",
    title: "Light & Dark Modes",
    description:
      "Every token supports independent light and dark mode overrides. See both in real-time.",
  },
  {
    icon: "i-lucide-download",
    title: "Export Anywhere",
    description:
      "Export your theme as app.config.ts, CSS custom properties, or JSON — ready to drop into your project.",
  },
  {
    icon: "i-lucide-undo-2",
    title: "Undo / Redo",
    description:
      "Experiment freely with full undo and redo history. Save and manage multiple theme presets.",
  },
  {
    icon: "i-lucide-component",
    title: "Component Preview",
    description:
      "Browse every Nuxt UI component styled with your theme — buttons, cards, tables, forms, and more.",
  },
  {
    icon: "i-lucide-layout-template",
    title: "Full Page Templates",
    description:
      "See your theme applied to real-world pages: dashboards, blogs, pricing pages, login screens, and more.",
  },
];

const sections = [
  {
    icon: "i-lucide-layout-grid",
    title: "Components",
    description:
      "Browse individual Nuxt UI components with all variants, sizes, and states rendered with your theme.",
    to: "/components",
  },
  {
    icon: "i-lucide-blocks",
    title: "Blocks",
    description:
      "Pre-built layout blocks — hero sections, feature grids, CTAs, and more — styled by your theme.",
    to: "/blocks",
  },
  {
    icon: "i-lucide-app-window",
    title: "Templates",
    description:
      "Complete page templates — dashboards, blogs, pricing pages — that showcase your theme in context.",
    to: "/templates",
  },
];
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero section -->
    <section class="relative overflow-hidden py-16 sm:py-24 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <UBadge
          label="Nuxt UI v4"
          color="primary"
          variant="subtle"
          size="lg"
          class="mb-6"
        />
        <h1
          class="text-4xl sm:text-5xl font-bold tracking-tight text-(--ui-text-highlighted) mb-6"
        >
          Build your perfect
          <span class="text-(--ui-primary)">Nuxt UI</span> theme
        </h1>
        <p
          class="text-lg sm:text-xl text-(--ui-text-muted) max-w-2xl mx-auto mb-10"
        >
          A visual design-token editor for Nuxt UI v4. Configure colors, radius,
          fonts, and shades — preview every component live — then export and
          drop into your project.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <UButton
            label="Browse Components"
            to="/components"
            icon="i-lucide-layout-grid"
            size="xl"
            color="primary"
          />
          <UButton
            label="View Templates"
            to="/templates"
            icon="i-lucide-app-window"
            size="xl"
            variant="outline"
            color="neutral"
          />
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Features grid -->
    <section class="py-16 px-6">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-(--ui-text-highlighted) mb-2">
            Everything you need to theme your app
          </h2>
          <p class="text-(--ui-text-muted)">
            Edit in the sidebar, preview on the right, export when you're done.
          </p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard v-for="feature in features" :key="feature.title">
            <div class="flex items-start gap-4">
              <div
                class="shrink-0 size-10 rounded-lg bg-(--ui-primary)/10 flex items-center justify-center"
              >
                <UIcon
                  :name="feature.icon"
                  class="size-5 text-(--ui-primary)"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 class="font-semibold text-(--ui-text-highlighted) mb-1">
                  {{ feature.title }}
                </h3>
                <p class="text-sm text-(--ui-text-muted)">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <USeparator />

    <!-- Sections navigation -->
    <section class="py-16 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-(--ui-text-highlighted) mb-2">
            Explore the preview sections
          </h2>
          <p class="text-(--ui-text-muted)">
            See how your theme looks across components, blocks, and full page
            templates.
          </p>
        </div>
        <div class="grid sm:grid-cols-3 gap-6">
          <UCard
            v-for="section in sections"
            :key="section.title"
            class="relative hover:ring-2 hover:ring-(--ui-primary)/40 transition-all h-full"
          >
            <div class="text-center py-4">
              <div
                class="size-14 rounded-xl bg-(--ui-primary)/10 flex items-center justify-center mx-auto mb-4"
              >
                <UIcon
                  :name="section.icon"
                  class="size-7 text-(--ui-primary)"
                  aria-hidden="true"
                />
              </div>
              <h3
                class="text-lg font-semibold text-(--ui-text-highlighted) mb-2"
              >
                <NuxtLink
                  :to="section.to"
                  class="after:absolute after:inset-0 focus-visible:outline-none"
                >
                  <span class="relative z-10 focus-visible:ring-2 focus-visible:ring-(--ui-primary) focus-visible:outline-none rounded">
                    {{ section.title }}
                  </span>
                </NuxtLink>
              </h3>
              <p class="text-sm text-(--ui-text-muted)">
                {{ section.description }}
              </p>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Quick start hint -->
    <section class="py-12 px-6">
      <div class="max-w-2xl mx-auto text-center">
        <UIcon
          name="i-lucide-arrow-left"
          class="size-5 text-(--ui-text-muted) mb-3"
          aria-hidden="true"
        />
        <p class="text-(--ui-text-muted)">
          Open the
          <strong class="text-(--ui-text-highlighted)">sidebar</strong> on the
          left to start editing your theme. Changes are previewed instantly.
        </p>
      </div>
    </section>
  </div>
</template>
