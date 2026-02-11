<script setup lang="ts">
import { AI_PROVIDER_OPTIONS } from "~/types/ai";

const {
  apiKey,
  provider,
  model,
  persistKey,
  isConfigured,
  availableModels,
  clearApiKey,
} = useAiSettings();

const showKey = ref(false);

const providerItems = AI_PROVIDER_OPTIONS.map((p) => ({
  label: p.label,
  value: p.value,
}));

const modelItems = computed(() =>
  availableModels.value.map((m) => ({
    label: m.label,
    value: m.value,
    description: m.description,
  })),
);

const keyManagementLinks: Record<string, string> = {
  openai: "https://platform.openai.com/api-keys",
};
</script>

<template>
  <div class="space-y-4">
    <UAlert
      icon="i-lucide-shield"
      color="neutral"
      variant="subtle"
      title="Privacy"
      description="Your API key is forwarded to the AI provider and never logged or stored on our servers. Use a dedicated key with spend limits."
      :ui="{
        title: 'text-sm font-semibold',
        description: 'text-xs',
      }"
    />

    <!-- API Key -->
    <UFormField
      label="API Key"
      required
      :ui="{
        description: 'text-xs',
      }"
    >
      <template #description>
        Create a dedicated API key with a
        <a
          v-if="keyManagementLinks[provider]"
          :href="keyManagementLinks[provider]"
          target="_blank"
          rel="noopener noreferrer"
          class="underline text-(--ui-primary)"
          >monthly spend limit</a
        >
        <span v-else>monthly spend limit</span>
        for this tool.
      </template>
      <div class="flex gap-2 mt-4">
        <UInput
          :model-value="apiKey"
          :type="showKey ? 'text' : 'password'"
          placeholder="sk-..."
          class="flex-1"
          autocomplete="off"
          @update:model-value="apiKey = $event as string"
        />
        <UTooltip :text="showKey ? 'Hide key' : 'Show key'">
          <UButton
            :icon="showKey ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            variant="outline"
            color="neutral"
            :aria-label="showKey ? 'Hide API key' : 'Show API key'"
            @click="showKey = !showKey"
          />
        </UTooltip>
        <UTooltip v-if="isConfigured" text="Clear API key">
          <UButton
            icon="i-lucide-x"
            variant="outline"
            color="error"
            aria-label="Clear API key"
            @click="clearApiKey()"
          />
        </UTooltip>
      </div>
    </UFormField>

    <!-- Remember key -->
    <UCheckbox
      :model-value="persistKey"
      label="Remember my key"
      description="Stores key in browser storage. Uncheck to clear on tab close."
      :ui="{
        description: 'text-xs mt-2',
      }"
      @update:model-value="persistKey = $event as boolean"
    />

    <!-- Provider -->
    <UFormField label="Provider">
      <USelect
        :model-value="provider"
        :items="providerItems"
        value-key="value"
        class="w-full"
        @update:model-value="provider = $event"
      />
    </UFormField>

    <!-- Model -->
    <UFormField label="Model">
      <USelect
        :model-value="model"
        :items="modelItems"
        value-key="value"
        class="w-full"
        @update:model-value="model = $event"
      />
    </UFormField>
  </div>
</template>
