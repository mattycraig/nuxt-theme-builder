<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Tags Input"
      description="Add multiple text tags by pressing Enter."
    >
      <UFormField label="Tags">
        <UInputTags v-model="tags" placeholder="Add a tag..." />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Pre-filled"
      description="Tags input with initial values."
    >
      <UFormField label="Skills">
        <UInputTags v-model="skills" placeholder="Add more..." />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Disabled"
      description="Non-interactive tags input."
      :prop-hints="['disabled']"
    >
      <UFormField label="Locked tags">
        <UInputTags :model-value="['readonly', 'locked']" disabled />
      </UFormField>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const tags = ref<string[]>([]);
const skills = ref(["Vue", "TypeScript", "Nuxt"]);
</script>
