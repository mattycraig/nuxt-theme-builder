<script setup lang="ts">
import type { ThemePreset } from "~/types/theme";
import { timeAgo } from "~/utils/helpers";

const store = useThemeStore();
const toast = useToast();
const { downloadFile } = useThemeExport();

const renameModalOpen = ref(false);
const renameTarget = ref<string | null>(null);
const renameInput = ref("");
const renameError = ref("");

const deletingName = ref<string | null>(null);
const deleteModalOpen = computed({
  get: () => deletingName.value !== null,
  set: (val: boolean) => {
    if (!val) deletingName.value = null;
  },
});

const statusMessage = ref("");

const exportPanel = useExportPanel();

function loadTheme(preset: ThemePreset) {
  store.loadPreset(preset);
  toast.add({
    title: "Theme loaded",
    description: `"${preset.name}" applied`,
    icon: "i-lucide-check",
    color: "success",
  });
  statusMessage.value = `Theme "${preset.name}" loaded`;
}

function openRenameModal(name: string) {
  renameTarget.value = name;
  renameInput.value = name;
  renameError.value = "";
  renameModalOpen.value = true;
}

function confirmRename() {
  if (!renameTarget.value) return;
  const result = store.renamePreset(renameTarget.value, renameInput.value);
  if (result.success) {
    toast.add({
      title: "Theme renamed",
      description: `"${renameTarget.value}" → "${renameInput.value.trim()}"`,
      icon: "i-lucide-pencil",
      color: "success",
    });
    statusMessage.value = `Theme renamed to "${renameInput.value.trim()}"`;
    closeRenameModal();
  } else {
    renameError.value = result.error ?? "Rename failed";
  }
}

function closeRenameModal() {
  renameModalOpen.value = false;
  renameTarget.value = null;
  renameInput.value = "";
  renameError.value = "";
}

function duplicateTheme(preset: ThemePreset) {
  const { newName } = store.duplicatePreset(preset.name);
  toast.add({
    title: "Theme duplicated",
    description: `Created "${newName}"`,
    icon: "i-lucide-copy",
    color: "success",
  });
  statusMessage.value = `Theme duplicated as "${newName}"`;
}

function exportThemeJSON(preset: ThemePreset) {
  const json = JSON.stringify(preset.config, null, 2);
  downloadFile(json, `${preset.name}.json`, "application/json");
  toast.add({
    title: "Theme exported",
    description: `Downloaded "${preset.name}.json"`,
    icon: "i-lucide-download",
    color: "info",
  });
}

function requestDelete(name: string) {
  deletingName.value = name;
}

function confirmDelete() {
  if (!deletingName.value) return;
  const name = deletingName.value;
  store.deletePreset(name);
  deleteModalOpen.value = false;
  toast.add({
    title: "Theme deleted",
    description: `"${name}" removed`,
    icon: "i-lucide-trash-2",
    color: "error",
  });
  statusMessage.value = `Theme "${name}" deleted`;
}

function cancelDelete() {
  deleteModalOpen.value = false;
}

function isActive(preset: ThemePreset) {
  return store.activePresetName === preset.name;
}

function getDropdownItems(preset: ThemePreset) {
  return [
    [
      {
        label: "Load theme",
        icon: "i-lucide-upload",
        onSelect: () => loadTheme(preset),
      },
    ],
    [
      {
        label: "Rename",
        icon: "i-lucide-pencil",
        onSelect: () => openRenameModal(preset.name),
      },
      {
        label: "Duplicate",
        icon: "i-lucide-copy",
        onSelect: () => duplicateTheme(preset),
      },
      {
        label: "Download JSON",
        icon: "i-lucide-download",
        onSelect: () => exportThemeJSON(preset),
      },
      {
        label: "Export theme",
        icon: "i-lucide-import",
        onSelect: () => {
          loadTheme(preset);
          exportPanel.open();
        },
      },
    ],
    [
      {
        label: "Delete",
        icon: "i-lucide-trash-2",
        color: "error" as const,
        onSelect: () => requestDelete(preset.name),
      },
    ],
  ];
}
</script>

