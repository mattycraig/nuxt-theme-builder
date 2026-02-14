<script setup lang="ts">
const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Changelog", "Integrations"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Guides", "Community"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
];
</script>

<template>
  <footer class="relative isolate overflow-hidden">
    <!-- Decorative gradient orbs -->
    <div
      class="pointer-events-none absolute -top-32 left-1/4 size-[28rem] rounded-full bg-(--ui-primary)/10 blur-[100px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -top-20 right-1/4 size-[20rem] rounded-full bg-(--ui-secondary)/8 blur-[80px]"
      aria-hidden="true"
    />

    <!-- Newsletter CTA section -->
    <div class="relative border-t border-(--ui-border) bg-(--ui-bg-elevated)">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 text-center"
      >
        <h2
          class="footer-stagger text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 leading-tight"
        >
          <span
            class="bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
          >
            Stay in the loop
          </span>
        </h2>
        <p
          class="footer-stagger [animation-delay:80ms] text-(--ui-text-muted) text-base sm:text-lg max-w-md mx-auto mb-8 leading-relaxed"
        >
          Get product updates, tips, and inspiration delivered to your inbox.
        </p>
        <form
          class="footer-stagger [animation-delay:160ms] flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          @submit.prevent
        >
          <label for="footer-cta-email" class="sr-only">Email address</label>
          <UInput
            id="footer-cta-email"
            icon="i-lucide-mail"
            placeholder="you@example.com"
            size="lg"
            class="w-full sm:flex-1 shadow-sm"
            type="email"
            aria-label="Email address"
          />
          <UButton
            label="Subscribe"
            icon="i-lucide-send"
            trailing
            size="lg"
            color="primary"
            class="w-full sm:w-auto"
          />
        </form>
      </div>
    </div>

    <!-- Links + bottom bar -->
    <div class="relative border-t border-(--ui-border) bg-(--ui-bg)">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-8">
          <div v-for="col in columns" :key="col.title">
            <h3 class="text-sm font-semibold text-(--ui-text-highlighted) mb-4">
              {{ col.title }}
            </h3>
            <ul class="space-y-2">
              <li v-for="link in col.links" :key="link">
                <a
                  href="#"
                  class="text-sm text-(--ui-text-muted) hover:text-(--ui-primary) transition-colors"
                >
                  {{ link }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <USeparator />
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
        >
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-palette"
              class="size-5 text-(--ui-primary)"
              aria-hidden="true"
            />
            <span class="font-semibold text-(--ui-text-highlighted)">
              ThemeBuilder
            </span>
          </div>
          <p class="text-sm text-(--ui-text-muted)">
            &copy; 2025 ThemeBuilder. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-stagger {
  animation: footerFadeUp 0.6s ease-out both;
}

@keyframes footerFadeUp {
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
  .footer-stagger {
    animation: none;
  }
}
</style>
