<script setup lang="ts">
const steps = [
  {
    number: "01",
    title: "Choose your palette",
    description:
      "Pick a primary color and neutral scheme, or let AI generate an entire palette from a text prompt. Every combination is checked for contrast compliance.",
    icon: "i-lucide-pipette",
  },
  {
    number: "02",
    title: "Customize tokens",
    description:
      "Fine-tune border radius, typography, spacing, and individual shade overrides. Preview changes across real components, blocks, and full page templates.",
    icon: "i-lucide-sliders-horizontal",
  },
  {
    number: "03",
    title: "Export and ship",
    description:
      "Export your finished theme as an app.config.ts file, CSS variables, or raw JSON. Drop it into any Nuxt UI project and go.",
    icon: "i-lucide-rocket",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-20 sm:py-28">
    <!-- Background glow -->
    <div
      class="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 size-[40rem] rounded-full bg-(--ui-primary)/5 blur-[120px]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section header -->
      <div class="text-center mb-16 content-stagger">
        <p
          class="text-sm font-semibold tracking-widest uppercase text-(--ui-primary) mb-4"
        >
          Simple Process
        </p>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-(--ui-text-highlighted) leading-[1.15]"
        >
          How it works
        </h2>
      </div>

      <!-- Steps with connecting flow -->
      <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(step, index) in steps"
          :key="step.number"
          class="content-stagger group relative"
          :style="{ animationDelay: `${(index + 1) * 120}ms` }"
        >
          <!-- Card -->
          <div
            class="relative h-full rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg)/60 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 hover:border-(--ui-primary)/30 hover:shadow-lg hover:shadow-(--ui-primary)/5"
          >
            <!-- Large gradient number -->
            <span
              class="block text-5xl sm:text-6xl font-black bg-gradient-to-br from-[var(--ui-primary)]/25 to-[var(--ui-secondary)]/10 bg-clip-text text-transparent leading-none mb-5 select-none transition-all duration-300 group-hover:from-[var(--ui-primary)]/40 group-hover:to-[var(--ui-secondary)]/20"
              aria-hidden="true"
            >
              {{ step.number }}
            </span>

            <!-- Icon + title row -->
            <div class="flex items-center gap-3 mb-3">
              <div
                class="size-9 rounded-lg bg-(--ui-primary)/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
              >
                <UIcon
                  :name="step.icon"
                  class="size-4.5 text-(--ui-primary)"
                  aria-hidden="true"
                />
              </div>
              <h3 class="text-lg font-bold text-(--ui-text-highlighted)">
                {{ step.title }}
              </h3>
            </div>

            <p class="text-(--ui-text-muted) leading-relaxed">
              {{ step.description }}
            </p>
          </div>

          <!-- Connecting arrow between cards (visible on md+) -->
          <div
            v-if="index < steps.length - 1"
            class="hidden md:flex absolute -right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-10 items-center"
            aria-hidden="true"
          >
            <UIcon
              name="i-lucide-chevron-right"
              class="size-5 text-(--ui-primary)/40"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
