<script setup lang="ts">
const steps = [
  {
    number: "01",
    title: "Start a project",
    description:
      "Scaffold a Nuxt app with the UI module enabled. One command gets you a fully configured development environment.",
    icon: "i-lucide-terminal",
    side: "left" as const,
  },
  {
    number: "02",
    title: "Open the editor",
    description:
      "Launch the theme builder to access every design token — palettes, neutrals, radius, fonts, and dark mode overrides.",
    icon: "i-lucide-layout-dashboard",
    side: "right" as const,
  },
  {
    number: "03",
    title: "Preview everywhere",
    description:
      "Validate your theme against 100+ components, marketing blocks, and full templates. Switch between light and dark mode instantly.",
    icon: "i-lucide-eye",
    side: "left" as const,
  },
  {
    number: "04",
    title: "Ship with confidence",
    description:
      "Export your configuration and drop it into your project. Every token is production-tested and framework-ready.",
    icon: "i-lucide-rocket",
    side: "right" as const,
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-20 sm:py-28">
    <!-- Subtle gradient orb -->
    <div
      class="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 size-[28rem] rounded-full bg-(--ui-primary)/6 blur-[100px]"
      aria-hidden="true"
    />

    <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <p
          class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase mb-3"
        >
          The Process
        </p>
        <h2
          class="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--ui-text-highlighted)"
        >
          From idea to production
        </h2>
        <p class="mt-3 text-(--ui-text-muted) leading-relaxed max-w-md mx-auto">
          A clear path through every stage of theme creation.
        </p>
      </div>

      <!-- Zigzag layout -->
      <div class="relative">
        <!-- Central connecting line (desktop) -->
        <div
          class="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-[var(--ui-primary)]/25 via-[var(--ui-secondary)]/25 to-[var(--ui-primary)]/25"
          aria-hidden="true"
        />

        <!-- Mobile connecting line -->
        <div
          class="md:hidden absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--ui-primary)]/20 to-transparent"
          aria-hidden="true"
        />

        <div class="space-y-12 md:space-y-16">
          <div
            v-for="(step, i) in steps"
            :key="step.number"
            class="step-zigzag-stagger relative"
            :style="{ animationDelay: `${i * 120}ms` }"
          >
            <!-- Desktop: alternating layout -->
            <div
              class="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 md:items-center"
            >
              <!-- Left content (or empty) -->
              <div :class="step.side === 'left' ? '' : 'order-1'">
                <div v-if="step.side === 'left'" class="text-right pr-4">
                  <div class="inline-flex items-center gap-2 mb-2">
                    <h3 class="text-lg font-bold text-(--ui-text-highlighted)">
                      {{ step.title }}
                    </h3>
                    <span
                      class="text-xs font-mono font-bold text-(--ui-primary) tracking-wider"
                    >
                      {{ step.number }}
                    </span>
                  </div>
                  <p
                    class="text-sm text-(--ui-text-muted) leading-relaxed max-w-xs ml-auto"
                  >
                    {{ step.description }}
                  </p>
                </div>
              </div>

              <!-- Center node -->
              <div class="relative z-10 order-0 md:order-none">
                <div
                  class="size-14 rounded-2xl border-2 border-(--ui-primary)/30 bg-(--ui-bg-elevated) shadow-lg flex items-center justify-center"
                >
                  <UIcon
                    :name="step.icon"
                    class="size-6 text-(--ui-primary)"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <!-- Right content (or empty) -->
              <div :class="step.side === 'right' ? 'order-2' : 'order-2'">
                <div v-if="step.side === 'right'" class="text-left pl-4">
                  <div class="inline-flex items-center gap-2 mb-2">
                    <span
                      class="text-xs font-mono font-bold text-(--ui-primary) tracking-wider"
                    >
                      {{ step.number }}
                    </span>
                    <h3 class="text-lg font-bold text-(--ui-text-highlighted)">
                      {{ step.title }}
                    </h3>
                  </div>
                  <p
                    class="text-sm text-(--ui-text-muted) leading-relaxed max-w-xs"
                  >
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Mobile: always left-aligned -->
            <div class="md:hidden flex gap-5 items-start">
              <div class="relative z-10 shrink-0">
                <div
                  class="size-14 rounded-2xl border-2 border-(--ui-primary)/30 bg-(--ui-bg-elevated) shadow-lg flex items-center justify-center"
                >
                  <UIcon
                    :name="step.icon"
                    class="size-6 text-(--ui-primary)"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div class="pt-1">
                <div class="flex items-center gap-2 mb-1">
                  <span
                    class="text-xs font-mono font-bold text-(--ui-primary) tracking-wider"
                  >
                    {{ step.number }}
                  </span>
                  <h3 class="text-lg font-bold text-(--ui-text-highlighted)">
                    {{ step.title }}
                  </h3>
                </div>
                <p class="text-sm text-(--ui-text-muted) leading-relaxed">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.step-zigzag-stagger {
  animation: zigzagSlide 0.5s ease-out both;
}

@keyframes zigzagSlide {
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
  .step-zigzag-stagger {
    animation: none;
  }
}
</style>
