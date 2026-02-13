<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Date Input"
      description="Standalone date input with calendar picker."
    >
      <UFormField label="Date of Birth">
        <UInputDate v-model="date" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Placeholder"
      description="Date input showing a custom placeholder."
      :prop-hints="['placeholder']"
    >
      <UFormField label="Start Date">
        <UInputDate v-model="startDate" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Disabled"
      description="Non-interactive date input."
      :prop-hints="['disabled']"
    >
      <UFormField label="Locked Date">
        <UInputDate disabled />
      </UFormField>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const date = ref();
const startDate = ref();
</script>
