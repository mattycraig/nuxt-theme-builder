<script setup lang="ts">
const colors = ["primary", "success", "warning", "error"] as const;

const countries = ["United States", "United Kingdom", "Canada", "Australia"];
const roles = [
  { value: "admin", label: "Administrator" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Basic Select"
      description="Standard dropdown select from a list of string options."
      :prop-hints="['items']"
    >
      <UFormField label="Country">
        <USelect :items="countries" placeholder="Select a country" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Object Items"
      description="Select using value/label object items."
    >
      <UFormField label="Role">
        <USelect :items="roles" placeholder="Choose a role" />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Colors"
      description="Select with semantic highlight color."
      :prop-hints="['color']"
    >
      <div class="grid grid-cols-2 gap-3 max-w-md">
        <USelect
          v-for="color in colors"
          :key="color"
          :color="color"
          :items="['Option 1', 'Option 2']"
          :placeholder="color"
          :aria-label="`Select option — ${color} color variant`"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Disabled"
      description="Non-interactive select."
      :prop-hints="['disabled']"
    >
      <UFormField label="Locked">
        <USelect
          :items="['Locked option']"
          disabled
          placeholder="Not available"
        />
      </UFormField>
    </ShowcaseSpecimen>
  </div>
</template>
