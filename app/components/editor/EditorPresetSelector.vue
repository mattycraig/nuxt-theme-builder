<script setup lang="ts">
import { BUILT_IN_PRESETS } from "~/utils/presets";

const store = useThemeStore();

const selectedPresetName = ref<string>("");
let skipNextWatch = false;

onMounted(() => {
  if (store.savedPresets.length === 0 && BUILT_IN_PRESETS.length > 0) {
    const defaultPreset = BUILT_IN_PRESETS[0]!;
    selectedPresetName.value = defaultPreset.name;
    skipNextWatch = true;
    store.loadPreset(defaultPreset);
  }
});

const presetItems = computed(() =>
  BUILT_IN_PRESETS.map((p) => ({
    label: p.name,
    value: p.name,
    config: p.config,
  })),
);

const selectedPreset = computed(() =>
  BUILT_IN_PRESETS.find((p) => p.name === selectedPresetName.value),
);

// Sync selectedPresetName when config changes externally (manual edits, saved theme load)
watchDebounced(
  () => store.config,
  () => {
    if (skipNextWatch) {
      skipNextWatch = false;
      return;
    }
    const match = BUILT_IN_PRESETS.find(
      (p) => p.name === store.activePresetName,
    );
    selectedPresetName.value = match?.name ?? "";
  },
  { deep: true, debounce: 300 },
);

function onPresetSelect(name: string) {
  selectedPresetName.value = name;
  skipNextWatch = true;
  const preset = BUILT_IN_PRESETS.find((p) => p.name === name);
  if (preset) {
    store.loadPreset(preset);
  }
}
</script>

<template>
  <div class="space-y-2">
    <USelectMenu
      :model-value="selectedPresetName"
      :items="presetItems"
      value-key="value"
      class="w-full"
      placeholder="Select a preset..."
      @update:model-value="onPresetSelect($event as string)"
    >
      <!-- Custom dropdown items: swatches + name -->
      <template #item="{ item }">
        <div class="flex items-center gap-2 min-w-0 w-full py-0.5">
          <EditorSwatchStrip :config="item.config" />
          <span class="text-sm truncate">{{ item.label }}</span>
        </div>
      </template>
    </USelectMenu>

    <!-- Selected preset swatch preview below (only when preset selected and no saved theme active) -->
    <div v-if="selectedPreset" class="flex items-center gap-2 px-1">
      <EditorSwatchStrip :config="selectedPreset.config" />
      <span class="text-xs font-semibold">{{ selectedPreset.name }}</span>
    </div>
  </div>
</template>
