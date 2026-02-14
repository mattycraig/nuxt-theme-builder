<script setup lang="ts">
const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Templates", "Integrations"],
  },
  {
    title: "Resources",
    links: ["Docs", "Blog", "Help Center", "API Reference"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press Kit", "Contact"],
  },
];
const socials = [
  { icon: "i-lucide-github", label: "GitHub" },
  { icon: "i-lucide-twitter", label: "Twitter" },
  { icon: "i-lucide-youtube", label: "YouTube" },
];
</script>

<template>
  <footer class="border-t border-(--ui-border) bg-(--ui-bg-elevated) py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-5 gap-8 mb-12">
        <div class="lg:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <UIcon
              name="i-lucide-palette"
              class="size-6 text-(--ui-primary)"
              aria-hidden="true"
            />
            <span class="text-lg font-bold text-(--ui-text-highlighted)"
              >ThemeBuilder</span
            >
          </div>
          <p
            class="text-sm text-(--ui-text-muted) leading-relaxed max-w-sm mb-6"
          >
            The visual theme builder for Nuxt UI. Design, preview, and export
            production-ready themes in minutes.
          </p>
          <div class="flex items-center gap-3">
            <UButton
              v-for="social in socials"
              :key="social.label"
              :icon="social.icon"
              :aria-label="social.label"
              variant="ghost"
              color="neutral"
              size="sm"
            />
          </div>
        </div>
        <div v-for="col in columns" :key="col.title">
          <h3 class="text-sm font-semibold text-(--ui-text-highlighted) mb-4">
            {{ col.title }}
          </h3>
          <ul class="space-y-2">
            <li v-for="link in col.links" :key="link">
              <a
                href="#"
                class="text-sm text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors"
              >
                {{ link }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <USeparator />
      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
      >
        <p class="text-sm text-(--ui-text-muted)">
          &copy; 2025 ThemeBuilder. All rights reserved.
        </p>
        <div class="flex items-center gap-6">
          <a
            href="#"
            class="text-sm text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors"
            >Privacy</a
          >
          <a
            href="#"
            class="text-sm text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors"
            >Terms</a
          >
          <a
            href="#"
            class="text-sm text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors"
            >Cookies</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
