<script setup lang="ts">
import type { ThemePreset } from "~/types/theme";
import { resolveModeColors } from "~/utils/themeSwatches";

const props = defineProps<{
  /** Built-in theme shown on the card */
  preset: ThemePreset;
  /** Theme detail page */
  to: string;
}>();

const modes = computed(() => [
  resolveModeColors(props.preset.config, "light"),
  resolveModeColors(props.preset.config, "dark"),
]);

const { previewPreset, isSaved, savePreset } = usePresetActions();
// Saved themes live in localStorage, so the saved state is client-only.
const mounted = useMounted();
const saved = computed(() => mounted.value && isSaved(props.preset));
</script>

<template>
  <article
    class="flex w-full flex-col overflow-hidden rounded-xl border border-(--ui-border) transition-shadow hover:ring-2 hover:ring-(--ui-primary)/40"
  >
    <NuxtLink
      :to="to"
      class="flex flex-1 flex-col focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--ui-primary)"
    >
      <span class="grid grid-cols-2" aria-hidden="true">
        <span
          v-for="mode in modes"
          :key="mode.mode"
          class="flex h-20 items-end gap-1.5 p-3"
          :style="{ backgroundColor: mode.bg }"
        >
          <span
            v-for="s in mode.semantic"
            :key="s.key"
            class="size-5 rounded-full"
            :style="{ backgroundColor: s.color }"
          />
        </span>
      </span>
      <span class="flex flex-1 flex-col gap-1 p-4">
        <span class="font-medium text-(--ui-text-highlighted)">
          {{ preset.name }}
        </span>
        <span class="text-sm text-(--ui-text-muted)">
          {{ preset.description }}
        </span>
      </span>
    </NuxtLink>

    <div class="flex gap-2 px-4 pb-4">
      <UButton
        label="Preview theme"
        icon="i-lucide-eye"
        size="sm"
        class="flex-1 justify-center"
        :aria-label="`Preview theme: ${preset.name}`"
        @click="previewPreset(preset)"
      />
      <UButton
        :label="saved ? 'Saved' : 'Save theme'"
        :icon="saved ? 'i-lucide-check' : 'i-lucide-bookmark'"
        size="sm"
        color="neutral"
        variant="outline"
        class="flex-1 justify-center"
        :aria-label="
          saved
            ? `Saved: ${preset.name} is in My Themes`
            : `Save theme: ${preset.name} to My Themes`
        "
        @click="savePreset(preset)"
      />
    </div>
  </article>
</template>
