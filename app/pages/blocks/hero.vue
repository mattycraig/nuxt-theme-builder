<script setup lang="ts">
const heroes = [
  {
    headline: "Ship beautiful apps faster",
    subtitle:
      "Build production-ready interfaces with a themeable component library powered by Tailwind CSS v4 and Nuxt.",
    primaryLabel: "Get Started",
    secondaryLabel: "Documentation",
  },
  {
    headline: "Design tokens, your way",
    subtitle:
      "Visually configure every color, radius, and font — then export a single config file for your project.",
    primaryLabel: "Open Builder",
    secondaryLabel: "View on GitHub",
  },
];
</script>

<template>
  <div class="p-6 space-y-12 max-w-5xl mx-auto">
    <div>
      <UButton
        label="Back to Blocks"
        to="/blocks"
        icon="i-lucide-arrow-left"
        variant="ghost"
        color="neutral"
        size="sm"
        class="mb-4"
      />
      <h2 class="text-2xl font-bold mb-1">Hero Section</h2>
      <p class="text-sm text-(--ui-text-muted)">
        Bold hero banners optimized for landing pages.
      </p>
    </div>

    <!-- Hero variant 1: Centered -->
    <section
      class="rounded-xl border border-(--ui-border) bg-(--ui-bg) overflow-hidden"
    >
      <div class="px-6 py-20 sm:py-28 text-center">
        <UBadge
          label="New Release"
          color="primary"
          variant="subtle"
          size="lg"
          class="mb-6"
        />
        <h3
          class="text-3xl sm:text-5xl font-bold tracking-tight text-(--ui-text-highlighted) mb-4 max-w-2xl mx-auto"
        >
          {{ heroes[0].headline }}
        </h3>
        <p class="text-lg text-(--ui-text-muted) max-w-xl mx-auto mb-8">
          {{ heroes[0].subtitle }}
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <UButton
            :label="heroes[0].primaryLabel"
            size="xl"
            color="primary"
            icon="i-lucide-arrow-right"
            trailing
          />
          <UButton
            :label="heroes[0].secondaryLabel"
            size="xl"
            variant="outline"
            color="neutral"
          />
        </div>
      </div>
    </section>

    <!-- Hero variant 2: Left-aligned with image placeholder -->
    <section
      class="rounded-xl border border-(--ui-border) bg-(--ui-bg) overflow-hidden"
    >
      <div class="grid lg:grid-cols-2 gap-8 p-6 sm:p-12 items-center">
        <div>
          <UBadge
            label="v4.0"
            color="secondary"
            variant="subtle"
            class="mb-4"
          />
          <h3
            class="text-3xl sm:text-4xl font-bold tracking-tight text-(--ui-text-highlighted) mb-4"
          >
            {{ heroes[1].headline }}
          </h3>
          <p class="text-lg text-(--ui-text-muted) mb-6">
            {{ heroes[1].subtitle }}
          </p>
          <div class="flex flex-wrap gap-3">
            <UButton
              :label="heroes[1].primaryLabel"
              size="lg"
              color="primary"
            />
            <UButton
              :label="heroes[1].secondaryLabel"
              size="lg"
              variant="ghost"
              color="neutral"
              icon="i-lucide-external-link"
              trailing
            />
          </div>
        </div>
        <div
          class="aspect-[4/3] rounded-lg bg-(--ui-bg-elevated) border border-(--ui-border) flex items-center justify-center"
        >
          <div class="text-center text-(--ui-text-muted)">
            <UIcon
              name="i-lucide-image"
              class="size-12 mb-2 mx-auto opacity-40"
            />
            <p class="text-sm">Hero image placeholder</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
