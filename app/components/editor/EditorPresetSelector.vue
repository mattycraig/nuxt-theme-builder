<script setup lang="ts">
import { BUILT_IN_PRESETS } from "~/utils/presets";

const store = useThemeStore();

const helpOpen = ref(false);
const helpAnchor = ref({ x: 0, y: 0 });
const helpButtonRef = ref<HTMLButtonElement | null>(null);
const isPointerInteraction = ref(false);

const helpReference = computed(() => ({
  getBoundingClientRect: () => {
    if (isPointerInteraction.value) {
      return {
        width: 0,
        height: 0,
        left: helpAnchor.value.x,
        right: helpAnchor.value.x,
        top: helpAnchor.value.y,
        bottom: helpAnchor.value.y,
        ...helpAnchor.value,
      } as DOMRect;
    }
    return helpButtonRef.value?.getBoundingClientRect() ?? new DOMRect();
  },
}));

function onHelpPointerEnter() {
  isPointerInteraction.value = true;
  helpOpen.value = true;
}

function onHelpPointerLeave() {
  helpOpen.value = false;
  isPointerInteraction.value = false;
}

function onHelpFocus(ev: FocusEvent) {
  const el = ev.currentTarget as HTMLElement;
  if (el?.matches(":focus-visible")) {
    helpOpen.value = true;
  }
}

function onHelpBlur() {
  if (!isPointerInteraction.value) {
    helpOpen.value = false;
  }
}

function onHelpKeydown(ev: KeyboardEvent) {
  if (ev.key === "Escape" && helpOpen.value) {
    helpOpen.value = false;
    ev.stopPropagation();
  }
}

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
      <UPopover
        v-if="selectedPreset.description"
        :open="helpOpen"
        :reference="helpReference"
        :content="{
          side: 'top',
          sideOffset: 16,
          updatePositionStrategy: 'always',
        }"
      >
        <button
          ref="helpButtonRef"
          type="button"
          :aria-label="`About ${selectedPreset.name} preset`"
          class="inline-flex cursor-help rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-primary)"
          @pointerenter="onHelpPointerEnter"
          @pointerleave="onHelpPointerLeave"
          @pointermove="
            (ev: PointerEvent) => {
              helpAnchor.x = ev.clientX;
              helpAnchor.y = ev.clientY;
            }
          "
          @focus="onHelpFocus"
          @blur="onHelpBlur"
          @keydown="onHelpKeydown"
        >
          <UIcon
            name="i-lucide-circle-help"
            class="size-3.5 shrink-0 text-(--ui-text-muted)"
            aria-hidden="true"
          />
        </button>

        <template #content>
          <div class="p-2 text-xs max-w-56">
            {{ selectedPreset.description }}
          </div>
        </template>
      </UPopover>
    </div>
  </div>
</template>
