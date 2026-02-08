<script setup lang="ts">
import type { ThemePreset } from "~/types/theme";

const store = useThemeStore();

const showSaveInput = ref(false);
const saveInput = ref("");

const renamingName = ref<string | null>(null);
const renameInput = ref("");

const deletingName = ref<string | null>(null);

const activePresetName = ref<string>("");

watchDebounced(
  () => store.config,
  () => {
    const currentJSON = JSON.stringify(store.config);
    const match = store.savedPresets.find(
      (p) => JSON.stringify(p.config) === currentJSON,
    );
    activePresetName.value = match?.name ?? "";
  },
  { deep: true, debounce: 300 },
);

function loadTheme(preset: ThemePreset) {
  store.loadPreset(preset);
}

// --- Save ---
function startSave() {
  saveInput.value = activePresetName.value || "";
  showSaveInput.value = true;
}

function confirmSave() {
  const name = saveInput.value.trim();
  if (!name) return;
  store.savePreset(name);
  activePresetName.value = name;
  showSaveInput.value = false;
  saveInput.value = "";
}

function cancelSave() {
  showSaveInput.value = false;
  saveInput.value = "";
}

// --- Rename ---
function startRename(name: string) {
  renamingName.value = name;
  renameInput.value = name;
}

function confirmRename() {
  if (!renamingName.value) return;
  const success = store.renamePreset(renamingName.value, renameInput.value);
  if (success && activePresetName.value === renamingName.value) {
    activePresetName.value = renameInput.value.trim();
  }
  renamingName.value = null;
  renameInput.value = "";
}

function cancelRename() {
  renamingName.value = null;
  renameInput.value = "";
}

// --- Duplicate ---
function duplicateTheme(preset: ThemePreset) {
  let baseName = `Copy of ${preset.name}`;
  let counter = 1;
  const existingNames = new Set(store.savedPresets.map((p) => p.name));
  while (existingNames.has(baseName)) {
    counter++;
    baseName = `Copy of ${preset.name} (${counter})`;
  }
  store.savePreset(baseName);
  const idx = store.savedPresets.findIndex((p) => p.name === baseName);
  if (idx >= 0) {
    const updated = [...store.savedPresets];
    updated[idx] = {
      name: baseName,
      config: structuredClone(toRaw(preset.config)),
    };
    store.savedPresets = updated;
  }
}

// --- Delete ---
function requestDelete(name: string) {
  deletingName.value = name;
}

function confirmDelete() {
  if (!deletingName.value) return;
  if (activePresetName.value === deletingName.value) {
    activePresetName.value = "";
  }
  store.deletePreset(deletingName.value);
  deletingName.value = null;
}

function cancelDelete() {
  deletingName.value = null;
}
</script>

