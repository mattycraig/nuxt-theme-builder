<script setup lang="ts">
import type { RandomizeLockKey } from "~/types/theme";
import { RANDOMIZE_LOCK_KEYS } from "~/types/theme";
import { capitalize } from "~/utils/helpers";

/**
 * Random theme generator: one button rolls a new theme, and the checkboxes
 * below it choose which parts of the current theme a roll keeps.
 */
const locks = defineModel<RandomizeLockKey[]>({ required: true });

const emit = defineEmits<{ randomize: [] }>();

const items = RANDOMIZE_LOCK_KEYS.map((key) => ({
  label: capitalize(key),
  value: key,
}));

const hintId = useId();
</script>

<template>
  <div class="space-y-3">
    <UButton
      label="Generate random theme"
      icon="i-lucide-dices"
      color="primary"
      variant="soft"
      block
      @click="emit('randomize')"
    />

    <div>
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-xs font-medium" aria-hidden="true">
          Keep when randomizing
        </span>
        <UButton
          v-if="locks.length"
          label="Unlock all"
          icon="i-lucide-lock-open"
          variant="link"
          color="neutral"
          size="xs"
          class="p-0"
          @click="locks = []"
        />
      </div>
      <UCheckboxGroup
        v-model="locks"
        :items="items"
        legend="Keep when randomizing"
        size="sm"
        :aria-describedby="hintId"
        :ui="{
          legend: 'sr-only',
          fieldset: 'grid grid-cols-3 gap-x-2 gap-y-1.5',
        }"
      />
      <p :id="hintId" class="mt-2 text-xs text-(--ui-text-muted)">
        Ticked parts keep their light and dark values. A kept color also keeps
        its shades.
      </p>
    </div>
  </div>
</template>
