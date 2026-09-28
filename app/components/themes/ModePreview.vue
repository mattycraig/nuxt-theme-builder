<script setup lang="ts">
import type { ModeColors } from "~/utils/themeSwatches";

/**
 * A small mock-up of a theme in one color mode, drawn with literal colors
 * so it shows the gallery theme rather than the theme being edited.
 */
const props = defineProps<{
  swatches: ModeColors;
  /** Show the full list of semantic colors under the mock-up. */
  detailed?: boolean;
}>();

const primary = computed(() => props.swatches.semantic[0]!);
const radius = computed(() => `${props.swatches.radius}rem`);
</script>

<template>
  <figure
    class="overflow-hidden rounded-xl border border-(--ui-border)"
    :style="{
      backgroundColor: swatches.bg,
      color: swatches.text,
      fontFamily: `'${swatches.font}', sans-serif`,
    }"
  >
    <figcaption class="sr-only">
      {{ swatches.mode === "dark" ? "Dark" : "Light" }} mode preview
    </figcaption>
    <div class="space-y-4 p-5" aria-hidden="true">
      <div class="flex items-center justify-between">
        <span
          class="text-xs font-medium uppercase tracking-wide"
          :style="{ color: swatches.textMuted }"
        >
          {{ swatches.mode === "dark" ? "Dark" : "Light" }}
        </span>
        <span class="flex gap-1">
          <span
            v-for="s in swatches.semantic"
            :key="s.key"
            class="size-3 rounded-full"
            :style="{ backgroundColor: s.color }"
          />
        </span>
      </div>
      <div
        class="space-y-3 border p-4"
        :style="{
          backgroundColor: swatches.bgElevated,
          borderColor: swatches.border,
          borderRadius: radius,
        }"
      >
        <p
          class="text-base font-semibold"
          :style="{ color: swatches.textHighlighted }"
        >
          Ship your theme
        </p>
        <p class="text-sm" :style="{ color: swatches.textMuted }">
          Colors, radius, and font from this theme.
        </p>
        <div class="flex flex-wrap gap-2">
          <span
            class="px-3 py-1.5 text-sm font-medium"
            :style="{
              backgroundColor: primary.color,
              color: swatches.textInverted,
              borderRadius: radius,
            }"
          >
            Get started
          </span>
          <span
            class="border px-3 py-1.5 text-sm font-medium"
            :style="{
              borderColor: swatches.border,
              color: swatches.textHighlighted,
              borderRadius: radius,
            }"
          >
            Learn more
          </span>
        </div>
      </div>
    </div>
    <dl
      v-if="detailed"
      class="grid grid-cols-2 gap-x-4 gap-y-3 border-t p-5 sm:grid-cols-3"
      :style="{ borderColor: swatches.border }"
    >
      <div v-for="s in swatches.semantic" :key="s.key" class="flex gap-2">
        <span
          class="mt-0.5 size-8 shrink-0 rounded-md"
          :style="{ backgroundColor: s.color }"
          aria-hidden="true"
        />
        <div class="min-w-0">
          <dt
            class="text-xs font-medium capitalize"
            :style="{ color: swatches.textHighlighted }"
          >
            {{ s.key }}
          </dt>
          <dd class="text-xs" :style="{ color: swatches.textMuted }">
            {{ s.palette }}-{{ s.shade }}
          </dd>
        </div>
      </div>
    </dl>
  </figure>
</template>
