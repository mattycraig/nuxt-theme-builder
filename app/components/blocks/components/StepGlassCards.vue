<script setup lang="ts">
const steps = [
  {
    number: "01",
    title: "Choose a preset",
    description:
      "Start with a curated preset or begin from a blank canvas. Each preset is fully customizable.",
    icon: "i-lucide-layers",
  },
  {
    number: "02",
    title: "Customize tokens",
    description:
      "Fine-tune colors, radius, fonts, and spacing with the visual editor. Every change previews instantly.",
    icon: "i-lucide-settings-2",
  },
  {
    number: "03",
    title: "Review & export",
    description:
      "Preview across all components, then export your theme as configuration, CSS, or JSON.",
    icon: "i-lucide-file-check",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-20 sm:py-28">
    <!-- Dot grid background -->
    <div
      class="absolute inset-0 step-dot-grid opacity-[0.04]"
      aria-hidden="true"
    />

    <!-- Centered glow -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[32rem] rounded-full bg-(--ui-primary)/8 blur-[100px]"
      aria-hidden="true"
    />

    <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header inside glass panel -->
      <div
        class="mx-auto max-w-2xl rounded-3xl border border-(--ui-border)/50 bg-(--ui-bg)/60 backdrop-blur-xl p-8 sm:p-10 shadow-2xl mb-14 text-center"
      >
        <p
          class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase mb-2"
        >
          Your Workflow
        </p>
        <h2
          class="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--ui-text-highlighted) leading-[1.15]"
        >
          Three steps to a polished theme
        </h2>
        <p class="mt-3 text-(--ui-text-muted) leading-relaxed max-w-md mx-auto">
          A streamlined process that takes you from idea to shipped theme.
        </p>
      </div>

      <!-- Glass step cards -->
      <div class="relative">
        <!-- Connecting dotted line (desktop) -->
        <div
          class="hidden md:block absolute top-1/2 -translate-y-1/2 left-[10%] right-[10%] border-t-2 border-dashed border-(--ui-primary)/20"
          aria-hidden="true"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(step, i) in steps"
            :key="step.number"
            class="step-glass-stagger relative flex flex-col items-center text-center"
            :style="{ animationDelay: `${i * 140}ms` }"
          >
            <!-- Number orb on connector -->
            <div class="relative z-10 mb-5">
              <div
                class="size-14 rounded-full border border-(--ui-border)/50 bg-(--ui-bg)/70 backdrop-blur-lg shadow-lg flex items-center justify-center"
              >
                <span class="text-lg font-extrabold text-(--ui-primary)">{{
                  step.number
                }}</span>
              </div>
              <!-- Glow ring -->
              <div
                class="absolute -inset-2 rounded-full bg-(--ui-primary)/10 blur-md -z-10"
                aria-hidden="true"
              />
            </div>

            <!-- Glass card -->
            <div
              class="w-full rounded-2xl border border-(--ui-border)/40 bg-(--ui-bg)/50 backdrop-blur-lg p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-(--ui-primary)/30"
            >
              <div
                class="mx-auto mb-4 size-12 rounded-xl bg-(--ui-primary)/10 flex items-center justify-center"
              >
                <UIcon
                  :name="step.icon"
                  class="size-5 text-(--ui-primary)"
                  aria-hidden="true"
                />
              </div>
              <h3 class="text-lg font-bold text-(--ui-text-highlighted) mb-2">
                {{ step.title }}
              </h3>
              <p class="text-sm text-(--ui-text-muted) leading-relaxed">
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
.step-dot-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}

.step-glass-stagger {
  animation: glassFade 0.6s ease-out both;
}

@keyframes glassFade {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .step-glass-stagger {
    animation: none;
  }
}
</style>
