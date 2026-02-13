<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Number Input"
      description="Numeric input with increment/decrement controls."
    >
      <UFormField label="Quantity">
        <UInputNumber v-model="quantity" :min="0" :max="100" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Step Value"
      description="Number input incrementing by a custom step."
      :prop-hints="['step']"
    >
      <UFormField label="Price ($)">
        <UInputNumber v-model="price" :step="0.5" :min="0" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Min & Max"
      description="Bounded numeric range."
      :prop-hints="['min', 'max']"
    >
      <UFormField label="Rating (1–5)">
        <UInputNumber v-model="rating" :min="1" :max="5" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Disabled"
      description="Non-interactive number input."
      :prop-hints="['disabled']"
    >
      <UFormField label="Locked value">
        <UInputNumber :model-value="42" disabled />
      </UFormField>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const quantity = ref(1);
const price = ref(9.99);
const rating = ref(3);
</script>
