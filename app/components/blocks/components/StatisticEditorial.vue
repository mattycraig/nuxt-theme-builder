<script setup lang="ts">
const stats = [
  { value: "2M+", label: "Downloads" },
  { value: "8k+", label: "GitHub Stars" },
  { value: "350+", label: "Contributors" },
  { value: "45+", label: "Countries" },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        <div
          v-for="(s, i) in stats"
          :key="s.label"
          class="stat-editorial-enter relative"
          :style="{ animationDelay: `${i * 80}ms` }"
        >
          <!-- Accent line -->
          <div
            class="h-0.5 w-8 rounded-full mb-5"
            :class="i % 2 === 0 ? 'bg-(--ui-primary)/60' : 'bg-(--ui-secondary)/60'"
            aria-hidden="true"
          />

          <p class="text-5xl sm:text-6xl font-extrabold tracking-tighter leading-none bg-gradient-to-br from-[var(--ui-text-highlighted)] to-[var(--ui-text-muted)] bg-clip-text text-transparent">
            {{ s.value }}
          </p>
          <p class="mt-3 text-sm font-medium text-(--ui-text-muted) tracking-wide uppercase">
            {{ s.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stat-editorial-enter {
  animation: editorialUp 0.5s ease-out both;
}

@keyframes editorialUp {
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
  .stat-editorial-enter {
    animation: none;
  }
}
</style>
