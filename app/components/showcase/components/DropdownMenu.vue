<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Actions Menu"
      description="Dropdown with grouped action items and separators."
    >
      <UDropdownMenu :items="actionItems">
        <UButton
          label="Actions"
          icon="i-lucide-chevron-down"
          color="primary"
          variant="outline"
        />
      </UDropdownMenu>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Account Menu"
      description="User account dropdown with profile, settings, and sign-out."
    >
      <UDropdownMenu :items="userMenuItems">
        <UButton
          label="Account"
          icon="i-lucide-user"
          color="neutral"
          variant="soft"
        />
      </UDropdownMenu>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Contextual Menu"
      description="Right-click style dropdown with edit, view, and delete groups."
    >
      <UDropdownMenu :items="contextItems">
        <UButton
          icon="i-lucide-more-vertical"
          color="neutral"
          variant="ghost"
          aria-label="More options"
        />
      </UDropdownMenu>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Multiple Triggers"
      description="Several dropdown buttons in a toolbar layout."
    >
      <div class="flex gap-2">
        <UDropdownMenu
          :items="[
            [
              { label: 'Sort A-Z' },
              { label: 'Sort Z-A' },
              { label: 'Sort by Date' },
            ],
          ]"
        >
          <UButton
            label="Sort"
            icon="i-lucide-arrow-up-down"
            color="neutral"
            variant="outline"
            size="sm"
          />
        </UDropdownMenu>
        <UDropdownMenu
          :items="[
            [
              { label: 'List View' },
              { label: 'Grid View' },
              { label: 'Board View' },
            ],
          ]"
        >
          <UButton
            label="View"
            icon="i-lucide-layout-grid"
            color="neutral"
            variant="outline"
            size="sm"
          />
        </UDropdownMenu>
        <UDropdownMenu
          :items="[
            [
              { label: 'Export CSV' },
              { label: 'Export JSON' },
              { label: 'Print' },
            ],
          ]"
        >
          <UButton
            label="Export"
            icon="i-lucide-download"
            color="neutral"
            variant="outline"
            size="sm"
          />
        </UDropdownMenu>
      </div>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const actionItems = [
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

const contextItems = [
  [
    { label: "View Details", icon: "i-lucide-eye" },
    { label: "Edit", icon: "i-lucide-pencil" },
  ],
  [
    { label: "Share", icon: "i-lucide-share-2" },
    { label: "Copy Link", icon: "i-lucide-link" },
  ],
  [{ label: "Delete", icon: "i-lucide-trash-2" }],
];
</script>
