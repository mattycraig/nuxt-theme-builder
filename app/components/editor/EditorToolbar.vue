<script setup lang="ts">
import { useSaveThemeModal } from "~/composables/useSaveThemeModal";

defineProps<{
  jsonMode?: boolean;
}>();

const emit = defineEmits<{
  "toggle-json-mode": [];
}>();

const store = useThemeStore();
const { openSaveAs, quickSave } = useSaveThemeModal();

const isSavedPreset = computed(() =>
  store.activePresetName
    ? store.savedPresets.some((p) => p.name === store.activePresetName)
    : false,
);

function handleSaveClick() {
  if (isSavedPreset.value && store.hasUnsavedChanges) {
    quickSave();
  } else if (isSavedPreset.value && !store.hasUnsavedChanges) {
    return;
  } else {
    openSaveAs();
  }
}

const saveTooltipText = computed(() => {
  if (isSavedPreset.value && store.hasUnsavedChanges) {
    return `Save "${store.activePresetName}"`;
  }
  if (isSavedPreset.value) {
    return `"${store.activePresetName}" is up to date`;
  }
  return "Save as new theme";
});
</script>

<template>
  <div
    class="flex items-center gap-1 px-4 min-h-[64px] sticky top-0 z-20 bg-(--ui-bg) border-b border-(--ui-border)"
  >
    <!-- Save button: quick-save if active+modified, otherwise save-as -->
    <UTooltip :text="saveTooltipText">
      <span class="relative inline-flex">
        <UButton
          icon="i-lucide-save"
          :aria-label="saveTooltipText"
          variant="ghost"
          size="sm"
          @click="handleSaveClick"
        />
        <span
          v-if="store.hasUnsavedChanges && store.activePresetName"
          class="absolute top-0 right-0 size-2 rounded-full bg-(--ui-color-warning-500) animate-pulse"
          aria-hidden="true"
        />
      </span>
    </UTooltip>

    <!-- Save as... (only when editing a saved preset, otherwise save button already opens save-as) -->
    <UTooltip v-if="isSavedPreset" text="Save as new theme...">
      <UButton
        icon="i-lucide-file-plus"
        aria-label="Save as new theme"
        variant="ghost"
        color="neutral"
        size="sm"
        @click="openSaveAs()"
      />
    </UTooltip>

    <USeparator orientation="vertical" class="h-full mx-2" />

    <!-- Undo -->
    <UTooltip text="Undo">
      <UButton
        icon="i-lucide-undo-2"
        aria-label="Undo"
        variant="ghost"
        color="neutral"
        size="sm"
        :disabled="!store.canUndo"
        @click="store.undo()"
      />
    </UTooltip>

    <!-- Redo -->
    <UTooltip text="Redo">
      <UButton
        icon="i-lucide-redo-2"
        aria-label="Redo"
        variant="ghost"
        color="neutral"
        size="sm"
        :disabled="!store.canRedo"
        @click="store.redo()"
      />
    </UTooltip>

    <!-- Undo All -->
    <UTooltip text="Undo all changes">
      <UButton
        icon="i-lucide-undo-dot"
        aria-label="Undo all changes"
        variant="ghost"
        color="neutral"
        size="sm"
        :disabled="!store.canUndoAll"
        @click="store.undoAll()"
      />
    </UTooltip>

    <USeparator orientation="vertical" class="h-full mx-2" />

    <!-- Reset -->
    <UTooltip text="Reset to defaults">
      <UButton
        icon="i-lucide-rotate-ccw"
        aria-label="Reset to defaults"
        color="error"
        variant="ghost"
        size="sm"
        @click="store.resetToDefaults()"
      />
    </UTooltip>

    <!-- JSON / Visual mode toggle -->
    <UTooltip
      :text="jsonMode ? 'Switch to visual editor' : 'Switch to JSON editor'"
    >
      <UButton
        :icon="jsonMode ? 'i-lucide-sliders-horizontal' : 'i-lucide-braces'"
        :aria-label="
          jsonMode ? 'Switch to visual editor' : 'Switch to JSON editor'
        "
        :variant="jsonMode ? 'soft' : 'ghost'"
        :color="jsonMode ? 'primary' : 'neutral'"
        size="sm"
        class="ml-auto"
        @click="emit('toggle-json-mode')"
      />
    </UTooltip>
  </div>
</template>
