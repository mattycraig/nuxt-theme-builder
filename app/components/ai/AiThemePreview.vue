<script setup lang="ts">
import type { ThemeConfig, SemanticColorKey } from "~/types/theme";
import { SEMANTIC_COLOR_KEYS } from "~/types/theme";
import { ALL_HEX_MAP } from "~/utils/defaults";

const props = defineProps<{
  themeConfig: ThemeConfig;
}>();

const { applyTheme: localApplyTheme } = useAiChat();
const { openSaveAs } = useSaveThemeModal();

const isInIframe = import.meta.client && window !== window.parent;

function postToParent(data: Record<string, unknown>) {
  window.parent.postMessage(data, window.location.origin);
}

function handleApply() {
  if (isInIframe) {
    postToParent({
      type: "apply-ai-theme",
      config: JSON.parse(JSON.stringify(props.themeConfig)),
    });
  } else {
    localApplyTheme(props.themeConfig);
  }
}

function handleApplyAndSave() {
  if (isInIframe) {
    postToParent({
      type: "apply-ai-theme",
      config: JSON.parse(JSON.stringify(props.themeConfig)),
      save: true,
    });
  } else {
    localApplyTheme(props.themeConfig);
    openSaveAs();
  }
}

function getHex(palette: string, shade: string = "500"): string {
  return ALL_HEX_MAP[palette]?.[shade] ?? "#888";
}

const neutralShades = ["100", "300", "500", "700", "900"] as const;
</script>

<template>
  <div
    class="mt-2 rounded-[var(--ui-radius)] border border-(--ui-border) bg-(--ui-bg-elevated) p-4 space-y-4"
    role="group"
    aria-label="Generated theme preview"
  >
    <!-- Semantic colors -->
    <div>
      <p class="text-xs font-semibold text-(--ui-text-muted) mb-2">Colors</p>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="key in SEMANTIC_COLOR_KEYS"
          :key="key"
          class="flex items-center gap-1.5"
        >
          <span
            class="size-5 rounded-full border border-black/10 shrink-0"
            :style="{
              backgroundColor: getHex(
                themeConfig.colors[key as SemanticColorKey],
              ),
            }"
            aria-hidden="true"
          />
          <span class="text-xs text-(--ui-text-default) capitalize">{{
            key
          }}</span>
          <span class="text-xs text-(--ui-text-dimmed)"
            >({{ themeConfig.colors[key as SemanticColorKey] }})</span
          >
        </div>
      </div>
    </div>

    <!-- Neutral palette -->
    <div>
      <p class="text-xs font-semibold text-(--ui-text-muted) mb-2">
        Neutral: {{ themeConfig.neutral }}
      </p>
      <div class="flex gap-0.5">
        <span
          v-for="shade in neutralShades"
          :key="shade"
          class="h-5 flex-1 first:rounded-l-full last:rounded-r-full"
          :style="{ backgroundColor: getHex(themeConfig.neutral, shade) }"
          :title="`${themeConfig.neutral}-${shade}`"
          aria-hidden="true"
        />
      </div>
    </div>

    <!-- Font & Radius -->
    <div class="flex items-center gap-4 text-xs">
      <div class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-type"
          class="size-3.5 text-(--ui-text-muted)"
          aria-hidden="true"
        />
        <span
          class="text-(--ui-text-default)"
          :style="{ fontFamily: themeConfig.font }"
        >
          {{ themeConfig.font }}
        </span>
      </div>
      <div class="flex items-center gap-1.5">
        <UIcon
          name="i-lucide-square"
          class="size-3.5 text-(--ui-text-muted)"
          aria-hidden="true"
        />
        <span class="text-(--ui-text-default)"
          >{{ themeConfig.radius }}rem radius</span
        >
      </div>
    </div>

    <!-- Radius visual preview -->
    <div class="flex gap-2" aria-hidden="true">
      <div
        class="h-8 w-16 bg-(--ui-primary) opacity-60"
        :style="{ borderRadius: `${themeConfig.radius}rem` }"
      />
      <div
        class="h-8 w-16 border-2 border-(--ui-primary) opacity-60"
        :style="{ borderRadius: `${themeConfig.radius}rem` }"
      />
    </div>

    <!-- Actions -->
    <div class="flex gap-2 pt-1">
      <UButton
        icon="i-lucide-paintbrush"
        label="Apply Theme"
        variant="solid"
        color="primary"
        size="sm"
        @click="handleApply()"
      />
      <UButton
        icon="i-lucide-save"
        label="Save Theme"
        variant="outline"
        color="neutral"
        size="sm"
        @click="handleApplyAndSave()"
      />
    </div>
  </div>
</template>
