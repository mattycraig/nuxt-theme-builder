<template>
  <section>
    <h2 class="text-lg font-semibold mb-4">Buttons</h2>

    <!-- Solid -->
    <p class="text-sm text-(--ui-text-muted) mb-2">Solid</p>
    <div class="flex flex-wrap gap-2 mb-4">
      <UButton
        v-for="color in colors"
        :key="color"
        :label="capitalize(color)"
        :color="color"
        variant="solid"
      />
    </div>

    <!-- Outline -->
    <p class="text-sm text-(--ui-text-muted) mb-2">Outline</p>
    <div class="flex flex-wrap gap-2 mb-4">
      <UButton
        v-for="color in colors"
        :key="color"
        :label="capitalize(color)"
        :color="color"
        variant="outline"
      />
    </div>

    <!-- Soft -->
    <p class="text-sm text-(--ui-text-muted) mb-2">Soft</p>
    <div class="flex flex-wrap gap-2 mb-4">
      <UButton
        v-for="color in colors"
        :key="color"
        :label="capitalize(color)"
        :color="color"
        variant="soft"
      />
    </div>

    <!-- Sizes -->
    <p class="text-sm text-(--ui-text-muted) mb-2">Sizes</p>
    <div class="flex flex-wrap items-center gap-2 mb-4">
      <UButton
        v-for="size in sizes"
        :key="size"
        :label="size.toUpperCase()"
        color="primary"
        variant="solid"
        :size="size"
      />
    </div>

    <!-- Special states -->
    <p class="text-sm text-(--ui-text-muted) mb-2">Icons &amp; States</p>
    <div class="flex flex-wrap items-center gap-2">
      <UButton
        label="Settings"
        icon="i-lucide-settings"
        color="primary"
        variant="solid"
      />
      <UButton
        label="Download"
        icon="i-lucide-download"
        color="secondary"
        variant="outline"
      />
      <UButton label="Disabled" color="neutral" variant="solid" disabled />
      <UButton label="Loading" color="primary" variant="solid" loading />
      <UButton
        icon="i-lucide-heart"
        color="error"
        variant="ghost"
        aria-label="Like"
      />
      <UButton label="Link style" color="primary" variant="link" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { capitalize } from "~/utils/helpers";

const colors = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
</script>
