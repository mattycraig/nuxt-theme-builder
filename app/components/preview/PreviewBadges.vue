<template>
  <section>
    <h3 class="text-lg font-semibold mb-4">Badges</h3>

    <div v-for="variant in variants" :key="variant" class="mb-3">
      <p class="text-sm text-(--ui-text-muted) mb-2">
        {{ capitalize(variant) }}
      </p>
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="color in colors"
          :key="color"
          :label="capitalize(color)"
          :color="color"
          :variant="variant"
        />
      </div>
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
  "neutral",
] as const;
const variants = ["solid", "outline", "soft", "subtle"] as const;
</script>
