<script setup lang="ts">
type LogoSize = "sm" | "md" | "lg";

const props = withDefaults(
  defineProps<{
    size?: LogoSize;
    linked?: boolean;
  }>(),
  {
    size: "md",
    linked: true,
  },
);

const sizeClasses: Record<LogoSize, { container: string; icon: string }> = {
  sm: { container: "size-6 rounded-sm shadow-sm", icon: "size-3.5" },
  md: { container: "size-8 rounded-md shadow-md", icon: "size-4.5" },
  lg: { container: "size-10 rounded-lg shadow-lg", icon: "size-5.5" },
};

const containerClass = computed(
  () =>
    `group ${sizeClasses[props.size].container} bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-secondary)] flex items-center justify-center shadow-(--ui-primary)/15 transition-all duration-300 ease-out hover:scale-110 hover:shadow-lg hover:shadow-(--ui-primary)/30 hover:rotate-3 active:scale-95 hover:from-[var(--ui-secondary)] hover:to-[var(--ui-primary)]`,
);

const iconClass = computed(
  () =>
    `iconify i-lucide:palette ${sizeClasses[props.size].icon} text-inverted transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110`,
);
</script>

<template>
  <NuxtLink
    v-if="linked"
    to="/"
    aria-label="Go to homepage"
    :class="containerClass"
  >
    <span :class="iconClass" aria-hidden="true" />
  </NuxtLink>
  <div v-else :class="containerClass">
    <span :class="iconClass" aria-hidden="true" />
  </div>
</template>
