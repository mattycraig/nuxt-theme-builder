<script setup lang="ts">
const steps = [
  {
    number: "01",
    title: "Initialize",
    description:
      "Scaffold your project with the Nuxt UI module pre-configured and ready to go.",
    icon: "i-lucide-folder-plus",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Use the visual editor to craft your palette, typography, radius, and spacing tokens.",
    icon: "i-lucide-palette",
  },
  {
    number: "03",
    title: "Preview",
    description:
      "Watch changes cascade through every component, block, and template in real time.",
    icon: "i-lucide-eye",
  },
  {
    number: "04",
    title: "Ship",
    description:
      "Export as app.config.ts, CSS variables, or JSON and drop it straight into your project.",
    icon: "i-lucide-rocket",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-20 sm:py-28">
    <!-- Decorative gradient orbs -->
    <div
      class="pointer-events-none absolute -top-20 left-1/4 size-[30rem] rounded-full bg-(--ui-primary)/10 blur-[100px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-24 right-1/4 size-[24rem] rounded-full bg-(--ui-secondary)/8 blur-[80px]"
      aria-hidden="true"
    />

    <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-16">
        <p
          class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase mb-3"
        >
          How It Works
        </p>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-(--ui-text-highlighted) leading-[1.1]"
        >
          <span
            class="bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
          >
            Four steps
          </span>
          to your perfect theme
        </h2>
        <p
          class="mt-4 text-lg text-(--ui-text-muted) max-w-xl mx-auto leading-relaxed"
        >
          From zero to production-ready, no design skills required.
        </p>
      </div>

      <!-- Steps with flowing connector -->
      <div class="relative">
        <!-- Horizontal connector line (desktop) -->
        <div
          class="hidden lg:block absolute top-10 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-0.5 bg-gradient-to-r from-[var(--ui-primary)]/30 via-[var(--ui-secondary)]/30 to-[var(--ui-primary)]/30"
          aria-hidden="true"
        />

        <!-- Vertical connector line (mobile) -->
        <div
          class="lg:hidden absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-[var(--ui-primary)]/30 via-[var(--ui-secondary)]/30 to-[var(--ui-primary)]/30"
          aria-hidden="true"
        />

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-6">
          <div
            v-for="(step, i) in steps"
            :key="step.number"
            class="step-stagger relative flex lg:flex-col items-start lg:items-center gap-6 lg:gap-0 lg:text-center"
            :style="{ animationDelay: `${i * 120}ms` }"
          >
            <!-- Numbered orb -->
            <div class="relative z-10 shrink-0">
              <div
                class="size-20 rounded-full bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-secondary)] p-[2px] shadow-lg shadow-(--ui-primary)/20"
              >
                <div
                  class="size-full rounded-full bg-(--ui-bg) flex flex-col items-center justify-center gap-0.5"
                >
                  <UIcon
                    :name="step.icon"
                    class="size-5 text-(--ui-primary)"
                    aria-hidden="true"
                  />
                  <span
                    class="text-[10px] font-bold tracking-wider text-(--ui-primary) uppercase"
                  >
                    {{ step.number }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="lg:mt-6 min-w-0">
              <h3 class="text-lg font-bold text-(--ui-text-highlighted)">
                {{ step.title }}
              </h3>
              <p
                class="mt-1.5 text-sm text-(--ui-text-muted) leading-relaxed max-w-[17rem] lg:mx-auto"
              >
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.step-stagger {
  animation: stepRise 0.6s ease-out both;
}

@keyframes stepRise {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .step-stagger {
    animation: none;
  }
}
</style>
