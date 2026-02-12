<script setup lang="ts">
import { PRESET_WIDTHS } from "~/composables/usePreviewResize";

type PresetValue = "mobile" | "tablet" | "desktop";

const props = defineProps<{
  inputId?: string;
}>();

const activePreset = defineModel<PresetValue>("activePreset", {
  required: true,
});
const customWidth = defineModel<number | null>("customWidth", {
  required: true,
});

const currentWidth = computed(() => {
  if (customWidth.value !== null) return `${customWidth.value}px`;
  return PRESET_WIDTHS.find((o) => o.value === activePreset.value)!.width;
});

function onCustomInput(val: string | number) {
  const num = Number(val);
  if (!isNaN(num) && num >= 320) {
    customWidth.value = Math.min(num, 3840);
  } else if (val === "" || val == null) {
    customWidth.value = null;
  }
}

const inputElementId = computed(
  () => props.inputId ?? "preview-custom-width-input",
);
</script>

<template>
  <UFieldGroup
    class="flex items-center"
    role="group"
    aria-label="Change preview width"
  >
    <UTooltip
      v-for="option in PRESET_WIDTHS"
      :key="option.value"
      :text="option.label"
    >
      <UButton
        :icon="option.icon"
        :aria-label="option.label"
        size="sm"
        variant="outline"
        :color="
          activePreset === option.value && customWidth === null
            ? 'primary'
            : 'neutral'
        "
        :aria-pressed="activePreset === option.value && customWidth === null"
        @click="activePreset = option.value"
      />
    </UTooltip>

    <UPopover :ui="{ content: 'z-[100]' }">
      <UTooltip text="Set custom preview width">
        <UButton
          :label="currentWidth"
          variant="subtle"
          size="sm"
          color="neutral"
          class="font-mono tabular-nums"
          :aria-label="`Current preview width: ${currentWidth}`"
        />
      </UTooltip>
      <template #content>
        <div class="p-3 space-y-2">
          <label
            :for="inputElementId"
            class="text-sm font-medium text-(--ui-text-muted) block"
          >
            Custom width (px)
          </label>
          <UInput
            :id="inputElementId"
            type="number"
            :model-value="customWidth ?? ''"
            :min="320"
            placeholder="e.g. 480"
            size="sm"
            class="w-full"
            :ui="{ base: 'rounded-[var(--ui-radius)]!' }"
            @update:model-value="onCustomInput"
          />
        </div>
      </template>
    </UPopover>
  </UFieldGroup>
</template>
