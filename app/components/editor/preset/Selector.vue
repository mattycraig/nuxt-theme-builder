<script setup lang="ts">
import { BUILT_IN_PRESETS } from "~/utils/presets";
import { PRESET_CATEGORIES, type ThemeConfig } from "~/types/theme";

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
  // Restore selectedPresetName from the store if a preset is already active
  if (store.activePresetName) {
    const match = BUILT_IN_PRESETS.find(
      (p) => p.name === store.activePresetName,
    );
    selectedPresetName.value = match?.name ?? "";
    return;
  }

  // Only auto-load the first built-in preset on initial app load (no saved presets, no active preset)
  if (store.savedPresets.length === 0 && BUILT_IN_PRESETS.length > 0) {
    const defaultPreset = BUILT_IN_PRESETS[0]!;
    selectedPresetName.value = defaultPreset.name;
    skipNextWatch = true;
    store.loadPreset(defaultPreset);
  }
});

const presetItems = computed(() => {
  const items: Array<
    | { type: "label"; label: string }
    | { type: "separator" }
    | { label: string; value: string; config: ThemeConfig }
  > = [];

  for (const category of PRESET_CATEGORIES) {
    const presetsInCategory = BUILT_IN_PRESETS.filter(
      (p) => p.category === category,
    );
    if (presetsInCategory.length === 0) continue;

    if (items.length > 0) {
      items.push({ type: "separator" });
    }
    items.push({ type: "label", label: category });

    for (const p of presetsInCategory) {
      items.push({ label: p.name, value: p.name, config: p.config });
    }
  }

  // Uncategorized presets (e.g. user-saved presets without a category)
  const uncategorized = BUILT_IN_PRESETS.filter((p) => !p.category);
  if (uncategorized.length > 0) {
    if (items.length > 0) {
      items.push({ type: "separator" });
    }
    for (const p of uncategorized) {
      items.push({ label: p.name, value: p.name, config: p.config });
    }
  }

  return items;
});

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
    <div class="flex items-center gap-2">
      <USelectMenu
        :model-value="selectedPresetName"
        :items="presetItems"
        value-key="value"
        class="w-full"
        placeholder="Select a preset..."
        aria-label="Theme preset"
        :ui="{
          label: 'text-muted uppercase text-xs',
        }"
        @update:model-value="onPresetSelect($event as string)"
      >
        <!-- Custom dropdown items: swatches + name -->
        <template #item="{ item }">
          <div
            v-if="'config' in item"
            class="flex items-center gap-2 min-w-0 w-full py-0.5"
          >
            <EditorSwatchStrip :config="item.config" />
            <span class="text-sm truncate">{{ item.label }}</span>
          </div>
        </template>
      </USelectMenu>

      <!-- Random theme -->
      <UTooltip text="Generate random theme">
        <UButton
          icon="i-lucide-dices"
          aria-label="Generate random theme"
          variant="ghost"
          color="neutral"
          size="md"
          @click="store.randomizeTheme()"
        />
      </UTooltip>
    </div>

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
