<script setup lang="ts">
const features = [
  {
    title: "10,000+",
    description: "Active users building themes every day",
    icon: "i-lucide-users",
  },
  {
    title: "50ms",
    description: "Average theme apply time",
    icon: "i-lucide-zap",
  },
  {
    title: "500+",
    description: "Pre-built presets and community themes",
    icon: "i-lucide-layers",
  },
  {
    title: "24/7",
    description: "Infrastructure uptime and monitoring",
    icon: "i-lucide-clock",
  },
];

const chartBars = [
  { label: "Mon", height: 40 },
  { label: "Tue", height: 65 },
  { label: "Wed", height: 50 },
  { label: "Thu", height: 80 },
  { label: "Fri", height: 95 },
  { label: "Sat", height: 70 },
  { label: "Sun", height: 55 },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <UPageSection
      headline="By the Numbers"
      title="Built for scale and performance"
      description="Our platform handles millions of theme operations daily with blazing-fast response times."
      :features="features"
      orientation="horizontal"
    >
      <!-- Dashboard mock visualization -->
      <div class="stat-dashboard-enter relative">
        <div
          class="rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) shadow-xl overflow-hidden"
        >
          <!-- Window chrome -->
          <div
            class="flex items-center gap-2 px-4 py-3 border-b border-(--ui-border)"
          >
            <span class="size-2.5 rounded-full bg-red-400/80" aria-hidden="true" />
            <span class="size-2.5 rounded-full bg-yellow-400/80" aria-hidden="true" />
            <span class="size-2.5 rounded-full bg-green-400/80" aria-hidden="true" />
            <span class="ml-3 text-xs text-(--ui-text-muted) font-mono">analytics.app</span>
          </div>

          <div class="p-5 space-y-5">
            <!-- Mini stat row -->
            <div class="grid grid-cols-3 gap-3">
              <div
                v-for="(ms, j) in [
                  { val: '12.4k', lbl: 'Users', trend: '+14%', up: true },
                  { val: '98.2%', lbl: 'Uptime', trend: '+0.3%', up: true },
                  { val: '42ms', lbl: 'Latency', trend: '-8ms', up: true },
                ]"
                :key="j"
                class="rounded-lg bg-(--ui-bg)/60 border border-(--ui-border)/50 p-3"
              >
                <p class="text-xs text-(--ui-text-muted) mb-1">{{ ms.lbl }}</p>
                <p class="text-lg font-bold text-(--ui-text-highlighted)">{{ ms.val }}</p>
                <p class="text-xs font-medium text-green-500 mt-0.5">{{ ms.trend }}</p>
              </div>
            </div>

            <!-- Mini bar chart -->
            <div>
              <p class="text-xs font-medium text-(--ui-text-muted) mb-3">Weekly Activity</p>
              <div class="flex items-end gap-1.5 h-24" aria-hidden="true">
                <div
                  v-for="(bar, bi) in chartBars"
                  :key="bi"
                  class="flex-1 rounded-t-sm bg-gradient-to-t from-[var(--ui-primary)] to-[var(--ui-primary)]/40 stat-bar-grow"
                  :style="{
                    height: `${bar.height}%`,
                    animationDelay: `${bi * 80 + 300}ms`,
                  }"
                />
              </div>
              <div class="flex gap-1.5 mt-1.5">
                <span
                  v-for="bar in chartBars"
                  :key="bar.label"
                  class="flex-1 text-center text-[10px] text-(--ui-text-muted)"
                >
                  {{ bar.label }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Floating live badge -->
        <div
          class="absolute -top-2.5 -right-2.5 rounded-full bg-(--ui-bg) border border-(--ui-border) shadow-md px-3 py-1.5 flex items-center gap-1.5 stat-float"
        >
          <span class="relative flex size-2">
            <span class="animate-ping absolute inline-flex size-full rounded-full bg-green-400 opacity-75" aria-hidden="true" />
            <span class="relative inline-flex rounded-full size-2 bg-green-500" aria-hidden="true" />
          </span>
          <span class="text-xs font-medium text-(--ui-text-highlighted)">Live</span>
        </div>
      </div>
    </UPageSection>
  </section>
</template>

<style scoped>
.stat-dashboard-enter {
  animation: dashSlideIn 0.8s ease-out both;
  animation-delay: 0.15s;
}

.stat-float {
  animation: dashFloat 0.5s ease-out both;
  animation-delay: 0.8s;
}

.stat-bar-grow {
  animation: barGrow 0.5s ease-out both;
}

@keyframes dashSlideIn {
  from {
    opacity: 0;
    transform: translateX(24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes dashFloat {
  from {
    opacity: 0;
    transform: translateY(6px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes barGrow {
  from {
    transform: scaleY(0);
    transform-origin: bottom;
  }
  to {
    transform: scaleY(1);
    transform-origin: bottom;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stat-dashboard-enter,
  .stat-float,
  .stat-bar-grow {
    animation: none;
  }
}
</style>
