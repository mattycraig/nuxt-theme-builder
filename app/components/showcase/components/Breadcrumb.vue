<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Breadcrumb"
      description="Standard breadcrumb trail for page hierarchy."
      :prop-hints="['items']"
    >
      <UBreadcrumb :items="basicItems" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Icons"
      description="Breadcrumb items with leading icons."
    >
      <UBreadcrumb :items="iconItems" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Custom Separator"
      description="Breadcrumb with a custom separator character."
      :prop-hints="['separator']"
    >
      <UBreadcrumb :items="basicItems" separator="→" />
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const basicItems = [
  { label: "Home", to: "#" },
  { label: "Components", to: "#" },
  { label: "Breadcrumb" },
];

const iconItems = [
  { label: "Home", icon: "i-lucide-home", to: "#" },
  { label: "Settings", icon: "i-lucide-settings", to: "#" },
  { label: "Profile", icon: "i-lucide-user" },
];
</script>
