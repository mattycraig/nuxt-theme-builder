<script setup lang="ts">
const steps = [
  {
    number: "01",
    title: "Pick a foundation",
    description:
      "Select a built-in preset or start from scratch. Presets cover popular color schemes and design directions to jumpstart your workflow.",
    icon: "i-lucide-compass",
    detail: "15+ built-in presets",
  },
  {
    number: "02",
    title: "Customize your tokens",
    description:
      "Tweak every design token visually — primary palette, neutral shade, border radius, font family, and dark mode overrides, all in one panel.",
    icon: "i-lucide-paintbrush",
    detail: "Full control over every token",
  },
  {
    number: "03",
    title: "Preview on real pages",
    description:
      "Navigate through component demos, marketing blocks, and full-page templates to verify your theme works across every context.",
    icon: "i-lucide-monitor-check",
    detail: "100+ live component previews",
  },
  {
    number: "04",
    title: "Export and integrate",
    description:
      "Download your finished theme as an app.config.ts file, CSS custom properties, or raw JSON — ready to drop into any Nuxt UI project.",
    icon: "i-lucide-file-output",
    detail: "One-click export",
  },
];

const activeStep = ref(0);
</script>

<template>
  <section class="relative isolate overflow-hidden py-20 sm:py-28">
    <!-- Warm gradient backdrop -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[var(--ui-primary)]/4 via-transparent to-[var(--ui-secondary)]/4"
      aria-hidden="true"
    />

    <!-- Decorative rings -->
    <div
      class="pointer-events-none absolute -top-16 right-0 size-[18rem] rounded-full border border-(--ui-primary)/8"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-12 -left-12 size-[12rem] rounded-full border border-(--ui-secondary)/8"
      aria-hidden="true"
    />

    <div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <p
          class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase mb-3"
        >
          Step-by-Step Guide
        </p>
        <h2
          class="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--ui-text-highlighted)"
        >
          Explore each stage
        </h2>
        <p class="mt-3 text-(--ui-text-muted) leading-relaxed max-w-md mx-auto">
          Expand any step to learn what happens at each stage of the process.
        </p>
      </div>

      <!-- Accordion steps -->
      <div class="space-y-3" role="list" aria-label="Process steps">
        <div
          v-for="(step, i) in steps"
          :key="step.number"
          class="step-accordion-stagger rounded-xl border overflow-hidden transition-all duration-300"
          :class="
            activeStep === i
              ? 'border-(--ui-primary)/40 bg-(--ui-bg-elevated) shadow-lg shadow-(--ui-primary)/5'
              : 'border-(--ui-border) bg-(--ui-bg) hover:border-(--ui-border-accented)'
          "
          :style="{ animationDelay: `${i * 80}ms` }"
          role="listitem"
        >
          <!-- Accordion trigger -->
          <button
            class="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer transition-colors"
            :aria-expanded="activeStep === i"
            :aria-controls="`step-content-${step.number}`"
            @click="activeStep = activeStep === i ? -1 : i"
          >
            <!-- Step number -->
            <div
              class="shrink-0 size-10 rounded-lg flex items-center justify-center font-bold text-sm transition-colors"
              :class="
                activeStep === i
                  ? 'bg-(--ui-primary) text-white'
                  : 'bg-(--ui-bg-elevated) text-(--ui-text-muted) border border-(--ui-border)'
              "
            >
              {{ step.number }}
            </div>

            <!-- Title + detail chip -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2.5">
                <UIcon
                  :name="step.icon"
                  class="size-4 shrink-0"
                  :class="
                    activeStep === i
                      ? 'text-(--ui-primary)'
                      : 'text-(--ui-text-muted)'
                  "
                  aria-hidden="true"
                />
                <h3
                  class="text-base font-bold truncate"
                  :class="
                    activeStep === i
                      ? 'text-(--ui-text-highlighted)'
                      : 'text-(--ui-text)'
                  "
                >
                  {{ step.title }}
                </h3>
              </div>
            </div>

            <!-- Detail chip (visible when collapsed) -->
            <span
              v-if="activeStep !== i"
              class="hidden sm:inline text-xs text-(--ui-text-muted) bg-(--ui-bg-elevated) rounded-full px-2.5 py-1 shrink-0"
            >
              {{ step.detail }}
            </span>

            <!-- Expand icon -->
            <UIcon
              name="i-lucide-chevron-down"
              class="size-5 shrink-0 text-(--ui-text-muted) transition-transform duration-300"
              :class="activeStep === i ? 'rotate-180' : ''"
              aria-hidden="true"
            />
          </button>

          <!-- Expandable content -->
          <div
            :id="`step-content-${step.number}`"
            class="grid transition-all duration-300 ease-in-out"
            :class="activeStep === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
          >
            <div class="overflow-hidden">
              <div class="px-5 pb-5 pt-1">
                <div class="ml-14 space-y-3">
                  <p class="text-sm text-(--ui-text-muted) leading-relaxed">
                    {{ step.description }}
                  </p>
                  <div class="flex items-center gap-2">
                    <UBadge
                      :label="step.detail"
                      color="primary"
                      variant="subtle"
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.step-accordion-stagger {
  animation: accordionFade 0.4s ease-out both;
}

@keyframes accordionFade {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .step-accordion-stagger {
    animation: none;
  }
}
</style>
