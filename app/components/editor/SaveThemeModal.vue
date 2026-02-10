<script setup lang="ts">
import { useSaveThemeModal } from "~/composables/useSaveThemeModal";

const { isOpen, themeName, isOverwrite, confirm, cancel } = useSaveThemeModal();
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="Save theme"
    :description="
      isOverwrite
        ? `A theme named &quot;${themeName.trim()}&quot; already exists. Saving will overwrite it.`
        : 'Give your theme a name to save it.'
    "
    @close="cancel()"
  >
    <template #body>
      <div class="space-y-3">
        <div>
          <label
            for="save-modal-name"
            class="text-xs font-medium text-(--ui-text-muted) block mb-1.5"
          >
            Theme name
          </label>
          <UInput
            id="save-modal-name"
            v-model="themeName"
            placeholder="My theme..."
            aria-label="Theme name"
            size="lg"
            autofocus
            class="w-full"
            @keyup.enter="confirm()"
            @keyup.escape="cancel()"
          />
        </div>
        <div
          v-if="isOverwrite"
          class="text-xs text-(--ui-color-warning-500) flex items-center gap-1.5 px-2.5 py-2 rounded-md bg-(--ui-color-warning-500)/8"
          role="status"
        >
          <UIcon
            name="i-lucide-alert-triangle"
            class="size-3.5 shrink-0"
            aria-hidden="true"
          />
          <span>Will overwrite "{{ themeName.trim() }}"</span>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-2 ml-auto">
        <UButton label="Cancel" variant="ghost" @click="cancel()" />
        <UButton
          :label="isOverwrite ? 'Update' : 'Save'"
          color="primary"
          variant="solid"
          icon="i-lucide-save"
          :disabled="!themeName.trim()"
          @click="confirm()"
        />
      </div>
    </template>
  </UModal>
</template>
