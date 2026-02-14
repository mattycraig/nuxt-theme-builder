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
  <section class="relative isolate overflow-hidden py-20 sm:py-28">
    <!-- Dot grid pattern -->
    <div
      class="absolute inset-0 content-dot-grid opacity-[0.03]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Main content -->
        <div class="lg:col-span-3 content-stagger">
          <!-- Header with decorative accent -->
          <div class="flex items-center gap-3 mb-8">
            <div
              class="size-10 rounded-xl bg-(--ui-primary)/10 flex items-center justify-center shrink-0"
            >
              <UIcon
                name="i-lucide-book-open"
                class="size-5 text-(--ui-primary)"
                aria-hidden="true"
              />
            </div>
            <div>
              <p
                class="text-xs font-semibold tracking-widest uppercase text-(--ui-primary)"
              >
                Docs
              </p>
              <h2
                class="text-2xl sm:text-3xl font-extrabold text-(--ui-text-highlighted)"
              >
                Documentation
              </h2>
            </div>
          </div>

          <!-- Content with typographic treatments -->
          <div class="space-y-6">
            <!-- Lead paragraph with left border -->
            <div class="border-l-3 border-(--ui-primary)/30 pl-5">
              <p
                class="text-lg text-(--ui-text-highlighted)/80 leading-relaxed font-medium"
              >
                The Theme Builder provides a complete visual workflow for
                creating Nuxt UI themes. Edit semantic color palettes, adjust
                typography and spacing tokens, and preview across every
                component in real time.
              </p>
            </div>

            <p class="text-(--ui-text-muted) leading-relaxed">
              Themes support independent light and dark mode configurations, so
              you can craft the perfect experience for every preference. When
              you're ready, export your theme as an app.config.ts file, CSS
              custom properties, or structured JSON.
            </p>

            <!-- Callout box -->
            <div
              class="rounded-xl border border-(--ui-primary)/20 bg-(--ui-primary)/5 p-5 flex gap-4"
            >
              <UIcon
                name="i-lucide-sparkles"
                class="size-5 text-(--ui-primary) shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p
                  class="font-semibold text-(--ui-text-highlighted) text-sm mb-1"
                >
                  AI-Powered Themes
                </p>
                <p class="text-sm text-(--ui-text-muted) leading-relaxed">
                  For a faster starting point, try the AI-powered generation
                  feature. Describe the mood or brand you have in mind, and get
                  a complete theme suggestion in seconds.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar — frosted card -->
        <div class="content-stagger [animation-delay:200ms]">
          <div
            class="lg:sticky lg:top-8 rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg)/60 backdrop-blur-sm p-5 shadow-sm"
          >
            <h3
              class="text-xs font-bold text-(--ui-text-muted) uppercase tracking-widest mb-4 flex items-center gap-2"
            >
              <UIcon
                name="i-lucide-compass"
                class="size-3.5"
                aria-hidden="true"
              />
              Quick Links
            </h3>

            <nav aria-label="Quick links navigation">
              <ul class="space-y-1" role="list">
                <li v-for="link in links" :key="link.label">
                  <a
                    :href="link.to"
                    class="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-(--ui-text-muted) transition-all duration-200 hover:bg-(--ui-primary)/5 hover:text-(--ui-text-highlighted)"
                  >
                    <UIcon
                      :name="link.icon"
                      class="size-4 text-(--ui-text-muted) transition-colors duration-200 group-hover:text-(--ui-primary) shrink-0"
                      aria-hidden="true"
                    />
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </nav>

            <!-- Decorative bottom accent -->
            <div class="mt-5 pt-4 border-t border-(--ui-border)/50">
              <div class="flex gap-1" aria-hidden="true">
                <div class="flex-1 h-1 rounded-full bg-(--ui-primary)/20" />
                <div class="flex-1 h-1 rounded-full bg-(--ui-secondary)/15" />
                <div class="flex-1 h-1 rounded-full bg-(--ui-primary)/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-dot-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 20px 20px;
}

.content-stagger {
  animation: contentFadeUp 0.6s ease-out both;
}

@keyframes contentFadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .content-stagger {
    animation: none;
  }
}
</style>
