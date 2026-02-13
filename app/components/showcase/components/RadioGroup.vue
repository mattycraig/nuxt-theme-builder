<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Radio Group"
      description="Single selection from a list of options."
      :prop-hints="['items']"
    >
      <URadioGroup :items="plans" :default-value="'starter'" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Colors"
      description="Radio group using semantic color roles."
      :prop-hints="['color']"
    >
      <div class="space-y-3">
        <div
          v-for="color in [
            'primary',
            'success',
            'warning',
            'error',
            'neutral',
          ] as const"
          :key="color"
        >
          <p class="text-xs text-(--ui-text-muted) mb-1">{{ color }}</p>
          <URadioGroup
            :color="color"
            :items="['Option A', 'Option B', 'Option C']"
            :default-value="'Option A'"
          />
        </div>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Disabled"
      description="Non-interactive radio group."
      :prop-hints="['disabled']"
    >
      <URadioGroup
        disabled
        :items="['Read', 'Write', 'Admin']"
        :default-value="'Read'"
      />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Descriptions"
      description="Radio items with supplementary info."
    >
      <URadioGroup :items="detailedPlans" :default-value="'pro'" />
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const plans = [
  { label: "Starter", value: "starter" },
  { label: "Pro", value: "pro" },
  { label: "Enterprise", value: "enterprise" },
];

const detailedPlans = [
  {
    label: "Free",
    value: "free",
    description: "Up to 3 projects, 1 GB storage",
  },
  {
    label: "Pro",
    value: "pro",
    description: "Unlimited projects, 100 GB storage",
  },
  {
    label: "Team",
    value: "team",
    description: "Everything in Pro + team collaboration",
  },
];
</script>
