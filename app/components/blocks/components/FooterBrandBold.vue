<script setup lang="ts">
const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Templates", "Changelog"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Tutorials", "Blog"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
];

const metrics = [
  { label: "Components", value: "50+" },
  { label: "Themes Built", value: "12k" },
  { label: "Happy Devs", value: "3.2k" },
];

const socials = [
  { icon: "i-lucide-github", label: "GitHub" },
  { icon: "i-lucide-twitter", label: "Twitter" },
  { icon: "i-lucide-youtube", label: "YouTube" },
];
</script>

<template>
  <footer class="relative overflow-hidden bg-(--ui-bg-elevated)">
    <!-- Top accent gradient strip -->
    <div
      class="h-1 bg-gradient-to-r from-[var(--ui-primary)] via-[var(--ui-secondary)] to-[var(--ui-primary)]"
      aria-hidden="true"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
      <div class="grid lg:grid-cols-5 gap-12 lg:gap-8">
        <!-- Brand hero column (2 cols wide) -->
        <div class="lg:col-span-2 space-y-6">
          <div class="flex items-center gap-2.5">
            <div
              class="flex items-center justify-center size-10 rounded-xl bg-(--ui-primary)/10"
            >
              <UIcon
                name="i-lucide-palette"
                class="size-5 text-(--ui-primary)"
                aria-hidden="true"
              />
            </div>
            <span
              class="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
            >
              ThemeBuilder
            </span>
          </div>

          <p class="text-sm text-(--ui-text-muted) leading-relaxed max-w-xs">
            The visual theme builder for Nuxt UI. Design, preview, and export
            production-ready theme systems in minutes.
          </p>

          <!-- Metrics card -->
          <div
            class="rounded-xl border border-(--ui-border) bg-(--ui-bg) p-4 shadow-sm max-w-xs"
          >
            <div class="flex items-center gap-2 mb-3">
              <div
                class="size-2 rounded-full bg-[var(--ui-color-success-500)]"
                aria-hidden="true"
              />
              <span class="text-xs font-medium text-(--ui-text-muted)">
                Live stats
              </span>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div
                v-for="metric in metrics"
                :key="metric.label"
                class="text-center"
              >
                <p
                  class="text-lg font-bold text-(--ui-text-highlighted) leading-none mb-1"
                >
                  {{ metric.value }}
                </p>
                <p class="text-[11px] text-(--ui-text-muted)">
                  {{ metric.label }}
                </p>
              </div>
            </div>
          </div>

          <!-- Social buttons -->
          <div class="flex items-center gap-2">
            <UButton
              v-for="social in socials"
              :key="social.label"
              :icon="social.icon"
              :aria-label="social.label"
              variant="soft"
              color="neutral"
              size="sm"
            />
          </div>
        </div>

        <!-- Link columns (3 cols) -->
        <div class="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div v-for="col in columns" :key="col.title">
            <h3
              class="text-sm font-semibold text-(--ui-text-highlighted) mb-4 flex items-center gap-2"
            >
              <span
                class="size-1.5 rounded-full bg-(--ui-primary)"
                aria-hidden="true"
              />
              {{ col.title }}
            </h3>
            <ul class="space-y-2.5">
              <li v-for="link in col.links" :key="link">
                <a
                  href="#"
                  class="text-sm text-(--ui-text-muted) hover:text-(--ui-primary) transition-colors duration-200"
                >
                  {{ link }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-(--ui-border) bg-(--ui-bg)">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <p class="text-sm text-(--ui-text-muted)">
          &copy; 2025 ThemeBuilder. All rights reserved.
        </p>
        <div class="flex items-center gap-1.5">
          <span class="text-xs text-(--ui-text-muted)">Made with</span>
          <UIcon
            name="i-lucide-heart"
            class="size-3.5 text-(--ui-primary)"
            aria-hidden="true"
          />
          <span class="text-xs text-(--ui-text-muted)"> and Nuxt UI </span>
        </div>
      </div>
    </div>
  </footer>
</template>
