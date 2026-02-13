<script setup lang="ts">
const sides = ["top", "right", "bottom", "left"] as const;
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Tooltip"
      description="Hover-triggered informational tooltip."
      :prop-hints="['text']"
    >
      <div class="flex gap-4">
        <UTooltip text="This is a tooltip">
          <UButton label="Hover me" variant="outline" />
        </UTooltip>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Positions"
      description="Tooltip appearing at different sides."
      :prop-hints="['side']"
    >
      <div class="flex flex-wrap gap-4">
        <UTooltip
          v-for="side in sides"
          :key="side"
          :text="`Tooltip on ${side}`"
          :side="side"
        >
          <UButton :label="side" variant="subtle" />
        </UTooltip>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="On Icon Buttons"
      description="Tooltips providing labels for icon-only buttons."
    >
      <div class="flex gap-2">
        <UTooltip text="Edit">
          <UButton icon="i-lucide-edit" variant="ghost" />
        </UTooltip>
        <UTooltip text="Delete">
          <UButton icon="i-lucide-trash" variant="ghost" color="error" />
        </UTooltip>
        <UTooltip text="Share">
          <UButton icon="i-lucide-share" variant="ghost" />
        </UTooltip>
        <UTooltip text="Download">
          <UButton icon="i-lucide-download" variant="ghost" />
        </UTooltip>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Keyboard Shortcut"
      description="Tooltip showing action label plus keyboard shortcut."
      :prop-hints="['kbds']"
    >
      <UTooltip text="Save" :kbds="['⌘', 'S']">
        <UButton icon="i-lucide-save" label="Save" variant="outline" />
      </UTooltip>
    </ShowcaseSpecimen>
  </div>
</template>
