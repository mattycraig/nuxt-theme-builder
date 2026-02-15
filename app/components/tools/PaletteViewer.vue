<script setup lang="ts">
import {
  CHROMATIC_HEX_MAP,
  NEUTRAL_HEX_MAP,
  ALL_HEX_MAP,
} from "~/utils/colorPalettes";
import { parseOklchString, rgbToHex } from "~/utils/colorConversion";

const toast = useToast();
const { copy } = useClipboard();

const searchQuery = ref("");
const displayFormat = ref<"hex" | "oklch">("hex");

const SHADE_KEYS = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const;

const paletteNames = computed(() => {
  const all = Object.keys(ALL_HEX_MAP);
  if (!searchQuery.value) return all;
  const q = searchQuery.value.toLowerCase();
  return all.filter((name) => name.includes(q));
});

const chromaticNames = computed(() =>
  paletteNames.value.filter((n) => n in CHROMATIC_HEX_MAP),
);
const neutralNames = computed(() =>
  paletteNames.value.filter((n) => n in NEUTRAL_HEX_MAP),
);

function getDisplayValue(oklchValue: string): string {
  if (displayFormat.value === "oklch") return oklchValue;
  if (oklchValue === "#ffffff" || oklchValue === "#000000") return oklchValue;
  const rgb = parseOklchString(oklchValue);
  return rgb ? rgbToHex(rgb) : oklchValue;
}

function getSwatchBg(oklchValue: string): string {
  if (oklchValue === "#ffffff" || oklchValue === "#000000") return oklchValue;
  return oklchValue;
}

function isLightShade(shade: string): boolean {
  return ["50", "100", "200", "300", "400"].includes(shade);
}

function getShadeValue(
  map: Record<string, Record<string, string>>,
  name: string,
  shade: string,
): string {
  return map[name]?.[shade] ?? "";
}

function handleCopy(paletteName: string, shade: string, value: string) {
  const displayValue = getDisplayValue(value);
  copy(displayValue);
  toast.add({
    title: "Copied!",
    description: `${paletteName}-${shade}: ${displayValue}`,
    icon: "i-lucide-clipboard-check",
    color: "success",
  });
}

function handleKeydown(
  event: KeyboardEvent,
  paletteName: string,
  shade: string,
  value: string,
) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handleCopy(paletteName, shade, value);
  }
}
</script>

<template>
  <div class="space-y-6 mb-12">
    <div class="flex flex-col sm:flex-row gap-4">
      <UInput
        v-model="searchQuery"
        icon="i-lucide-search"
        placeholder="Filter palettes..."
        class="flex-1"
        aria-label="Filter palettes by name"
      />
      <UFieldGroup>
        <UButton
          :variant="displayFormat === 'hex' ? 'solid' : 'outline'"
          color="neutral"
          label="HEX"
          @click="displayFormat = 'hex'"
        />
        <UButton
          :variant="displayFormat === 'oklch' ? 'solid' : 'outline'"
          color="neutral"
          label="OKLCH"
          @click="displayFormat = 'oklch'"
        />
      </UFieldGroup>
    </div>

    <div
      v-if="paletteNames.length === 0"
      class="text-center py-12 text-[var(--ui-text-muted)]"
    >
      <UIcon name="i-lucide-search-x" class="text-3xl mb-2" />
      <p>No palettes match "{{ searchQuery }}"</p>
    </div>

    <template v-if="chromaticNames.length > 0">
      <h2 class="text-lg font-semibold text-[var(--ui-text-highlighted)]">
        Chromatic Palettes
      </h2>
      <div class="space-y-3">
        <div
          v-for="name in chromaticNames"
          :key="name"
          class="flex items-center gap-2"
        >
          <span
            class="w-20 shrink-0 text-sm font-medium text-[var(--ui-text-default)] capitalize"
          >
            {{ name }}
          </span>
          <div
            class="flex flex-1 gap-0.5"
            role="group"
            :aria-label="`${name} palette shades`"
          >
            <button
              v-for="shade in SHADE_KEYS"
              :key="shade"
              class="flex-1 h-10 rounded-sm cursor-pointer transition-transform hover:scale-110 hover:z-10 focus-visible:scale-110 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-primary)]"
              :style="{
                backgroundColor: getSwatchBg(
                  getShadeValue(CHROMATIC_HEX_MAP, name, shade),
                ),
              }"
              :aria-label="`${name} ${shade}: ${getDisplayValue(getShadeValue(CHROMATIC_HEX_MAP, name, shade))}. Click to copy.`"
              :title="`${name}-${shade}: ${getDisplayValue(getShadeValue(CHROMATIC_HEX_MAP, name, shade))}`"
              @click="
                handleCopy(
                  name,
                  shade,
                  getShadeValue(CHROMATIC_HEX_MAP, name, shade),
                )
              "
              @keydown="
                handleKeydown(
                  $event,
                  name,
                  shade,
                  getShadeValue(CHROMATIC_HEX_MAP, name, shade),
                )
              "
            >
              <span
                class="hidden sm:flex items-center justify-center h-full text-xs font-mono leading-none"
                :class="isLightShade(shade) ? 'text-black' : 'text-white'"
              >
                {{ shade }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </template>

    <template v-if="neutralNames.length > 0">
      <h2 class="text-lg font-semibold text-[var(--ui-text-highlighted)] mt-8">
        Neutral Palettes
      </h2>
      <div class="space-y-3">
        <div
          v-for="name in neutralNames"
          :key="name"
          class="flex items-center gap-2"
        >
          <span
            class="w-20 shrink-0 text-sm font-medium text-[var(--ui-text-default)] capitalize"
          >
            {{ name }}
          </span>
          <div
            class="flex flex-1 gap-0.5"
            role="group"
            :aria-label="`${name} palette shades`"
          >
            <button
              v-for="shade in SHADE_KEYS"
              :key="shade"
              class="flex-1 h-10 rounded-sm cursor-pointer transition-transform hover:scale-110 hover:z-10 focus-visible:scale-110 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-primary)]"
              :style="{
                backgroundColor: getSwatchBg(
                  getShadeValue(NEUTRAL_HEX_MAP, name, shade),
                ),
              }"
              :aria-label="`${name} ${shade}: ${getDisplayValue(getShadeValue(NEUTRAL_HEX_MAP, name, shade))}. Click to copy.`"
              :title="`${name}-${shade}: ${getDisplayValue(getShadeValue(NEUTRAL_HEX_MAP, name, shade))}`"
              @click="
                handleCopy(
                  name,
                  shade,
                  getShadeValue(NEUTRAL_HEX_MAP, name, shade),
                )
              "
              @keydown="
                handleKeydown(
                  $event,
                  name,
                  shade,
                  getShadeValue(NEUTRAL_HEX_MAP, name, shade),
                )
              "
            >
              <span
                class="hidden sm:flex items-center justify-center h-full text-xs font-mono leading-none"
                :class="isLightShade(shade) ? 'text-gray-700' : 'text-white'"
              >
                {{ shade }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
