<script setup lang="ts">
interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const messages = ref<ChatMsg[]>([
  {
    id: "1",
    role: "assistant",
    content:
      "Hello! I'm your AI assistant. I can help you with building Nuxt UI themes, writing code, answering questions, and much more. How can I help you today?",
    timestamp: new Date("2026-02-06T10:00:00"),
  },
  {
    id: "2",
    role: "user",
    content:
      "I want to create a custom theme for my Nuxt application. Can you help me choose a good color palette?",
    timestamp: new Date("2026-02-06T10:01:00"),
  },
  {
    id: "3",
    role: "assistant",
    content:
      "Of course! Here are some tips for choosing a great color palette for your Nuxt UI theme:\n\n**1. Start with your primary color**\nChoose a color that represents your brand. Popular choices include blue (trust), green (growth), and purple (creativity).\n\n**2. Pick a complementary secondary color**\nThis should contrast nicely with your primary. For example, if your primary is blue, consider orange or amber.\n\n**3. Keep semantic colors intuitive**\n- **Success**: Green shades (lime, emerald, green)\n- **Warning**: Yellow/amber shades\n- **Error**: Red shades\n- **Info**: Blue/cyan shades\n\n**4. Choose a neutral palette**\nSlate, zinc, or gray work great for text and backgrounds. Slate adds a subtle blue tint, while zinc is more pure gray.\n\nWould you like me to suggest a specific palette based on your preferences?",
    timestamp: new Date("2026-02-06T10:01:30"),
  },
  {
    id: "4",
    role: "user",
    content:
      "That's helpful! I'm building a developer tools product. I like the idea of using violet as the primary color. What would you recommend for the rest?",
    timestamp: new Date("2026-02-06T10:02:00"),
  },
  {
    id: "5",
    role: "assistant",
    content:
      "Great choice! Violet is excellent for developer tools — it feels modern and technical. Here's my recommended palette:\n\n```typescript\n// app.config.ts\nexport default defineAppConfig({\n  ui: {\n    colors: {\n      primary: 'violet',\n      secondary: 'cyan',\n      success: 'emerald',\n      info: 'sky',\n      warning: 'amber',\n      error: 'rose',\n      neutral: 'zinc'\n    }\n  }\n})\n```\n\n**Why this works:**\n- **Violet + Cyan** creates a vibrant tech-forward feel\n- **Zinc** neutral keeps things clean and professional\n- **Emerald** for success is more sophisticated than plain green\n- **Rose** for errors is softer than pure red but still noticeable\n\nYou can try this right now in the Theme Builder sidebar! Just select these colors and see how they look across all components.",
    timestamp: new Date("2026-02-06T10:02:30"),
  },
]);

const inputText = ref("");
const isTyping = ref(false);
const messagesContainer = ref<HTMLElement | null>(null);

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
}

