<script setup lang="ts">
import type { ExtractedColor, LogoSuggestion } from "~/utils/imagePalette";
import {
  MAX_LOGO_FILE_BYTES,
  extractColors,
  readImagePixels,
  suggestThemeColors,
} from "~/utils/imagePalette";
import { capitalize } from "~/utils/helpers";

const emit = defineEmits<{
  apply: [suggestion: LogoSuggestion, exact: boolean];
}>();

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif,image/svg+xml";

const preview = ref("");
const fileName = ref("");
const colors = ref<ExtractedColor[]>([]);
const primary = ref<string>();
const exact = ref(true);
const error = ref("");
const loading = ref(false);

const suggestion = computed(() =>
  suggestThemeColors(colors.value, primary.value),
);

function roleOf(hex: string): string | undefined {
  if (suggestion.value?.primary === hex) return "Primary";
  if (suggestion.value?.secondary === hex) return "Secondary";
  return undefined;
}

async function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = "";
  if (!file) return;

  error.value = "";
  if (!file.type.startsWith("image/")) {
    error.value = "Choose a PNG, JPG, WebP, GIF, or SVG image.";
    return;
  }
  if (file.size > MAX_LOGO_FILE_BYTES) {
    error.value = "That image is over 5 MB. Try a smaller copy of the logo.";
    return;
  }

  loading.value = true;
  try {
    const { pixels, dataUrl } = await readImagePixels(file);
    const found = extractColors(pixels);
    if (!found.length) {
      error.value = "No colors found. Is the image fully transparent?";
      return;
    }
    preview.value = dataUrl;
    fileName.value = file.name;
    colors.value = found;
    primary.value = undefined;
  } catch {
    error.value = "Couldn't read that image. Try a PNG or JPG.";
  } finally {
    loading.value = false;
  }
}

function apply() {
  if (suggestion.value) emit("apply", suggestion.value, exact.value);
}
</script>

<template>
  <div class="space-y-3">
    <p class="text-xs text-(--ui-text-muted)">
      Pick a logo or brand image to build the theme from its colors. The image
      is read in your browser and never uploaded.
    </p>

    <label
      class="inline-flex items-center gap-1.5 cursor-pointer rounded-(--ui-radius) border border-(--ui-border) px-2.5 py-1.5 text-xs font-medium text-(--ui-text) hover:bg-(--ui-bg-elevated) focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-(--ui-primary) transition-colors"
    >
      <UIcon
        :name="loading ? 'i-lucide-loader-circle' : 'i-lucide-image-up'"
        :class="['size-4', loading && 'animate-spin']"
        aria-hidden="true"
      />
      <span>{{ colors.length ? "Choose another image" : "Choose image" }}</span>
      <input
        type="file"
        :accept="ACCEPT"
        class="sr-only"
        aria-label="Choose a logo image"
        @change="onFileChange"
      >
    </label>

    <p v-if="error" class="text-xs text-(--ui-error)" role="alert">
      {{ error }}
    </p>

    <template v-if="colors.length && suggestion">
      <div class="flex items-center gap-3">
        <img
          :src="preview"
          :alt="`Preview of ${fileName}`"
          class="h-10 max-w-20 object-contain rounded-(--ui-radius) border border-(--ui-border) bg-(--ui-bg-muted) p-1"
        >
        <p class="text-xs text-(--ui-text-toned)">
          Click a color to use it as primary.
        </p>
      </div>

      <div
        class="flex flex-wrap gap-2"
        role="group"
        aria-label="Colors found in the image"
      >
        <button
          v-for="color in colors"
          :key="color.hex"
          type="button"
          class="flex flex-col items-center gap-1 rounded-(--ui-radius) p-1 hover:bg-(--ui-bg-elevated) focus-visible:outline-2 focus-visible:outline-(--ui-primary)"
          :aria-pressed="suggestion.primary === color.hex"
          :aria-label="`${color.hex}, ${Math.round(color.weight * 100)}% of the image${roleOf(color.hex) ? `, ${roleOf(color.hex)}` : ''}`"
          @click="primary = color.hex"
        >
          <span
            :class="[
              'size-8 rounded-(--ui-radius) border border-(--ui-border)',
              suggestion.primary === color.hex &&
                'ring-2 ring-offset-1 ring-(--ui-primary) ring-offset-(--ui-bg)',
            ]"
            :style="{ backgroundColor: color.hex }"
            aria-hidden="true"
          />
          <span class="text-[10px] font-mono text-(--ui-text-muted)">
            {{ roleOf(color.hex) ?? color.hex }}
          </span>
        </button>
      </div>

      <p class="text-xs text-(--ui-text-toned)">
        Neutral: <strong>{{ capitalize(suggestion.neutral) }}</strong>
        <template v-if="!suggestion.secondary">
          · No second color found, so secondary stays as it is.
        </template>
      </p>

      <USwitch
        v-model="exact"
        size="sm"
        label="Use exact colors"
        :description="
          exact
            ? 'Adds logo-primary and logo-secondary custom palettes.'
            : 'Uses the closest Tailwind palettes.'
        "
        :ui="{ label: 'text-xs', description: 'text-xs' }"
      />

      <UButton
        label="Apply to theme"
        icon="i-lucide-wand-sparkles"
        color="primary"
        variant="soft"
        size="xs"
        @click="apply"
      />
    </template>
  </div>
</template>
