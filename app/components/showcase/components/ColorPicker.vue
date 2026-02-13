<script setup lang="ts">
import { ref } from "vue";

const sizes = ["sm", "md", "lg"] as const;
const color = ref("#3b82f6");
const swatchColor = ref("#6366f1");
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Color Picker"
      description="Freeform color selection input."
    >
      <UColorPicker v-model="color" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Swatch"
      description="Color picker with preset swatches for quick selection."
    >
      <div class="space-y-2">
        <p class="text-xs text-(--ui-text-muted)">
          Selected: <code>{{ swatchColor }}</code>
        </p>
        <UColorPicker v-model="swatchColor" />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Sizes"
      description="Color picker at different sizes."
      :prop-hints="['size']"
    >
      <div class="flex flex-wrap items-start gap-6">
        <div v-for="size in sizes" :key="size" class="space-y-1">
          <p class="text-xs text-(--ui-text-muted)">{{ size }}</p>
          <UColorPicker :size="size" default-value="#6366f1" />
        </div>
      </div>
    </ShowcaseSpecimen>
  </div>
</template>
