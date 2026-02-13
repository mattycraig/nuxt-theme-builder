<template>
  <section>
    <h2 class="text-lg font-semibold mb-4">Progress</h2>

    <div class="space-y-4">
      <div v-for="bar in bars" :key="bar.label">
        <div class="flex justify-between mb-1">
          <span class="text-sm font-medium">{{ bar.label }}</span>
          <span class="text-sm text-(--ui-text-muted)">{{ bar.value }}%</span>
        </div>
        <UProgress
          :value="bar.value"
          :max="100"
          :color="bar.color"
          :get-value-label="
            (_value: number | null | undefined, max: number) =>
              `${bar.label}: ${bar.value} of ${max}`
          "
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const bars = [
  { label: "Storage Used", value: 72, color: "primary" as const },
  { label: "Upload Complete", value: 100, color: "success" as const },
  { label: "Processing", value: 45, color: "info" as const },
  { label: "Disk Warning", value: 88, color: "warning" as const },
  { label: "Errors", value: 15, color: "error" as const },
];
</script>
