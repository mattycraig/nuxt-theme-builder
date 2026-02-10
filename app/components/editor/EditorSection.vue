<script setup lang="ts">
const props = withDefaults(
  defineProps<{
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
  <UCollapsible v-model:open="isOpen" class="px-3">
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
      <div class="px-2 pb-3 pt-2">
        <slot />
      </div>
    </template>
  </UCollapsible>
</template>
