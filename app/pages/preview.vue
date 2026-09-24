<script setup lang="ts">
// Preview shell: see PREVIEW_SHELL_PATH. The editor loads this page in its
// iframe and then navigates it to the route being previewed.
useSeoMeta({
  title: "Preview",
  robots: "noindex, nofollow",
});

onMounted(() => {
  // Opened directly rather than inside the editor: nothing will navigate it.
  if (window.self === window.top) window.location.replace("/");
});
</script>

<template>
  <div aria-busy="true" />
</template>
