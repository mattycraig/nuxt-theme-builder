<script setup lang="ts">
// "All Components" page — shows every component preview on a single page
</script>

<template>
  <div class="p-6 space-y-6 max-w-5xl mx-auto">
    <UPageHeader
      headline="Components"
      title="All Components"
      description="A live showcase of every Nuxt UI component using your current theme settings."
      :links="[
        {
          label: 'Back to Components',
          icon: 'i-lucide-arrow-left',
          to: '/components',
          variant: 'ghost',
          color: 'neutral',
        },
      ]"
    />

    <ThemePreview />
  </div>
</template>
