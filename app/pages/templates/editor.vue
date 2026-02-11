<script setup lang="ts">
import type {
  EditorToolbarItem,
  EditorSuggestionMenuItem,
  EditorMentionMenuItem,
  EditorEmojiMenuItem,
} from "@nuxt/ui";
import type { ComponentPublicInstance } from "vue";
import { Emoji, gitHubEmojis } from "@tiptap/extension-emoji";

// ── Document data ───────────────────────────────────────────────────────────
const documentTitle = ref("Getting Started Guide");
const lastSaved = ref("2 minutes");

const editorContent = ref(`# Getting Started with Nuxt UI Theme Builder

Welcome to the **Nuxt UI Theme Builder** — a visual tool for designing and exporting custom themes for your Nuxt applications.

## Quick Start

1. Open the **sidebar** to access the theme editor
2. Choose your **primary color** from 17 available palettes
3. Adjust the **border radius** to match your design style
4. Select a **font** from our curated collection
5. **Export** your theme as \`app.config.ts\`, CSS, or JSON

## Color System

The theme builder supports six semantic color roles:

- **Primary** — Main brand color used for CTAs and key UI elements
- **Secondary** — Complementary color for secondary actions
- **Success** — Positive actions and status indicators
- **Info** — Informational messages and highlights
- **Warning** — Cautionary alerts and notices
- **Error** — Error states and destructive actions

Each semantic color can be mapped to any of the 17 available color palettes, giving you complete control over your design system.

## Typography

Choose from carefully selected fonts:

| Font | Style | Best For |
|------|-------|----------|
| Public Sans | Clean, neutral | Government, enterprise |
| DM Sans | Geometric | Modern apps |
| Geist | Technical | Developer tools |
| Inter | Versatile | General purpose |
| Poppins | Rounded | Friendly, casual |
| Outfit | Contemporary | Startups |
| Raleway | Elegant | Creative, luxury |

## Border Radius

The global \`--ui-radius\` variable controls the roundness of all components:

- **0rem** — Sharp, no rounding
- **0.25rem** — Subtle rounding
- **0.5rem** — Default, balanced
- **0.75rem** — Noticeable rounding
- **1rem** — Fully rounded

## Exporting Your Theme

Once you're happy with your design, export it in your preferred format and drop it into your Nuxt project. It's that simple!

> **Tip:** Use the share URL feature to send your theme to teammates for review.

---

### Code Example

Here's how to apply your exported theme:

\`\`\`ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    }
  }
})
\`\`\`

Type \`/\` for commands, \`@\` to mention someone, or \`:\` for emojis.
`);

const wordCount = computed(() => {
  return editorContent.value.split(/\s+/).filter(Boolean).length;
});
const charCount = computed(() => editorContent.value.length);

const tags = ref(["documentation", "guide", "theme-builder"]);

// ── Sidebar state ───────────────────────────────────────────────────────────
const sidebarOpen = ref(false);

// ── Category filter ─────────────────────────────────────────────────────────
const categories = [
  { label: "All", value: "all", icon: "i-lucide-files" },
  { label: "Guides", value: "guides", icon: "i-lucide-book-open" },
  { label: "API", value: "api", icon: "i-lucide-code" },
  { label: "Notes", value: "notes", icon: "i-lucide-sticky-note" },
];
const selectedCategory = ref("all");

// ── Documents ───────────────────────────────────────────────────────────────
const searchQuery = ref("");

