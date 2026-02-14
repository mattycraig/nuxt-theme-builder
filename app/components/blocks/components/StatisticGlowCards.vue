<script setup lang="ts">
const stats = [
  { value: "10k+", label: "Active users", icon: "i-lucide-users", accent: "primary" },
  { value: "5M+", label: "Themes generated", icon: "i-lucide-palette", accent: "secondary" },
  { value: "99.9%", label: "Uptime SLA", icon: "i-lucide-shield-check", accent: "primary" },
  { value: "150+", label: "Countries", icon: "i-lucide-globe", accent: "secondary" },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <p class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase mb-3">
          Our Impact
        </p>
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) tracking-tight">
          Trusted worldwide
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(s, i) in stats"
          :key="s.label"
          class="stat-card-enter relative group"
          :style="{ animationDelay: `${i * 100}ms` }"
        >
          <!-- Glow halo behind card -->
          <div
            class="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            :class="s.accent === 'primary' ? 'bg-(--ui-primary)/8' : 'bg-(--ui-secondary)/8'"
            style="filter: blur(20px)"
            aria-hidden="true"
          />

          <div
            class="relative rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated)/80 backdrop-blur-sm p-6 text-center transition-all duration-300 group-hover:shadow-lg group-hover:border-(--ui-primary)/30"
          >
            <!-- Icon circle -->
            <div
              class="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
              :class="s.accent === 'primary' ? 'bg-(--ui-primary)/12' : 'bg-(--ui-secondary)/12'"
            >
              <UIcon
                :name="s.icon"
                class="size-5"
                :class="s.accent === 'primary' ? 'text-(--ui-primary)' : 'text-(--ui-secondary)'"
                aria-hidden="true"
              />
            </div>

            <!-- Gradient number -->
            <p
              class="text-4xl font-extrabold tracking-tight bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
            >
              {{ s.value }}
            </p>
            <p class="mt-2 text-sm font-medium text-(--ui-text-muted)">
              {{ s.label }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stat-card-enter {
  animation: statFadeUp 0.6s ease-out both;
}

@keyframes statFadeUp {
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
  .stat-card-enter {
    animation: none;
  }
}
</style>