function sendMessage() {
  if (!inputText.value.trim()) return;

  const userMsg: ChatMsg = {
    id: String(Date.now()),
    role: "user",
    content: inputText.value,
    timestamp: new Date(),
  };
  messages.value.push(userMsg);
  inputText.value = "";
  scrollToBottom();

  // Simulate AI response
  isTyping.value = true;
  setTimeout(() => {
    const responses = [
      "That's a great question! In the Theme Builder, you can adjust the border radius using the slider in the sidebar. The `--ui-radius` CSS variable controls the roundness of all components globally.",
      "You can export your theme in multiple formats:\n\n1. **app.config.ts** — Drop-in config for Nuxt\n2. **CSS Variables** — Use in any project\n3. **JSON** — For programmatic use\n\nJust click the Export button in the sidebar!",
      "The font picker supports several carefully selected fonts: Public Sans, DM Sans, Geist, Inter, Poppins, Outfit, and Raleway. Each is loaded from Google Fonts and applied across all components instantly.",
      "I'd recommend trying the **Soft** variant for a more subtle, modern look. It uses a lighter background with colored text, which works beautifully with most color palettes. You can see all variants in the Components preview page!",
    ];
    const reply: ChatMsg = {
      id: String(Date.now()),
      role: "assistant",
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
    };
    messages.value.push(reply);
    isTyping.value = false;
    scrollToBottom();
  }, 1500);
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

const suggestions = [
  "How do I export my theme?",
  "What fonts are available?",
  "Help me pick colors",
  "Explain semantic colors",
];
</script>

<template>
  <div class="flex flex-col h-[calc(100vh-140px)] bg-(--ui-bg)">
    <!-- Chat Header -->
    <div
      class="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-(--ui-border) shrink-0"
    >
      <div class="flex items-center gap-3">
        <div class="relative">
          <UAvatar icon="i-lucide-bot" color="primary" size="sm" />
          <div
            class="absolute bottom-0 right-0 size-2.5 rounded-full bg-(--ui-success) ring-2 ring-(--ui-bg)"
          />
        </div>
        <div>
          <h2 class="text-sm font-semibold text-(--ui-text-highlighted)">
            AI Assistant
          </h2>
          <p class="text-xs text-(--ui-text-muted)">Always online</p>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <UButton
          icon="i-lucide-phone"
          variant="ghost"
          color="neutral"
          size="sm"
        />
        <UButton
          icon="i-lucide-video"
          variant="ghost"
          color="neutral"
          size="sm"
        />
        <UButton
          icon="i-lucide-more-vertical"
          variant="ghost"
          color="neutral"
          size="sm"
        />
      </div>
    </div>

    <!-- Messages Area -->
    <div
      ref="messagesContainer"
      class="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-6"
    >
      <!-- Date separator -->
      <div class="flex items-center gap-3">
        <USeparator class="flex-1" />
        <span class="text-xs text-(--ui-text-dimmed) shrink-0">Today</span>
        <USeparator class="flex-1" />
      </div>

      <!-- Messages -->
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="flex gap-3"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <!-- Assistant avatar -->
        <UAvatar
          v-if="msg.role === 'assistant'"
          icon="i-lucide-bot"
          color="primary"
          size="sm"
          class="shrink-0 mt-1"
        />

        <!-- Message bubble -->
        <div
          class="max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 space-y-2"
          :class="
            msg.role === 'user'
              ? 'bg-(--ui-primary) text-white rounded-br-sm'
              : 'bg-(--ui-bg-elevated) border border-(--ui-border) rounded-bl-sm'
          "
        >
          <div
            class="text-sm leading-relaxed whitespace-pre-wrap"
            :class="msg.role === 'user' ? '' : 'text-(--ui-text)'"
          >
            <!-- Simple markdown-like rendering -->
            <template v-for="(line, i) in msg.content.split('\n')" :key="i">
              <div
                v-if="line.startsWith('```')"
                class="font-mono text-xs bg-(--ui-bg-muted) rounded-md p-3 my-2 overflow-x-auto"
              >
                {{ line.replace(/```\w*/, "").replace("```", "") }}
              </div>
              <div
                v-else-if="line.startsWith('**') && line.endsWith('**')"
                class="font-semibold"
              >
                {{ line.replace(/\*\*/g, "") }}
              </div>
              <div v-else-if="line.startsWith('- ')" class="flex gap-2 ml-2">
                <span>•</span>
                <span>{{ line.slice(2) }}</span>
              </div>
              <template v-else>
                {{ line
                }}<br
                  v-if="line === '' && i < msg.content.split('\n').length - 1"
                />
              </template>
            </template>
          </div>
          <p
            class="text-[10px] mt-1"
            :class="
              msg.role === 'user'
                ? 'text-white/60 text-right'
                : 'text-(--ui-text-dimmed)'
            "
          >
            {{ formatTime(msg.timestamp) }}
          </p>
        </div>

        <!-- User avatar -->
        <UAvatar
          v-if="msg.role === 'user'"
          text="JD"
          color="neutral"
          size="sm"
          class="shrink-0 mt-1"
        />
      </div>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="flex gap-3 items-start">
        <UAvatar
          icon="i-lucide-bot"
          color="primary"
          size="sm"
          class="shrink-0 mt-1"
        />
        <div
          class="bg-(--ui-bg-elevated) border border-(--ui-border) rounded-2xl rounded-bl-sm px-4 py-3"
        >
          <div class="flex items-center gap-1.5">
            <div
              class="size-2 rounded-full bg-(--ui-text-dimmed) animate-bounce"
              style="animation-delay: 0ms"
            />
            <div
              class="size-2 rounded-full bg-(--ui-text-dimmed) animate-bounce"
              style="animation-delay: 150ms"
            />
            <div
              class="size-2 rounded-full bg-(--ui-text-dimmed) animate-bounce"
              style="animation-delay: 300ms"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Suggestions -->
    <div v-if="messages.length <= 5" class="px-4 sm:px-6 pb-2">
      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="suggestion in suggestions"
          :key="suggestion"
          :label="suggestion"
          variant="outline"
          color="neutral"
          size="xs"
          @click="
            inputText = suggestion;
            sendMessage();
          "
        />
      </div>
    </div>

    <!-- Input Area -->
    <div
      class="shrink-0 border-t border-(--ui-border) p-4 sm:px-6 bg-(--ui-bg)"
    >
      <form @submit.prevent="sendMessage" class="flex items-end gap-3">
        <div class="flex-1 relative">
          <UTextarea
            v-model="inputText"
            placeholder="Type a message..."
            :rows="1"
            autoresize
            class="w-full"
            @keydown.enter.exact.prevent="sendMessage"
          />
        </div>
        <div class="flex items-center gap-1 shrink-0">
          <UButton
            icon="i-lucide-paperclip"
            variant="ghost"
            color="neutral"
            size="sm"
          />
          <UButton
            icon="i-lucide-send"
            color="primary"
            size="sm"
            :disabled="!inputText.trim()"
            @click="sendMessage"
          />
        </div>
      </form>
    </div>
  </div>
</template>
