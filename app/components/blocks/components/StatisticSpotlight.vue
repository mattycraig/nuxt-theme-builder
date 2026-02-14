<template>
  <section class="relative isolate overflow-hidden py-20 sm:py-28">
    <!-- Atmospheric gradient orbs -->
    <div
      class="pointer-events-none absolute top-0 left-1/4 size-[28rem] rounded-full bg-(--ui-primary)/10 blur-[120px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute bottom-0 right-1/4 size-[20rem] rounded-full bg-(--ui-secondary)/8 blur-[100px]"
      aria-hidden="true"
    />

    <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Hero stat - glassmorphism card -->
      <div class="stat-highlight-enter mx-auto max-w-lg text-center mb-16">
        <div
          class="rounded-3xl border border-(--ui-border)/40 bg-(--ui-bg)/50 backdrop-blur-xl p-10 sm:p-14 shadow-2xl"
        >
          <div
            class="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-(--ui-primary)/12"
          >
            <UIcon
              name="i-lucide-trending-up"
              class="size-6 text-(--ui-primary)"
              aria-hidden="true"
            />
          </div>

          <p
            class="text-6xl sm:text-7xl font-black tracking-tighter leading-none bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
          >
            5M+
          </p>
          <p class="mt-3 text-lg font-medium text-(--ui-text-highlighted)">
            Themes Generated
          </p>
          <p class="mt-2 text-sm text-(--ui-text-muted) max-w-xs mx-auto leading-relaxed">
            Across all platforms, our engine powers millions of unique design systems worldwide.
          </p>
        </div>
      </div>

      <!-- Supporting stats -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div
          v-for="(s, i) in supportStats"
          :key="s.label"
          class="stat-support-enter flex items-center gap-4 rounded-xl border border-(--ui-border)/50 bg-(--ui-bg-elevated)/60 backdrop-blur-sm px-5 py-4 transition-all duration-300 hover:shadow-md hover:border-(--ui-primary)/20"
          :style="{ animationDelay: `${200 + i * 100}ms` }"
        >
          <div
            class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-(--ui-primary)/10"
          >
            <UIcon
              :name="s.icon"
              class="size-4.5 text-(--ui-primary)"
              aria-hidden="true"
            />
          </div>
          <div>
            <p class="text-2xl font-bold text-(--ui-text-highlighted)">{{ s.value }}</p>
            <p class="text-xs text-(--ui-text-muted)">{{ s.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const supportStats = [
  { value: "10k+", label: "Active Users", icon: "i-lucide-users" },
  { value: "99.9%", label: "Uptime SLA", icon: "i-lucide-shield-check" },
  { value: "150+", label: "Countries", icon: "i-lucide-globe" },
];
</script>

<style scoped>
.stat-highlight-enter {
  animation: highlightReveal 0.7s ease-out both;
}

.stat-support-enter {
  animation: supportSlide 0.5s ease-out both;
}

@keyframes highlightReveal {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes supportSlide {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .stat-highlight-enter,
  .stat-support-enter {
    animation: none;
  }
}
</style>
