<script setup lang="ts">
import helpMd from "~/data/help.md?raw";

const tocLinks = [
  { label: "Getting Started", to: "#getting-started", icon: "i-lucide-rocket" },
  {
    label: "Editor Sidebar",
    to: "#editor-sidebar",
    icon: "i-lucide-panel-left",
  },
  {
    label: "Keyboard Shortcuts",
    to: "#keyboard-shortcuts",
    icon: "i-lucide-keyboard",
  },
  {
    label: "Exporting Your Theme",
    to: "#exporting-your-theme",
    icon: "i-lucide-download",
  },
  {
    label: "Importing Themes",
    to: "#importing-themes",
    icon: "i-lucide-upload",
  },
  {
    label: "Saving and Managing",
    to: "#saving-and-managing-themes",
    icon: "i-lucide-save",
  },
  {
    label: "Built-in Presets",
    to: "#built-in-presets",
    icon: "i-lucide-swatch-book",
  },
  { label: "Preview Pages", to: "#preview-pages", icon: "i-lucide-eye" },
  {
    label: "Shade Overrides",
    to: "#shade-overrides",
    icon: "i-lucide-sliders-vertical",
  },
  {
    label: "FAQ",
    to: "#frequently-asked-questions",
    icon: "i-lucide-circle-help",
  },
];
</script>

<template>
  <UPage>
    <UContainer>
      <UPageHeader
        headline="Help"
        title="How to Use the Theme Builder"
        description="Everything you need to configure, preview, and export your Nuxt UI theme."
        :links="[
          {
            label: 'Back to Home',
            icon: 'i-lucide-arrow-left',
            to: '/',
            variant: 'ghost',
            color: 'neutral',
          },
        ]"
      />

      <UPageBody>
        <MDC
          :value="helpMd"
          class="prose prose-sm dark:prose-invert max-w-none"
        />
      </UPageBody>
    </UContainer>

    <template #right>
      <UPageAside>
        <UPageAnchors :links="tocLinks" />
      </UPageAside>
    </template>
  </UPage>
</template>
