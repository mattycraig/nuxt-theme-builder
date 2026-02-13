<script setup lang="ts">
import { PRESET_WIDTHS, PRESET_HEIGHTS } from "~/composables/usePreviewResize";

const activeWidth = defineModel<"mobile" | "tablet" | "desktop">(
  "activeWidth",
  { required: true },
);
const customWidth = defineModel<number | null>("customWidth", {
  required: true,
});
const activeHeight = defineModel<"short" | "medium" | "auto">("activeHeight", {
  required: true,
});
const customHeight = defineModel<number | null>("customHeight", {
  required: true,
});

const props = withDefaults(
  defineProps<{
    idPrefix?: string;
  }>(),
  { idPrefix: "vp" },
);

const isOpen = ref(false);

const widthInputId = computed(() => `${props.idPrefix}-custom-width`);
const heightInputId = computed(() => `${props.idPrefix}-custom-height`);

const currentWidthLabel = computed(() => {
  if (customWidth.value !== null) return `${customWidth.value}px`;
  return PRESET_WIDTHS.find((o) => o.value === activeWidth.value)!.width;
});

const currentHeightLabel = computed(() => {
  if (customHeight.value !== null) return `${customHeight.value}px`;
  const preset = PRESET_HEIGHTS.find((o) => o.value === activeHeight.value)!;
  return preset.value === "auto" ? "auto" : preset.height;
});

const dimensionLabel = computed(
  () => `${currentWidthLabel.value} × ${currentHeightLabel.value}`,
);

const isDefault = computed(
  () =>
    activeWidth.value === "desktop" &&
    customWidth.value === null &&
    activeHeight.value === "auto" &&
    customHeight.value === null,
);

function resetAll() {
  activeWidth.value = "desktop";
  customWidth.value = null;
  activeHeight.value = "auto";
  customHeight.value = null;
}

function onCustomWidthInput(val: string | number) {
  const num = Number(val);
  if (!isNaN(num) && num >= 320) {
    customWidth.value = Math.min(num, 3840);
  } else if (val === "" || val == null) {
    customWidth.value = null;
  }
}

function onCustomHeightInput(val: string | number) {
  const num = Number(val);
  if (!isNaN(num) && num >= 200) {
    customHeight.value = Math.min(num, 2160);
  } else if (val === "" || val == null) {
    customHeight.value = null;
  }
}
</script>

<template>
  <UPopover v-model:open="isOpen" :ui="{ content: 'z-[100]' }">
    <UTooltip text="Viewport settings" :disabled="isOpen">
      <UButton
        :label="dimensionLabel"
        icon="i-lucide-settings-2"
        trailing-icon="i-lucide-chevron-down"
        variant="subtle"
        size="sm"
        color="neutral"
        class="font-mono tabular-nums"
        :aria-label="`Viewport settings — ${dimensionLabel}`"
        :aria-expanded="isOpen"
      />
    </UTooltip>

    <template #content>
      <div class="p-4 w-72 space-y-4">
        <!-- Custom width -->
        <fieldset>
          <div class="flex items-center gap-1 justify-between">
            <legend
              class="text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-2"
            >
              Width
              <UBadge
                variant="subtle"
                size="xs"
                color="neutral"
                class="font-mono tabular-nums"
              >
                {{ currentWidthLabel }}
              </UBadge>
            </legend>
            <PreviewViewportPresetButtons
              :options="PRESET_WIDTHS"
              :active-preset="activeWidth"
              :custom-value="customWidth"
              group-label="Width presets"
              size="sm"
              class="mb-2"
              @select="activeWidth = $event as typeof activeWidth"
            />
          </div>
          <label
            :for="widthInputId"
            class="text-xs text-(--ui-text-muted) block mb-1"
          >
            Custom width (px)
          </label>
          <UInput
            :id="widthInputId"
            type="number"
            :model-value="customWidth ?? ''"
            :min="320"
            placeholder="e.g. 480"
            size="sm"
            class="w-full"
            :ui="{ base: 'rounded-[var(--ui-radius)]!' }"
            @update:model-value="onCustomWidthInput"
          />
        </fieldset>

        <USeparator />

        <!-- Height -->
        <fieldset>
          <div class="flex items-center gap-1 justify-between">
            <legend
              class="text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-2"
            >
              Height
              <UBadge
                variant="subtle"
                size="xs"
                color="neutral"
                class="font-mono tabular-nums"
              >
                {{ currentHeightLabel }}
              </UBadge>
            </legend>
            <PreviewViewportPresetButtons
              :options="PRESET_HEIGHTS"
              :active-preset="activeHeight"
              :custom-value="customHeight"
              group-label="Height presets"
              size="sm"
              class="mb-2"
              @select="activeHeight = $event as typeof activeHeight"
            />
          </div>
          <label
            :for="heightInputId"
            class="text-xs text-(--ui-text-muted) block mb-1"
          >
            Custom height (px)
          </label>
          <UInput
            :id="heightInputId"
            type="number"
            :model-value="customHeight ?? ''"
            :min="200"
            placeholder="e.g. 600"
            size="sm"
            class="w-full"
            :ui="{ base: 'rounded-[var(--ui-radius)]!' }"
            @update:model-value="onCustomHeightInput"
          />
        </fieldset>

        <!-- <USeparator /> -->

        <!-- Reset all -->
        <UButton
          icon="i-lucide-rotate-ccw"
          label="Reset all dimensions"
          size="sm"
          variant="outline"
          color="neutral"
          block
          :disabled="isDefault"
          @click="resetAll"
        />
      </div>
    </template>
  </UPopover>
</template>
