<script setup lang="ts">
import { useSaveThemeModal } from "~/composables/useThemeExport";

defineProps<{
  collapsed?: boolean;
  allExpanded?: boolean;
}>();

const emit = defineEmits<{
  "toggle-sections": [];
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
    :class="
      collapsed
        ? 'flex flex-col items-center gap-1 py-2'
        : 'flex items-center gap-1 px-4 min-h-[49px] sticky top-0 z-10 bg-(--ui-bg) border-b border-(--ui-border)'
    "
  >
    <!-- Save button: quick-save if active+modified, otherwise save-as -->
    <UTooltip v-if="!collapsed" :text="saveTooltipText">
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
          class="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-(--ui-color-warning-500) animate-pulse"
          aria-hidden="true"
        />
      </span>
    </UTooltip>

    <!-- Save as... (only when editing a saved preset, otherwise save button already opens save-as) -->
    <UTooltip v-if="!collapsed && isSavedPreset" text="Save as new theme...">
      <UButton
        icon="i-lucide-file-plus"
        aria-label="Save as new theme"
        variant="ghost"
        color="neutral"
        size="sm"
        @click="openSaveAs()"
      />
    </UTooltip>

    <!-- Collapsed mode: single save button -->
    <UTooltip
      v-if="collapsed"
      :text="saveTooltipText"
      :content="{ side: 'right' }"
    >
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
          class="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-(--ui-color-warning-500) animate-pulse"
          aria-hidden="true"
        />
      </span>
    </UTooltip>

    <USeparator
      :orientation="collapsed ? 'horizontal' : 'vertical'"
      :class="collapsed ? 'w-6 my-1' : 'h-4 mx-0.5'"
    />

    <!-- Undo -->
    <UTooltip text="Undo" :content="collapsed ? { side: 'right' } : undefined">
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
    <UTooltip text="Redo" :content="collapsed ? { side: 'right' } : undefined">
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

    <USeparator
      :orientation="collapsed ? 'horizontal' : 'vertical'"
      :class="collapsed ? 'w-6 my-1' : 'h-4 mx-0.5'"
    />

    <!-- Reset -->
    <UTooltip
      text="Reset to defaults"
      :content="collapsed ? { side: 'right' } : undefined"
    >
      <UButton
        icon="i-lucide-rotate-ccw"
        aria-label="Reset to defaults"
        color="error"
        variant="ghost"
        size="sm"
        @click="store.resetToDefaults()"
      />
    </UTooltip>

    <!-- Collapse/Expand -->
    <UTooltip
      v-if="!collapsed"
      :text="allExpanded ? 'Collapse all sections' : 'Expand all sections'"
      :content="collapsed ? { side: 'right' } : undefined"
    >
      <UButton
        :icon="
          allExpanded
            ? 'i-lucide-chevrons-up-down'
            : 'i-lucide-chevrons-down-up'
        "
        :aria-label="
          allExpanded ? 'Collapse all sections' : 'Expand all sections'
        "
        variant="ghost"
        color="neutral"
        size="sm"
        class="ml-auto"
        @click="emit('toggle-sections')"
      />
    </UTooltip>
  </div>
</template>
