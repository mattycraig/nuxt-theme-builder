<script setup lang="ts">
const { isOpen } = useExportPanel();
</script>

<template>
  <USlideover
    v-model:open="isOpen"
    title="Export / Import"
    description="Export your theme as code or import an existing configuration."
    side="right"
  >
    <template #default>
      <!-- Hidden trigger — panel is opened programmatically -->
      <span class="hidden" />
    </template>

    <template #header="{ close }">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-3">
          <div
            class="flex items-center justify-center size-8 rounded-lg bg-(--ui-color-primary-500)/10"
          >
            <UIcon
              name="i-lucide-arrow-left-right"
              class="size-4 text-(--ui-color-primary-500)"
            />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-(--ui-text-highlighted)">
              Export / Import
            </h2>
            <p class="text-xs text-(--ui-text-muted)">
              Get your theme as code or apply an existing config
            </p>
          </div>
        </div>
        <UButton
          icon="i-lucide-x"
          aria-label="Close panel"
          variant="ghost"
          color="neutral"
          size="md"
          @click="close"
        />
      </div>
    </template>

    <template #body>
      <EditorExportPanel />
    </template>
  </USlideover>
</template>
