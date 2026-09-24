<script setup lang="ts">
import { normalizeHexColor } from "~/utils/paletteGenerator";

const props = defineProps<{
  /** Lowercase `#rrggbb`. */
  modelValue: string;
  label: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

// Raw text so partially typed values aren't overwritten mid-edit
const text = ref(props.modelValue);

watch(
  () => props.modelValue,
  (value) => {
    if (normalizeHexColor(text.value) !== value) text.value = value;
  },
);

const invalid = computed(() => normalizeHexColor(text.value) === null);

function update(value: string) {
  const hex = normalizeHexColor(value);
  if (hex && hex !== props.modelValue) emit("update:modelValue", hex);
}

const pickerHex = computed({
  get: () => props.modelValue,
  set: (value: string) => {
    const hex = normalizeHexColor(value);
    if (!hex) return;
    text.value = hex;
    update(hex);
  },
});

// Live updates only for complete 6-digit values: "#1e3" is valid shorthand
// on its way to "#1e3a8a" and would flash a different color mid-typing.
const FULL_HEX = /^#?[0-9a-f]{6}$/i;

function onInput(value: string | number) {
  text.value = String(value);
  if (FULL_HEX.test(text.value.trim())) update(text.value);
}

/** Accept shorthand on blur or Enter (before a surrounding form submits). */
function commitText() {
  if (invalid.value) {
    text.value = props.modelValue;
    return;
  }
  update(text.value);
  text.value = normalizeHexColor(text.value)!;
}
</script>

<template>
  <div class="flex items-center gap-2">
    <UPopover>
      <button
        type="button"
        class="size-8 rounded-md border border-default shrink-0 cursor-pointer shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        :style="{ backgroundColor: modelValue }"
        :aria-label="`Pick ${label}`"
      />
      <template #content>
        <div class="p-3">
          <UColorPicker v-model="pickerHex" size="sm" />
        </div>
      </template>
    </UPopover>
    <UInput
      :model-value="text"
      size="sm"
      class="flex-1 min-w-0 font-mono"
      placeholder="#f5c518"
      :aria-label="label"
      :aria-invalid="invalid || undefined"
      :color="invalid ? 'error' : undefined"
      :highlight="invalid"
      @update:model-value="onInput"
      @blur="commitText"
      @keydown.enter="commitText"
    />
  </div>
</template>
