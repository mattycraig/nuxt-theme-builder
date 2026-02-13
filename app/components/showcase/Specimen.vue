<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
  propHints?: string[];
}>();
</script>

<template>
  <section class="specimen">
    <div class="mb-3">
      <h3 class="text-sm font-semibold text-(--ui-text-highlighted)">
        {{ title }}
      </h3>
      <p v-if="description" class="text-xs text-(--ui-text-muted) mt-0.5">
        {{ description }}
      </p>
    </div>

    <div
      class="specimen-demo relative rounded-lg border border-(--ui-border) bg-(--ui-bg) p-4 sm:p-6 inset-shadow-sm"
    >
      <!-- Subtle dot pattern background for visual isolation -->
      <div
        class="pointer-events-none absolute inset-0 rounded-lg opacity-[0.1] dark:opacity-[0.07]"
        aria-hidden="true"
        :style="{
          backgroundImage:
            'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }"
      />
      <div class="relative">
        <slot />
      </div>
    </div>

    <div v-if="propHints?.length" class="mt-2 flex flex-wrap gap-1.5">
      <UBadge
        v-for="hint in propHints"
        :key="hint"
        :label="hint"
        variant="subtle"
        color="neutral"
        size="xs"
      />
    </div>
  </section>
</template>
