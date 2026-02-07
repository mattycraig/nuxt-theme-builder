<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

// ── Sidebar state ───────────────────────────────────────────────────────────
const sidebarOpen = ref(false);

// ── Chat history items (sidebar navigation) ─────────────────────────────────
const chatNavItems = computed<NavigationMenuItem[]>(() => [
  { type: "label", label: "Today" },
  {
    label: "Theme Color Palette",
    icon: "i-lucide-message-circle",
    badge: { color: "primary" as const, variant: "solid" as const, label: "3" },
  },
  {
    label: "Component Variants",
    icon: "i-lucide-message-circle",
  },
  {
    label: "Font Configuration",
    icon: "i-lucide-message-circle",
  },
  { type: "label", label: "Yesterday" },
  {
    label: "Dark Mode Setup",
    icon: "i-lucide-message-circle",
  },
  {
    label: "Form Validation",
    icon: "i-lucide-message-circle",
  },
  { type: "label", label: "Last week" },
  {
    label: "Deploy to Vercel",
    icon: "i-lucide-message-circle",
  },
  {
    label: "Tailwind Tips",
    icon: "i-lucide-message-circle",
  },
  {
    label: "API Route Help",
    icon: "i-lucide-message-circle",
  },
]);

// ── Model selector ──────────────────────────────────────────────────────────
const models = [
  { label: "GPT-4o", value: "gpt-4o", icon: "i-lucide-sparkles" },
  { label: "Claude Sonnet", value: "claude-sonnet", icon: "i-lucide-brain" },
  { label: "Gemini Pro", value: "gemini-pro", icon: "i-lucide-star" },
];
const selectedModel = ref("gpt-4o");

// ── Messages (AI SDK v5 parts format) ───────────────────────────────────────
interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  parts: { type: "text"; text: string }[];
}

const messages = ref<ChatMsg[]>([
  {
    id: "1",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Hello! I'm your AI assistant. I can help you with building Nuxt UI themes, writing code, answering questions, and much more. How can I help you today?",
      },
    ],
  },
  {
    id: "2",
    role: "user",
    parts: [
      {
        type: "text",
        text: "I want to create a custom theme for my Nuxt application. Can you help me choose a good color palette?",
      },
    ],
  },
  {
    id: "3",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Of course! Here are some tips for choosing a great color palette:\n\n**1. Start with your primary color** — Pick one that represents your brand. Blue conveys trust, green signals growth, purple hints at creativity.\n\n**2. Complementary secondary** — Contrast with your primary. Blue → orange, violet → cyan.\n\n**3. Semantic colors** — Keep them intuitive: green for success, amber for warning, red for error, sky for info.\n\n**4. Neutral palette** — Slate, zinc or gray for text and backgrounds.\n\nWould you like me to suggest a specific palette?",
      },
    ],
  },
  {
    id: "4",
    role: "user",
    parts: [
      {
        type: "text",
        text: "That's helpful! I'm building a developer tools product. I like violet as the primary color. What would you recommend for the rest?",
      },
    ],
  },
  {
    id: "5",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Great choice! Violet is perfect for dev tools — modern and technical. Here's my recommendation:\n\n• **Primary**: violet\n• **Secondary**: cyan\n• **Success**: emerald\n• **Info**: sky\n• **Warning**: amber\n• **Error**: rose\n• **Neutral**: zinc\n\n**Why this works:**\n- Violet + Cyan creates a vibrant, tech-forward feel\n- Zinc neutral keeps things clean and professional\n- Emerald for success is more sophisticated than plain green\n- Rose for errors is softer than pure red but still noticeable\n\nYou can try this right now in the Theme Builder sidebar!",
      },
    ],
  },
]);

const inputText = ref("");
const chatStatus = ref<"ready" | "submitted" | "streaming" | "error">("ready");

// ── Copy action ─────────────────────────────────────────────────────────────
const copied = ref(false);

