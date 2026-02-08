<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    collapsed: boolean;
    icon: string;
    label: string;
    defaultOpen?: boolean;
    open?: boolean;
  }>(),
  {
    defaultOpen: false,
    open: undefined,
  },
);

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const isControlled = computed(() => props.open !== undefined);

const internalOpen = ref(props.defaultOpen);

const isOpen = computed({
  get: () => (isControlled.value ? props.open! : internalOpen.value),
  set: (val: boolean) => {
    if (isControlled.value) {
      emit("update:open", val);
    } else {
      internalOpen.value = val;
    }
  },
});

watch(
  () => props.open,
  (val) => {
    if (val !== undefined) {
      internalOpen.value = val;
    }
  },
);
</script>

<template>
  <!-- Collapsed mode: icon button with popover -->
  <UPopover v-if="collapsed" :content="{ side: 'right', align: 'start' }">
    <UTooltip :text="label" :content="{ side: 'right' }">
      <UButton
        :icon="icon"
        :aria-label="label"
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
          <slot name="heading">{{ label }}</slot>
        </p>
        <slot />
      </div>
    </template>
  </UPopover>

  <!-- Expanded mode: collapsible section -->
  <UCollapsible v-else v-model:open="isOpen" class="px-3">
    <UButton
      :icon="icon"
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
        <slot name="heading">{{ label }}</slot>
      </span>
    </UButton>
    <template #content>
      <div class="px-2 pb-3 pt-1">
        <slot />
      </div>
    </template>
  </UCollapsible>
</template>
