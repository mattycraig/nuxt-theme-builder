<script setup lang="ts">
import { getModeSurface, getModeSwatches } from "~/utils/themeSwatches";
import type { SwatchMode } from "~/utils/themeSwatches";

/**
 * Light and dark swatches for the current theme, side by side. Each row sits
 * on that mode's own background, so both modes are visible whichever one the
 * page is in.
 */
const store = useThemeStore();

const MODES: { mode: SwatchMode; label: string; icon: string; text: string }[] = [
  { mode: "light", label: "Light", icon: "i-lucide-sun", text: "#3f3f46" },
  { mode: "dark", label: "Dark", icon: "i-lucide-moon", text: "#e4e4e7" },
];

const rows = computed(() =>
  MODES.map((m) => ({
    ...m,
    surface: getModeSurface(store.config, m.mode),
    swatches: getModeSwatches(store.config, m.mode),
  })),
);

const keys = computed(() => rows.value[0]!.swatches.map((s) => s.key));
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <div
      class="hidden grid-cols-[4.25rem_repeat(7,minmax(0,1fr))] gap-1.5 px-2 sm:grid"
      aria-hidden="true"
    >
      <span />
      <span
        v-for="key in keys"
        :key="key"
        class="truncate text-center text-[10px] tracking-tight text-(--ui-text-dimmed)"
      >
        {{ key }}
      </span>
    </div>

    <div
      v-for="row in rows"
      :key="row.mode"
      class="grid grid-cols-[4.25rem_repeat(7,minmax(0,1fr))] items-center gap-1.5 rounded-(--ui-radius) border border-(--ui-border) p-2"
      :style="{ backgroundColor: row.surface }"
    >
      <span
        :id="`home-swatches-${row.mode}`"
        class="flex items-center gap-1.5 text-xs font-medium"
        :style="{ color: row.text }"
      >
        <UIcon :name="row.icon" class="size-3.5" aria-hidden="true" />
        {{ row.label }}
      </span>
      <ul
        class="contents"
        role="list"
        :aria-labelledby="`home-swatches-${row.mode}`"
      >
        <li
          v-for="swatch in row.swatches"
          :key="swatch.key"
          class="h-6 rounded-(--ui-radius) ring-1 ring-inset ring-black/10"
          :style="{ backgroundColor: swatch.color }"
          :title="`${swatch.key}: ${swatch.palette}-${swatch.shade}`"
        >
          <span class="sr-only">
            {{ swatch.key }}: {{ swatch.palette }} {{ swatch.shade }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
