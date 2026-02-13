<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Color Palette"
      description="All semantic colors in the default solid variant."
      :prop-hints="['variant=solid']"
    >
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="color in colors"
          :key="color"
          :label="capitalize(color)"
          :color="color"
          variant="solid"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Style Variants"
      description="The same color displayed across all available variants."
      :prop-hints="['color=primary']"
    >
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="variant in variants"
          :key="variant"
          :label="capitalize(variant)"
          color="primary"
          :variant="variant"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Sizes"
      description="Available button sizes from extra-small to extra-large."
    >
      <div class="flex flex-wrap items-center gap-2">
        <UButton
          v-for="size in sizes"
          :key="size"
          :label="size.toUpperCase()"
          color="primary"
          variant="solid"
          :size="size"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Icon Buttons"
      description="Buttons with leading icons, trailing icons, and icon-only variants."
    >
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
          trailing
          color="secondary"
          variant="outline"
        />
        <UButton
          icon="i-lucide-heart"
          color="error"
          variant="soft"
          aria-label="Like"
        />
        <UButton
          icon="i-lucide-plus"
          color="primary"
          variant="solid"
          aria-label="Add"
        />
        <UButton
          icon="i-lucide-search"
          color="neutral"
          variant="ghost"
          aria-label="Search"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Button Group"
      description="Attached buttons for related actions using UButtonGroup."
    >
      <div class="flex flex-wrap gap-4">
        <UButtonGroup>
          <UButton
            label="Copy"
            icon="i-lucide-copy"
            color="neutral"
            variant="outline"
          />
          <UButton
            label="Share"
            icon="i-lucide-share-2"
            color="neutral"
            variant="outline"
          />
          <UButton
            label="Delete"
            icon="i-lucide-trash-2"
            color="neutral"
            variant="outline"
          />
        </UButtonGroup>
        <UButtonGroup>
          <UButton label="Save" color="primary" variant="solid" />
          <UButton
            icon="i-lucide-chevron-down"
            color="primary"
            variant="solid"
            aria-label="More save options"
          />
        </UButtonGroup>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Loading & Disabled States"
      description="Buttons in loading and disabled states to indicate unavailability."
      :prop-hints="['loading', 'disabled']"
    >
      <div class="flex flex-wrap items-center gap-2">
        <UButton label="Saving..." color="primary" variant="solid" loading />
        <UButton
          label="Processing..."
          color="secondary"
          variant="outline"
          loading
        />
        <UButton label="Disabled" color="neutral" variant="solid" disabled />
        <UButton label="Disabled" color="primary" variant="outline" disabled />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="CTA Pair"
      description="Primary action paired with a secondary ghost button — a common real-world pattern."
    >
      <div class="flex items-center gap-3">
        <UButton
          label="Get Started"
          icon="i-lucide-arrow-right"
          trailing
          color="primary"
          variant="solid"
          size="lg"
        />
        <UButton label="Learn More" color="neutral" variant="ghost" size="lg" />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Destructive Actions"
      description="Error-colored buttons for dangerous or irreversible operations."
    >
      <div class="flex flex-wrap items-center gap-2">
        <UButton
          label="Delete Account"
          icon="i-lucide-trash-2"
          color="error"
          variant="solid"
        />
        <UButton
          label="Remove"
          icon="i-lucide-x"
          color="error"
          variant="outline"
        />
        <UButton label="Cancel Subscription" color="error" variant="soft" />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Icon-Only Actions"
      description="Compact icon buttons typical of toolbars and action rows."
    >
      <div class="flex items-center gap-1">
        <UButton
          icon="i-lucide-bold"
          color="neutral"
          variant="ghost"
          aria-label="Bold"
        />
        <UButton
          icon="i-lucide-italic"
          color="neutral"
          variant="ghost"
          aria-label="Italic"
        />
        <UButton
          icon="i-lucide-underline"
          color="neutral"
          variant="ghost"
          aria-label="Underline"
        />
        <USeparator orientation="vertical" class="h-5 mx-1" />
        <UButton
          icon="i-lucide-align-left"
          color="neutral"
          variant="ghost"
          aria-label="Align left"
        />
        <UButton
          icon="i-lucide-align-center"
          color="neutral"
          variant="ghost"
          aria-label="Align center"
        />
        <UButton
          icon="i-lucide-align-right"
          color="neutral"
          variant="ghost"
          aria-label="Align right"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Link Style"
      description="Buttons that look like inline text links."
      :prop-hints="['variant=link']"
    >
      <div class="flex flex-wrap items-center gap-4">
        <UButton label="Read documentation" color="primary" variant="link" />
        <UButton label="View changelog" color="neutral" variant="link" />
        <UButton label="Report an issue" color="error" variant="link" />
      </div>
    </ShowcaseSpecimen>
  </div>
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
const variants = [
  "solid",
  "outline",
  "soft",
  "ghost",
  "link",
  "subtle",
] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
</script>
