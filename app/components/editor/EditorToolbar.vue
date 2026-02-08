<script setup lang="ts">
defineProps<{
  collapsed?: boolean;
}>();

const emit = defineEmits<{
  "expand-all": [];
  "collapse-all": [];
}>();

const store = useThemeStore();

const quickSaveOpen = ref(false);
const quickSaveName = ref("");

const matchingSavedTheme = computed(() => {
  const currentJSON = JSON.stringify(store.config);
  return store.savedPresets.find(
    (p) => JSON.stringify(p.config) === currentJSON,
  );
});

function openQuickSave() {
  quickSaveName.value = matchingSavedTheme.value?.name ?? "";
  quickSaveOpen.value = true;
}

function confirmQuickSave() {
  const name = quickSaveName.value.trim();
  if (!name) return;
  store.savePreset(name);
  quickSaveOpen.value = false;
  quickSaveName.value = "";
}

function cancelQuickSave() {
  quickSaveOpen.value = false;
  quickSaveName.value = "";
}
</script>

<template>
  <div
    :class="
      collapsed
        ? 'flex flex-col items-center gap-1 py-2'
        : 'flex items-center gap-1'
    "
  >
    <UTooltip text="Undo" :content="collapsed ? { side: 'right' } : undefined">
      <UButton
        icon="i-lucide-undo-2"
        aria-label="Undo"
        variant="ghost"
        color="neutral"
        size="xs"
        :disabled="!store.canUndo"
        @click="store.undo()"
      />
    </UTooltip>
    <UTooltip text="Redo" :content="collapsed ? { side: 'right' } : undefined">
      <UButton
        icon="i-lucide-redo-2"
        aria-label="Redo"
        variant="ghost"
        color="neutral"
        size="xs"
        :disabled="!store.canRedo"
        @click="store.redo()"
      />
    </UTooltip>
    <UTooltip
      text="Reset to defaults"
      :content="collapsed ? { side: 'right' } : undefined"
    >
      <UButton
        icon="i-lucide-rotate-ccw"
        aria-label="Reset to defaults"
        color="error"
        variant="ghost"
        size="xs"
        @click="store.resetToDefaults()"
      />
    </UTooltip>

    <USeparator
      :orientation="collapsed ? 'horizontal' : 'vertical'"
      :class="collapsed ? 'w-6' : 'h-4 mx-0.5'"
    />

    <UTooltip
      text="Expand all sections"
      :content="collapsed ? { side: 'right' } : undefined"
    >
      <UButton
        icon="i-lucide-chevrons-down-up"
        aria-label="Expand all sections"
        variant="ghost"
        color="neutral"
        size="xs"
        @click="emit('expand-all')"
      />
    </UTooltip>
    <UTooltip
      text="Collapse all sections"
      :content="collapsed ? { side: 'right' } : undefined"
    >
      <UButton
        icon="i-lucide-chevrons-up-down"
        aria-label="Collapse all sections"
        variant="ghost"
        color="neutral"
        size="xs"
        @click="emit('collapse-all')"
      />
    </UTooltip>

    <USeparator
      :orientation="collapsed ? 'horizontal' : 'vertical'"
      :class="collapsed ? 'w-6' : 'h-4 mx-0.5'"
    />

    <UPopover v-model:open="quickSaveOpen">
      <UTooltip
        text="Save theme"
        :content="collapsed ? { side: 'right' } : undefined"
      >
        <UButton
          icon="i-lucide-save"
          aria-label="Save current theme"
          variant="ghost"
          size="xs"
          @click="openQuickSave"
        />
      </UTooltip>
      <template #content>
        <div class="p-3 space-y-2 min-w-56">
          <label
            for="quick-save-name"
            class="text-xs font-medium text-(--ui-text-muted) block"
          >
            Theme name
          </label>
          <UInput
            id="quick-save-name"
            v-model="quickSaveName"
            placeholder="My theme..."
            aria-label="Theme name"
            size="xs"
            autofocus
            @keyup.enter="confirmQuickSave"
            @keyup.escape="cancelQuickSave"
          />
          <div class="flex gap-2 justify-end">
            <UButton
              label="Cancel"
              variant="ghost"
              size="xs"
              @click="cancelQuickSave"
            />
            <UButton
              :label="
                quickSaveName.trim() &&
                store.savedPresets.some((p) => p.name === quickSaveName.trim())
                  ? 'Update'
                  : 'Save'
              "
              color="primary"
              variant="solid"
              size="xs"
              :disabled="!quickSaveName.trim()"
              @click="confirmQuickSave"
            />
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>
