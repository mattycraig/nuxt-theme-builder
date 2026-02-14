<script setup lang="ts">
const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "12k+", label: "Active Projects" },
  { value: "<50ms", label: "Avg. Latency" },
  { value: "4.9/5", label: "User Rating" },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24 bg-(--ui-bg-elevated)">
    <!-- Dot grid texture -->
    <div
      class="absolute inset-0 stat-dot-grid opacity-[0.03]"
      aria-hidden="true"
    />

    <!-- Decorative rings -->
    <div
      class="pointer-events-none absolute -top-20 -left-20 size-64 rounded-full border border-(--ui-primary)/10"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-16 -right-16 size-48 rounded-full border border-(--ui-secondary)/10"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[32rem] rounded-full border border-(--ui-primary)/5"
      aria-hidden="true"
    />

    <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10">
        <p class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase mb-2">
          Platform Metrics
        </p>
      </div>

      <div
        class="flex flex-col sm:flex-row items-center justify-between divide-y sm:divide-y-0 sm:divide-x divide-(--ui-border)/60"
      >
        <div
          v-for="(s, i) in stats"
          :key="s.label"
          class="stat-counter-enter flex-1 text-center py-8 sm:py-0 sm:px-10 group"
          :style="{ animationDelay: `${i * 120}ms` }"
        >
          <p class="text-4xl sm:text-5xl font-extrabold tracking-tight text-(--ui-text-highlighted) transition-colors duration-300 group-hover:text-(--ui-primary)">
            {{ s.value }}
          </p>
          <p class="mt-2 text-sm font-medium text-(--ui-text-muted) tracking-wide uppercase">
            {{ s.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stat-dot-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 20px 20px;
}

.stat-counter-enter {
  animation: counterReveal 0.6s ease-out both;
}

@keyframes counterReveal {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .stat-counter-enter {
    animation: none;
  }
}
</style>
