<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

const props = defineProps<{
  id: string;
  title: string;
  description: string;
  prompt: string;
  source: string;
}>();

const activeTab = ref("preview");
const { copy, copied } = useClipboard();
const toast = useToast();

const tabItems: TabsItem[] = [
  {
    label: "Preview",
    icon: "i-lucide-eye",
    value: "preview",
    slot: "preview",
  },
  {
    label: "Source Code",
    icon: "i-lucide-code",
    value: "source",
    slot: "source",
  },
];

function copyPrompt() {
  copy(props.prompt);
  toast.add({
    title: "AI prompt copied to clipboard",
    icon: "i-lucide-sparkles",
    color: "success",
  });
}
</script>

<template>
  <article
    :id="id"
    class="rounded-xl border border-(--ui-border) bg-(--ui-bg) overflow-hidden"
    :aria-labelledby="`${id}-title`"
  >
    <!-- Header: metadata + prompt action -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-(--ui-border)"
    >
      <div class="min-w-0 space-y-4">
        <h2
          :id="`${id}-title`"
          class="text-lg font-bold text-(--ui-text-highlighted) flex items-center gap-2"
        >
          {{ title }}
          <UBadge
            label="New!"
            color="success"
            variant="subtle"
            size="sm"
            class="uppercase"
          />
        </h2>
        <p
          class="text-sm text-(--ui-text-muted) mt-0.5 line-clamp-2 sm:line-clamp-none max-w-2xl"
        >
          {{ description }}
        </p>
      </div>

      <div class="shrink-0 flex items-center gap-2">
        <UTooltip text="Copy AI prompt to generate a similar block">
          <UButton
            :icon="copied ? 'i-lucide-check' : 'i-lucide-sparkles'"
            :label="copied ? 'Copied!' : 'Copy Prompt'"
            :color="copied ? 'success' : 'primary'"
            :variant="copied ? 'solid' : 'soft'"
            :aria-label="copied ? `Copied! AI generation prompt for ${title}` : `Copy Prompt for ${title}`"
            size="sm"
            @click="copyPrompt"
          />
        </UTooltip>
      </div>
    </div>

    <!-- Preview / Source Code tabs -->
    <UTabs
      v-model="activeTab"
      :items="tabItems"
      variant="link"
      color="primary"
      size="sm"
      :ui="{
        root: 'gap-0',
        list: 'p-2 bg-(--ui-bg-elevated)/50',
      }"
    >
      <template #preview>
        <div class="block-preview overflow-hidden">
          <slot />
        </div>
      </template>

      <template #source>
        <SharedCodeBlock
          :code="source"
          :filename="`${id}.vue`"
          language="html"
          hide-download
          max-height="400px"
          class="border-0 rounded-none"
        />
      </template>
    </UTabs>
  </article>
</template>
