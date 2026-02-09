<script setup lang="ts">
const components = [
  {
    title: "Buttons",
    description:
      "Solid, outline, soft, and ghost button variants in every semantic color and size.",
    icon: "i-lucide-mouse-pointer-click",
    to: "/components/buttons",
  },
  {
    title: "Badges",
    description:
      "Inline status indicators with solid, outline, soft, and subtle styles.",
    icon: "i-lucide-tag",
    to: "/components/badges",
  },
  {
    title: "Alerts",
    description:
      "Contextual feedback messages for success, info, warning, and error states.",
    icon: "i-lucide-alert-circle",
    to: "/components/alerts",
  },
  {
    title: "Cards",
    description: "Content containers with headers, bodies, and action footers.",
    icon: "i-lucide-square",
    to: "/components/cards",
  },
  {
    title: "Inputs",
    description:
      "Text fields, selects, switches, checkboxes, sliders, and textareas.",
    icon: "i-lucide-text-cursor-input",
    to: "/components/inputs",
  },
  {
    title: "Table",
    description:
      "Data tables with column headers, row striping, and status badges.",
    icon: "i-lucide-table",
    to: "/components/table",
  },
  {
    title: "Tabs",
    description:
      "Tabbed interfaces for organizing content into switchable panels.",
    icon: "i-lucide-panel-top",
    to: "/components/tabs",
  },
  {
    title: "Accordion",
    description:
      "Collapsible content sections for FAQs and progressive disclosure.",
    icon: "i-lucide-chevrons-down-up",
    to: "/components/accordion",
  },
  {
    title: "Avatars",
    description:
      "User profile images in multiple sizes with avatar group stacking.",
    icon: "i-lucide-circle-user",
    to: "/components/avatars",
  },
  {
    title: "Progress",
    description:
      "Progress bars with semantic coloring for various completion states.",
    icon: "i-lucide-loader",
    to: "/components/progress",
  },
  {
    title: "Calendar",
    description:
      "Date picker calendar with month navigation and date selection.",
    icon: "i-lucide-calendar",
    to: "/components/calendar",
  },
  {
    title: "Navigation",
    description: "Navigation menu with icon links and active state indicators.",
    icon: "i-lucide-menu",
    to: "/components/navigation",
  },
  {
    title: "Dropdown",
    description:
      "Dropdown menus with grouped actions, icons, and keyboard shortcuts.",
    icon: "i-lucide-chevron-down",
    to: "/components/dropdown",
  },
  {
    title: "Misc",
    description:
      "Separators, keyboard shortcuts, skeleton loaders, and tooltips.",
    icon: "i-lucide-ellipsis",
    to: "/components/misc",
  },
];
</script>

<template>
  <div class="p-6 space-y-8 max-w-5xl mx-auto">
    <UPageHeader
      headline="Theme Builder"
      title="Components"
      :links="[
        {
          label: 'View All',
          icon: 'i-lucide-layout-grid',
          to: '/components/all',
          variant: 'outline',
          color: 'neutral',
        },
        {
          label: 'Back to Home',
          icon: 'i-lucide-arrow-left',
          to: '/',
          variant: 'ghost',
          color: 'neutral',
        },
      ]"
    >
      <template #description>
        Individual UI components showcasing your current theme settings.
      </template>
    </UPageHeader>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="component in components"
        :key="component.title"
        :to="component.to"
        class="block"
      >
        <UCard
          class="h-full hover:ring-2 hover:ring-(--ui-primary)/40 transition-all cursor-pointer"
        >
          <div class="flex items-start gap-3">
            <div
              class="shrink-0 size-10 rounded-lg bg-(--ui-primary)/10 flex items-center justify-center"
            >
              <UIcon
                :name="component.icon"
                class="size-5 text-(--ui-primary)"
              />
            </div>
            <div>
              <h2 class="font-semibold text-(--ui-text-highlighted) mb-1">
                {{ component.title }}
              </h2>
              <p class="text-sm text-(--ui-text-muted)">
                {{ component.description }}
              </p>
            </div>
          </div>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>
