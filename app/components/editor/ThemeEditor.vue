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
</script>

<template>
  <!-- Collapsed: undo/redo/reset toolbar -->
  <div v-if="collapsed" class="flex flex-col items-center gap-1 py-2">
    <UTooltip text="Undo" :content="{ side: 'right' }">
      <UButton
        icon="i-lucide-undo-2"
        variant="ghost"
        color="neutral"
        size="xs"
        :disabled="!store.canUndo"
        @click="store.undo()"
      />
    </UTooltip>
    <UTooltip text="Redo" :content="{ side: 'right' }">
      <UButton
        icon="i-lucide-redo-2"
        variant="ghost"
        color="neutral"
        size="xs"
        :disabled="!store.canRedo"
        @click="store.redo()"
      />
    </UTooltip>
    <UTooltip text="Reset" :content="{ side: 'right' }">
      <UButton
        icon="i-lucide-rotate-ccw"
        color="error"
        variant="ghost"
        size="xs"
        @click="store.resetToDefaults()"
      />
    </UTooltip>
    <USeparator class="w-6 my-1" />
  </div>

  <!-- Sections (collapsed → popover, expanded → collapsible) -->
  <div :class="collapsed ? 'flex flex-col items-center gap-1' : 'space-y-2'">
    <!-- Presets -->
    <EditorSection
      :collapsed="collapsed"
      icon="i-lucide-layers"
      label="Presets"
      default-open
    >
      <EditorPresetSelector />
    </EditorSection>

    <USeparator v-if="!collapsed" />

    <!-- My Themes -->
    <EditorSection
      :collapsed="collapsed"
      icon="i-lucide-bookmark"
      label="My Themes"
    >
      <EditorSavedThemes />
    </EditorSection>

    <USeparator v-if="!collapsed" />

    <!-- Color Mode -->
    <EditorSection
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
          :label="capitalize(key)"
          @update:model-value="store.setSemanticColor(key, $event)"
        />
      </div>
    </EditorSection>

    <USeparator v-if="!collapsed" />

    <!-- Neutral Color -->
    <EditorSection
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

    <USeparator v-if="!collapsed" />

    <!-- Export / Import -->
    <EditorSection
      :collapsed="collapsed"
      icon="i-lucide-share-2"
      label="Export / Import"
    >
      <EditorExportPanel />
    </EditorSection>
  </div>
</template>
