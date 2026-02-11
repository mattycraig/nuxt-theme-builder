<script setup lang="ts">
const emit = defineEmits<{
  selectPrompt: [prompt: string];
}>();

const settingsOpen = ref(true);
const templatesOpen = ref(false);
</script>

<template>
  <div class="flex flex-col gap-1">
    <!-- Settings section -->
    <UCollapsible v-model:open="settingsOpen">
      <UButton
        icon="i-lucide-settings"
        variant="ghost"
        color="neutral"
        block
        class="justify-between"
        :ui="{
          trailingIcon:
            'transition-transform duration-200 group-data-[state=open]:rotate-180',
        }"
        trailing-icon="i-lucide-chevron-down"
      >
        <span class="text-xs font-semibold uppercase tracking-wide">
          Settings
        </span>
      </UButton>
      <template #content>
        <div class="px-2 pb-3 pt-2">
          <AiSettingsPanel />
        </div>
      </template>
    </UCollapsible>

    <!-- Prompt templates section -->
    <UCollapsible v-model:open="templatesOpen">
      <UButton
        icon="i-lucide-lightbulb"
        variant="ghost"
        color="neutral"
        block
        class="justify-between"
        :ui="{
          trailingIcon:
            'transition-transform duration-200 group-data-[state=open]:rotate-180',
        }"
        trailing-icon="i-lucide-chevron-down"
      >
        <span class="text-xs font-semibold uppercase tracking-wide">
          Prompt Templates
        </span>
      </UButton>
      <template #content>
        <div class="px-2 pb-3 pt-2">
          <AiPromptTemplates @select="emit('selectPrompt', $event)" />
        </div>
      </template>
    </UCollapsible>
  </div>
</template>
