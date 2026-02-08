<script setup lang="ts">
defineProps<{
  collapsed?: boolean;
  allExpanded?: boolean;
}>();

const emit = defineEmits<{
  "toggle-sections": [];
}>();

const store = useThemeStore();
const toast = useToast();

const saveModalOpen = ref(false);
const saveModalName = ref("");

const isOverwrite = computed(() => {
  const name = saveModalName.value.trim();
  return name ? store.savedPresets.some((p) => p.name === name) : false;
});

function handleSaveClick() {
  if (store.activePresetName && store.hasUnsavedChanges) {
    store.savePreset(store.activePresetName);
    toast.add({
      title: "Theme updated",
      description: `"${store.activePresetName}" saved`,
      icon: "i-lucide-check",
      color: "success",
    });
  } else if (store.activePresetName && !store.hasUnsavedChanges) {
    openSaveAsNew();
  } else {
    openSaveAsNew();
  }
}

function openSaveAsNew() {
  saveModalName.value = "";
  saveModalOpen.value = true;
}

function openSaveAsNewFromActive() {
  saveModalName.value = "";
  saveModalOpen.value = true;
}

function confirmSaveModal() {
  const name = saveModalName.value.trim();
  if (!name) return;
  const { isUpdate } = store.savePreset(name);
  saveModalOpen.value = false;
  saveModalName.value = "";
  const action = isUpdate ? "updated" : "saved";
  toast.add({
    title: `Theme ${action}`,
    description: `"${name}" ${action} successfully`,
    icon: "i-lucide-check",
    color: "success",
  });
}

function cancelSaveModal() {
  saveModalOpen.value = false;
  saveModalName.value = "";
}

const saveTooltipText = computed(() => {
  if (store.activePresetName && store.hasUnsavedChanges) {
    return `Save "${store.activePresetName}"`;
  }
  if (store.activePresetName) {
    return "Save as new theme";
  }
  return "Save theme";
});

defineExpose({ openSaveAsNew });
</script>

<template>
  <div
    :class="
      collapsed
        ? 'flex flex-col items-center gap-1 py-2'
        : 'flex items-center gap-1 px-4 min-h-[49px] sticky top-0 z-10 bg-(--ui-bg) border-b border-(--ui-border)'
    "
  >
    <!-- Save: split button via UFieldGroup -->
    <UFieldGroup v-if="!collapsed" size="sm">
      <UTooltip :text="saveTooltipText">
        <span class="relative inline-flex">
          <UButton
            icon="i-lucide-save"
            :aria-label="saveTooltipText"
            variant="ghost"
            @click="handleSaveClick"
          />
          <span
            v-if="store.hasUnsavedChanges"
            class="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-(--ui-color-warning-500) animate-pulse"
            aria-hidden="true"
          />
        </span>
      </UTooltip>
      <UDropdownMenu
        v-if="store.activePresetName"
        :items="[
          [
            {
              label: 'Save as new theme...',
              icon: 'i-lucide-file-plus',
              onSelect: openSaveAsNewFromActive,
            },
          ],
        ]"
      >
        <UButton
          icon="i-lucide-chevron-down"
          aria-label="More save options"
          variant="ghost"
          color="neutral"
        />
      </UDropdownMenu>
    </UFieldGroup>
    <!-- Collapsed mode: single save button -->
    <UTooltip v-else :text="saveTooltipText" :content="{ side: 'right' }">
      <span class="relative inline-flex">
        <UButton
          icon="i-lucide-save"
          :aria-label="saveTooltipText"
          variant="ghost"
          size="sm"
          @click="handleSaveClick"
        />
        <span
          v-if="store.hasUnsavedChanges"
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

    <!-- Save modal -->
    <UModal
      :open="saveModalOpen"
      title="Save theme"
      :description="
        isOverwrite
          ? `A theme named &quot;${saveModalName.trim()}&quot; already exists. Saving will overwrite it.`
          : 'Give your theme a name to save it.'
      "
      @close="cancelSaveModal"
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
              v-model="saveModalName"
              placeholder="My theme..."
              aria-label="Theme name"
              size="lg"
              autofocus
              class="w-full"
              @keyup.enter="confirmSaveModal"
              @keyup.escape="cancelSaveModal"
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
            <span>Will overwrite "{{ saveModalName.trim() }}"</span>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex gap-2 ml-auto">
          <UButton label="Cancel" variant="ghost" @click="cancelSaveModal" />
          <UButton
            :label="isOverwrite ? 'Update' : 'Save'"
            color="primary"
            variant="solid"
            icon="i-lucide-save"
            :disabled="!saveModalName.trim()"
            @click="confirmSaveModal"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>
