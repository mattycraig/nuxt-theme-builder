<script setup lang="ts">
const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "12k+", label: "Active Projects" },
  { value: "<50ms", label: "Avg. Latency" },
  { value: "4.9/5", label: "User Rating" },
];
</script>

<template>
  <section class="py-16 sm:py-24 bg-(--ui-bg-elevated)">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="flex flex-col sm:flex-row items-center justify-between divide-y sm:divide-y-0 sm:divide-x divide-(--ui-border)"
      >
        <div
          v-for="s in stats"
          :key="s.label"
          class="flex-1 text-center py-6 sm:py-0 sm:px-8"
        >
          <p class="text-3xl sm:text-4xl font-bold text-(--ui-primary)">
            {{ s.value }}
          </p>
          <p class="mt-1 text-sm text-(--ui-text-muted)">{{ s.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
