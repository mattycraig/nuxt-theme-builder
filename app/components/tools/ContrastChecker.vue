<script setup lang="ts">
import {
  hexToRgb,
  getContrastRatio,
  rgbToHex,
  type RGB,
} from "~/utils/colorConversion";

const fgHex = ref("#1a1a2e");
const bgHex = ref("#ffffff");

const fgRgb = computed<RGB | null>(() => hexToRgb(fgHex.value));
const bgRgb = computed<RGB | null>(() => hexToRgb(bgHex.value));

const contrastRatio = computed(() => {
  if (!fgRgb.value || !bgRgb.value) return null;
  return getContrastRatio(fgRgb.value, bgRgb.value);
});

const results = computed(() => {
  const ratio = contrastRatio.value;
  if (ratio === null) return null;
  return {
    ratio,
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaaNormal: ratio >= 7,
    aaaLarge: ratio >= 4.5,
  };
});

function swapColors() {
  const temp = fgHex.value;
  fgHex.value = bgHex.value;
  bgHex.value = temp;
}

function sanitizeHexInput(value: string): string {
  let hex = value.trim();
  if (!hex.startsWith("#")) hex = `#${hex}`;
  return hex;
}

function onFgInputBlur() {
  fgHex.value = sanitizeHexInput(fgHex.value);
}

function onBgInputBlur() {
  bgHex.value = sanitizeHexInput(bgHex.value);
}

function getRatingColor(pass: boolean): "success" | "error" {
  return pass ? "success" : "error";
}

function getRatingLabel(pass: boolean): string {
  return pass ? "Pass" : "Fail";
}

// Ensure the preview text color is the contrast result in real-time
const previewStyle = computed(() => ({
  color: fgRgb.value ? rgbToHex(fgRgb.value) : fgHex.value,
  backgroundColor: bgRgb.value ? rgbToHex(bgRgb.value) : bgHex.value,
}));
</script>

<template>
  <div class="space-y-6 mb-12">
    <div class="grid gap-6 sm:grid-cols-2">
      <!-- Foreground -->
      <div class="space-y-2">
        <label
          for="fg-hex"
          class="text-sm font-medium text-[var(--ui-text-highlighted)]"
        >
          Foreground (text) color
        </label>
        <div class="flex gap-2 items-center">
          <UPopover>
            <button
              type="button"
              class="w-10 h-10 rounded-lg border border-default shrink-0 cursor-pointer shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              :style="{ backgroundColor: fgHex }"
              aria-label="Pick foreground color"
            />
            <template #content>
              <div class="p-2">
                <UColorPicker v-model="fgHex" size="sm" />
              </div>
            </template>
          </UPopover>
          <UInput
            id="fg-hex"
            v-model="fgHex"
            placeholder="#1a1a2e"
            class="flex-1 font-mono"
            aria-label="Foreground hex color"
            size="xl"
            @blur="onFgInputBlur"
          />
        </div>
      </div>

      <!-- Background -->
      <div class="space-y-2">
        <label
          for="bg-hex"
          class="text-sm font-medium text-[var(--ui-text-highlighted)]"
        >
          Background color
        </label>
        <div class="flex gap-2 items-center">
          <UPopover>
            <button
              type="button"
              class="w-10 h-10 rounded-lg border border-default shrink-0 cursor-pointer shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              :style="{ backgroundColor: bgHex }"
              aria-label="Pick background color"
            />
            <template #content>
              <div class="p-2">
                <UColorPicker v-model="bgHex" size="sm" />
              </div>
            </template>
          </UPopover>
          <UInput
            id="bg-hex"
            v-model="bgHex"
            placeholder="#ffffff"
            class="flex-1 font-mono"
            aria-label="Background hex color"
            size="xl"
            @blur="onBgInputBlur"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <UButton
        icon="i-lucide-arrow-left-right"
        label="Swap colors"
        variant="outline"
        color="neutral"
        @click="swapColors"
      />
    </div>

    <!-- Preview -->
    <div
      class="rounded-lg border border-default p-8 text-center"
      :style="previewStyle"
    >
      <p class="text-2xl font-bold mb-2">Sample Text</p>
      <p class="text-base">The quick brown fox jumps over the lazy dog.</p>
      <p class="text-sm mt-1">Small text preview for body copy readability.</p>
    </div>

    <!-- Results -->
    <div v-if="results" class="space-y-4" aria-live="polite" aria-atomic="true">
      <div class="text-center">
        <p class="text-sm text-[var(--ui-text-muted)]">Contrast Ratio</p>
        <p class="text-4xl font-bold text-[var(--ui-text-highlighted)]">
          {{ results.ratio }}:1
        </p>
      </div>

      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <UCard>
          <div class="text-center space-y-1">
            <p class="text-xs text-[var(--ui-text-muted)]">AA Normal</p>
            <p class="text-xs text-[var(--ui-text-dimmed)]">≥ 4.5:1</p>
            <UBadge :color="getRatingColor(results.aaNormal)" variant="subtle">
              {{ getRatingLabel(results.aaNormal) }}
            </UBadge>
          </div>
        </UCard>
        <UCard>
          <div class="text-center space-y-1">
            <p class="text-xs text-[var(--ui-text-muted)]">AA Large</p>
            <p class="text-xs text-[var(--ui-text-dimmed)]">≥ 3:1</p>
            <UBadge :color="getRatingColor(results.aaLarge)" variant="subtle">
              {{ getRatingLabel(results.aaLarge) }}
            </UBadge>
          </div>
        </UCard>
        <UCard>
          <div class="text-center space-y-1">
            <p class="text-xs text-[var(--ui-text-muted)]">AAA Normal</p>
            <p class="text-xs text-[var(--ui-text-dimmed)]">≥ 7:1</p>
            <UBadge :color="getRatingColor(results.aaaNormal)" variant="subtle">
              {{ getRatingLabel(results.aaaNormal) }}
            </UBadge>
          </div>
        </UCard>
        <UCard>
          <div class="text-center space-y-1">
            <p class="text-xs text-[var(--ui-text-muted)]">AAA Large</p>
            <p class="text-xs text-[var(--ui-text-dimmed)]">≥ 4.5:1</p>
            <UBadge :color="getRatingColor(results.aaaLarge)" variant="subtle">
              {{ getRatingLabel(results.aaaLarge) }}
            </UBadge>
          </div>
        </UCard>
      </div>
    </div>

    <div v-else class="text-center py-8 text-[var(--ui-text-muted)]">
      <p>Enter valid HEX colors to check contrast.</p>
    </div>

    <UCard :ui="{ header: 'bg-elevated/50' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold text-[var(--ui-text-highlighted)]">
            About WCAG Contrast Requirements
          </h3>
          <UButton
            label="WCAG Guidelines"
            icon="i-lucide-external-link"
            variant="link"
            size="xs"
            to="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html"
            target="_blank"
            trailing
          />
        </div>
      </template>
      <div class="text-sm text-[var(--ui-text-muted)] space-y-2">
        <p>
          <strong>AA Normal text:</strong> Requires a contrast ratio of at least
          4.5:1 for text smaller than 18pt (or 14pt bold).
        </p>
        <p>
          <strong>AA Large text:</strong> Requires a contrast ratio of at least
          3:1 for text 18pt+ (or 14pt+ bold).
        </p>
        <p>
          <strong>AAA Normal text:</strong> Requires a contrast ratio of at
          least 7:1 — the enhanced level for optimal readability.
        </p>
        <p>
          <strong>AAA Large text:</strong> Requires a contrast ratio of at least
          4.5:1 for large text at the enhanced level.
        </p>
      </div>
    </UCard>
  </div>
</template>
