<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Context Menu"
      description="Right-click to reveal a contextual action menu."
      :prop-hints="['items']"
    >
      <UContextMenu :items="items">
        <div
          class="flex items-center justify-center h-32 rounded-lg border-2 border-dashed border-(--ui-border) text-sm text-(--ui-text-muted)"
        >
          Right-click here
        </div>
      </UContextMenu>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Icons & Shortcuts"
      description="Context menu items displaying icons and keyboard shortcuts."
    >
      <UContextMenu :items="richItems">
        <div
          class="flex items-center justify-center h-32 rounded-lg border-2 border-dashed border-(--ui-border) text-sm text-(--ui-text-muted)"
        >
          Right-click for editing options
        </div>
      </UContextMenu>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const items = [
  [
    { label: "Copy", icon: "i-lucide-copy" },
    { label: "Paste", icon: "i-lucide-clipboard" },
  ],
  [{ label: "Delete", icon: "i-lucide-trash", color: "error" as const }],
];

const richItems = [
  [
    { label: "Cut", icon: "i-lucide-scissors", kbds: ["⌘", "X"] },
    { label: "Copy", icon: "i-lucide-copy", kbds: ["⌘", "C"] },
    { label: "Paste", icon: "i-lucide-clipboard", kbds: ["⌘", "V"] },
  ],
  [{ label: "Select All", icon: "i-lucide-check-square", kbds: ["⌘", "A"] }],
  [{ label: "Delete", icon: "i-lucide-trash", color: "error" as const }],
];
</script>
