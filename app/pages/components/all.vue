<script setup lang="ts">
// "All Components" page — shows every component preview on a single page
</script>

<template>
  <div class="p-6 space-y-6 max-w-5xl mx-auto">
    <div>
      <NuxtLink
        to="/components"
        class="text-sm text-(--ui-primary) inline-flex items-center gap-1 mb-2 hover:underline"
      >
        <UIcon name="i-lucide-arrow-left" class="size-4" />
        Back to Components
      </NuxtLink>
      <h2 class="text-2xl font-bold mb-1">All Components</h2>
      <p class="text-sm text-(--ui-text-muted)">
        A live showcase of every Nuxt UI component using your current theme
        settings.
      </p>
    </div>

    <ThemePreview />
  </div>
</template>
