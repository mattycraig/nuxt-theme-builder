<script setup lang="ts">
withDefaults(
  defineProps<{
    collapsed: boolean;
    icon: string;
    label: string;
    defaultOpen?: boolean;
  }>(),
  {
    defaultOpen: false,
  },
);
</script>

<template>
  <!-- Collapsed mode: icon button with popover -->
  <UPopover
    v-if="collapsed"
    :content="{ side: 'right', align: 'start' }"
  >
    <UTooltip :text="label" :content="{ side: 'right' }">
      <UButton
        :icon="icon"
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
  <UCollapsible v-else :default-open="defaultOpen">
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
