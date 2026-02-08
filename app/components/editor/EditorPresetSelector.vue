<script setup lang="ts">
import type { ThemePreset } from "~/types/theme";
import { BUILT_IN_PRESETS } from "~/utils/presets";

const store = useThemeStore();

const allPresets = computed<ThemePreset[]>(() => [
  ...BUILT_IN_PRESETS,
  ...store.savedPresets,
]);

const selectedPresetName = ref<string>("");
const showSaveInput = ref(false);
const saveInput = ref("");

const presetItems = computed(() =>
  allPresets.value.map((p) => ({
    label: p.builtIn ? `${p.name} (built-in)` : p.name,
    value: p.name,
  })),
);

// Sync dropdown when config changes externally (undo/redo/reset)
watchDebounced(
  () => store.config,
  () => {
    const currentJSON = JSON.stringify(store.config);
    const match = allPresets.value.find(
      (p) => JSON.stringify(p.config) === currentJSON,
    );
    selectedPresetName.value = match?.name ?? "";
  },
  { deep: true, debounce: 300 },
);

const selectedPreset = computed(() =>
  allPresets.value.find((p) => p.name === selectedPresetName.value),
);

const isCustomPreset = computed(
  () => selectedPreset.value != null && !selectedPreset.value.builtIn,
);

function onPresetSelect(name: string) {
  selectedPresetName.value = name;
  const preset = allPresets.value.find((p) => p.name === name);
  if (preset) {
    store.loadPreset(preset);
  }
}

function startSave() {
  saveInput.value = "";
  showSaveInput.value = true;
}

function confirmSave() {
  const name = saveInput.value.trim();
  if (!name) return;
  store.savePreset(name);
  selectedPresetName.value = name;
  showSaveInput.value = false;
  saveInput.value = "";
}

function cancelSave() {
  showSaveInput.value = false;
  saveInput.value = "";
}

function deleteSelected() {
  if (isCustomPreset.value && selectedPresetName.value) {
    store.deletePreset(selectedPresetName.value);
    selectedPresetName.value = "";
  }
}
</script>

<template>
  <div class="space-y-2">
    <USelect
      :model-value="selectedPresetName"
      :items="presetItems"
      class="w-full"
      placeholder="Select a preset..."
      @update:model-value="onPresetSelect($event as string)"
    />

    <div class="flex gap-2">
      <UButton
        label="Save"
        icon="i-lucide-save"
        variant="soft"
        size="xs"
        @click="startSave"
      />
      <UButton
        v-if="isCustomPreset"
        label="Delete"
        icon="i-lucide-trash-2"
        color="error"
        variant="soft"
        size="xs"
        @click="deleteSelected"
      />
    </div>

    <div v-if="showSaveInput" class="flex gap-2 items-center">
      <UInput
        v-model="saveInput"
        placeholder="Preset name..."
        aria-label="Preset name"
        size="xs"
        class="flex-1"
        @keyup.enter="confirmSave"
      />
      <UButton
        label="OK"
        color="primary"
        variant="solid"
        size="xs"
        @click="confirmSave"
      />
      <UButton label="Cancel" variant="ghost" size="xs" @click="cancelSave" />
    </div>
  </div>
</template>
