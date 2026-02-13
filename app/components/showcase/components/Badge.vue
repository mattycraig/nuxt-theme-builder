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

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Color Palette"
      description="All semantic badge colors in the default solid variant."
      :prop-hints="['variant=solid']"
    >
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="color in colors"
          :key="color"
          :label="capitalize(color)"
          :color="color"
          variant="solid"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Outline Variant"
      description="Bordered badges with transparent fill."
      :prop-hints="['variant=outline']"
    >
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="color in colors"
          :key="color"
          :label="capitalize(color)"
          :color="color"
          variant="outline"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Soft Variant"
      description="Muted background with matching foreground color."
      :prop-hints="['variant=soft']"
    >
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="color in colors"
          :key="color"
          :label="capitalize(color)"
          :color="color"
          variant="soft"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Subtle Variant"
      description="Minimal emphasis for inline labeling."
      :prop-hints="['variant=subtle']"
    >
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="color in colors"
          :key="color"
          :label="capitalize(color)"
          :color="color"
          variant="subtle"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Sizes"
      description="Badge rendered at each available size."
      :prop-hints="['size']"
    >
      <div class="flex items-center gap-2">
        <UBadge label="Extra Small" size="xs" />
        <UBadge label="Small" size="sm" />
        <UBadge label="Medium" size="md" />
        <UBadge label="Large" size="lg" />
        <UBadge label="Extra Large" size="xl" />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Icons"
      description="Badges paired with leading icons for contextual labels."
    >
      <div class="flex flex-wrap gap-2">
        <UBadge
          label="Online"
          color="success"
          variant="soft"
          icon="i-lucide-circle-check"
        />
        <UBadge
          label="Pending"
          color="warning"
          variant="soft"
          icon="i-lucide-clock"
        />
        <UBadge
          label="Error"
          color="error"
          variant="soft"
          icon="i-lucide-alert-triangle"
        />
        <UBadge label="Info" color="info" variant="soft" icon="i-lucide-info" />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Status Labels"
      description="Real-world status badges as they might appear in a list or table."
    >
      <div class="flex flex-wrap gap-2">
        <UBadge label="Published" color="success" variant="soft" />
        <UBadge label="Draft" color="neutral" variant="soft" />
        <UBadge label="Under Review" color="warning" variant="soft" />
        <UBadge label="Archived" color="neutral" variant="outline" />
        <UBadge label="Rejected" color="error" variant="soft" />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="All Variants × Primary"
      description="Compare all four variant styles side-by-side using the primary color."
    >
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="variant in variants"
          :key="variant"
          :label="capitalize(variant)"
          color="primary"
          :variant="variant"
        />
      </div>
    </ShowcaseSpecimen>
  </div>
</template>
