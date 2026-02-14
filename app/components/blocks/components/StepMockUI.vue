<script setup lang="ts">
const steps = [
  {
    number: "01",
    title: "Design",
    description: "Use the visual editor or AI to generate your theme tokens.",
    icon: "i-lucide-wand-2",
    filename: "theme.config",
    rows: [
      { label: "Primary", color: "primary", progress: "w-3/4" },
      { label: "Neutral", color: "neutral", progress: "w-1/2" },
    ],
  },
  {
    number: "02",
    title: "Preview",
    description: "See changes cascade across real components in real time.",
    icon: "i-lucide-monitor",
    filename: "preview.live",
    rows: [
      { label: "Components", color: "success", progress: "w-full" },
      { label: "Templates", color: "warning", progress: "w-2/3" },
    ],
  },
  {
    number: "03",
    title: "Export",
    description: "Download as app.config.ts, CSS variables, or JSON.",
    icon: "i-lucide-download",
    filename: "export.config",
    rows: [
      { label: "Config", color: "primary", progress: "w-5/6" },
      { label: "Styles", color: "secondary", progress: "w-3/5" },
    ],
  },
];
</script>

<template>
  <section class="relative overflow-hidden py-20 sm:py-28">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-14">
        <p
          class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase mb-3"
        >
          Simple Workflow
        </p>
        <h2
          class="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--ui-text-highlighted)"
        >
          Three steps, zero complexity
        </h2>
        <p class="mt-3 text-(--ui-text-muted) max-w-lg mx-auto leading-relaxed">
          Each step brings you closer to a production-ready theme.
        </p>
      </div>

      <!-- Cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <article
          v-for="(step, i) in steps"
          :key="step.number"
          class="step-card-stagger group relative"
          :style="{ animationDelay: `${i * 150}ms` }"
        >
          <!-- Step number badge floating -->
          <div class="absolute -top-3 -right-2 z-10">
            <div
              class="size-8 rounded-full bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-secondary)] flex items-center justify-center shadow-lg shadow-(--ui-primary)/20"
            >
              <span class="text-xs font-bold text-white">{{
                step.number
              }}</span>
            </div>
          </div>

          <!-- Mock app window -->
          <div
            class="rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1"
          >
            <!-- Window chrome -->
            <div
              class="flex items-center gap-2 px-4 py-2.5 border-b border-(--ui-border) bg-(--ui-bg-elevated)/80"
            >
              <span
                class="size-2.5 rounded-full bg-red-400/70"
                aria-hidden="true"
              />
              <span
                class="size-2.5 rounded-full bg-yellow-400/70"
                aria-hidden="true"
              />
              <span
                class="size-2.5 rounded-full bg-green-400/70"
                aria-hidden="true"
              />
              <span
                class="ml-2 text-[11px] text-(--ui-text-muted) font-mono truncate"
              >
                {{ step.filename }}
              </span>
            </div>

            <!-- Mock content rows -->
            <div class="p-4 space-y-3">
              <div
                v-for="row in step.rows"
                :key="row.label"
                class="flex items-center gap-3"
              >
                <div
                  class="size-8 rounded-lg flex items-center justify-center shrink-0"
                  :class="`bg-(--ui-${row.color})/12`"
                >
                  <div
                    class="size-3 rounded-sm"
                    :class="`bg-(--ui-${row.color})/60`"
                    aria-hidden="true"
                  />
                </div>
                <div class="flex-1 min-w-0 space-y-1.5">
                  <div
                    class="h-2 rounded-full bg-(--ui-border)"
                    :class="row.progress"
                    aria-hidden="true"
                  />
                  <div
                    class="h-1.5 w-12 rounded-full bg-(--ui-border)/60"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            <!-- Content footer -->
            <div class="px-4 pb-4 pt-2 border-t border-(--ui-border)/50">
              <div class="flex items-center gap-3 mb-2">
                <div
                  class="size-9 rounded-xl bg-(--ui-primary)/10 flex items-center justify-center"
                >
                  <UIcon
                    :name="step.icon"
                    class="size-4 text-(--ui-primary)"
                    aria-hidden="true"
                  />
                </div>
                <h3 class="text-base font-bold text-(--ui-text-highlighted)">
                  {{ step.title }}
                </h3>
              </div>
              <p class="text-sm text-(--ui-text-muted) leading-relaxed">
                {{ step.description }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.step-card-stagger {
  animation: cardLift 0.6s ease-out both;
}

@keyframes cardLift {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .step-card-stagger {
    animation: none;
  }
}
</style>
