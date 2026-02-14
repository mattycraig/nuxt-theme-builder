<script setup lang="ts">
const stats = [
  { value: "99.9%", label: "Uptime", percent: 99.9, icon: "i-lucide-shield-check" },
  { value: "4.9/5", label: "Rating", percent: 98, icon: "i-lucide-star" },
  { value: "50ms", label: "Latency", percent: 95, icon: "i-lucide-zap" },
  { value: "10k+", label: "Users", percent: 82, icon: "i-lucide-users" },
];

// 251.2 ≈ circumference of circle with r=40
const circumference = 2 * Math.PI * 40;

function strokeOffset(percent: number) {
  return circumference - (percent / 100) * circumference;
}
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <p class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase mb-3">
          Performance
        </p>
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) tracking-tight">
          Built for reliability
        </h2>
        <p class="mt-3 text-base text-(--ui-text-muted) max-w-lg mx-auto">
          Every metric reflects our commitment to speed, stability, and quality.
        </p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        <div
          v-for="(s, i) in stats"
          :key="s.label"
          class="stat-ring-enter flex flex-col items-center group"
          :style="{ animationDelay: `${i * 120}ms` }"
        >
          <!-- Ring visualization -->
          <div class="relative mb-5">
            <svg
              class="size-28 sm:size-32 -rotate-90"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <!-- Track ring -->
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="var(--ui-border)"
                stroke-width="6"
                stroke-opacity="0.4"
              />
              <!-- Progress ring -->
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#ringGradient)"
                stroke-width="6"
                stroke-linecap="round"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="strokeOffset(s.percent)"
                class="stat-ring-fill transition-all duration-700"
                :style="{ '--ring-delay': `${i * 120 + 300}ms` }"
              />
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="var(--ui-primary)" />
                  <stop offset="100%" stop-color="var(--ui-secondary)" />
                </linearGradient>
              </defs>
            </svg>

            <!-- Center icon -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div
                class="flex size-10 items-center justify-center rounded-xl bg-(--ui-primary)/10 transition-transform duration-300 group-hover:scale-110"
              >
                <UIcon
                  :name="s.icon"
                  class="size-4.5 text-(--ui-primary)"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <!-- Text -->
          <p class="text-2xl sm:text-3xl font-extrabold text-(--ui-text-highlighted) tracking-tight">
            {{ s.value }}
          </p>
          <p class="mt-1 text-sm text-(--ui-text-muted)">{{ s.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stat-ring-enter {
  animation: ringFadeUp 0.6s ease-out both;
}

.stat-ring-fill {
  animation: ringDraw 1s ease-out both;
  animation-delay: var(--ring-delay, 300ms);
}

@keyframes ringFadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ringDraw {
  from {
    stroke-dashoffset: 251.2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stat-ring-enter,
  .stat-ring-fill {
    animation: none;
  }
}
</style>
