<script setup lang="ts">
const links = [
  { label: "Getting Started", to: "#", icon: "i-lucide-rocket" },
  { label: "Theme Configuration", to: "#", icon: "i-lucide-settings" },
  { label: "AI Generation", to: "#", icon: "i-lucide-sparkles" },
  { label: "Export Formats", to: "#", icon: "i-lucide-download" },
  { label: "Accessibility", to: "#", icon: "i-lucide-accessibility" },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-4 gap-8">
        <div class="lg:col-span-3">
          <h2 class="text-3xl font-bold text-(--ui-text-highlighted) mb-6">
            Documentation
          </h2>
          <div class="prose max-w-none">
            <p class="text-lg text-(--ui-text-muted) leading-relaxed mb-4">
              The Theme Builder provides a complete visual workflow for creating
              Nuxt UI themes. You can edit semantic color palettes, adjust
              typography and spacing tokens, and preview the result across every
              component in real time.
            </p>
            <p class="text-(--ui-text-muted) leading-relaxed mb-4">
              Themes support independent light and dark mode configurations, so
              you can craft the perfect experience for every preference. When
              you're ready, export your theme as an app.config.ts file, CSS
              custom properties, or structured JSON.
            </p>
            <p class="text-(--ui-text-muted) leading-relaxed">
              For a faster starting point, try the AI-powered generation
              feature. Describe the mood or brand you have in mind, and get a
              complete theme suggestion in seconds.
            </p>
          </div>
        </div>
        <UPageAside>
          <div class="space-y-1">
            <h3
              class="text-sm font-semibold text-(--ui-text-muted) uppercase tracking-wider mb-3"
            >
              Quick links
            </h3>
            <UPageLinks :links="links" />
          </div>
        </UPageAside>
      </div>
    </div>
  </section>
</template>
