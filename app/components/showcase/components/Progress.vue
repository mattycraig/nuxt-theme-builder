<script setup lang="ts">
const bars = [
  { label: "Storage Used", value: 72, color: "primary" as const },
  { label: "Upload Complete", value: 100, color: "success" as const },
  { label: "Processing", value: 45, color: "info" as const },
  { label: "Disk Warning", value: 88, color: "warning" as const },
  { label: "Errors", value: 15, color: "error" as const },
];
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Semantic Colors"
      description="Progress bars using each semantic color to indicate status."
      :prop-hints="['color', 'value', 'max']"
    >
      <div class="space-y-4">
        <div v-for="bar in bars" :key="bar.label">
          <div class="flex justify-between mb-1">
            <span class="text-sm font-medium">{{ bar.label }}</span>
            <span class="text-sm text-(--ui-text-muted)">{{ bar.value }}%</span>
          </div>
          <UProgress :value="bar.value" :max="100" :color="bar.color" />
        </div>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Indeterminate"
      description="Progress bar without a known value, indicating loading."
      :prop-hints="['value=null']"
    >
      <UProgress color="primary" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Sizes"
      description="Progress bar at various thickness levels."
      :prop-hints="['size']"
    >
      <div class="space-y-4">
        <div>
          <p class="text-xs text-(--ui-text-muted) mb-1">xs</p>
          <UProgress :value="60" size="xs" />
        </div>
        <div>
          <p class="text-xs text-(--ui-text-muted) mb-1">sm</p>
          <UProgress :value="60" size="sm" />
        </div>
        <div>
          <p class="text-xs text-(--ui-text-muted) mb-1">md</p>
          <UProgress :value="60" size="md" />
        </div>
        <div>
          <p class="text-xs text-(--ui-text-muted) mb-1">lg</p>
          <UProgress :value="60" size="lg" />
        </div>
        <div>
          <p class="text-xs text-(--ui-text-muted) mb-1">xl</p>
          <UProgress :value="60" size="xl" />
        </div>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Dashboard Metric"
      description="Progress bar in a real-world context showing plan usage."
    >
      <div
        class="flex items-center gap-4 p-3 rounded-lg border border-(--ui-border)"
      >
        <UIcon
          name="i-lucide-hard-drive"
          class="size-5 text-(--ui-text-muted)"
        />
        <div class="flex-1 min-w-0">
          <div class="flex justify-between mb-1">
            <span class="text-sm font-medium">Storage</span>
            <span class="text-xs text-(--ui-text-muted)">7.2 GB / 10 GB</span>
          </div>
          <UProgress :value="72" color="primary" size="sm" />
        </div>
      </div>
    </ShowcaseSpecimen>
  </div>
</template>
