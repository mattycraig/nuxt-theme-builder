<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Tree"
      description="Hierarchical tree view with expand/collapse."
      :prop-hints="['items']"
    >
      <UTree :items="fileTree" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Icons"
      description="Tree nodes with custom icons for different types."
    >
      <UTree :items="iconTree" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Expanded by Default"
      description="Tree with all nodes initially expanded."
      :prop-hints="['expanded']"
    >
      <UTree :items="smallTree" :default-expanded="['src', 'components']" />
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const fileTree = [
  {
    label: "src",
    value: "src",
    children: [
      {
        label: "components",
        value: "components",
        children: [
          { label: "Button.vue", value: "button" },
          { label: "Input.vue", value: "input" },
          { label: "Modal.vue", value: "modal" },
        ],
      },
      {
        label: "pages",
        value: "pages",
        children: [
          { label: "index.vue", value: "index" },
          { label: "about.vue", value: "about" },
        ],
      },
      { label: "app.vue", value: "app" },
    ],
  },
  { label: "package.json", value: "package" },
  { label: "nuxt.config.ts", value: "config" },
];

const iconTree = [
  {
    label: "Documents",
    value: "docs",
    icon: "i-lucide-folder",
    children: [
      { label: "Report.pdf", value: "report", icon: "i-lucide-file-text" },
      {
        label: "Budget.xlsx",
        value: "budget",
        icon: "i-lucide-file-spreadsheet",
      },
    ],
  },
  {
    label: "Photos",
    value: "photos",
    icon: "i-lucide-folder",
    children: [
      { label: "Vacation.jpg", value: "vacation", icon: "i-lucide-image" },
      { label: "Team.png", value: "team", icon: "i-lucide-image" },
    ],
  },
];

const smallTree = [
  {
    label: "src",
    value: "src",
    children: [
      {
        label: "components",
        value: "components",
        children: [
          { label: "Header.vue", value: "header" },
          { label: "Footer.vue", value: "footer" },
        ],
      },
      { label: "main.ts", value: "main" },
    ],
  },
];
</script>
