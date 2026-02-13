<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Group"
      description="Multiple related checkboxes grouped together."
      :prop-hints="['items']"
    >
      <UCheckboxGroup
        :items="['Apple', 'Banana', 'Cherry', 'Date']"
        :default-value="['Apple', 'Cherry']"
      />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Object Items"
      description="Checkbox group using value/label objects."
    >
      <UCheckboxGroup :items="notifications" :default-value="['email']" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Colors"
      description="Group with custom color."
      :prop-hints="['color']"
    >
      <UCheckboxGroup
        color="success"
        :items="['Read', 'Write', 'Execute']"
        :default-value="['Read']"
      />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Disabled"
      description="Non-interactive checkbox group."
      :prop-hints="['disabled']"
    >
      <UCheckboxGroup
        disabled
        :items="['Option A', 'Option B', 'Option C']"
        :default-value="['Option A']"
      />
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const notifications = [
  { label: "Email notifications", value: "email" },
  { label: "Push notifications", value: "push" },
  { label: "SMS alerts", value: "sms" },
];
</script>
