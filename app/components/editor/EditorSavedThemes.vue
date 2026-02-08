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

const emit = defineEmits<{
  save: [];
}>();

const statusMessage = ref("");

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
    const now = Date.now();
    const updated = [...store.savedPresets];
    updated[idx] = {
      name: baseName,
      config: structuredClone(toRaw(preset.config)),
      createdAt: now,
      updatedAt: now,
    };
    store.savedPresets = updated;
  }
  toast.add({
    title: "Theme duplicated",
    description: `Created "${baseName}"`,
    icon: "i-lucide-copy",
    color: "success",
  });
  statusMessage.value = `Theme duplicated as "${baseName}"`;
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
  deletingName.value = null;
  toast.add({
    title: "Theme deleted",
    description: `"${name}" removed`,
    icon: "i-lucide-trash-2",
    color: "error",
  });
  statusMessage.value = `Theme "${name}" deleted`;
}

function cancelDelete() {
  deletingName.value = null;
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
        label: "Export JSON",
        icon: "i-lucide-download",
        onSelect: () => exportThemeJSON(preset),
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
      class="text-center py-6 space-y-3"
    >
      <UIcon
        name="i-lucide-bookmark"
        class="size-8 text-(--ui-text-dimmed) mx-auto"
        aria-hidden="true"
      />
      <p class="text-xs text-(--ui-text-muted)">No saved themes yet.</p>
      <UButton
        label="Save current theme"
        icon="i-lucide-save"
        variant="soft"
        color="primary"
        size="xs"
        @click="emit('save')"
      />
    </div>

    <!-- Saved themes list -->
    <ul v-if="store.savedPresets.length > 0" class="space-y-1" role="list">
      <li
        v-for="preset in store.savedPresets"
        :key="preset.name"
        class="rounded-lg border p-2 transition-all duration-150 group"
        :class="
          isActive(preset)
            ? 'border-(--ui-primary)/40 bg-(--ui-primary)/5'
            : 'border-(--ui-border) hover:border-(--ui-border-accented) hover:bg-(--ui-bg-elevated)/50'
        "
      >
        <!-- Top row: swatches, name, menu -->
        <div class="flex items-center gap-2 min-w-0">
          <button
            type="button"
            class="flex items-center gap-2 min-w-0 flex-1 cursor-pointer text-left"
            :aria-label="`Load theme: ${preset.name}${isActive(preset) ? ' (active)' : ''}${isActive(preset) && store.hasUnsavedChanges ? ', modified' : ''}`"
            @click="loadTheme(preset)"
          >
            <EditorPresetSwatches
              :config="preset.config"
              size="sm"
              class="shrink-0"
            />
            <span
              class="text-xs font-medium truncate"
              :class="
                isActive(preset)
                  ? 'text-(--ui-primary)'
                  : 'text-(--ui-text-highlighted)'
              "
            >
              {{ preset.name }}
            </span>
          </button>

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

        <!-- Bottom row: metadata + status -->
        <div class="flex items-center justify-between gap-2 mt-1.5">
          <span
            class="text-[11px] text-(--ui-text-dimmed) flex items-center gap-1 truncate"
          >
            <span class="truncate">{{ preset.config.font }}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{{ preset.config.radius }}</span>
            <template v-if="preset.updatedAt">
              <span aria-hidden="true">&middot;</span>
              <span :title="new Date(preset.updatedAt).toLocaleString()">{{
                timeAgo(preset.updatedAt)
              }}</span>
            </template>
          </span>

          <span
            v-if="isActive(preset)"
            class="flex items-center gap-1 shrink-0"
          >
            <UBadge
              v-if="store.hasUnsavedChanges"
              label="Modified"
              color="warning"
              variant="soft"
              size="xs"
            />
            <UBadge
              v-else
              label="Active"
              color="primary"
              variant="subtle"
              size="xs"
            />
          </span>
        </div>
      </li>
    </ul>

    <!-- Rename modal -->
    <UModal
      :open="renameModalOpen"
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
              size="sm"
              autofocus
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
      :open="deletingName !== null"
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
