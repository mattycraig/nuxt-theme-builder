<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import type { CustomPalette, SemanticColorKey } from "~/types/theme";
import { CUSTOM_PALETTE_MAX, SEMANTIC_COLOR_KEYS } from "~/types/theme";
import { generatePalette } from "~/utils/paletteGenerator";
import {
  getCustomPaletteNameError,
  normalizePaletteNameInput,
  suggestCustomPaletteName,
} from "~/utils/customPalettes";
import { capitalize } from "~/utils/helpers";

const props = defineProps<{
  palettes: CustomPalette[];
}>();

const emit = defineEmits<{
  create: [name: string, color: string];
  "update:color": [name: string, color: string];
  rename: [oldName: string, newName: string];
  remove: [name: string];
  assign: [name: string, role: SemanticColorKey];
}>();

const DEFAULT_NEW_COLOR = "#f5c518";

const atLimit = computed(() => props.palettes.length >= CUSTOM_PALETTE_MAX);

// Create ─────────────────────────────────────────────────────────────

const creating = ref(false);
const newName = ref("");
const newColor = ref(DEFAULT_NEW_COLOR);
const newNameError = computed(() =>
  getCustomPaletteNameError(newName.value, props.palettes),
);
const newPalette = computed(() => generatePalette(newColor.value));

function startCreate() {
  if (atLimit.value) return;
  newName.value = suggestCustomPaletteName(props.palettes);
  newColor.value = DEFAULT_NEW_COLOR;
  creating.value = true;
}

function submitCreate() {
  if (newNameError.value || atLimit.value) return;
  emit("create", newName.value, newColor.value);
  creating.value = false;
}

defineExpose({ startCreate });

// Rename ─────────────────────────────────────────────────────────────

const renaming = ref<string | null>(null);
const renameValue = ref("");
const renameError = computed(() =>
  renaming.value === null
    ? null
    : getCustomPaletteNameError(
        renameValue.value,
        props.palettes,
        renaming.value,
      ),
);

function startRename(name: string) {
  renaming.value = name;
  renameValue.value = name;
}

function submitRename() {
  if (renaming.value === null || renameError.value) return;
  if (renameValue.value !== renaming.value) {
    emit("rename", renaming.value, renameValue.value);
  }
  renaming.value = null;
}

// Rows ───────────────────────────────────────────────────────────────

const rows = computed(() =>
  props.palettes.map((palette) => ({
    palette,
    generated: generatePalette(palette.color),
  })),
);

function menuItems(name: string): DropdownMenuItem[][] {
  return [
    [
      {
        label: "Use for",
        icon: "i-lucide-paintbrush",
        children: SEMANTIC_COLOR_KEYS.map((role) => ({
          label: capitalize(role),
          onSelect: () => emit("assign", name, role),
        })),
      },
    ],
    [
      {
        label: "Rename",
        icon: "i-lucide-pencil",
        onSelect: () => startRename(name),
      },
      {
        label: "Delete",
        icon: "i-lucide-trash-2",
        color: "error" as const,
        onSelect: () => emit("remove", name),
      },
    ],
  ];
}
</script>

<template>
  <div class="space-y-3">
    <p v-if="palettes.length === 0 && !creating" class="text-xs text-(--ui-text-muted)">
      Generate a full 50–950 palette from one brand color, then use it for any
      semantic color.
    </p>

    <ul v-if="rows.length > 0" class="space-y-3" aria-label="Custom palettes">
      <li
        v-for="{ palette, generated } in rows"
        :key="palette.name"
        class="space-y-1.5"
      >
        <form
          v-if="renaming === palette.name"
          class="flex items-start gap-1"
          @submit.prevent="submitRename"
          @keydown.esc="renaming = null"
        >
          <UFormField :error="renameError ?? false" size="xs" class="flex-1 min-w-0">
            <UInput
              :model-value="renameValue"
              size="xs"
              autofocus
              class="w-full font-mono"
              :aria-label="`New name for ${palette.name}`"
              @update:model-value="renameValue = normalizePaletteNameInput(String($event))"
            />
          </UFormField>
          <UButton
            type="submit"
            icon="i-lucide-check"
            size="xs"
            variant="ghost"
            aria-label="Save name"
            :disabled="!!renameError"
          />
          <UButton
            icon="i-lucide-x"
            size="xs"
            variant="ghost"
            color="neutral"
            aria-label="Cancel rename"
            @click="renaming = null"
          />
        </form>
        <div v-else class="flex items-center justify-between gap-2">
          <span class="text-xs font-medium font-mono truncate">
            {{ palette.name }}
          </span>
          <UDropdownMenu :items="menuItems(palette.name)">
            <UButton
              icon="i-lucide-ellipsis"
              :aria-label="`Actions for ${palette.name}`"
              variant="ghost"
              color="neutral"
              size="xs"
            />
          </UDropdownMenu>
        </div>

        <EditorCustomPaletteColorInput
          :model-value="palette.color"
          :label="`${palette.name} base color`"
          @update:model-value="emit('update:color', palette.name, $event)"
        />
        <EditorPaletteSwatches
          v-if="generated"
          :name="palette.name"
          :shades="generated.shades"
          :anchor="generated.anchor"
        />
      </li>
    </ul>

    <form
      v-if="creating"
      class="space-y-2 rounded-md border border-default p-2"
      aria-label="New custom palette"
      @submit.prevent="submitCreate"
      @keydown.esc="creating = false"
    >
      <UFormField label="Name" :error="newNameError ?? false" size="xs">
        <UInput
          :model-value="newName"
          size="sm"
          autofocus
          class="w-full font-mono"
          @update:model-value="newName = normalizePaletteNameInput(String($event))"
        />
      </UFormField>
      <EditorCustomPaletteColorInput v-model="newColor" label="Base color" />
      <EditorPaletteSwatches
        v-if="newPalette"
        :name="newName || 'New'"
        :shades="newPalette.shades"
        :anchor="newPalette.anchor"
      />
      <div class="flex justify-end gap-2">
        <UButton
          label="Cancel"
          size="xs"
          variant="ghost"
          color="neutral"
          @click="creating = false"
        />
        <UButton
          type="submit"
          label="Create"
          size="xs"
          :disabled="!!newNameError"
        />
      </div>
    </form>

    <UTooltip
      v-if="!creating"
      :text="`A theme can have up to ${CUSTOM_PALETTE_MAX} custom palettes`"
      :disabled="!atLimit"
    >
      <UButton
        icon="i-lucide-plus"
        label="New palette"
        size="xs"
        variant="soft"
        :disabled="atLimit"
        @click="startCreate"
      />
    </UTooltip>
  </div>
</template>
