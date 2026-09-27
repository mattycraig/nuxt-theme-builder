<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Storage Breakdown"
      description="One bar split into segments, with a legend listing each part."
      :prop-hints="['items', 'max']"
    >
      <UProgressGroup :items="storage" :max="128" class="max-w-md" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Status"
      description="Summed percentage displayed above the bar."
      :prop-hints="['status']"
    >
      <UProgressGroup :items="usage" status class="max-w-md" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Semantic Colors"
      description="A segment for every semantic color role."
      :prop-hints="['items[].color']"
    >
      <UProgressGroup :items="semantic" class="max-w-md" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Primary Shades"
      description="Segments colored with CSS values, here the primary palette's shades."
      :prop-hints="['items[].color']"
    >
      <UProgressGroup :items="shades" status class="max-w-md" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Sizes"
      description="Track thickness from 2xs to 2xl."
      :prop-hints="['size']"
    >
      <div class="space-y-4 max-w-md">
        <div v-for="size in sizes" :key="size">
          <p class="text-xs text-(--ui-text-muted) mb-1">{{ size }}</p>
          <UProgressGroup
            :items="usage"
            :size="size"
            :ui="{ list: 'hidden' }"
          />
        </div>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Vertical"
      description="Stacked vertically for compact dashboards."
      :prop-hints="['orientation']"
    >
      <UProgressGroup :items="storage" :max="128" orientation="vertical" class="h-48" />
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
import type { ProgressGroupItem } from "@nuxt/ui";

const storage = [
  { label: "System", value: 24, color: "neutral", icon: "i-lucide-cog" },
  { label: "Apps", value: 8, color: "error", icon: "i-lucide-app-window" },
  { label: "Documents", value: 12, color: "warning", icon: "i-lucide-file" },
  { label: "Multimedia", value: 42, color: "success", icon: "i-lucide-film" },
] satisfies ProgressGroupItem[];

const usage = [
  { label: "Compute", value: 42, color: "primary" },
  { label: "Storage", value: 18, color: "info" },
  { label: "Bandwidth", value: 9, color: "warning" },
] satisfies ProgressGroupItem[];

const semantic = [
  { label: "Primary", value: 20, color: "primary" },
  { label: "Secondary", value: 16, color: "secondary" },
  { label: "Success", value: 14, color: "success" },
  { label: "Info", value: 12, color: "info" },
  { label: "Warning", value: 10, color: "warning" },
  { label: "Error", value: 8, color: "error" },
  { label: "Neutral", value: 6, color: "neutral" },
] satisfies ProgressGroupItem[];

const shades = [
  { label: "Completed", value: 48, color: "var(--ui-color-primary-700)" },
  { label: "In review", value: 22, color: "var(--ui-color-primary-500)" },
  { label: "Queued", value: 12, color: "var(--ui-color-primary-300)" },
] satisfies ProgressGroupItem[];

const sizes = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;
</script>
