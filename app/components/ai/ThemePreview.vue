<script setup lang="ts">
import type { ThemeConfig, SemanticColorKey } from "~/types/theme";
import { SEMANTIC_COLOR_KEYS } from "~/types/theme";
import { ALL_HEX_MAP, NEUTRAL_SWATCH_HEX } from "~/utils/colorPalettes";
import { isInIframe } from "~/utils/helpers";

const props = defineProps<{
  themeConfig: ThemeConfig;
}>();

const { applyTheme: localApplyTheme } = useAiChat();
const { openSaveAs } = useSaveThemeModal();

const inIframe = isInIframe();

function postToParent(data: Record<string, unknown>) {
  window.parent.postMessage(data, window.location.origin);
}

function handleApply() {
  if (inIframe) {
    postToParent({
      type: "apply-ai-theme",
      config: JSON.parse(JSON.stringify(props.themeConfig)),
    });
  } else {
    localApplyTheme(props.themeConfig);
  }
}

function handleApplyAndSave() {
  if (inIframe) {
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

function handleExport() {
  if (inIframe) {
    postToParent({
      type: "apply-ai-theme",
      config: JSON.parse(JSON.stringify(props.themeConfig)),
      export: true,
    });
  } else {
    localApplyTheme(props.themeConfig);
    useExportPanel().open();
  }
}

function getHex(palette: string, shade: string = "500"): string {
  return ALL_HEX_MAP[palette]?.[shade] ?? "#888";
}

function getLightColorHex(key: SemanticColorKey): string {
  const palette = props.themeConfig.colors[key];
  const shade = props.themeConfig.colorShades[key] ?? "500";
  return ALL_HEX_MAP[palette]?.[shade] ?? "#888";
}

function getDarkColorHex(key: SemanticColorKey): string {
  const palette = props.themeConfig.darkColors[key];
  const shade = props.themeConfig.darkColorShades[key] ?? "500";
  return ALL_HEX_MAP[palette]?.[shade] ?? "#888";
}

const lightNeutralHex = computed(
  () => NEUTRAL_SWATCH_HEX[props.themeConfig.neutral] ?? "#71717a",
);

const darkNeutralHex = computed(
  () =>
    NEUTRAL_SWATCH_HEX[
      props.themeConfig.darkNeutral ?? props.themeConfig.neutral
    ] ?? "#71717a",
);

const hasDarkDifferences = computed(() => {
  const tc = props.themeConfig;
  return (
    tc.neutral !== tc.darkNeutral ||
    SEMANTIC_COLOR_KEYS.some(
      (k) =>
        tc.colors[k] !== tc.darkColors[k] ||
        tc.colorShades[k] !== tc.darkColorShades[k],
    )
  );
});

const ariaDescription = computed(() => {
  const colors = SEMANTIC_COLOR_KEYS.map(
    (k) => `${k}: ${props.themeConfig.colors[k]}`,
  ).join(", ");
  return `Theme with ${colors}, neutral: ${props.themeConfig.neutral}, font: ${props.themeConfig.font}, radius: ${props.themeConfig.radius}rem`;
});
</script>

<template>
  <div
    class="mt-3 rounded-lg border border-(--ui-border) bg-(--ui-bg-elevated) overflow-hidden max-w-[500px]"
    role="group"
    :aria-label="ariaDescription"
  >
    <!-- Dual palette swatch banner -->
    <div class="relative space-y-0.5" aria-hidden="true">
      <!-- Light mode row -->
      <div class="flex gap-0.5 items-center justify-center">
        <span
          class="h-full min-w-[80px] text-center font-semibold tracking-wide text-xs uppercase leading-none mix-blend-difference text-white/70 select-none"
        >
          Light
        </span>
        <div
          v-for="key in SEMANTIC_COLOR_KEYS"
          :key="`light-${key}`"
          class="flex-1 h-6"
          :style="{
            backgroundColor: getLightColorHex(key as SemanticColorKey),
          }"
        />
        <div class="flex-1 h-6" :style="{ backgroundColor: lightNeutralHex }" />
      </div>
      <!-- Dark mode row -->
      <div class="flex gap-0.5 items-center justify-center">
        <span
          class="h-full min-w-[80px] text-center font-semibold tracking-wide text-xs uppercase leading-none mix-blend-difference text-white/70 select-none"
        >
          Dark
        </span>
        <div
          v-for="key in SEMANTIC_COLOR_KEYS"
          :key="`dark-${key}`"
          class="flex-1 h-6"
          :style="{ backgroundColor: getDarkColorHex(key as SemanticColorKey) }"
        />
        <div class="flex-1 h-6" :style="{ backgroundColor: darkNeutralHex }" />
      </div>
    </div>

    <!-- Card body -->
    <div class="px-3.5 py-3 space-y-3">
      <!-- Semantic color chips grid -->
      <div class="grid grid-cols-3 gap-x-3 gap-y-1.5">
        <div
          v-for="key in SEMANTIC_COLOR_KEYS"
          :key="key"
          class="flex items-center gap-1.5 min-w-0"
        >
          <span
            class="size-3.5 rounded-sm shrink-0 ring-1 ring-black/10 dark:ring-white/10"
            :style="{
              backgroundColor: getLightColorHex(key as SemanticColorKey),
            }"
            aria-hidden="true"
          />
          <span class="text-[11px] text-(--ui-text-muted) capitalize truncate">
            {{ key }}
          </span>
          <span class="text-[11px] text-(--ui-text-dimmed) truncate">
            ({{ themeConfig.colors[key as SemanticColorKey] }})
          </span>
        </div>
      </div>

      <!-- Neutral + Meta info row -->
      <div class="flex items-center gap-3 text-[11px]">
        <!-- Neutral badge -->
        <div class="flex items-center gap-1.5">
          <div
            class="flex h-3.5 w-20 rounded-sm overflow-hidden"
            aria-hidden="true"
          >
            <span
              v-for="s in [
                '50',
                '100',
                '200',
                '300',
                '400',
                '500',
                '600',
                '700',
                '800',
                '900',
                '950',
              ]"
              :key="s"
              class="flex-1"
              :style="{ backgroundColor: getHex(themeConfig.neutral, s) }"
            />
          </div>
          <span class="text-(--ui-text-muted) capitalize">{{
            themeConfig.neutral
          }}</span>
        </div>

        <span class="text-(--ui-border)" aria-hidden="true">&middot;</span>

        <!-- Font -->
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-type"
            class="size-3 shrink-0 text-(--ui-text-muted)"
            aria-hidden="true"
          />
          <span
            class="text-(--ui-text-muted)"
            :style="{ fontFamily: themeConfig.font }"
          >
            {{ themeConfig.font }}
          </span>
        </div>

        <span class="text-(--ui-border)" aria-hidden="true">&middot;</span>

        <!-- Radius with visual indicator -->
        <div class="flex items-center gap-2">
          <span
            class="size-3 border-2 border-(--ui-text-muted)"
            :style="{
              borderRadius: `${Math.min(themeConfig.radius * 4, 6)}px`,
            }"
            aria-hidden="true"
          />
          <span class="text-(--ui-text-muted)"
            >{{ themeConfig.radius }}rem</span
          >
        </div>
      </div>

      <!-- Dark mode differences callout -->
      <p
        v-if="hasDarkDifferences"
        class="text-[10px] text-(--ui-text-dimmed) flex items-center gap-1"
      >
        <UIcon
          name="i-lucide-moon"
          class="size-3 shrink-0"
          aria-hidden="true"
        />
        Dark mode uses different palette assignments
      </p>

      <!-- Actions -->
      <div class="flex gap-2 pt-0.5">
        <UButton
          icon="i-lucide-paintbrush"
          label="Apply & Preview Theme"
          variant="solid"
          color="primary"
          size="xs"
          @click="handleApply()"
        />
        <UButton
          icon="i-lucide-save"
          label="Save Theme"
          variant="subtle"
          color="neutral"
          size="xs"
          @click="handleApplyAndSave()"
        />
        <UButton
          icon="i-lucide-code"
          label="Export"
          variant="subtle"
          color="neutral"
          size="xs"
          @click="handleExport()"
        />
      </div>
    </div>
  </div>
</template>
