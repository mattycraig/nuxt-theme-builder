<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Slider"
      description="Standard range slider."
    >
      <UFormField label="Volume">
        <USlider v-model="volume" />
      </UFormField>
      <p class="text-xs text-(--ui-text-muted) mt-1">Value: {{ volume }}</p>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Min, Max & Step"
      description="Slider with custom range and step increments."
      :prop-hints="['min', 'max', 'step']"
    >
      <UFormField label="Temperature (°C)">
        <USlider v-model="temp" :min="16" :max="30" :step="0.5" />
      </UFormField>
      <p class="text-xs text-(--ui-text-muted) mt-1">{{ temp }}°C</p>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Colors"
      description="Sliders using semantic color roles."
      :prop-hints="['color']"
    >
      <div class="space-y-4">
        <USlider
          v-for="color in [
            'primary',
            'success',
            'warning',
            'error',
            'neutral',
          ] as const"
          :key="color"
          :color="color"
          :default-value="[60]"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Disabled"
      description="Non-interactive slider."
      :prop-hints="['disabled']"
    >
      <USlider :default-value="[40]" disabled />
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const volume = ref([50]);
const temp = ref([22]);
</script>
