<script setup lang="ts">
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
`);

const documentTitle = ref("Getting Started Guide");
const lastSaved = ref("2 minutes ago");
const wordCount = computed(() => {
  return editorContent.value.split(/\s+/).filter(Boolean).length;
});
const charCount = computed(() => editorContent.value.length);

const tags = ref(["documentation", "guide", "theme-builder"]);

const toolbarItems = [
  { group: "format", items: ["Bold", "Italic", "Underline", "Strike"] },
  { group: "heading", items: ["H1", "H2", "H3"] },
  { group: "list", items: ["Bullet List", "Ordered List", "Checklist"] },
  { group: "insert", items: ["Link", "Image", "Code", "Quote"] },
];

const outlineItems = [
  { title: "Getting Started with Nuxt UI Theme Builder", level: 1 },
  { title: "Quick Start", level: 2 },
  { title: "Color System", level: 2 },
  { title: "Typography", level: 2 },
  { title: "Border Radius", level: 2 },
  { title: "Exporting Your Theme", level: 2 },
];
</script>

<template>
  <div class="flex h-[calc(100vh-140px)] bg-(--ui-bg)">
    <!-- Document Sidebar -->
    <aside
      class="hidden lg:flex flex-col w-60 shrink-0 border-r border-(--ui-border) bg-(--ui-bg)"
    >
      <!-- Document list header -->
      <div class="px-4 py-3 border-b border-(--ui-border)">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold text-(--ui-text-highlighted)">
            Documents
          </h3>
          <UButton
            icon="i-lucide-plus"
            variant="ghost"
            color="neutral"
            size="xs"
          />
        </div>
      </div>

      <!-- Document list -->
      <div class="flex-1 overflow-y-auto py-2">
        <div
          v-for="(doc, i) in [
            {
              title: 'Getting Started Guide',
              icon: 'i-lucide-file-text',
              active: true,
              updated: 'Just now',
            },
            {
              title: 'API Reference',
              icon: 'i-lucide-file-code',
              active: false,
              updated: '1 hour ago',
            },
            {
              title: 'Release Notes v2.0',
              icon: 'i-lucide-file-check',
              active: false,
              updated: 'Yesterday',
            },
            {
              title: 'Meeting Notes',
              icon: 'i-lucide-file-text',
              active: false,
              updated: '3 days ago',
            },
            {
              title: 'Architecture Design',
              icon: 'i-lucide-file-text',
              active: false,
              updated: '1 week ago',
            },
          ]"
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
      </div>

      <!-- Outline -->
      <div class="border-t border-(--ui-border) py-3">
        <p
          class="px-4 text-xs font-semibold text-(--ui-text-dimmed) uppercase mb-2"
        >
          Outline
        </p>
        <div class="space-y-0.5">
          <div
            v-for="item in outlineItems"
            :key="item.title"
            class="px-4 py-1 text-sm text-(--ui-text-muted) hover:text-(--ui-text) cursor-pointer transition-colors"
            :class="{ 'pl-8': item.level === 2 }"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </aside>

    <!-- Editor Main -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Editor Toolbar -->
      <div
        class="flex items-center gap-1 px-4 py-2 border-b border-(--ui-border) bg-(--ui-bg) overflow-x-auto shrink-0"
      >
        <template v-for="(group, gi) in toolbarItems" :key="group.group">
          <div class="flex items-center gap-0.5">
            <UTooltip v-for="item in group.items" :key="item" :text="item">
              <UButton
                :icon="
                  item === 'Bold'
                    ? 'i-lucide-bold'
                    : item === 'Italic'
                      ? 'i-lucide-italic'
                      : item === 'Underline'
                        ? 'i-lucide-underline'
                        : item === 'Strike'
                          ? 'i-lucide-strikethrough'
                          : item === 'H1'
                            ? 'i-lucide-heading-1'
                            : item === 'H2'
                              ? 'i-lucide-heading-2'
                              : item === 'H3'
                                ? 'i-lucide-heading-3'
                                : item === 'Bullet List'
                                  ? 'i-lucide-list'
                                  : item === 'Ordered List'
                                    ? 'i-lucide-list-ordered'
                                    : item === 'Checklist'
                                      ? 'i-lucide-list-checks'
                                      : item === 'Link'
                                        ? 'i-lucide-link'
                                        : item === 'Image'
                                          ? 'i-lucide-image'
                                          : item === 'Code'
                                            ? 'i-lucide-code'
                                            : item === 'Quote'
                                              ? 'i-lucide-quote'
                                              : 'i-lucide-type'
                "
                variant="ghost"
                color="neutral"
                size="xs"
              />
            </UTooltip>
          </div>
          <USeparator
            v-if="gi < toolbarItems.length - 1"
            orientation="vertical"
            class="h-6 mx-1"
          />
        </template>

        <div class="flex-1" />

        <!-- Right side actions -->
        <UButton
          icon="i-lucide-undo-2"
          variant="ghost"
          color="neutral"
          size="xs"
        />
        <UButton
          icon="i-lucide-redo-2"
          variant="ghost"
          color="neutral"
          size="xs"
        />
        <USeparator orientation="vertical" class="h-6 mx-1" />
        <UButton
          icon="i-lucide-share"
          variant="ghost"
          color="neutral"
          size="xs"
        />
        <UButton
          icon="i-lucide-more-horizontal"
          variant="ghost"
          color="neutral"
          size="xs"
        />
      </div>

      <!-- Document Header -->
      <div class="px-6 sm:px-12 lg:px-20 pt-8 pb-4 shrink-0">
        <input
          v-model="documentTitle"
          class="w-full text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) bg-transparent border-none outline-none placeholder:text-(--ui-text-dimmed)"
          placeholder="Untitled Document"
        />
        <div
          class="flex items-center gap-3 mt-3 text-sm text-(--ui-text-muted)"
        >
          <div class="flex items-center gap-1.5">
            <UAvatar text="JD" size="xs" color="primary" />
            <span>John Doe</span>
          </div>
          <USeparator orientation="vertical" class="h-4" />
          <span>{{ lastSaved }} ago</span>
          <USeparator orientation="vertical" class="h-4" />
          <span>{{ wordCount }} words</span>
          <USeparator orientation="vertical" class="h-4" />
          <div class="flex items-center gap-1.5">
            <UIcon name="i-lucide-tag" class="size-3.5" />
            <div class="flex gap-1">
              <UBadge
                v-for="tag in tags"
                :key="tag"
                :label="tag"
                variant="subtle"
                color="neutral"
                size="xs"
              />
            </div>
          </div>
        </div>
      </div>

      <USeparator />

      <!-- Editor Content Area (textarea-based for this demo) -->
      <div class="flex-1 overflow-y-auto px-6 sm:px-12 lg:px-20 py-6">
        <div class="max-w-3xl mx-auto prose prose-sm">
          <UTextarea
            v-model="editorContent"
            :rows="30"
            autoresize
            variant="none"
            class="w-full !text-base leading-relaxed font-mono"
            placeholder="Start writing..."
          />
        </div>
      </div>

      <!-- Status Bar -->
      <div
        class="flex items-center justify-between px-4 py-1.5 border-t border-(--ui-border) bg-(--ui-bg-muted) text-xs text-(--ui-text-dimmed) shrink-0"
      >
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-1">
            <div class="size-2 rounded-full bg-(--ui-success)" />
            <span>Saved</span>
          </div>
          <span>{{ wordCount }} words · {{ charCount }} characters</span>
        </div>
        <div class="flex items-center gap-3">
          <span>Markdown</span>
          <span>UTF-8</span>
          <UKbd value="meta" size="sm" />
          <UKbd value="S" size="sm" />
        </div>
      </div>
    </div>
  </div>
</template>
