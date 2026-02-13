<script setup lang="ts">
const colors = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "neutral",
] as const;
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Checkbox"
      description="Standard checkbox with label."
    >
      <UCheckbox label="Accept terms and conditions" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Colors"
      description="Checkboxes using semantic color roles."
      :prop-hints="['color']"
    >
      <div class="space-y-2">
        <UCheckbox
          v-for="color in colors"
          :key="color"
          :color="color"
          :label="color.charAt(0).toUpperCase() + color.slice(1)"
          :default-value="true"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Disabled & Required"
      description="Non-interactive and mandatory states."
      :prop-hints="['disabled', 'required']"
    >
      <div class="space-y-2">
        <UCheckbox label="Enabled checkbox" />
        <UCheckbox label="Disabled unchecked" disabled />
        <UCheckbox label="Disabled checked" disabled :default-value="true" />
        <UCheckbox label="Required field" required />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Description"
      description="Checkbox with additional helper text."
      :prop-hints="['description']"
    >
      <UCheckbox
        label="Email notifications"
        description="Receive email updates about new features and announcements."
      />
    </ShowcaseSpecimen>
  </div>
</template>
