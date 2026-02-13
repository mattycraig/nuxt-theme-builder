<script setup lang="ts">
const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Common Shortcuts"
      description="Keyboard shortcut badges for platform actions."
    >
      <div class="flex flex-wrap items-center gap-3">
        <span class="flex items-center gap-1"
          ><UKbd>⌘</UKbd><UKbd>C</UKbd>
          <span class="text-xs text-(--ui-text-muted) ml-1">Copy</span></span
        >
        <span class="flex items-center gap-1"
          ><UKbd>⌘</UKbd><UKbd>V</UKbd>
          <span class="text-xs text-(--ui-text-muted) ml-1">Paste</span></span
        >
        <span class="flex items-center gap-1"
          ><UKbd>⌘</UKbd><UKbd>Z</UKbd>
          <span class="text-xs text-(--ui-text-muted) ml-1">Undo</span></span
        >
        <span class="flex items-center gap-1"
          ><UKbd>⌘</UKbd><UKbd>⇧</UKbd><UKbd>Z</UKbd>
          <span class="text-xs text-(--ui-text-muted) ml-1">Redo</span></span
        >
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Single Keys"
      description="Individual key representations."
    >
      <div class="flex flex-wrap items-center gap-2">
        <UKbd
          v-for="key in ['Enter', 'Esc', 'Tab', 'Space', '⇧', '⌥', '⌃', '⌘']"
          :key="key"
          >{{ key }}</UKbd
        >
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Inline with Text"
      description="Keyboard hints inside a sentence."
    >
      <p class="text-sm text-(--ui-text-muted)">
        Press <UKbd>⌘</UKbd><UKbd>K</UKbd> to open the command palette, or
        <UKbd>Esc</UKbd> to close it.
      </p>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Sizes"
      description="Keyboard badges at different sizes."
      :prop-hints="['size']"
    >
      <div class="flex items-end gap-4">
        <span
          v-for="size in sizes"
          :key="size"
          class="flex flex-col items-center gap-2"
        >
          <UKbd :size="size">⌘</UKbd>
          <span class="text-[10px] text-(--ui-text-muted)">{{ size }}</span>
        </span>
      </div>
    </ShowcaseSpecimen>
  </div>
</template>
