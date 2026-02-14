<script setup lang="ts">
const steps = [
  {
    number: "01",
    title: "Install the module",
    description:
      "Add @nuxt/ui to your project and enable it in nuxt.config.ts.",
  },
  {
    number: "02",
    title: "Open the theme builder",
    description:
      "Launch the visual editor to start customizing your design tokens.",
  },
  {
    number: "03",
    title: "Customize everything",
    description:
      "Adjust palettes, radius, typography, and preview across every component.",
  },
  {
    number: "04",
    title: "Export your config",
    description: "Copy the generated configuration directly into your project.",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          Getting started
        </h2>
      </div>
      <div class="relative">
        <div
          class="absolute left-6 top-0 bottom-0 w-px bg-(--ui-border)"
          aria-hidden="true"
        />
        <div class="space-y-10">
          <div
            v-for="step in steps"
            :key="step.number"
            class="relative flex gap-6"
          >
            <div
              class="flex-shrink-0 w-12 h-12 rounded-full bg-(--ui-bg-elevated) border border-(--ui-border) flex items-center justify-center z-10"
            >
              <span class="text-sm font-bold text-(--ui-primary)">{{
                step.number
              }}</span>
            </div>
            <div class="pt-2">
              <h3 class="text-lg font-semibold text-(--ui-text-highlighted)">
                {{ step.title }}
              </h3>
              <p class="mt-1 text-(--ui-text-muted)">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
