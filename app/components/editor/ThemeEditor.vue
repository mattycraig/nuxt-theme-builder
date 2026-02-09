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

withDefaults(
  defineProps<{
    collapsed?: boolean;
  }>(),
  {
    collapsed: false,
  },
);

const store = useThemeStore();
const colorMode = useColorMode();

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

const allExpanded = computed(() => SECTION_KEYS.every((k) => sectionOpen[k]));

function toggleSections() {
  const value = !allExpanded.value;
  for (const key of SECTION_KEYS) sectionOpen[key] = value;
}

const debouncedRadiusCommit = useDebounceFn((val: number) => {
  store.setRadius(val);
}, 300);

function onRadiusChange(val: number) {
  store.setRadiusVisual(val);
  debouncedRadiusCommit(val);
}

const mode = computed<"light" | "dark">(() =>
  colorMode.value === "dark" ? "dark" : "light",
);

const overrides = computed(() =>
  mode.value === "light"
    ? store.config.lightOverrides
    : store.config.darkOverrides,
);

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
onMounted(() => {
  hydrated.value = true;
});
</script>

<template>
  <!-- Undo / Redo / Reset toolbar -->
  <div data-testid="theme-editor" :data-hydrated="hydrated || undefined">
    <EditorToolbar
      :collapsed="collapsed"
      :all-expanded="allExpanded"
      @toggle-sections="toggleSections"
    />
    <USeparator :class="collapsed ? 'w-6 my-1' : 'hidden'" />

    <!-- Sections (collapsed → popover, expanded → collapsible) -->
    <div
      :class="
        collapsed ? 'flex flex-col items-center gap-1' : 'space-y-2 pt-2 pb-4'
      "
    >
      <!-- My Themes -->
      <EditorSection
        v-model:open="sectionOpen.myThemes"
        :collapsed="collapsed"
        icon="i-lucide-bookmark"
        label="My Themes"
        default-open
      >
        <EditorSavedThemes />
      </EditorSection>

      <USeparator v-if="!collapsed" />

      <!-- Presets -->
      <EditorSection
        v-model:open="sectionOpen.presets"
        :collapsed="collapsed"
        icon="i-lucide-layers"
        label="Theme Presets"
        default-open
      >
        <EditorPresetSelector />
      </EditorSection>

      <USeparator v-if="!collapsed" />

      <!-- Color Mode -->
      <EditorSection
        v-model:open="sectionOpen.colorMode"
        :collapsed="collapsed"
        icon="i-lucide-sun-moon"
        label="Color Mode"
        default-open
      >
        <div class="flex items-center gap-2">
          <UColorModeSwitch />
          <span class="text-xs text-[var(--ui-text-toned)]">
            Editing <strong>{{ mode }}</strong> overrides
          </span>
        </div>
      </EditorSection>

      <USeparator v-if="!collapsed" />

      <!-- Layout -->
      <EditorSection
        v-model:open="sectionOpen.layout"
        :collapsed="collapsed"
        icon="i-lucide-sliders-horizontal"
        label="Layout"
        default-open
      >
        <div class="space-y-3">
          <EditorFontPicker
            :model-value="store.config.font"
            @update:model-value="store.setFont($event)"
          />
          <EditorRadiusSlider
            :model-value="store.config.radius"
            @update:model-value="onRadiusChange($event)"
          />
        </div>
      </EditorSection>

      <USeparator v-if="!collapsed" />

      <!-- Semantic Colors -->
      <EditorSection
        v-model:open="sectionOpen.semanticColors"
        :collapsed="collapsed"
        icon="i-lucide-palette"
        label="Semantic Colors"
        default-open
      >
        <div class="space-y-2">
          <EditorColorPicker
            v-for="key in SEMANTIC_COLOR_KEYS"
            :key="key"
            :model-value="store.config.colors[key]"
            :shade="store.config.colorShades[key]"
            :label="capitalize(key)"
            @update:model-value="store.setSemanticColor(key, $event)"
            @update:shade="store.setSemanticShade(key, $event)"
          />
        </div>
      </EditorSection>

      <USeparator v-if="!collapsed" />

      <!-- Neutral Color -->
      <EditorSection
        v-model:open="sectionOpen.neutralColor"
        :collapsed="collapsed"
        icon="i-lucide-contrast"
        label="Neutral Color"
        default-open
      >
        <EditorNeutralPicker
          :model-value="store.config.neutral"
          label="Neutral"
          @update:model-value="store.setNeutral($event)"
        />
      </EditorSection>

      <USeparator v-if="!collapsed" />

      <!-- Text Colors -->
      <EditorSection
        v-model:open="sectionOpen.textColors"
        :collapsed="collapsed"
        icon="i-lucide-type"
        label="Text Colors"
      >
        <template #heading>
          Text Colors
          <UBadge :label="mode" variant="subtle" size="xs" class="ml-1" />
        </template>
        <div class="space-y-2">
          <EditorShadeSelect
            v-for="token in TEXT_TOKEN_KEYS"
            :key="token"
            :model-value="overrides.text[token]"
            :label="capitalize(token)"
            :neutral-palette="store.config.neutral"
            @update:model-value="onTextOverride(token, $event)"
          />
        </div>
      </EditorSection>

      <USeparator v-if="!collapsed" />

      <!-- Background Colors -->
      <EditorSection
        v-model:open="sectionOpen.bgColors"
        :collapsed="collapsed"
        icon="i-lucide-paintbrush"
        label="Background Colors"
      >
        <template #heading>
          Background Colors
          <UBadge :label="mode" variant="subtle" size="xs" class="ml-1" />
        </template>
        <div class="space-y-2">
          <EditorShadeSelect
            v-for="token in BG_TOKEN_KEYS"
            :key="token"
            :model-value="overrides.bg[token]"
            :label="capitalize(token)"
            :neutral-palette="store.config.neutral"
            @update:model-value="onBgOverride(token, $event)"
          />
        </div>
      </EditorSection>

      <USeparator v-if="!collapsed" />

      <!-- Border Colors -->
      <EditorSection
        v-model:open="sectionOpen.borderColors"
        :collapsed="collapsed"
        icon="i-lucide-frame"
        label="Border Colors"
      >
        <template #heading>
          Border Colors
          <UBadge :label="mode" variant="subtle" size="xs" class="ml-1" />
        </template>
        <div class="space-y-2">
          <EditorShadeSelect
            v-for="token in BORDER_TOKEN_KEYS"
            :key="token"
            :model-value="overrides.border[token]"
            :label="capitalize(token)"
            :neutral-palette="store.config.neutral"
            @update:model-value="onBorderOverride(token, $event)"
          />
        </div>
      </EditorSection>
    </div>
  </div>
</template>
