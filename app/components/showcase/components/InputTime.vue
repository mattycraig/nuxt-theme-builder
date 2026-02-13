<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Time Input"
      description="Time selection with hour and minute."
    >
      <UFormField label="Meeting Time">
        <UInputTime v-model="time" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Placeholder"
      description="Time input showing a helper placeholder."
      :prop-hints="['placeholder']"
    >
      <UFormField label="Reminder">
        <UInputTime v-model="reminder" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Disabled"
      description="Non-interactive time input."
      :prop-hints="['disabled']"
    >
      <UFormField label="Locked time">
        <UInputTime disabled />
      </UFormField>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const time = ref();
const reminder = ref();
</script>