const documents = [
  {
    title: "Getting Started Guide",
    icon: "i-lucide-file-text",
    category: "guides",
    updated: "Just now",
    active: true,
  },
  {
    title: "API Reference",
    icon: "i-lucide-file-code",
    category: "api",
    updated: "1 hour ago",
    active: false,
  },
  {
    title: "Release Notes v2.0",
    icon: "i-lucide-file-check",
    category: "notes",
    updated: "Yesterday",
    active: false,
  },
  {
    title: "Color System Deep Dive",
    icon: "i-lucide-palette",
    category: "guides",
    updated: "2 days ago",
    active: false,
  },
  {
    title: "Component Props API",
    icon: "i-lucide-file-code",
    category: "api",
    updated: "3 days ago",
    active: false,
  },
  {
    title: "Meeting Notes — Design Review",
    icon: "i-lucide-sticky-note",
    category: "notes",
    updated: "1 week ago",
    active: false,
  },
  {
    title: "Architecture Design",
    icon: "i-lucide-file-text",
    category: "guides",
    updated: "2 weeks ago",
    active: false,
  },
];

const filteredDocuments = computed(() => {
  return documents.filter((doc) => {
    const matchesCategory =
      selectedCategory.value === "all" ||
      doc.category === selectedCategory.value;
    const matchesSearch =
      !searchQuery.value ||
      doc.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

// ── Document outline ────────────────────────────────────────────────────────
const outlineItems = [
  { title: "Getting Started with Nuxt UI Theme Builder", level: 1 },
  { title: "Quick Start", level: 2 },
  { title: "Color System", level: 2 },
  { title: "Typography", level: 2 },
  { title: "Border Radius", level: 2 },
  { title: "Exporting Your Theme", level: 2 },
  { title: "Code Example", level: 3 },
];

const editorContainerRef = ref<ComponentPublicInstance | null>(null);
const activeOutlineTitle = ref(outlineItems[0]?.title ?? "");

function scrollToHeading(title: string, level: number) {
  const el = editorContainerRef.value?.$el as HTMLElement | undefined;
  if (!el) return;

  const tag = `h${level}`;
  const headings = el.querySelectorAll(tag);
  for (const heading of headings) {
    if (heading.textContent?.trim() === title) {
      heading.scrollIntoView({ behavior: "smooth", block: "start" });
      break;
    }
  }
}

// ── Scrollspy ───────────────────────────────────────────────────────────────
let scrollCleanup: (() => void) | null = null;

onMounted(() => {
  nextTick(() => {
    setupScrollspy();
  });
});

onBeforeUnmount(() => {
  scrollCleanup?.();
});

function setupScrollspy() {
  const el = editorContainerRef.value?.$el as HTMLElement | undefined;
  if (!el) return;

  const onScroll = () => {
    const headings = el.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const containerRect = el.getBoundingClientRect();
    const offset = 100; // toolbar height + buffer
    const atBottom =
      Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 2;

    if (atBottom && headings.length > 0) {
      // At bottom: pick the last heading visible in the viewport
      for (let i = headings.length - 1; i >= 0; i--) {
        const rect = headings[i]!.getBoundingClientRect();
        if (rect.top < containerRect.bottom) {
          activeOutlineTitle.value = headings[i]!.textContent?.trim() ?? "";
          return;
        }
      }
    }

    let active = "";
    for (const heading of headings) {
      const rect = heading.getBoundingClientRect();
      if (rect.top - containerRect.top <= offset) {
        active = heading.textContent?.trim() ?? "";
      }
    }
    if (active) activeOutlineTitle.value = active;
  };

  el.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // set initial state
  scrollCleanup = () => el.removeEventListener("scroll", onScroll);
}

// ── Editor toolbar items ────────────────────────────────────────────────────
const fixedToolbarItems: EditorToolbarItem[][] = [
  // Undo / Redo
  [
    { kind: "undo", icon: "i-lucide-undo", tooltip: { text: "Undo" } },
    { kind: "redo", icon: "i-lucide-redo", tooltip: { text: "Redo" } },
  ],
  // Block types
  [
    {
      icon: "i-lucide-heading",
      tooltip: { text: "Headings" },
      content: { align: "start" },
      items: [
        {
          kind: "heading",
          level: 1,
          icon: "i-lucide-heading-1",
          label: "Heading 1",
        },
        {
          kind: "heading",
          level: 2,
          icon: "i-lucide-heading-2",
          label: "Heading 2",
        },
        {
          kind: "heading",
          level: 3,
          icon: "i-lucide-heading-3",
          label: "Heading 3",
        },
        {
          kind: "heading",
          level: 4,
          icon: "i-lucide-heading-4",
          label: "Heading 4",
        },
      ],
    },
    {
      icon: "i-lucide-list",
      tooltip: { text: "Lists" },
      content: { align: "start" },
      items: [
        {
          kind: "bulletList",
          icon: "i-lucide-list",
          label: "Bullet List",
        },
        {
          kind: "orderedList",
          icon: "i-lucide-list-ordered",
          label: "Ordered List",
        },
      ],
    },
    {
      kind: "blockquote",
      icon: "i-lucide-text-quote",
      tooltip: { text: "Blockquote" },
    },
    {
      kind: "codeBlock",
      icon: "i-lucide-square-code",
      tooltip: { text: "Code Block" },
    },
    {
      kind: "horizontalRule",
      icon: "i-lucide-separator-horizontal",
      tooltip: { text: "Divider" },
    },
  ],
  // Text formatting
  [
    {
      kind: "mark",
      mark: "bold",
      icon: "i-lucide-bold",
      tooltip: { text: "Bold" },
    },
    {
      kind: "mark",
      mark: "italic",
      icon: "i-lucide-italic",
      tooltip: { text: "Italic" },
    },
    {
      kind: "mark",
      mark: "underline",
      icon: "i-lucide-underline",
      tooltip: { text: "Underline" },
    },
    {
      kind: "mark",
      mark: "strike",
      icon: "i-lucide-strikethrough",
      tooltip: { text: "Strikethrough" },
    },
    {
      kind: "mark",
      mark: "code",
      icon: "i-lucide-code",
      tooltip: { text: "Inline Code" },
    },
  ],
  // Link
  [{ kind: "link", icon: "i-lucide-link", tooltip: { text: "Link" } }],
];

const bubbleToolbarItems: EditorToolbarItem[][] = [
  [
    {
      kind: "mark",
      mark: "bold",
      icon: "i-lucide-bold",
      tooltip: { text: "Bold" },
    },
    {
      kind: "mark",
      mark: "italic",
      icon: "i-lucide-italic",
      tooltip: { text: "Italic" },
    },
    {
      kind: "mark",
      mark: "underline",
      icon: "i-lucide-underline",
      tooltip: { text: "Underline" },
    },
    {
      kind: "mark",
      mark: "strike",
      icon: "i-lucide-strikethrough",
      tooltip: { text: "Strikethrough" },
    },
    {
      kind: "mark",
      mark: "code",
      icon: "i-lucide-code",
      tooltip: { text: "Code" },
    },
  ],
  [{ kind: "link", icon: "i-lucide-link", tooltip: { text: "Link" } }],
];

// ── Suggestion menu items (slash commands) ──────────────────────────────────
const suggestionItems: EditorSuggestionMenuItem[][] = [
  [
    { type: "label", label: "Style" },
    { kind: "paragraph", label: "Paragraph", icon: "i-lucide-type" },
    {
      kind: "heading",
      level: 1,
      label: "Heading 1",
      icon: "i-lucide-heading-1",
    },
    {
      kind: "heading",
      level: 2,
      label: "Heading 2",
      icon: "i-lucide-heading-2",
    },
    {
      kind: "heading",
      level: 3,
      label: "Heading 3",
      icon: "i-lucide-heading-3",
    },
  ],
  [
    { type: "label", label: "Lists" },
    { kind: "bulletList", label: "Bullet List", icon: "i-lucide-list" },
    {
      kind: "orderedList",
      label: "Numbered List",
      icon: "i-lucide-list-ordered",
    },
  ],
  [
    { type: "label", label: "Insert" },
    {
      kind: "blockquote",
      label: "Blockquote",
      icon: "i-lucide-text-quote",
    },
    {
      kind: "codeBlock",
      label: "Code Block",
      icon: "i-lucide-square-code",
    },
    {
      kind: "horizontalRule",
      label: "Divider",
      icon: "i-lucide-separator-horizontal",
    },
    { kind: "mention", label: "Mention", icon: "i-lucide-at-sign" },
    { kind: "emoji", label: "Emoji", icon: "i-lucide-smile-plus" },
  ],
];

// ── Mention menu items ──────────────────────────────────────────────────────
const mentionItems: EditorMentionMenuItem[] = [
  {
    label: "benjamincanac",
    avatar: {
      src: "https://avatars.githubusercontent.com/u/739984?v=4",
    },
  },
  {
    label: "atinux",
    avatar: {
      src: "https://avatars.githubusercontent.com/u/904724?v=4",
    },
  },
  {
    label: "danielroe",
    avatar: {
      src: "https://avatars.githubusercontent.com/u/28706372?v=4",
    },
  },
  {
    label: "pi0",
    avatar: {
      src: "https://avatars.githubusercontent.com/u/5158436?v=4",
    },
  },
  {
    label: "JohnDoe",
    avatar: {
      src: "https://i.pravatar.cc/128?u=john",
    },
  },
];

// ── Emoji menu items ────────────────────────────────────────────────────────
const emojiItems: EditorEmojiMenuItem[] = gitHubEmojis.filter(
  (emoji) => !emoji.name.startsWith("regional_indicator_"),
);

// ── Drag handle items ───────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedNode = ref<{ node: any; pos: number }>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onNodeChange(event: { node: any; pos: number }) {
  selectedNode.value = event;
}

// ── Sidebar content for mobile ──────────────────────────────────────────────
</script>

<template>
  <div class="flex h-screen bg-(--ui-bg) overflow-hidden">
    <!-- Mobile sidebar toggle -->
    <UButton
      class="lg:hidden fixed top-3 right-3 z-30"
      icon="i-lucide-panel-left"
      variant="outline"
      color="neutral"
      size="sm"
      aria-label="Open document sidebar"
      @click="sidebarOpen = true"
    />

    <USlideover v-model:open="sidebarOpen" side="left" title="Documents">
      <template #body>
        <div class="flex flex-col gap-4 h-full">
          <!-- Search -->
          <UInput
            v-model="searchQuery"
            placeholder="Search documents..."
            icon="i-lucide-search"
            size="sm"
          />

          <!-- Category filter chips -->
          <div class="flex flex-wrap gap-1.5">
            <UButton
              v-for="cat in categories"
              :key="cat.value"
              :label="cat.label"
              :icon="cat.icon"
              size="xs"
              :variant="selectedCategory === cat.value ? 'soft' : 'ghost'"
              :color="selectedCategory === cat.value ? 'primary' : 'neutral'"
              @click="selectedCategory = cat.value"
            />
          </div>

          <USeparator />

          <!-- Document list -->
          <div class="flex-1 overflow-y-auto -mx-1 space-y-0.5">
            <div
              v-for="(doc, i) in filteredDocuments"
              :key="i"
              class="flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors"
              :class="
                doc.active
                  ? 'bg-(--ui-primary)/10 text-(--ui-primary)'
                  : 'hover:bg-(--ui-bg-elevated) text-(--ui-text)'
              "
              @click="sidebarOpen = false"
            >
              <UIcon :name="doc.icon" class="size-4 shrink-0" />
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium truncate">{{ doc.title }}</p>
                <p class="text-xs text-(--ui-text-dimmed)">
                  {{ doc.updated }}
                </p>
              </div>
              <UBadge
                v-if="doc.active"
                label="Active"
                variant="subtle"
                color="primary"
                size="xs"
              />
            </div>
            <p
              v-if="filteredDocuments.length === 0"
              class="text-sm text-(--ui-text-dimmed) text-center py-6"
            >
              No documents found.
            </p>
          </div>
        </div>
      </template>
    </USlideover>

    <!-- Desktop sidebar -->
    <aside
      class="hidden lg:flex flex-col w-64 shrink-0 border-r border-(--ui-border) bg-elevated/50"
    >
      <!-- Header -->
      <div class="px-4 py-3 border-b border-(--ui-border)">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-sm font-semibold text-(--ui-text-highlighted)">
            Documents
          </h2>
          <UTooltip text="New document">
            <UButton
              icon="i-lucide-plus"
              variant="ghost"
              color="neutral"
              size="xs"
              aria-label="New document"
            />
          </UTooltip>
        </div>

        <!-- Search -->
        <UInput
          v-model="searchQuery"
          placeholder="Search..."
          icon="i-lucide-search"
          size="sm"
          class="mb-2 w-full"
        />

        <!-- Category filter chips -->
        <div class="flex flex-wrap gap-1">
          <UButton
            v-for="cat in categories"
            :key="cat.value"
            :label="cat.label"
            size="xs"
            :variant="selectedCategory === cat.value ? 'soft' : 'ghost'"
            :color="selectedCategory === cat.value ? 'primary' : 'neutral'"
            @click="selectedCategory = cat.value"
          />
        </div>
      </div>

      <!-- Document list -->
      <div class="flex-1 overflow-y-auto py-2 space-y-1">
        <div
          v-for="(doc, i) in filteredDocuments"
          :key="i"
          class="px-3 py-2 mx-2 rounded-lg cursor-pointer transition-colors"
          :class="
            doc.active
              ? 'bg-(--ui-primary)/10 text-(--ui-primary)'
              : 'hover:bg-(--ui-bg-elevated) text-(--ui-text)'
          "
        >
          <div class="flex items-center gap-2">
            <UIcon :name="doc.icon" class="size-4 shrink-0" />
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium truncate">{{ doc.title }}</p>
              <p class="text-xs text-(--ui-text-dimmed)">{{ doc.updated }}</p>
            </div>
          </div>
        </div>
        <p
          v-if="filteredDocuments.length === 0"
          class="text-sm text-(--ui-text-dimmed) text-center py-6"
        >
          No documents found.
        </p>
      </div>

      <!-- Outline -->
      <div class="border-t border-(--ui-border) py-3">
        <p
          class="px-4 text-xs font-semibold text-(--ui-text-dimmed) uppercase tracking-wider mb-2"
        >
          Outline
        </p>
        <div class="space-y-0.5">
          <div
            v-for="item in outlineItems"
            :key="item.title"
            class="px-4 py-1 text-sm cursor-pointer transition-colors truncate"
            :class="[
              item.level === 2 ? 'pl-6' : item.level === 3 ? 'pl-8' : '',
              activeOutlineTitle === item.title
                ? 'text-(--ui-primary) font-medium'
                : 'text-(--ui-text-muted) hover:text-(--ui-text)',
            ]"
            @click="scrollToHeading(item.title, item.level)"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </aside>

    <!-- Editor main area -->
    <div class="flex-1 flex flex-col overflow-hidden min-w-0">
      <!-- Document header -->
      <div class="px-4 sm:px-8 lg:px-14 pt-6 pb-3 shrink-0">
        <input
          v-model="documentTitle"
          class="w-full text-2xl sm:text-3xl font-bold text-(--ui-text-highlighted) bg-transparent border-none outline-none placeholder:text-(--ui-text-dimmed)"
          placeholder="Untitled Document"
        >
        <div
          class="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2 text-sm text-(--ui-text-muted)"
        >
          <div class="flex items-center gap-1.5">
            <UAvatar text="JD" size="xs" color="primary" />
            <span>John Doe</span>
          </div>
          <USeparator orientation="vertical" class="h-4 hidden sm:block" />
          <span class="hidden sm:inline">{{ lastSaved }} ago</span>
          <USeparator orientation="vertical" class="h-4 hidden sm:block" />
          <span class="hidden sm:inline">{{ wordCount }} words</span>
          <USeparator orientation="vertical" class="h-4 hidden sm:block" />
          <div class="flex items-center gap-1.5">
            <UIcon name="i-lucide-tag" class="size-3.5" />
            <div class="flex gap-1 flex-wrap">
              <UBadge
                v-for="tag in tags"
                :key="tag"
                :label="tag"
                variant="subtle"
                color="neutral"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- UEditor -->
      <UEditor
        ref="editorContainerRef"
        v-slot="{ editor }"
        v-model="editorContent"
        content-type="markdown"
        :extensions="[Emoji]"
        placeholder="Write, type '/' for commands..."
        class="flex-1 min-h-0 overflow-y-auto"
        :ui="{
          base: 'px-4 sm:px-8 lg:px-14 pb-8',
          content: 'max-w-3xl mx-auto mt-10',
        }"
      >
        <!-- Fixed toolbar -->
        <UEditorToolbar
          :editor="editor"
          :items="fixedToolbarItems"
          class="border-y border-(--ui-border) py-1.5 px-4 sm:px-8 lg:px-14 overflow-x-auto sticky top-0 z-10 bg-(--ui-bg)"
        />

        <!-- Bubble toolbar (on text selection) -->
        <UEditorToolbar
          :editor="editor"
          :items="bubbleToolbarItems"
          layout="bubble"
          :should-show="
            ({ view, state }: any) => {
              const { selection } = state;
              return view.hasFocus() && !selection.empty;
            }
          "
        />

        <!-- Drag handle -->
        <UEditorDragHandle
          v-slot="{ ui, onClick }"
          :editor="editor"
          @node-change="onNodeChange"
        >
          <UTooltip text="Add block">
            <UButton
              icon="i-lucide-plus"
              color="neutral"
              variant="ghost"
              size="xs"
              aria-label="Add block"
              :class="ui.handle()"
              @click="
                (e: MouseEvent) => {
                  e.stopPropagation();
                  onClick();
                }
              "
            />
          </UTooltip>

          <UButton
            icon="i-lucide-grip-vertical"
            color="neutral"
            variant="ghost"
            size="xs"
            aria-label="Drag to reorder"
            :class="ui.handle()"
          />
        </UEditorDragHandle>

        <!-- Emoji menu (type : to trigger) -->
        <UEditorEmojiMenu :editor="editor" :items="emojiItems" />

        <!-- Mention menu (type @ to trigger) -->
        <UEditorMentionMenu :editor="editor" :items="mentionItems" />

        <!-- Suggestion menu (type / to trigger) -->
        <UEditorSuggestionMenu :editor="editor" :items="suggestionItems" />
      </UEditor>

      <!-- Status bar -->
      <div
        class="flex items-center justify-between px-4 py-1.5 border-t border-(--ui-border) bg-(--ui-bg-muted) text-xs text-(--ui-text-dimmed) shrink-0"
      >
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-1.5">
            <div class="size-2 rounded-full bg-(--ui-success)" />
            <span>Saved</span>
          </div>
          <span class="hidden sm:inline"
            >{{ wordCount }} words · {{ charCount }} characters</span
          >
        </div>
        <div class="flex items-center gap-3">
          <UBadge label="Markdown" variant="subtle" color="neutral" size="xs" />
          <span class="hidden sm:inline">UTF-8</span>
          <div class="hidden sm:flex items-center gap-0.5">
            <UKbd value="meta" size="sm" />
            <UKbd value="S" size="sm" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.tiptap h1),
:deep(.tiptap h2),
:deep(.tiptap h3),
:deep(.tiptap h4),
:deep(.tiptap h5),
:deep(.tiptap h6) {
  scroll-margin-top: 3.5rem;
}
</style>
