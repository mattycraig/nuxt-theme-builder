<script setup lang="ts">
const steps = [
  {
    number: "01",
    title: "Install the module",
    description:
      "Add @nuxt/ui to your project and enable it in nuxt.config.ts. One dependency, full design system.",
    icon: "i-lucide-package",
    status: "Complete",
    statusColor: "success" as const,
  },
  {
    number: "02",
    title: "Open the builder",
    description:
      "Launch the visual editor to explore palettes, radius, typography, and every design token.",
    icon: "i-lucide-layout-dashboard",
    status: "In Progress",
    statusColor: "warning" as const,
  },
  {
    number: "03",
    title: "Customize everything",
    description:
      "Adjust colors, fonts, and spacing while previewing across real components and templates.",
    icon: "i-lucide-sliders-horizontal",
    status: "Up Next",
    statusColor: "neutral" as const,
  },
  {
    number: "04",
    title: "Export and deploy",
    description:
      "Copy the generated config directly into your project or download as CSS variables and JSON.",
    icon: "i-lucide-cloud-upload",
    status: "Pending",
    statusColor: "neutral" as const,
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-20 sm:py-28">
    <!-- Grid texture background -->
    <div
      class="pointer-events-none absolute inset-0 step-grid-texture opacity-[0.03]"
      aria-hidden="true"
    />

    <!-- Top glow -->
    <div
      class="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[36rem] rounded-full bg-(--ui-primary)/8 blur-[120px]"
      aria-hidden="true"
    />

    <div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-14">
        <div class="inline-flex relative mb-6">
          <span
            class="absolute inset-0 -m-1 rounded-full bg-(--ui-primary)/15 blur-md timeline-glow"
            aria-hidden="true"
          />
          <UBadge
            label="Getting Started"
            color="primary"
            variant="subtle"
            size="lg"
            class="relative"
          />
        </div>
        <h2
          class="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--ui-text-highlighted)"
        >
          From install to production
        </h2>
        <p class="mt-3 text-(--ui-text-muted) leading-relaxed">
          Follow the timeline to ship your custom theme.
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Connecting line with gradient -->
        <div
          class="absolute left-[27px] sm:left-[31px] top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-[var(--ui-primary)] via-[var(--ui-secondary)]/40 to-[var(--ui-border)]"
          aria-hidden="true"
        />

        <ol class="space-y-6" role="list">
          <li
            v-for="(step, i) in steps"
            :key="step.number"
            class="step-timeline-stagger relative"
            :style="{ animationDelay: `${i * 100}ms` }"
          >
            <div class="flex gap-5 sm:gap-6 items-start">
              <!-- Node -->
              <div class="relative z-10 shrink-0">
                <div
                  class="size-14 sm:size-16 rounded-2xl border-2 bg-(--ui-bg-elevated) shadow-lg flex items-center justify-center transition-colors"
                  :class="
                    i === 0
                      ? 'border-[var(--ui-primary)] shadow-(--ui-primary)/15'
                      : 'border-(--ui-border)'
                  "
                >
                  <UIcon
                    :name="step.icon"
                    class="size-6"
                    :class="
                      i === 0 ? 'text-(--ui-primary)' : 'text-(--ui-text-muted)'
                    "
                    aria-hidden="true"
                  />
                </div>
                <!-- Active pulse ring on first item -->
                <div
                  v-if="i === 0"
                  class="absolute -inset-1 rounded-2xl border border-(--ui-primary)/30 timeline-pulse"
                  aria-hidden="true"
                />
              </div>

              <!-- Content card -->
              <div
                class="flex-1 rounded-xl border bg-(--ui-bg-elevated) p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md"
                :class="
                  i === 0 ? 'border-(--ui-primary)/30' : 'border-(--ui-border)'
                "
              >
                <div class="flex items-start justify-between gap-3 mb-2">
                  <div class="flex items-center gap-2.5">
                    <span
                      class="text-xs font-mono font-bold tracking-wider"
                      :class="
                        i === 0
                          ? 'text-(--ui-primary)'
                          : 'text-(--ui-text-muted)'
                      "
                    >
                      STEP {{ step.number }}
                    </span>
                    <h3
                      class="text-base font-bold text-(--ui-text-highlighted)"
                    >
                      {{ step.title }}
                    </h3>
                  </div>
                  <UBadge
                    :label="step.status"
                    :color="step.statusColor"
                    variant="subtle"
                    size="xs"
                    class="shrink-0"
                  />
                </div>
                <p class="text-sm text-(--ui-text-muted) leading-relaxed">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.step-grid-texture {
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 60px 60px;
}

.step-timeline-stagger {
  animation: timelineSlide 0.5s ease-out both;
}

@keyframes timelineSlide {
  from {
    opacity: 0;
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.timeline-glow {
  animation: glowFade 3s ease-in-out infinite;
}

@keyframes glowFade {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 0.4;
  }
}

.timeline-pulse {
  animation: pulseRing 2s ease-out infinite;
}

@keyframes pulseRing {
  0% {
    opacity: 0.6;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.15);
  }
}

@media (prefers-reduced-motion: reduce) {
  .step-timeline-stagger,
  .timeline-glow,
  .timeline-pulse {
    animation: none;
  }
}
</style>
