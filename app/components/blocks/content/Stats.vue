<script setup lang="ts">
const stats = [
  { label: "Components", value: "125+", icon: "i-lucide-component" },
  { label: "Design Tokens", value: "50+", icon: "i-lucide-paintbrush" },
  { label: "Built-in Presets", value: "12", icon: "i-lucide-swatches" },
  { label: "Export Formats", value: "3", icon: "i-lucide-download" },
];

const detailedStats = [
  {
    label: "Weekly Downloads",
    value: "48,291",
    change: "+12.5%",
    trend: "up",
  },
  { label: "GitHub Stars", value: "6,842", change: "+340", trend: "up" },
  { label: "Contributors", value: "127", change: "+8", trend: "up" },
  { label: "Open Issues", value: "23", change: "-5", trend: "down" },
];
</script>

<template>
  <!-- Variant 1: Simple stat cards -->
  <section
    class="rounded-xl border border-(--ui-border) bg-(--ui-bg) p-6 sm:p-10"
  >
    <div class="text-center mb-10">
      <h2 class="text-2xl font-bold text-(--ui-text-highlighted) mb-2">
        By the numbers
      </h2>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard v-for="stat in stats" :key="stat.label">
        <div class="text-center py-2">
          <UIcon
            :name="stat.icon"
            class="size-8 text-(--ui-primary) mb-2"
            aria-hidden="true"
          />
          <p class="text-3xl font-bold text-(--ui-text-highlighted)">
            {{ stat.value }}
          </p>
          <p class="text-sm text-(--ui-text-muted)">{{ stat.label }}</p>
        </div>
      </UCard>
    </div>
  </section>

  <!-- Variant 2: Stats with trends -->
  <section
    class="rounded-xl border border-(--ui-border) bg-(--ui-bg) p-6 sm:p-10"
  >
    <div class="text-center mb-10">
      <h2 class="text-2xl font-bold text-(--ui-text-highlighted) mb-2">
        Project Health
      </h2>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard v-for="stat in detailedStats" :key="stat.label">
        <div class="space-y-1">
          <p class="text-sm text-(--ui-text-muted)">{{ stat.label }}</p>
          <p class="text-2xl font-bold text-(--ui-text-highlighted)">
            {{ stat.value }}
          </p>
          <div class="flex items-center gap-1">
            <UIcon
              :name="
                stat.trend === 'up'
                  ? 'i-lucide-trending-up'
                  : 'i-lucide-trending-down'
              "
              :class="stat.trend === 'up' ? 'text-green-500' : 'text-red-500'"
              class="size-4"
              aria-hidden="true"
            />
            <span
              class="text-xs font-medium"
              :class="stat.trend === 'up' ? 'text-green-500' : 'text-red-500'"
            >
              {{ stat.change }}
            </span>
          </div>
        </div>
      </UCard>
    </div>
  </section>
</template>
