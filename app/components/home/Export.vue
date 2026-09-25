<script setup lang="ts">
import { useThemeExport } from "~/composables/useThemeExport";

const { appConfigExport } = useThemeExport();
const exportPanel = useExportPanel();
const { copy, copied } = useClipboard({ copiedDuring: 2000 });

const formats = [
  {
    name: "app.config.ts",
    description: "Palette assignments for Nuxt UI. Paste it into your app.",
  },
  {
    name: "CSS variables",
    description: "Radius, font, shade shifts and dark-mode overrides for main.css.",
  },
  {
    name: "JSON",
    description: "The full config, to save, share, or import again later.",
  },
];
</script>

<template>
  <section
    aria-labelledby="home-export-heading"
    class="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12"
  >
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <h2
          id="home-export-heading"
          class="text-2xl font-bold tracking-tight text-balance text-(--ui-text-highlighted) sm:text-3xl"
        >
          Export the theme you're looking at
        </h2>
        <p class="text-(--ui-text-muted)">
          The config on the right updates as you edit. Import a JSON export
          later to pick up where you left off.
        </p>
      </div>

      <dl class="flex flex-col gap-4">
        <div v-for="format in formats" :key="format.name" class="flex flex-col">
          <dt class="font-mono text-sm font-medium text-(--ui-text-highlighted)">
            {{ format.name }}
          </dt>
          <dd class="text-sm text-(--ui-text-muted)">
            {{ format.description }}
          </dd>
        </div>
      </dl>

      <div>
        <UButton
          label="Export / Import"
          icon="i-lucide-download"
          color="primary"
          @click="exportPanel.open()"
        />
      </div>
    </div>

    <div
      class="min-w-0 overflow-hidden rounded-(--ui-radius) border border-(--ui-border) bg-(--ui-bg-muted)"
    >
      <div
        class="flex items-center justify-between gap-3 border-b border-(--ui-border) px-4 py-2"
      >
        <span class="font-mono text-xs text-(--ui-text-muted)">
          app.config.ts
        </span>
        <UButton
          :label="copied ? 'Copied' : 'Copy'"
          :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
          size="xs"
          color="neutral"
          variant="ghost"
          @click="copy(appConfigExport)"
        />
      </div>
      <pre
        class="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-(--ui-text-highlighted)"
      ><code>{{ appConfigExport }}</code></pre>
    </div>
  </section>
</template>