<template>
  <div class="space-y-3">
    <!-- Empty state -->
    <div
      v-if="store.savedPresets.length === 0 && !showSaveInput"
      class="text-center py-4 space-y-2"
    >
      <UIcon
        name="i-lucide-bookmark"
        class="size-8 text-(--ui-text-dimmed) mx-auto"
        aria-hidden="true"
      />
      <p class="text-xs text-(--ui-text-muted)">No saved themes yet.</p>
      <UButton
        label="Save current theme"
        icon="i-lucide-plus"
        variant="soft"
        size="xs"
        @click="startSave"
      />
    </div>

    <!-- Saved themes list -->
    <ul v-if="store.savedPresets.length > 0" class="space-y-1" role="list">
      <li
        v-for="preset in store.savedPresets"
        :key="preset.name"
        class="group rounded-md border transition-colors"
        :class="
          activePresetName === preset.name
            ? 'border-(--ui-primary) bg-(--ui-primary)/5'
            : 'border-(--ui-border) hover:border-(--ui-border-accented)'
        "
      >
        <!-- Rename mode -->
        <div
          v-if="renamingName === preset.name"
          class="flex items-center gap-1 p-2"
        >
          <UInput
            v-model="renameInput"
            size="xs"
            class="flex-1"
            aria-label="New theme name"
            @keyup.enter="confirmRename"
            @keyup.escape="cancelRename"
          />
          <UTooltip text="Confirm rename">
            <UButton
              icon="i-lucide-check"
              aria-label="Confirm rename"
              color="primary"
              variant="soft"
              size="xs"
              @click="confirmRename"
            />
          </UTooltip>
          <UTooltip text="Cancel rename">
            <UButton
              icon="i-lucide-x"
              aria-label="Cancel rename"
              variant="ghost"
              size="xs"
              @click="cancelRename"
            />
          </UTooltip>
        </div>

        <!-- Normal mode -->
        <div v-else class="flex items-center gap-2 p-2">
          <button
            class="flex-1 flex items-center gap-2 min-w-0 text-left cursor-pointer"
            type="button"
            :aria-label="`Load theme: ${preset.name}`"
            @click="loadTheme(preset)"
          >
            <EditorPresetSwatches :config="preset.config" size="sm" />
            <span
              class="text-xs font-medium truncate"
              :class="
                activePresetName === preset.name
                  ? 'text-(--ui-primary)'
                  : 'text-(--ui-text-highlighted)'
              "
            >
              {{ preset.name }}
            </span>
          </button>

          <!-- Actions (visible on hover / focus-within) -->
          <div
            class="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
          >
            <UTooltip text="Rename">
              <UButton
                icon="i-lucide-pencil"
                aria-label="Rename theme"
                variant="ghost"
                color="neutral"
                size="xs"
                @click.stop="startRename(preset.name)"
              />
            </UTooltip>
            <UTooltip text="Duplicate">
              <UButton
                icon="i-lucide-copy"
                aria-label="Duplicate theme"
                variant="ghost"
                color="neutral"
                size="xs"
                @click.stop="duplicateTheme(preset)"
              />
            </UTooltip>
            <UTooltip text="Delete">
              <UButton
                icon="i-lucide-trash-2"
                aria-label="Delete theme"
                variant="ghost"
                color="error"
                size="xs"
                @click.stop="requestDelete(preset.name)"
              />
            </UTooltip>
          </div>
        </div>
      </li>
    </ul>

    <!-- Save new button (when themes exist) -->
    <UButton
      v-if="store.savedPresets.length > 0 && !showSaveInput"
      label="Save current theme"
      icon="i-lucide-plus"
      variant="soft"
      size="xs"
      block
      @click="startSave"
    />

    <!-- Save input row -->
    <div v-if="showSaveInput" class="space-y-2">
      <label
        for="save-theme-name"
        class="text-xs font-medium text-(--ui-text-muted)"
      >
        Theme name
      </label>
      <div class="flex gap-2 items-center">
        <UInput
          id="save-theme-name"
          v-model="saveInput"
          placeholder="My theme..."
          aria-label="Theme name"
          size="xs"
          class="flex-1"
          @keyup.enter="confirmSave"
          @keyup.escape="cancelSave"
        />
        <UButton
          :label="
            saveInput.trim() &&
            store.savedPresets.some((p) => p.name === saveInput.trim())
              ? 'Update'
              : 'Save'
          "
          color="primary"
          variant="solid"
          size="xs"
          :disabled="!saveInput.trim()"
          @click="confirmSave"
        />
        <UButton label="Cancel" variant="ghost" size="xs" @click="cancelSave" />
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <UModal
      :open="deletingName !== null"
      title="Delete theme"
      @close="cancelDelete"
    >
      <template #body>
        <p class="text-sm text-(--ui-text-default)">
          Are you sure you want to delete
          <strong class="text-(--ui-text-highlighted)"
            >"{{ deletingName }}"</strong
          >? This action cannot be undone.
        </p>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton label="Cancel" variant="ghost" @click="cancelDelete" />
          <UButton
            label="Delete"
            color="error"
            variant="solid"
            icon="i-lucide-trash-2"
            @click="confirmDelete"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>
