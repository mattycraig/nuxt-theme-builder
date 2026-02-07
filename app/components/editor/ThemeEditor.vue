<script setup lang="ts">
import type { NeutralShade } from "~/types/theme";
import { SEMANTIC_COLOR_KEYS } from "~/types/theme";

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

const mode = computed<"light" | "dark">(() =>
  colorMode.value === "dark" ? "dark" : "light",
);

const overrides = computed(() =>
  mode.value === "light"
    ? store.config.lightOverrides
    : store.config.darkOverrides,
);

// Token key definitions for iteration
const textTokens = [
  "dimmed",
  "muted",
  "toned",
  "default",
  "highlighted",
  "inverted",
] as const;
const bgTokens = [
  "default",
  "muted",
  "elevated",
  "accented",
  "inverted",
] as const;
const borderTokens = ["default", "muted", "accented", "inverted"] as const;

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function onTextOverride(token: string, shade: NeutralShade) {
  store.setTextOverride(mode.value, token, shade);
}

function onBgOverride(token: string, shade: NeutralShade) {
  store.setBgOverride(mode.value, token, shade);
}

function onBorderOverride(token: string, shade: NeutralShade) {
  store.setBorderOverride(mode.value, token, shade);
}
</script>

<template>
  <!-- Collapsed: icon buttons with popovers -->
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

    <!-- Presets -->
    <UPopover :content="{ side: 'right', align: 'start' }">
      <UTooltip text="Presets" :content="{ side: 'right' }">
        <UButton
          icon="i-lucide-layers"
          variant="ghost"
          color="neutral"
          size="sm"
        />
      </UTooltip>
      <template #content>
        <div class="p-3 min-w-72">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-(--ui-text-muted) mb-2"
          >
            Presets
          </p>
          <EditorPresetSelector />
        </div>
      </template>
    </UPopover>

    <!-- Color Mode -->
    <UPopover :content="{ side: 'right', align: 'start' }">
      <UTooltip text="Color Mode" :content="{ side: 'right' }">
        <UButton
          icon="i-lucide-sun-moon"
          variant="ghost"
          color="neutral"
          size="sm"
        />
      </UTooltip>
      <template #content>
        <div class="p-3 min-w-64">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-(--ui-text-muted) mb-2"
          >
            Color Mode
          </p>
          <div class="flex items-center gap-2">
            <UColorModeSwitch />
            <span class="text-xs text-[var(--ui-text-toned)]">
              Editing <strong>{{ mode }}</strong> overrides
            </span>
          </div>
        </div>
      </template>
    </UPopover>

    <!-- Layout -->
    <UPopover :content="{ side: 'right', align: 'start' }">
      <UTooltip text="Layout" :content="{ side: 'right' }">
        <UButton
          icon="i-lucide-sliders-horizontal"
          variant="ghost"
          color="neutral"
          size="sm"
        />
      </UTooltip>
      <template #content>
        <div class="p-3 min-w-72 space-y-3">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-(--ui-text-muted) mb-2"
          >
            Layout
          </p>
          <EditorFontPicker
            :model-value="store.config.font"
            @update:model-value="store.setFont($event)"
          />
          <EditorRadiusSlider
            :model-value="store.config.radius"
            @update:model-value="store.setRadius($event)"
          />
        </div>
      </template>
    </UPopover>

    <!-- Semantic Colors -->
    <UPopover :content="{ side: 'right', align: 'start' }">
      <UTooltip text="Semantic Colors" :content="{ side: 'right' }">
        <UButton
          icon="i-lucide-palette"
          variant="ghost"
          color="neutral"
          size="sm"
        />
      </UTooltip>
      <template #content>
        <div class="p-3 min-w-72 space-y-2">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-(--ui-text-muted) mb-2"
          >
            Semantic Colors
          </p>
          <EditorColorPicker
            v-for="key in SEMANTIC_COLOR_KEYS"
            :key="key"
            :model-value="store.config.colors[key]"
            :label="capitalize(key)"
            @update:model-value="store.setSemanticColor(key, $event)"
          />
        </div>
      </template>
    </UPopover>

    <!-- Neutral Color -->
    <UPopover :content="{ side: 'right', align: 'start' }">
      <UTooltip text="Neutral Color" :content="{ side: 'right' }">
        <UButton
          icon="i-lucide-contrast"
          variant="ghost"
          color="neutral"
          size="sm"
        />
      </UTooltip>
      <template #content>
        <div class="p-3 min-w-72">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-(--ui-text-muted) mb-2"
          >
            Neutral Color
          </p>
          <EditorNeutralPicker
            :model-value="store.config.neutral"
            label="Neutral"
            @update:model-value="store.setNeutral($event)"
          />
        </div>
      </template>
    </UPopover>

    <!-- Text Colors -->
    <UPopover :content="{ side: 'right', align: 'start' }">
      <UTooltip text="Text Colors" :content="{ side: 'right' }">
        <UButton
          icon="i-lucide-type"
          variant="ghost"
          color="neutral"
          size="sm"
        />
      </UTooltip>
      <template #content>
        <div class="p-3 min-w-72 space-y-2">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-(--ui-text-muted) mb-2"
          >
            Text Colors
            <UBadge :label="mode" variant="subtle" size="xs" class="ml-1" />
          </p>
          <EditorShadeSelect
            v-for="token in textTokens"
            :key="token"
            :model-value="overrides.text[token]"
            :label="capitalize(token)"
            :neutral-palette="store.config.neutral"
            @update:model-value="onTextOverride(token, $event)"
          />
        </div>
      </template>
    </UPopover>

    <!-- Background Colors -->
    <UPopover :content="{ side: 'right', align: 'start' }">
      <UTooltip text="Background Colors" :content="{ side: 'right' }">
        <UButton
          icon="i-lucide-paintbrush"
          variant="ghost"
          color="neutral"
          size="sm"
        />
      </UTooltip>
      <template #content>
        <div class="p-3 min-w-72 space-y-2">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-(--ui-text-muted) mb-2"
          >
            Background Colors
            <UBadge :label="mode" variant="subtle" size="xs" class="ml-1" />
          </p>
          <EditorShadeSelect
            v-for="token in bgTokens"
            :key="token"
            :model-value="overrides.bg[token]"
            :label="capitalize(token)"
            :neutral-palette="store.config.neutral"
            @update:model-value="onBgOverride(token, $event)"
          />
        </div>
      </template>
    </UPopover>

    <!-- Border Colors -->
    <UPopover :content="{ side: 'right', align: 'start' }">
      <UTooltip text="Border Colors" :content="{ side: 'right' }">
        <UButton
          icon="i-lucide-frame"
          variant="ghost"
          color="neutral"
          size="sm"
        />
      </UTooltip>
      <template #content>
        <div class="p-3 min-w-72 space-y-2">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-(--ui-text-muted) mb-2"
          >
            Border Colors
            <UBadge :label="mode" variant="subtle" size="xs" class="ml-1" />
          </p>
          <EditorShadeSelect
            v-for="token in borderTokens"
            :key="token"
            :model-value="overrides.border[token]"
            :label="capitalize(token)"
            :neutral-palette="store.config.neutral"
            @update:model-value="onBorderOverride(token, $event)"
          />
        </div>
      </template>
    </UPopover>

    <!-- Export / Import -->
    <UPopover :content="{ side: 'right', align: 'start' }">
      <UTooltip text="Export / Import" :content="{ side: 'right' }">
        <UButton
          icon="i-lucide-share-2"
          variant="ghost"
          color="neutral"
          size="sm"
        />
      </UTooltip>
      <template #content>
        <div class="p-3 min-w-80">
          <p
            class="text-xs font-semibold uppercase tracking-wide text-(--ui-text-muted) mb-2"
          >
            Export / Import
          </p>
          <EditorExportPanel />
        </div>
      </template>
    </UPopover>
  </div>

  <!-- Expanded: collapsible sections -->
  <div v-else class="space-y-1">
    <!-- Presets -->
    <UCollapsible default-open>
      <UButton
        icon="i-lucide-layers"
        variant="ghost"
        color="neutral"
        block
        class="justify-between"
        :ui="{
          trailingIcon:
            'transition-transform duration-200 group-data-[state=open]:rotate-180',
        }"
        trailing-icon="i-lucide-chevron-down"
      >
        <span class="text-xs font-semibold uppercase tracking-wide"
          >Presets</span
        >
      </UButton>
      <template #content>
        <div class="px-2 pb-3 pt-1">
          <EditorPresetSelector />
        </div>
      </template>
    </UCollapsible>

    <USeparator />

    <!-- Color Mode -->
    <UCollapsible default-open>
      <UButton
        icon="i-lucide-sun-moon"
        variant="ghost"
        color="neutral"
        block
        class="justify-between"
        :ui="{
          trailingIcon:
            'transition-transform duration-200 group-data-[state=open]:rotate-180',
        }"
        trailing-icon="i-lucide-chevron-down"
      >
        <span class="text-xs font-semibold uppercase tracking-wide"
          >Color Mode</span
        >
      </UButton>
      <template #content>
        <div class="px-2 pb-3 pt-1">
          <div class="flex items-center gap-2">
            <UColorModeSwitch />
            <span class="text-xs text-[var(--ui-text-toned)]">
              Editing <strong>{{ mode }}</strong> overrides
            </span>
          </div>
        </div>
      </template>
    </UCollapsible>

    <USeparator />

    <!-- Layout -->
    <UCollapsible default-open>
      <UButton
        icon="i-lucide-sliders-horizontal"
        variant="ghost"
        color="neutral"
        block
        class="justify-between"
        :ui="{
          trailingIcon:
            'transition-transform duration-200 group-data-[state=open]:rotate-180',
        }"
        trailing-icon="i-lucide-chevron-down"
      >
        <span class="text-xs font-semibold uppercase tracking-wide"
          >Layout</span
        >
      </UButton>
      <template #content>
        <div class="px-2 pb-3 pt-1 space-y-3">
          <EditorFontPicker
            :model-value="store.config.font"
            @update:model-value="store.setFont($event)"
          />
          <EditorRadiusSlider
            :model-value="store.config.radius"
            @update:model-value="store.setRadius($event)"
          />
        </div>
      </template>
    </UCollapsible>

    <USeparator />

    <!-- Semantic Colors -->
    <UCollapsible default-open>
      <UButton
        icon="i-lucide-palette"
        variant="ghost"
        color="neutral"
        block
        class="justify-between"
        :ui="{
          trailingIcon:
            'transition-transform duration-200 group-data-[state=open]:rotate-180',
        }"
        trailing-icon="i-lucide-chevron-down"
      >
        <span class="text-xs font-semibold uppercase tracking-wide"
          >Semantic Colors</span
        >
      </UButton>
      <template #content>
        <div class="px-2 pb-3 pt-1 space-y-2">
          <EditorColorPicker
            v-for="key in SEMANTIC_COLOR_KEYS"
            :key="key"
            :model-value="store.config.colors[key]"
            :label="capitalize(key)"
            @update:model-value="store.setSemanticColor(key, $event)"
          />
        </div>
      </template>
    </UCollapsible>

    <USeparator />

    <!-- Neutral Color -->
    <UCollapsible default-open>
      <UButton
        icon="i-lucide-contrast"
        variant="ghost"
        color="neutral"
        block
        class="justify-between"
        :ui="{
          trailingIcon:
            'transition-transform duration-200 group-data-[state=open]:rotate-180',
        }"
        trailing-icon="i-lucide-chevron-down"
      >
        <span class="text-xs font-semibold uppercase tracking-wide"
          >Neutral Color</span
        >
      </UButton>
      <template #content>
        <div class="px-2 pb-3 pt-1">
          <EditorNeutralPicker
            :model-value="store.config.neutral"
            label="Neutral"
            @update:model-value="store.setNeutral($event)"
          />
        </div>
      </template>
    </UCollapsible>

    <USeparator />

    <!-- Text Colors -->
    <UCollapsible>
      <UButton
        icon="i-lucide-type"
        variant="ghost"
        color="neutral"
        block
        class="justify-between"
        :ui="{
          trailingIcon:
            'transition-transform duration-200 group-data-[state=open]:rotate-180',
        }"
        trailing-icon="i-lucide-chevron-down"
      >
        <span class="text-xs font-semibold uppercase tracking-wide">
          Text Colors
          <UBadge :label="mode" variant="subtle" size="xs" class="ml-1" />
        </span>
      </UButton>
      <template #content>
        <div class="px-2 pb-3 pt-1 space-y-2">
          <EditorShadeSelect
            v-for="token in textTokens"
            :key="token"
            :model-value="overrides.text[token]"
            :label="capitalize(token)"
            :neutral-palette="store.config.neutral"
            @update:model-value="onTextOverride(token, $event)"
          />
        </div>
      </template>
    </UCollapsible>

    <USeparator />

    <!-- Background Colors -->
    <UCollapsible>
      <UButton
        icon="i-lucide-paintbrush"
        variant="ghost"
        color="neutral"
        block
        class="justify-between"
        :ui="{
          trailingIcon:
            'transition-transform duration-200 group-data-[state=open]:rotate-180',
        }"
        trailing-icon="i-lucide-chevron-down"
      >
        <span class="text-xs font-semibold uppercase tracking-wide">
          Background Colors
          <UBadge :label="mode" variant="subtle" size="xs" class="ml-1" />
        </span>
      </UButton>
      <template #content>
        <div class="px-2 pb-3 pt-1 space-y-2">
          <EditorShadeSelect
            v-for="token in bgTokens"
            :key="token"
            :model-value="overrides.bg[token]"
            :label="capitalize(token)"
            :neutral-palette="store.config.neutral"
            @update:model-value="onBgOverride(token, $event)"
          />
        </div>
      </template>
    </UCollapsible>

    <USeparator />

    <!-- Border Colors -->
    <UCollapsible>
      <UButton
        icon="i-lucide-frame"
        variant="ghost"
        color="neutral"
        block
        class="justify-between"
        :ui="{
          trailingIcon:
            'transition-transform duration-200 group-data-[state=open]:rotate-180',
        }"
        trailing-icon="i-lucide-chevron-down"
      >
        <span class="text-xs font-semibold uppercase tracking-wide">
          Border Colors
          <UBadge :label="mode" variant="subtle" size="xs" class="ml-1" />
        </span>
      </UButton>
      <template #content>
        <div class="px-2 pb-3 pt-1 space-y-2">
          <EditorShadeSelect
            v-for="token in borderTokens"
            :key="token"
            :model-value="overrides.border[token]"
            :label="capitalize(token)"
            :neutral-palette="store.config.neutral"
            @update:model-value="onBorderOverride(token, $event)"
          />
        </div>
      </template>
    </UCollapsible>

    <USeparator />

    <!-- Export / Import -->
    <UCollapsible>
      <UButton
        icon="i-lucide-share-2"
        variant="ghost"
        color="neutral"
        block
        class="justify-between"
        :ui="{
          trailingIcon:
            'transition-transform duration-200 group-data-[state=open]:rotate-180',
        }"
        trailing-icon="i-lucide-chevron-down"
      >
        <span class="text-xs font-semibold uppercase tracking-wide"
          >Export / Import</span
        >
      </UButton>
      <template #content>
        <div class="px-2 pb-3 pt-1">
          <EditorExportPanel />
        </div>
      </template>
    </UCollapsible>
  </div>
</template>
