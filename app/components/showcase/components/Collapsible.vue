<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Collapsible"
      description="Toggle content visibility with a trigger button."
    >
      <UCollapsible>
        <UButton label="Toggle content" color="neutral" variant="outline" />
        <template #content>
          <div class="p-4 mt-2 rounded-md bg-(--ui-bg-elevated)">
            <p class="text-sm text-(--ui-text-muted)">
              This is the collapsible content that can be toggled on and off.
            </p>
          </div>
        </template>
      </UCollapsible>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Default Open"
      description="Collapsible that starts in the open state."
      :prop-hints="['open']"
    >
      <UCollapsible :open="true">
        <UButton
          label="Settings"
          color="neutral"
          variant="subtle"
          icon="i-lucide-settings"
        />
        <template #content>
          <div class="p-4 mt-2 rounded-md bg-(--ui-bg-elevated) space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm">Enable notifications</span>
              <USwitch />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm">Dark mode</span>
              <USwitch />
            </div>
          </div>
        </template>
      </UCollapsible>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Stacked Sections"
      description="Multiple collapsible panels for an FAQ-style layout."
    >
      <div class="space-y-2">
        <UCollapsible
          v-for="item in faqItems"
          :key="item.question"
          class="border border-(--ui-border) rounded-md px-4 py-3"
        >
          <UButton
            :label="item.question"
            color="neutral"
            variant="ghost"
            block
            class="justify-start"
          />
          <template #content>
            <p class="text-sm text-(--ui-text-muted) pt-2 pb-1 px-2">
              {{ item.answer }}
            </p>
          </template>
        </UCollapsible>
      </div>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const faqItems = [
  {
    question: "What is Nuxt UI?",
    answer:
      "A collection of fully styled and customizable components for Nuxt built on Tailwind CSS.",
  },
  {
    question: "Is it free?",
    answer: "Yes, Nuxt UI is free and open-source under the MIT license.",
  },
  {
    question: "Does it support dark mode?",
    answer:
      "Absolutely. All components support light and dark modes out of the box.",
  },
];
</script>
