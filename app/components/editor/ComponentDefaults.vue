<script setup lang="ts">
import type { ComponentDefaults, ComponentGroup } from "~/types/theme";
import { COMPONENT_DEFAULT_OPTIONS } from "~/types/theme";
import { capitalize } from "~/utils/helpers";

defineProps<{
  modelValue: ComponentDefaults | undefined;
}>();

const emit = defineEmits<{
  update: [group: ComponentGroup, prop: string, value: string | undefined];
  reset: [];
}>();

const idPrefix = useId();

/** Select value for "not set" (Reka's select items can't use an empty string). */
const UNSET = "default";

const GROUP_LABELS: Record<ComponentGroup, string> = {
  button: "Buttons",
  field: "Form fields",
  badge: "Badges",
  card: "Cards",
};

const groups = (Object.keys(COMPONENT_DEFAULT_OPTIONS) as ComponentGroup[]).map(
  (group) => ({
    group,
    label: GROUP_LABELS[group],
    props: Object.entries(
      COMPONENT_DEFAULT_OPTIONS[group] as Record<string, readonly string[]>,
    ).map(([prop, values]) => ({
      prop,
      label: capitalize(prop),
      items: [
        { label: "Default", value: UNSET },
        ...values.map((value) => ({ label: capitalize(value), value })),
      ],
    })),
  }),
);

function currentValue(
  defaults: ComponentDefaults | undefined,
  group: ComponentGroup,
  prop: string,
): string {
  return (defaults?.[group] as Record<string, string> | undefined)?.[prop] ?? UNSET;
}

function onChange(group: ComponentGroup, prop: string, value: unknown) {
  emit("update", group, prop, value === UNSET ? undefined : String(value));
}
</script>

<template>
  <div class="space-y-4">
    <p class="text-xs text-(--ui-text-muted)">
      Set the color, variant, and size components use when a page doesn't
      choose one. Shown in the preview and included in the app.config.ts
      export.
    </p>

    <fieldset v-for="g in groups" :key="g.group" class="space-y-1.5">
      <legend class="text-xs font-medium mb-1.5">{{ g.label }}</legend>
      <div class="grid grid-cols-3 gap-2">
        <div v-for="p in g.props" :key="p.prop" class="min-w-0">
          <label
            :for="`${idPrefix}-${g.group}-${p.prop}`"
            class="text-[11px] text-(--ui-text-muted) mb-0.5 block"
          >
            {{ p.label }}
          </label>
          <USelect
            :id="`${idPrefix}-${g.group}-${p.prop}`"
            :model-value="currentValue(modelValue, g.group, p.prop)"
            :items="p.items"
            :aria-label="`${g.label} ${p.label.toLowerCase()}`"
            size="sm"
            class="w-full"
            @update:model-value="onChange(g.group, p.prop, $event)"
          />
        </div>
      </div>
    </fieldset>

    <UButton
      v-if="modelValue"
      label="Reset component defaults"
      icon="i-lucide-rotate-ccw"
      color="neutral"
      variant="ghost"
      size="xs"
      @click="emit('reset')"
    />
  </div>
</template>
