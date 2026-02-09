<script setup lang="ts">
const faqs = [
  {
    label: "What is the Nuxt UI Theme Builder?",
    content:
      "It's a visual editor for configuring Nuxt UI v4 design tokens — colors, border radius, font families, and shade overrides. You see every change reflected in real-time across all components, and when you're happy you can export the config directly into your project.",
  },
  {
    label: "What export formats are supported?",
    content:
      "You can export your theme as an app.config.ts file (drop it into your Nuxt project), as CSS custom properties, or as raw JSON. All three formats include both light and dark mode tokens.",
  },
  {
    label: "Do I need a Nuxt UI license?",
    content:
      "Nuxt UI v4 is open-source and free to use. The theme builder is also free and runs entirely in your browser — no account or license required.",
  },
  {
    label: "Can I save multiple themes?",
    content:
      "Yes! You can save as many named theme presets as you like. They're stored in your browser's localStorage so they persist between sessions. You can also share themes via URL or JSON import/export.",
  },
  {
    label: "Does it support dark mode?",
    content:
      "Absolutely. Every design token can be configured independently for light and dark modes. The builder includes shade overrides so you can fine-tune exactly how your theme looks in each mode.",
  },
  {
    label: "Can I undo changes?",
    content:
      "Yes — the builder maintains a full undo/redo history. Press Ctrl+Z to undo and Ctrl+Shift+Z to redo, or use the toolbar buttons.",
  },
];
</script>

<template>
  <div class="p-6 space-y-12 max-w-5xl mx-auto">
    <UPageHeader
      headline="Blocks"
      title="FAQ Section"
      description="Frequently asked questions in an accordion layout."
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

    <!-- FAQ block -->
    <section
      class="rounded-xl border border-(--ui-border) bg-(--ui-bg) p-6 sm:p-10"
    >
      <div class="text-center mb-10">
        <h2 class="text-2xl font-bold text-(--ui-text-highlighted) mb-2">
          Frequently Asked Questions
        </h2>
        <p class="text-(--ui-text-muted) max-w-xl mx-auto">
          Everything you need to know about the Nuxt UI Theme Builder.
        </p>
      </div>
      <div class="max-w-2xl mx-auto">
        <UAccordion :items="faqs" />
      </div>
    </section>
  </div>
</template>
