<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Footer Columns"
      description="Multi-column footer link layout."
      :prop-hints="['columns']"
    >
      <UFooterColumns :columns="columns" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Compact Footer"
      description="Fewer columns for simpler sites."
    >
      <UFooterColumns :columns="compactColumns" />
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const columns = [
  {
    label: "Product",
    children: [
      { label: "Features", to: "#" },
      { label: "Pricing", to: "#" },
      { label: "Changelog", to: "#" },
      { label: "Roadmap", to: "#" },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About", to: "#" },
      { label: "Blog", to: "#" },
      { label: "Careers", to: "#" },
      { label: "Press", to: "#" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Documentation", to: "#" },
      { label: "Help Center", to: "#" },
      { label: "Community", to: "#" },
      { label: "Status", to: "#" },
    ],
  },
  {
    label: "Legal",
    children: [
      { label: "Privacy", to: "#" },
      { label: "Terms", to: "#" },
      { label: "Cookies", to: "#" },
    ],
  },
];

const compactColumns = [
  {
    label: "Navigation",
    children: [
      { label: "Home", to: "#" },
      { label: "About", to: "#" },
      { label: "Contact", to: "#" },
    ],
  },
  {
    label: "Social",
    children: [
      { label: "Twitter", to: "#" },
      { label: "GitHub", to: "#" },
      { label: "Discord", to: "#" },
    ],
  },
];
</script>
