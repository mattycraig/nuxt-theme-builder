<script setup lang="ts">
import type {
  NeutralShade,
  TextTokenKey,
  BgTokenKey,
  BorderTokenKey,
} from "~/types/theme";
import {
  SEMANTIC_COLOR_KEYS,
  TEXT_TOKEN_KEYS,
  BG_TOKEN_KEYS,
  BORDER_TOKEN_KEYS,
} from "~/types/theme";
import { capitalize } from "~/utils/helpers";
import { useThemeModeAccessors } from "~/composables/useThemeModeAccessors";

const store = useThemeStore();

const {
  mode,
  currentColors,
  currentColorShades,
  currentNeutral,
  currentRadius,
  currentFont,
  overrides,
} = useThemeModeAccessors();

const SECTION_KEYS = [
  "myThemes",
  "presets",
  "colorMode",
  "layout",
  "semanticColors",
  "neutralColor",
  "textColors",
  "bgColors",
  "borderColors",
] as const;

type SectionKey = (typeof SECTION_KEYS)[number];

const DEFAULT_OPEN_SECTIONS: SectionKey[] = [
  "myThemes",
  "presets",
  "colorMode",
  "layout",
  "semanticColors",
  "neutralColor",
];

const sectionOpen = reactive<Record<SectionKey, boolean>>(
  Object.fromEntries(
    SECTION_KEYS.map((k) => [k, DEFAULT_OPEN_SECTIONS.includes(k)]),
  ) as Record<SectionKey, boolean>,
);

const debouncedRadiusCommit = useDebounceFn((val: number) => {
  store.setRadiusForMode(mode.value, val);
}, 300);

function onRadiusChange(val: number) {
  store.setRadiusVisualForMode(mode.value, val);
  debouncedRadiusCommit(val);
}

function onTextOverride(token: TextTokenKey, shade: NeutralShade) {
  store.setTextOverride(mode.value, token, shade);
}

function onBgOverride(token: BgTokenKey, shade: NeutralShade) {
  store.setBgOverride(mode.value, token, shade);
}

function onBorderOverride(token: BorderTokenKey, shade: NeutralShade) {
  store.setBorderOverride(mode.value, token, shade);
}

const hydrated = ref(false);
const jsonMode = ref(false);

function toggleJsonMode() {
  jsonMode.value = !jsonMode.value;
}

onMounted(() => {
  hydrated.value = true;
});
</script>

<template>
  <div
    data-testid="theme-editor"
    :data-hydrated="hydrated || undefined"
    class="flex flex-col h-full"
  >
    <EditorToolbar :json-mode="jsonMode" @toggle-json-mode="toggleJsonMode" />

    <!-- JSON Editor mode -->
    <template v-if="jsonMode">
      <div class="flex-1 min-h-0 flex flex-col">
        <EditorJsonEditor />
      </div>
    </template>

    <!-- Visual Editor mode -->
    <div v-if="!jsonMode" class="space-y-2 pt-2 pb-4">
      <!-- My Themes -->
      <EditorSection
        v-model:open="sectionOpen.myThemes"
        icon="i-lucide-bookmark"
        label="My Themes"
        default-open
      >
        <EditorSavedThemes />
      </EditorSection>

      <USeparator />

      <!-- Presets -->
      <EditorSection
        v-model:open="sectionOpen.presets"
        icon="i-lucide-layers"
        label="Theme Presets"
        default-open
      >
        <EditorPresetSelector />
      </EditorSection>

      <USeparator />

      <!-- Color Mode -->
      <EditorSection
        v-model:open="sectionOpen.colorMode"
        icon="i-lucide-sun-moon"
        label="Color Mode"
        default-open
      >
        <div class="flex items-center gap-2">
          <UColorModeSwitch />
          <span class="text-xs text-[var(--ui-text-toned)]">
            Editing
            <ClientOnly>
              <strong>{{ mode }}</strong>
            </ClientOnly>
            mode settings
          </span>
        </div>
      </EditorSection>

      <USeparator />

      <!-- Layout -->
      <EditorSection
        v-model:open="sectionOpen.layout"
        icon="i-lucide-sliders-horizontal"
        label="Layout"
        :mode-badge="mode"
        default-open
      >
        <div class="space-y-3">
          <EditorFontPicker
            :model-value="currentFont"
            @update:model-value="store.setFontForMode(mode, $event)"
          />
          <EditorRadiusSlider
            :model-value="currentRadius"
            @update:model-value="onRadiusChange($event)"
          />
        </div>
      </EditorSection>

      <USeparator />

      <!-- Semantic Colors -->
      <EditorSection
        v-model:open="sectionOpen.semanticColors"
        icon="i-lucide-palette"
        label="Semantic Colors"
        :mode-badge="mode"
        default-open
      >
        <div class="space-y-4">
          <EditorColorPicker
            v-for="key in SEMANTIC_COLOR_KEYS"
            :key="key"
            :model-value="currentColors[key]"
            :shade="currentColorShades[key]"
            :label="capitalize(key)"
            @update:model-value="
              store.setSemanticColorForMode(mode, key, $event)
            "
            @update:shade="store.setSemanticShadeForMode(mode, key, $event)"
          />
        </div>
      </EditorSection>

      <USeparator />

      <!-- Neutral Color -->
      <EditorSection
        v-model:open="sectionOpen.neutralColor"
        icon="i-lucide-contrast"
        label="Neutral Color"
        :mode-badge="mode"
        default-open
      >
        <EditorNeutralPicker
          :model-value="currentNeutral"
          label="Neutral"
          @update:model-value="store.setNeutralForMode(mode, $event)"
        />
      </EditorSection>

      <USeparator />

      <!-- Text Colors -->
      <EditorSection
        v-model:open="sectionOpen.textColors"
        icon="i-lucide-type"
        label="Text Colors"
        :mode-badge="mode"
      >
        <div class="space-y-4">
          <EditorShadeSelect
            v-for="token in TEXT_TOKEN_KEYS"
            :key="token"
            :model-value="overrides.text[token]"
            :label="capitalize(token)"
            :neutral-palette="currentNeutral"
            @update:model-value="onTextOverride(token, $event)"
          />
        </div>
      </EditorSection>

      <USeparator />

      <!-- Background Colors -->
      <EditorSection
        v-model:open="sectionOpen.bgColors"
        icon="i-lucide-paintbrush"
        label="Background Colors"
        :mode-badge="mode"
      >
        <div class="space-y-4">
          <EditorShadeSelect
            v-for="token in BG_TOKEN_KEYS"
            :key="token"
            :model-value="overrides.bg[token]"
            :label="capitalize(token)"
            :neutral-palette="currentNeutral"
            @update:model-value="onBgOverride(token, $event)"
          />
        </div>
      </EditorSection>

      <USeparator />

      <!-- Border Colors -->
      <EditorSection
        v-model:open="sectionOpen.borderColors"
        icon="i-lucide-frame"
        label="Border Colors"
        :mode-badge="mode"
      >
        <div class="space-y-4">
          <EditorShadeSelect
            v-for="token in BORDER_TOKEN_KEYS"
            :key="token"
            :model-value="overrides.border[token]"
            :label="capitalize(token)"
            :neutral-palette="currentNeutral"
            @update:model-value="onBorderOverride(token, $event)"
          />
        </div>
      </EditorSection>
    </div>
  </div>
</template>
