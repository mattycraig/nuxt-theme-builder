<template>
  <section>
    <h2 class="text-lg font-semibold mb-4">Dropdown Menu</h2>

    <div class="flex gap-4">
      <UDropdownMenu :items="items">
        <UButton
          label="Actions"
          icon="i-lucide-chevron-down"
          color="primary"
          variant="outline"
        />
      </UDropdownMenu>

      <UDropdownMenu :items="userMenuItems">
        <UButton
          label="Account"
          icon="i-lucide-user"
          color="neutral"
          variant="soft"
        />
      </UDropdownMenu>
    </div>
  </section>
</template>

<script setup lang="ts">
const items = [
  [
    { label: "Edit", icon: "i-lucide-pencil" },
    { label: "Duplicate", icon: "i-lucide-copy" },
  ],
  [
    { label: "Archive", icon: "i-lucide-archive" },
    { label: "Move", icon: "i-lucide-folder-input" },
  ],
  [{ label: "Delete", icon: "i-lucide-trash-2" }],
];

const userMenuItems = [
  [
    { label: "Profile", icon: "i-lucide-user" },
    { label: "Settings", icon: "i-lucide-settings" },
  ],
  [
    { label: "Help", icon: "i-lucide-circle-help" },
    { label: "Keyboard shortcuts", icon: "i-lucide-keyboard" },
  ],
  [{ label: "Sign out", icon: "i-lucide-log-out" }],
];
</script>
