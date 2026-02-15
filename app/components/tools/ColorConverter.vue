<script setup lang="ts">
import {
  parseColor,
  rgbToHex,
  rgbToHsl,
  rgbToOklch,
  formatRgb,
  formatHsl,
  formatOklch,
  type RGB,
  type HSL,
  type OKLCH,
  type ColorFormat,
} from "~/utils/colorConversion";

const { copyColor } = useColorCopy();

const colorInput = ref("#3b82f6");

const parsed = computed(() => parseColor(colorInput.value));

const rgb = computed<RGB | null>(() => parsed.value?.rgb ?? null);
const hex = computed(() => (rgb.value ? rgbToHex(rgb.value) : null));
const hsl = computed<HSL | null>(() =>
  rgb.value ? rgbToHsl(rgb.value) : null,
);
const oklch = computed<OKLCH | null>(() =>
  rgb.value ? rgbToOklch(rgb.value) : null,
);

const detectedFormat = computed<ColorFormat | null>(
  () => parsed.value?.format ?? null,
);

interface FormatEntry {
  label: string;
  value: string | null;
  format: ColorFormat;
}

const formats = computed<FormatEntry[]>(() => [
  { label: "HEX", value: hex.value, format: "hex" },
  {
    label: "RGB",
    value: rgb.value ? formatRgb(rgb.value) : null,
    format: "rgb",
  },
  {
    label: "HSL",
    value: hsl.value ? formatHsl(hsl.value) : null,
    format: "hsl",
  },
  {
    label: "OKLCH",
    value: oklch.value ? formatOklch(oklch.value) : null,
    format: "oklch",
  },
]);

const resolvedHex = computed(() => hex.value ?? null);
const pickerHex = usePickerHex(colorInput, resolvedHex, "#cccccc");

const previewBg = computed(() => resolvedHex.value ?? "#cccccc");

const FORMAT_LABELS: Record<ColorFormat, string> = {
  hex: "HEX",
  rgb: "RGB",
  hsl: "HSL",
  oklch: "OKLCH",
};
</script>

<template>
  <div class="space-y-6 mb-12">
    <div class="flex flex-col sm:flex-row gap-4 items-start">
      <div class="flex gap-2 items-center flex-1 w-full">
        <UPopover>
          <button
            type="button"
            class="w-10 h-10 rounded-lg border border-default shrink-0 cursor-pointer shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            :style="{ backgroundColor: previewBg }"
            aria-label="Pick a color visually"
          />
          <template #content>
            <div class="p-2">
              <UColorPicker v-model="pickerHex" size="sm" />
            </div>
          </template>
        </UPopover>
        <UInput
          v-model="colorInput"
          placeholder="#3b82f6 or rgb(59, 130, 246) or hsl(217, 91%, 60%)"
          class="flex-1 font-mono"
          size="xl"
          aria-label="Enter a color in any format (HEX, RGB, HSL, or OKLCH)"
        />
      </div>
      <div v-if="detectedFormat" class="shrink-0 self-stretch">
        <UBadge variant="subtle" color="neutral" class="h-full" size="lg">
          Detected: {{ FORMAT_LABELS[detectedFormat] }}
        </UBadge>
      </div>
    </div>

    <!-- Color preview -->
    <div
      class="h-24 rounded-lg border border-default transition-colors"
      :style="{ backgroundColor: previewBg }"
      role="img"
      :aria-label="`Color preview: ${hex ?? 'invalid color'}`"
    />

    <!-- Conversion results -->
    <div v-if="rgb" class="grid gap-3 sm:grid-cols-2">
      <div
        v-for="entry in formats"
        :key="entry.format"
        class="flex items-center justify-between gap-2 rounded-lg border border-default px-4 py-3"
      >
        <div class="min-w-0">
          <p class="text-sm font-bold">
            {{ entry.label }}
          </p>
          <p class="text-sm font-mono text-muted truncate">
            {{ entry.value ?? "—" }}
          </p>
        </div>
        <UButton
          v-if="entry.value"
          icon="i-lucide-clipboard-copy"
          variant="ghost"
          color="neutral"
          size="xs"
          :aria-label="`Copy ${entry.label} value`"
          @click="copyColor(entry.label, entry.value)"
        />
      </div>
    </div>

    <UEmpty
      v-else
      icon="i-lucide-palette"
      title="No color detected"
      description="Enter a valid color to see conversions. Supports HEX (#3b82f6), RGB (rgb(59, 130, 246)), HSL (hsl(217, 91%, 60%)), OKLCH (oklch(0.623 0.214 259.815))."
      variant="outline"
    />

    <UCard :ui="{ header: 'bg-elevated/50' }">
      <template #header>
        <h3 class="text-sm font-semibold text-highlighted">
          Color Format Reference
        </h3>
      </template>
      <div class="text-sm space-y-2">
        <p>
          <strong>HEX:</strong> Standard web color notation —
          <code class="font-mono">#rrggbb</code> or shorthand
          <code class="font-mono">#rgb</code>.
        </p>
        <p>
          <strong>RGB:</strong> Red, Green, Blue channel values from 0 to 255 —
          <code class="font-mono">rgb(r, g, b)</code>.
        </p>
        <p>
          <strong>HSL:</strong> Hue (0–360°), Saturation (0–100%), Lightness
          (0–100%) — <code class="font-mono">hsl(h, s%, l%)</code>.
        </p>
        <p>
          <strong>OKLCH:</strong> Perceptual lightness, chroma, and hue —
          <code class="font-mono">oklch(L C H)</code>. Used by Tailwind CSS v4.
        </p>
      </div>
    </UCard>
  </div>
</template>
