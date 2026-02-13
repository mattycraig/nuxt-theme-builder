<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Command Palette"
      description="Searchable command palette with groups."
      :prop-hints="['groups']"
    >
      <div class="max-w-lg border border-(--ui-border) rounded-lg">
        <UCommandPalette
          :groups="groups"
          placeholder="Type a command or search..."
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Icons"
      description="Command items displaying leading icons."
    >
      <div class="max-w-lg border border-(--ui-border) rounded-lg">
        <UCommandPalette :groups="iconGroups" placeholder="Search actions..." />
      </div>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const groups = [
  {
    id: "actions",
    label: "Actions",
    items: [
      { id: "new-file", label: "Create new file" },
      { id: "new-folder", label: "Create new folder" },
      { id: "save", label: "Save changes" },
    ],
  },
  {
    id: "navigation",
    label: "Navigation",
    items: [
      { id: "home", label: "Go to Home" },
      { id: "settings", label: "Go to Settings" },
      { id: "docs", label: "Open Documentation" },
    ],
  },
];

const iconGroups = [
  {
    id: "quick-actions",
    label: "Quick Actions",
    items: [
      { id: "new-project", label: "New Project", icon: "i-lucide-plus" },
      { id: "search", label: "Search Files", icon: "i-lucide-search" },
      { id: "terminal", label: "Open Terminal", icon: "i-lucide-terminal" },
      { id: "git", label: "Git Status", icon: "i-lucide-git-branch" },
    ],
  },
];
</script>
