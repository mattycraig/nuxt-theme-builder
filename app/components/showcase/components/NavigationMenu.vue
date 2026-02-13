<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Horizontal Navigation"
      description="Default horizontal menu for primary navigation."
    >
      <UNavigationMenu :items="horizontalItems" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Vertical Navigation"
      description="Sidebar-style navigation with icons and labels."
      :prop-hints="['orientation=vertical']"
    >
      <div class="max-w-xs">
        <UNavigationMenu :items="verticalItems" orientation="vertical" />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Nested Children"
      description="Navigation menu with collapsible child items."
    >
      <div class="max-w-xs">
        <UNavigationMenu :items="nestedItems" orientation="vertical" />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Badges"
      description="Navigation items with trailing badges for counts or status."
    >
      <div class="max-w-xs">
        <UNavigationMenu :items="badgeItems" orientation="vertical" />
      </div>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const horizontalItems = [
  { label: "Dashboard", icon: "i-lucide-layout-dashboard" },
  { label: "Projects", icon: "i-lucide-folder" },
  { label: "Team", icon: "i-lucide-users" },
  { label: "Analytics", icon: "i-lucide-bar-chart-3" },
  { label: "Settings", icon: "i-lucide-settings" },
];

const verticalItems = [
  { label: "Home", icon: "i-lucide-home" },
  { label: "Inbox", icon: "i-lucide-inbox" },
  { label: "Documents", icon: "i-lucide-file-text" },
  { label: "Calendar", icon: "i-lucide-calendar" },
  { label: "Settings", icon: "i-lucide-settings" },
];

const nestedItems = [
  {
    label: "Products",
    icon: "i-lucide-package",
    defaultOpen: true,
    children: [
      { label: "All Products" },
      { label: "Categories" },
      { label: "Inventory" },
    ],
  },
  {
    label: "Orders",
    icon: "i-lucide-shopping-cart",
    children: [{ label: "Recent Orders" }, { label: "Returns" }],
  },
  { label: "Customers", icon: "i-lucide-users" },
];

const badgeItems = [
  { label: "Inbox", icon: "i-lucide-inbox", badge: "12" },
  { label: "Drafts", icon: "i-lucide-file-edit", badge: "3" },
  { label: "Sent", icon: "i-lucide-send" },
  { label: "Trash", icon: "i-lucide-trash-2" },
];
</script>
