<script setup lang="ts">
/**
 * A small sheet of real Nuxt UI components on the homepage. It uses the
 * current theme like any other page, so editor changes and the example
 * prompts repaint it immediately.
 */
const store = useThemeStore();

const themeLabel = computed(() => store.activePresetName || "Custom theme");

const workspaceName = ref("Acme Studio");
const emailAlerts = ref(true);
const weeklyDigest = ref(false);
const storageUsed = ref(64);

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

const statuses = [
  { label: "Paid", color: "success" },
  { label: "Synced", color: "info" },
  { label: "Pending", color: "warning" },
  { label: "Failed", color: "error" },
] as const;
</script>

<template>
  <figure class="flex flex-col gap-3" aria-label="Live theme preview">
    <UCard
      class="shadow-xl shadow-(--ui-primary)/5"
      :ui="{ body: 'flex flex-col gap-5' }"
    >
      <template #header>
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <UAvatar
              text="AS"
              size="md"
              :ui="{
                root: 'bg-(--ui-primary)',
                fallback: 'text-(--ui-bg) font-semibold',
              }"
            />
            <div class="min-w-0">
              <p class="text-sm font-semibold text-(--ui-text-highlighted) truncate">
                Acme Studio
              </p>
              <p class="text-xs text-(--ui-text-muted)">Workspace settings</p>
            </div>
          </div>
          <UBadge :label="themeLabel" color="primary" variant="subtle" />
        </div>
      </template>

      <UFormField label="Workspace name" name="specimen-workspace">
        <UInput
          v-model="workspaceName"
          icon="i-lucide-building-2"
          class="w-full"
        />
      </UFormField>

      <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
        <USwitch v-model="emailAlerts" label="Email alerts" />
        <UCheckbox v-model="weeklyDigest" label="Weekly digest" />
      </div>

      <UAlert
        color="primary"
        variant="subtle"
        icon="i-lucide-circle-check"
        title="Theme saved"
        description="Export it as app.config.ts, CSS variables, or JSON."
      />

      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between text-xs">
          <span class="text-(--ui-text-muted)">Storage</span>
          <span class="font-medium text-(--ui-text-highlighted) tabular-nums">
            {{ storageUsed }}%
          </span>
        </div>
        <UProgress v-model="storageUsed" aria-label="Storage used" />
      </div>

      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="status in statuses"
          :key="status.label"
          :label="status.label"
          :color="status.color"
          variant="soft"
        />
      </div>

      <template #footer>
        <div class="flex flex-wrap justify-end gap-2">
          <UButton label="Cancel" color="neutral" variant="ghost" />
          <UButton label="Preview" color="secondary" variant="soft" />
          <UButton label="Save changes" color="primary" />
        </div>
      </template>
    </UCard>

    <figcaption class="flex flex-col gap-1.5">
      <div
        class="flex h-4 overflow-hidden rounded-(--ui-radius)"
        aria-hidden="true"
      >
        <span
          v-for="shade in SHADES"
          :key="shade"
          class="flex-1"
          :style="{ background: `var(--ui-color-primary-${shade})` }"
        />
      </div>
      <div
        class="flex justify-between font-mono text-[11px] text-(--ui-text-dimmed)"
      >
        <span>primary-50</span>
        <span>500</span>
        <span>950</span>
      </div>
    </figcaption>
  </figure>
</template>
