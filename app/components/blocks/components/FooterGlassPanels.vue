<script setup lang="ts">
const panels = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Templates", "API"],
  },
  {
    title: "Learn",
    links: ["Documentation", "Tutorials", "Blog", "Examples"],
  },
  {
    title: "Connect",
    links: ["Community", "Discord", "GitHub", "Twitter"],
  },
];

const socials = [
  { icon: "i-lucide-github", label: "GitHub" },
  { icon: "i-lucide-twitter", label: "Twitter" },
  { icon: "i-lucide-youtube", label: "YouTube" },
  { icon: "i-lucide-linkedin", label: "LinkedIn" },
];
</script>

<template>
  <footer class="relative isolate overflow-hidden py-14 sm:py-16">
    <!-- Dot-grid pattern -->
    <div
      class="absolute inset-0 footer-dot-grid opacity-[0.035]"
      aria-hidden="true"
    />

    <!-- Centered glow -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[26rem] rounded-full bg-(--ui-primary)/8 blur-[100px]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Brand glass panel -->
      <div
        class="rounded-2xl border border-(--ui-border)/50 bg-(--ui-bg)/55 backdrop-blur-xl p-6 sm:p-8 shadow-lg mb-8 text-center sm:text-left"
      >
        <div
          class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6"
        >
          <div class="max-w-sm">
            <div
              class="flex items-center gap-2.5 mb-3 justify-center sm:justify-start"
            >
              <UIcon
                name="i-lucide-palette"
                class="size-6 text-(--ui-primary)"
                aria-hidden="true"
              />
              <span class="text-lg font-bold text-(--ui-text-highlighted)">
                ThemeBuilder
              </span>
            </div>
            <p class="text-sm text-(--ui-text-muted) leading-relaxed">
              Design, preview, and export beautiful themes for Nuxt UI v4.
              Real-time editing with live component previews.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <UButton
              v-for="social in socials"
              :key="social.label"
              :icon="social.icon"
              :aria-label="social.label"
              variant="ghost"
              color="neutral"
              size="md"
              class="backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      <!-- Link panels grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div
          v-for="panel in panels"
          :key="panel.title"
          class="rounded-xl border border-(--ui-border)/40 bg-(--ui-bg)/45 backdrop-blur-lg p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <h3
            class="text-xs font-semibold text-(--ui-primary) tracking-wider uppercase mb-3"
          >
            {{ panel.title }}
          </h3>
          <ul class="space-y-1.5">
            <li v-for="link in panel.links" :key="link">
              <a
                href="#"
                class="text-sm text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors inline-flex items-center gap-1.5 group"
              >
                <span
                  class="size-1 rounded-full bg-(--ui-primary)/0 group-hover:bg-(--ui-primary)/60 transition-all"
                  aria-hidden="true"
                />
                {{ link }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar inside glass strip -->
      <div
        class="rounded-xl border border-(--ui-border)/30 bg-(--ui-bg)/40 backdrop-blur-lg px-5 py-3.5"
      >
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p class="text-xs text-(--ui-text-muted)">
            &copy; 2025 ThemeBuilder. All rights reserved.
          </p>
          <nav aria-label="Legal links">
            <ul class="flex items-center gap-4">
              <li>
                <a
                  href="#"
                  class="text-xs text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-xs text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-xs text-(--ui-text-muted) hover:text-(--ui-text-highlighted) transition-colors"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-dot-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}
</style>
