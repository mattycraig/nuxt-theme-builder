<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import type { RandomizeLockKey } from "~/types/theme";
import { RANDOMIZE_LOCK_KEYS } from "~/types/theme";
import { capitalize } from "~/utils/helpers";

/**
 * Split button: the main half generates a random theme, the menu half
 * chooses which parts of the current theme randomize keeps.
 */
const locks = defineModel<RandomizeLockKey[]>({ required: true });

const emit = defineEmits<{ randomize: [] }>();

function toggle(key: RandomizeLockKey) {
  locks.value = locks.value.includes(key)
    ? locks.value.filter((k) => k !== key)
    : [...locks.value, key];
}

const items = computed<DropdownMenuItem[][]>(() => [
  [{ label: "Keep when randomizing", type: "label" }],
  RANDOMIZE_LOCK_KEYS.map((key) => ({
    label: capitalize(key),
    type: "checkbox" as const,
    checked: locks.value.includes(key),
    // Keep the menu open so several parts can be locked in a row
    onSelect: (e: Event) => e.preventDefault(),
    onUpdateChecked: () => toggle(key),
  })),
  [
    {
      label: "Unlock all",
      icon: "i-lucide-lock-open",
      disabled: locks.value.length === 0,
      onSelect: () => {
        locks.value = [];
      },
    },
  ],
]);

const menuLabel = computed(() =>
  locks.value.length
    ? `Choose what randomize keeps (${locks.value.length} locked)`
    : "Choose what randomize keeps",
);
</script>

<template>
  <UFieldGroup role="group" aria-label="Random theme">
    <UTooltip text="Generate random theme">
      <UButton
        icon="i-lucide-dices"
        aria-label="Generate random theme"
        variant="outline"
        color="neutral"
        size="md"
        @click="emit('randomize')"
      />
    </UTooltip>
    <UDropdownMenu :items="items" :content="{ align: 'end' }">
      <UTooltip text="Keep parts when randomizing">
        <UButton
          :icon="locks.length ? 'i-lucide-lock' : 'i-lucide-lock-open'"
          :label="locks.length ? String(locks.length) : undefined"
          trailing-icon="i-lucide-chevron-down"
          :aria-label="menuLabel"
          :color="locks.length ? 'primary' : 'neutral'"
          variant="outline"
          size="md"
          :ui="{ trailingIcon: 'size-3.5' }"
        />
      </UTooltip>
    </UDropdownMenu>
  </UFieldGroup>
</template>
