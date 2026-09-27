<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Rating"
      description="Star rating input bound with v-model."
      :prop-hints="['v-model']"
    >
      <UFormField label="How was your stay?">
        <UInputRating v-model="rating" />
      </UFormField>
      <p class="text-xs text-(--ui-text-muted) mt-1">
        Value: {{ rating }} / 5
      </p>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Half Steps & Hover Preview"
      description="Half-star granularity with a live preview while hovering."
      :prop-hints="['step', 'hoverable', 'clearable']"
    >
      <!-- Reka's half-step indicators read document.activeElement on first render, so SSR can't match -->
      <ClientOnly>
        <UInputRating
          v-model="halfRating"
          :step="0.5"
          hoverable
          clearable
          size="lg"
        />
        <template #fallback>
          <div class="h-6" />
        </template>
      </ClientOnly>
      <p class="text-xs text-(--ui-text-muted) mt-1">
        Value: {{ halfRating }} (click the current value to clear)
      </p>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Colors"
      description="Filled icons take each semantic color role."
      :prop-hints="['color']"
    >
      <div class="space-y-3">
        <div
          v-for="color in colors"
          :key="color"
          class="flex items-center gap-3"
        >
          <span class="w-20 text-xs text-(--ui-text-muted)">{{ color }}</span>
          <UInputRating :color="color" :default-value="4" />
        </div>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Sizes"
      description="Rating icons from xs to xl."
      :prop-hints="['size']"
    >
      <div class="space-y-3">
        <div v-for="size in sizes" :key="size" class="flex items-center gap-3">
          <span class="w-20 text-xs text-(--ui-text-muted)">{{ size }}</span>
          <UInputRating :size="size" :default-value="3" />
        </div>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Custom Icons"
      description="Swap the star for any icon, with a separate empty icon."
      :prop-hints="['icon', 'empty-icon', 'length']"
    >
      <div class="flex flex-col items-start gap-3">
        <UInputRating icon="i-lucide-heart" color="error" :default-value="4" />
        <UInputRating
          icon="i-lucide-circle-check"
          empty-icon="i-lucide-circle"
          color="success"
          :length="10"
          :default-value="7"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Readonly & Disabled"
      description="Display a score without interaction, or disable input."
      :prop-hints="['readonly', 'disabled']"
    >
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <UInputRating :default-value="4.5" readonly size="sm" />
          <span class="text-sm font-medium">4.5</span>
          <span class="text-xs text-(--ui-text-muted)">(1,284 reviews)</span>
        </div>
        <UInputRating :default-value="3" disabled />
      </div>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const rating = ref(4);
const halfRating = ref(3.5);

const colors = [
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
  "neutral",
] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
</script>