<template>
  <div class="space-y-3">
    <!-- Screen reader status announcements -->
    <div class="sr-only" aria-live="polite" aria-atomic="true">
      {{ statusMessage }}
    </div>

    <!-- Empty state -->
    <div
      v-if="store.savedPresets.length === 0"
      class="text-center py-6 space-y-2"
    >
      <UIcon
        name="i-lucide-bookmark"
        class="size-8 text-(--ui-text-dimmed) mx-auto"
        aria-hidden="true"
      />
      <p class="text-sm">No saved themes yet.</p>
      <p class="text-xs text-(--ui-text-muted)">
        Use the
        <span class="inline-flex items-center align-text-bottom">
          <UIcon
            name="i-lucide-save"
            class="size-3.5 mx-0.5"
            aria-hidden="true"
          />
        </span>
        <span class="font-medium">Save</span> button in the toolbar to save your
        current theme, or use the presets below.
      </p>
    </div>

    <!-- Saved themes list -->
    <ul v-if="store.savedPresets.length > 0" class="space-y-1" role="list">
      <li
        v-for="preset in store.savedPresets"
        :key="preset.name"
        class="relative group rounded-lg transition-all duration-150 flex items-center justify-between"
        :class="
          isActive(preset)
            ? 'bg-(--ui-primary)/5 ring-1 ring-inset ring-(--ui-primary)/20'
            : 'hover:bg-(--ui-bg-elevated)/50'
        "
      >
        <button
          type="button"
          class="text-left p-2 cursor-pointer rounded-lg flex items-center min-w-0 flex-1"
          :title="
            preset.updatedAt
              ? `Last updated ${timeAgo(preset.updatedAt)}`
              : undefined
          "
          :aria-label="`Load theme: ${preset.name}${isActive(preset) ? ' (active)' : ''}${isActive(preset) && store.hasUnsavedChanges ? ', edited' : ''}`"
          @click="loadTheme(preset)"
        >
          <!-- Palette strip(s) -->
          <EditorSwatchStrip :config="preset.config" class="mr-3" />

          <!-- Name -->
          <span
            class="text-xs font-medium truncate"
            :class="
              isActive(preset)
                ? 'text-(--ui-text-default) font-semibold'
                : 'text-(--ui-text-muted) '
            "
          >
            {{ preset.name }}
          </span>
        </button>

        <!-- Status badge -->
        <span
          v-if="isActive(preset) && store.hasUnsavedChanges"
          class="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-(--ui-color-warning-500) animate-pulse pointer-events-none"
          role="status"
          :aria-label="`${preset.name}: unsaved changes`"
        />
        <span
          v-else-if="isActive(preset)"
          class="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-(--ui-color-success-500) animate-pulse pointer-events-none"
          role="status"
          :aria-label="`${preset.name}: active`"
        />

        <!-- Dropdown menu -->
        <div class="px-2 flex items-center">
          <UDropdownMenu :items="getDropdownItems(preset)">
            <UButton
              icon="i-lucide-ellipsis"
              :aria-label="`Actions for ${preset.name}`"
              variant="ghost"
              color="neutral"
              size="xs"
              @click.stop
            />
          </UDropdownMenu>
        </div>
      </li>
    </ul>

    <!-- Rename modal -->
    <UModal
      v-model:open="renameModalOpen"
      title="Rename theme"
      :description="`Rename &quot;${renameTarget}&quot; to a new name.`"
      @close="closeRenameModal"
    >
      <template #body>
        <div class="space-y-3">
          <div>
            <label
              for="rename-modal-name"
              class="text-xs font-medium text-(--ui-text-muted) block mb-1.5"
            >
              New name
            </label>
            <UInput
              id="rename-modal-name"
              v-model="renameInput"
              placeholder="Theme name..."
              :aria-label="`Rename theme: ${renameTarget}`"
              :aria-invalid="renameError ? true : undefined"
              :aria-describedby="renameError ? 'rename-modal-error' : undefined"
              size="lg"
              autofocus
              class="w-full"
              @keyup.enter="confirmRename"
              @keyup.escape="closeRenameModal"
            />
          </div>
          <p
            v-if="renameError"
            id="rename-modal-error"
            class="text-xs text-(--ui-color-error-500) flex items-center gap-1.5 px-2.5 py-2 rounded-md bg-(--ui-color-error-500)/8"
            role="alert"
          >
            <UIcon
              name="i-lucide-alert-circle"
              class="size-3.5 shrink-0"
              aria-hidden="true"
            />
            {{ renameError }}
          </p>
        </div>
      </template>
      <template #footer>
        <div class="flex gap-2 justify-end ml-auto">
          <UButton label="Cancel" variant="ghost" @click="closeRenameModal" />
          <UButton
            label="Rename"
            color="primary"
            variant="solid"
            icon="i-lucide-pencil"
            :disabled="
              !renameInput.trim() || renameInput.trim() === renameTarget
            "
            @click="confirmRename"
          />
        </div>
      </template>
    </UModal>

    <!-- Delete confirmation modal -->
    <UModal
      v-model:open="deleteModalOpen"
      title="Delete theme"
      :description="`Permanently delete the theme '${deletingName}'.`"
      @close="cancelDelete"
    >
      <template #body>
        <p
          id="delete-confirm-description"
          class="text-sm text-(--ui-text-default)"
        >
          Are you sure you want to delete
          <strong class="text-(--ui-text-highlighted)"
            >"{{ deletingName }}"</strong
          >? This action cannot be undone.
        </p>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2 ml-auto">
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