function copyMessage(_e: MouseEvent, message: any) {
  const text = message.parts
    ?.filter((p: any) => p.type === "text")
    .map((p: any) => p.text)
    .join("");
  if (text) {
    navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
}

// ── Quick chat suggestions ──────────────────────────────────────────────────
const quickChats = [
  { label: "How do I export my theme?", icon: "i-lucide-download" },
  { label: "Help me pick a color palette", icon: "i-lucide-palette" },
  { label: "What fonts are available?", icon: "i-lucide-type" },
  { label: "Explain semantic colors", icon: "i-lucide-info" },
  { label: "Best radius settings", icon: "i-lucide-circle" },
  { label: "Show me component variants", icon: "i-lucide-layers" },
];

// ── Send / simulate ─────────────────────────────────────────────────────────
function onSubmit() {
  if (!inputText.value.trim()) return;

  messages.value.push({
    id: String(Date.now()),
    role: "user",
    parts: [{ type: "text", text: inputText.value }],
  });
  inputText.value = "";

  chatStatus.value = "submitted";
  setTimeout(() => {
    chatStatus.value = "streaming";
    setTimeout(() => {
      const responses = [
        "That's a great question! In the Theme Builder, you can adjust the border radius using the slider in the sidebar. The `--ui-radius` CSS variable controls the roundness of all components globally.",
        "You can export your theme in multiple formats:\n\n1. **app.config.ts** — Drop-in config for Nuxt\n2. **CSS Variables** — Use in any project\n3. **JSON** — For programmatic use\n\nJust click the Export button in the sidebar!",
        "The font picker supports several carefully selected fonts: Public Sans, DM Sans, Geist, Inter, Poppins, Outfit, and Raleway. Each is loaded from Google Fonts and applied across all components instantly.",
        "I'd recommend trying the **Soft** variant for a more subtle, modern look. It uses a lighter background with colored text, which works beautifully with most color palettes.",
      ];
      messages.value.push({
        id: String(Date.now()),
        role: "assistant",
        parts: [
          {
            type: "text",
            text: responses[Math.floor(Math.random() * responses.length)]!,
          },
        ],
      });
      chatStatus.value = "ready";
    }, 1200);
  }, 600);
}

function createChat(prompt: string) {
  inputText.value = prompt;
  onSubmit();
}
</script>

<template>
  <UDashboardGroup>
    <!-- ── Sidebar ──────────────────────────────────────────────────── -->
    <UDashboardSidebar
      id="chat"
      v-model:open="sidebarOpen"
      collapsible
      class="bg-elevated/50"
    >
      <template #header="{ collapsed }">
        <div class="flex items-center gap-2">
          <UAvatar icon="i-lucide-bot" color="primary" size="xs" />
          <span
            v-if="!collapsed"
            class="text-base font-bold text-(--ui-text-highlighted)"
          >
            Chat
          </span>
        </div>
        <UButton
          v-if="!collapsed"
          icon="i-lucide-square-pen"
          variant="ghost"
          color="neutral"
          size="xs"
          class="ms-auto"
        />
      </template>

      <template #default="{ collapsed }">
        <div class="flex flex-col gap-2">
          <UButton
            v-bind="
              collapsed ? { icon: 'i-lucide-plus' } : { label: 'New chat' }
            "
            variant="soft"
            block
          />
        </div>

        <UNavigationMenu
          v-if="!collapsed"
          :items="chatNavItems"
          orientation="vertical"
          :ui="{ link: 'overflow-hidden' }"
        />
      </template>

      <template #footer="{ collapsed }">
        <UButton
          v-bind="
            collapsed
              ? { icon: 'i-lucide-settings' }
              : { label: 'Settings', icon: 'i-lucide-settings' }
          "
          color="neutral"
          variant="ghost"
          block
        />
      </template>
    </UDashboardSidebar>

    <!-- ── Main chat panel ──────────────────────────────────────────── -->
    <UDashboardPanel id="chat-main" :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <UDashboardNavbar>
          <template #leading>
            <div class="flex items-center gap-3">
              <UDashboardSidebarCollapse />
              <div class="relative hidden sm:block">
                <UAvatar icon="i-lucide-bot" color="primary" size="xs" />
                <div
                  class="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-(--ui-success) ring-2 ring-(--ui-bg)"
                />
              </div>
              <div class="hidden sm:block">
                <p
                  class="text-sm font-semibold text-(--ui-text-highlighted) leading-none"
                >
                  Theme Color Palette
                </p>
                <p class="text-xs text-(--ui-text-muted) mt-0.5">
                  AI Assistant
                </p>
              </div>
            </div>
          </template>
          <template #trailing>
            <div class="flex items-center gap-1">
              <USelect
                v-model="selectedModel"
                :items="models"
                icon="i-lucide-sparkles"
                value-key="value"
                size="xs"
                variant="ghost"
                class="hidden sm:block"
              />
              <UTooltip text="Search messages">
                <UButton
                  icon="i-lucide-search"
                  variant="ghost"
                  color="neutral"
                  size="sm"
                />
              </UTooltip>
              <UDropdownMenu
                :items="[
                  [
                    {
                      label: 'Clear conversation',
                      icon: 'i-lucide-trash-2',
                    },
                    {
                      label: 'Export chat',
                      icon: 'i-lucide-download',
                    },
                    {
                      label: 'Rename',
                      icon: 'i-lucide-pencil',
                    },
                  ],
                ]"
              >
                <UButton
                  icon="i-lucide-more-vertical"
                  variant="ghost"
                  color="neutral"
                  size="sm"
                />
              </UDropdownMenu>
            </div>
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <UContainer class="flex-1 flex flex-col pt-4 sm:pt-6">
          <!-- Chat messages -->
          <UChatMessages
            should-auto-scroll
            :messages="messages"
            :status="chatStatus"
            :assistant="
              chatStatus !== 'streaming'
                ? {
                    actions: [
                      {
                        label: 'Copy',
                        icon: copied ? 'i-lucide-copy-check' : 'i-lucide-copy',
                        onClick: copyMessage,
                      },
                    ],
                  }
                : { actions: [] }
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
                <p v-if="part.type === 'text'" class="whitespace-pre-wrap">
                  {{ part.text }}
                </p>
              </template>
            </template>

            <template #indicator>
              <UButton
                class="px-0"
                color="neutral"
                variant="link"
                loading
                loading-icon="i-lucide-loader"
                label="Thinking..."
              />
            </template>
          </UChatMessages>

          <!-- Sticky bottom area: suggestions + prompt -->
          <div class="sticky bottom-0 z-10 bg-(--ui-bg) pt-2">
            <!-- Quick chat suggestions -->
            <div
              v-if="messages.length <= 5"
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

            <!-- Chat prompt -->
            <UChatPrompt
              v-model="inputText"
              variant="subtle"
              placeholder="Ask anything about Nuxt UI theming..."
              :ui="{ base: 'px-1.5' }"
              @submit="onSubmit"
            >
              <template #footer>
                <div class="flex items-center gap-1">
                  <UTooltip text="Attach file">
                    <UButton
                      icon="i-lucide-paperclip"
                      variant="ghost"
                      color="neutral"
                      size="xs"
                    />
                  </UTooltip>
                  <USelect
                    v-model="selectedModel"
                    :items="models"
                    icon="i-lucide-sparkles"
                    value-key="value"
                    size="xs"
                    variant="ghost"
                    class="sm:hidden"
                  />
                </div>

                <UChatPromptSubmit
                  :status="chatStatus"
                  color="neutral"
                  size="sm"
                  @stop="chatStatus = 'ready'"
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
</template>
