<script setup lang="ts">
import type { AiMessage } from "~/types/ai";

const { messages, isGenerating, error, sendMessage, clearChat } = useAiChat();
const { isConfigured, model, availableModels } = useAiSettings();

const settingsOpen = ref(false);

const chatStatus = computed<"ready" | "submitted" | "streaming" | "error">(
  () => {
    if (isGenerating.value) return "streaming";
    return "ready";
  },
);

const modelItems = computed(() =>
  availableModels.value.map((m) => ({
    label: m.label,
    value: m.value,
    icon: "i-lucide-sparkles",
  })),
);

interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  parts: { type: "text"; text: string }[];
}

const chatMessages = computed<ChatMsg[]>(() =>
  messages.value
    .filter((m: AiMessage) => m.role !== "system")
    .map((msg: AiMessage) => ({
      id: msg.id,
      role: msg.role as "user" | "assistant",
      parts: [{ type: "text" as const, text: msg.content }],
    })),
);

function getThemeConfig(messageId: string) {
  return messages.value.find((m: AiMessage) => m.id === messageId)?.themeConfig;
}

const copied = ref(false);
function copyMessage(
  _e: MouseEvent,
  message: { parts?: Array<{ type: string; text?: string }> },
) {
  const text = message.parts
    ?.filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("");
  if (text) {
    navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
}

const quickChats = [
  {
    label: "A calm, professional SaaS dashboard",
    icon: "i-lucide-layout-dashboard",
  },
  { label: "Something bold and creative", icon: "i-lucide-palette" },
  { label: "Sleek dark mode for a dev tool", icon: "i-lucide-terminal" },
  { label: "Warm and friendly e-commerce", icon: "i-lucide-shopping-bag" },
  { label: "Minimal and elegant with serifs", icon: "i-lucide-type" },
  { label: "An earthy, natural brand theme", icon: "i-lucide-sprout" },
];

const inputText = ref("");
function onSubmit() {
  if (!inputText.value.trim() || isGenerating.value || !isConfigured.value)
    return;
  const prompt = inputText.value;
  inputText.value = "";
  sendMessage(prompt);
}

function createChat(prompt: string) {
  inputText.value = prompt;
  onSubmit();
}

function handlePromptSelect(prompt: string) {
  inputText.value = prompt;
  onSubmit();
}
</script>

<template>
  <UDashboardGroup unit="px">
    <!-- Sidebar -->
    <UDashboardSidebar
      id="ai-sidebar"
      collapsible
      :collapsed-size="0"
      class="bg-elevated/50"
      :ui="{
        root: 'min-w-[300px] overflow-hidden data-[collapsed=true]:invisible data-[collapsed=true]:min-w-0',
      }"
    >
      <template #header>
        <div class="flex items-center gap-2 justify-center w-full">
          <UAvatar icon="i-lucide-sparkles" color="primary" size="xs" />
          <span
            class="text-base font-bold text-(--ui-text-highlighted) mr-auto"
          >
            AI Generate
          </span>
        </div>
        <UButton
          icon="i-lucide-square-pen"
          variant="ghost"
          color="neutral"
          size="xs"
          class="ms-auto"
          aria-label="New conversation"
          @click="clearChat()"
        />
      </template>

      <template #default>
        <div class="flex flex-col gap-2">
          <UButton
            label="New generation"
            variant="soft"
            block
            aria-label="New generation"
            @click="clearChat()"
          />
        </div>

        <AiSidebar @select-prompt="handlePromptSelect" />
      </template>

      <template #footer>
        <UButton
          label="Back to Editor"
          icon="i-lucide-palette"
          color="neutral"
          variant="ghost"
          block
          to="/"
          aria-label="Back to Editor"
        />
      </template>
    </UDashboardSidebar>

    <!-- Main chat panel -->
    <UDashboardPanel id="ai-main" :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <UDashboardNavbar title="AI Theme Generator" :ui="{ title: 'sr-only' }">
          <template #leading>
            <UDashboardSidebarCollapse />
            <USeparator orientation="vertical" class="h-6 mx-2" />
            <div class="flex items-center gap-3">
              <div class="relative hidden sm:block">
                <UAvatar icon="i-lucide-sparkles" color="primary" size="xs" />
                <div
                  class="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-(--ui-success) ring-2 ring-(--ui-bg)"
                />
              </div>
              <div class="hidden sm:block">
                <p
                  class="text-sm font-semibold text-(--ui-text-highlighted) leading-none"
                >
                  AI Theme Generator
                </p>
                <p class="text-xs text-(--ui-text-muted) mt-0.5">
                  Describe your ideal theme
                </p>
              </div>
            </div>
          </template>
          <template #right>
            <div class="flex items-center gap-1">
              <USelect
                v-model="model"
                :items="modelItems"
                icon="i-lucide-sparkles"
                value-key="value"
                size="xs"
                variant="ghost"
                class="hidden sm:block"
                :aria-label="`AI model: ${modelItems.find((m) => m.value === model)?.label}`"
              />
              <UDropdownMenu
                :items="[
                  [
                    {
                      label: 'Clear conversation',
                      icon: 'i-lucide-trash-2',
                      onSelect: () => clearChat(),
                    },
                  ],
                ]"
              >
                <UButton
                  icon="i-lucide-more-vertical"
                  variant="ghost"
                  color="neutral"
                  size="sm"
                  aria-label="Conversation options"
                />
              </UDropdownMenu>
              <UTooltip text="AI Settings">
                <UButton
                  icon="i-lucide-settings"
                  variant="ghost"
                  color="neutral"
                  size="sm"
                  aria-label="Open AI settings"
                  @click="settingsOpen = true"
                />
              </UTooltip>
            </div>
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <UContainer class="flex-1 flex flex-col pt-4 sm:pt-6">
          <!-- Empty state when no messages -->
          <div
            v-if="chatMessages.length === 0"
            class="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center"
          >
            <div
              class="size-16 rounded-full bg-(--ui-primary)/10 flex items-center justify-center mb-6"
              aria-hidden="true"
            >
              <UIcon
                name="i-lucide-sparkles"
                class="size-8 text-(--ui-primary)"
              />
            </div>
            <h2 class="text-xl font-semibold text-(--ui-text-highlighted) mb-2">
              AI Theme Generator
            </h2>
            <p class="text-sm text-(--ui-text-muted) max-w-md mb-8">
              Describe the look and feel you want, and I'll generate a matching
              Nuxt UI theme. You can refine the result through conversation.
            </p>
            <div v-if="!isConfigured" class="max-w-md w-full space-y-4">
              <UAlert
                icon="i-lucide-key"
                color="warning"
                variant="subtle"
                title="API key required"
                description="Enter your chosen model's API key in the settings panel to get started."
                class="text-left"
              />
              <UButton
                icon="i-lucide-settings"
                label="Open Settings"
                color="primary"
                block
                @click="settingsOpen = true"
              />
            </div>
          </div>

          <!-- Chat messages -->
          <UChatMessages
            v-else
            should-auto-scroll
            :messages="chatMessages"
            :status="chatStatus"
            :assistant="
              chatStatus !== 'streaming'
                ? {
                    avatar: { icon: 'i-lucide-sparkles' },
                    actions: [
                      {
                        label: 'Copy',
                        icon: copied ? 'i-lucide-copy-check' : 'i-lucide-copy',
                        onClick: copyMessage,
                      },
                    ],
                  }
                : { avatar: { icon: 'i-lucide-sparkles' }, actions: [] }
            "
            :user="{
              avatar: { icon: 'i-lucide-user' },
              variant: 'soft',
              side: 'right',
            }"
            :spacing-offset="148"
          >
            <template #content="{ message }">
              <template
                v-for="(part, index) in message.parts"
                :key="`${message.id}-${part.type}-${index}`"
              >
                <MDC
                  v-if="part.type === 'text' && message.role === 'assistant'"
                  :value="part.text"
                  :cache-key="`${message.id}-${index}`"
                  class="prose prose-sm dark:prose-invert *:first:mt-0 *:last:mb-0"
                />
                <p
                  v-else-if="part.type === 'text' && message.role === 'user'"
                  class="whitespace-pre-wrap"
                >
                  {{ part.text }}
                </p>
              </template>
              <!-- Theme preview card for messages with generated themes -->
              <AiThemePreview
                v-if="getThemeConfig(message.id)"
                :theme-config="getThemeConfig(message.id)!"
              />
            </template>

            <template #indicator>
              <UButton
                class="px-0"
                color="neutral"
                variant="link"
                loading
                loading-icon="i-lucide-loader"
                label="Generating theme..."
              />
            </template>
          </UChatMessages>

          <!-- Sticky bottom area: suggestions + prompt -->
          <div class="sticky bottom-0 z-10 bg-(--ui-bg) pt-2">
            <!-- Quick chat suggestions -->
            <div
              v-if="isConfigured && chatMessages.length <= 1"
              class="flex gap-2 pb-3 overflow-x-auto sm:flex-wrap sm:overflow-visible scrollbar-none"
            >
              <UButton
                v-for="q in quickChats"
                :key="q.label"
                :icon="q.icon"
                :label="q.label"
                size="sm"
                color="neutral"
                variant="outline"
                class="rounded-full shrink-0"
                @click="createChat(q.label)"
              />
            </div>

            <!-- Error alert -->
            <div v-if="error" class="pb-3">
              <UAlert
                :title="error"
                color="error"
                variant="subtle"
                icon="i-lucide-alert-circle"
              />
            </div>

            <!-- Chat prompt -->
            <UChatPrompt
              v-model="inputText"
              variant="subtle"
              :placeholder="
                isConfigured
                  ? 'Describe your ideal theme...'
                  : 'Enter your API key in settings to start...'
              "
              :disabled="!isConfigured || isGenerating"
              :ui="{ base: 'px-1.5' }"
              @submit="onSubmit"
            >
              <template #footer>
                <div class="flex items-center gap-1">
                  <USelect
                    v-model="model"
                    :items="modelItems"
                    icon="i-lucide-sparkles"
                    value-key="value"
                    size="xs"
                    variant="ghost"
                    :aria-label="`AI model: ${modelItems.find((m) => m.value === model)?.label}`"
                  />
                </div>
                <UChatPromptSubmit
                  :status="chatStatus"
                  color="neutral"
                  size="sm"
                  aria-label="Send message"
                />
              </template>
            </UChatPrompt>

            <!-- Bottom safe spacing -->
            <div class="h-4" />
          </div>
        </UContainer>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>

  <!-- Settings slideover -->
  <USlideover
    v-model:open="settingsOpen"
    title="AI Settings"
    description="Configure your AI provider and API key."
  >
    <template #body>
      <AiSettingsPanel />
    </template>
  </USlideover>
</template>
