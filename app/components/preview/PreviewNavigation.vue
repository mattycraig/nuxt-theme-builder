<template>
  <section>
    <h3 class="text-lg font-semibold mb-4">Navigation Menu</h3>

    <UNavigationMenu :items="items" />
  </section>
</template>

<script setup lang="ts">
const items = [
  { label: "Dashboard", icon: "i-lucide-layout-dashboard" },
  { label: "Projects", icon: "i-lucide-folder" },
  { label: "Team", icon: "i-lucide-users" },
  { label: "Analytics", icon: "i-lucide-bar-chart-3" },
  { label: "Settings", icon: "i-lucide-settings" },
];
</script>
