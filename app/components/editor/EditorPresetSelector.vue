<script setup lang="ts">
import { BUILT_IN_PRESETS } from "~/utils/presets";

const store = useThemeStore();

const selectedPresetName = ref<string>("");

const presetItems = computed(() =>
  BUILT_IN_PRESETS.map((p) => ({
    label: p.name,
    value: p.name,
  })),
);

watchDebounced(
  () => store.config,
  () => {
    const currentJSON = JSON.stringify(store.config);
    const match = BUILT_IN_PRESETS.find(
      (p) => JSON.stringify(p.config) === currentJSON,
    );
    selectedPresetName.value = match?.name ?? "";
  },
  { deep: true, debounce: 300 },
);

function onPresetSelect(name: string) {
  selectedPresetName.value = name;
  const preset = BUILT_IN_PRESETS.find((p) => p.name === name);
  if (preset) {
    store.loadPreset(preset);
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

    <!-- Color swatch preview of selected preset -->
    <div v-if="selectedPresetName" class="flex items-center gap-2 px-1">
      <EditorPresetSwatches
        :config="
          BUILT_IN_PRESETS.find((p) => p.name === selectedPresetName)!.config
        "
        size="md"
      />
      <span class="text-xs text-(--ui-text-muted)">{{
        selectedPresetName
      }}</span>
    </div>
  </div>
</template>
