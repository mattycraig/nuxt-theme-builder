<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Resizable Panels"
      description="Drag the gap between panels to resize them within their min and max sizes."
      :prop-hints="['items', 'minSize', 'maxSize', 'defaultSize']"
    >
      <div class="h-64">
        <USplitter id="showcase-splitter-basic" :items="basicItems">
          <template #sidebar>Sidebar</template>
          <template #main>Main</template>
        </USplitter>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Visible Handle"
      description="A flush layout with a divider that highlights in the primary color on hover and drag."
      :prop-hints="['ui.handle', '#resize-handle']"
    >
      <div class="h-64">
        <USplitter
          id="showcase-splitter-handle"
          :items="flushItems"
          :ui="{ handle: handleClass }"
          class="rounded-lg border border-(--ui-border) bg-(--ui-bg) overflow-hidden"
        >
          <template #list>
            <div class="flex-1 p-3 space-y-1">
              <div
                v-for="(mail, i) in mails"
                :key="mail"
                class="rounded-md px-2 py-1.5 text-sm truncate"
                :class="
                  i === 0
                    ? 'bg-(--ui-bg-elevated) text-(--ui-text-highlighted) font-medium'
                    : 'text-(--ui-text-muted)'
                "
              >
                {{ mail }}
              </div>
            </div>
          </template>
          <template #detail>
            <div class="flex-1 p-4 space-y-2">
              <p class="font-semibold text-(--ui-text-highlighted)">
                {{ mails[0] }}
              </p>
              <p class="text-sm text-(--ui-text-muted)">
                The theme looks great in both modes. Ship it whenever you're
                ready.
              </p>
              <UButton label="Reply" icon="i-lucide-reply" size="sm" />
            </div>
          </template>
          <template #resize-handle>
            <div
              class="absolute top-1/2 left-1/2 -translate-1/2 h-6 w-1.5 rounded-full bg-(--ui-border-accented)"
            />
          </template>
        </USplitter>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Collapsible Panel"
      description="A panel that collapses past its minimum size, controlled from its slot."
      :prop-hints="['collapsible', 'collapsedSize', 'sizeUnit']"
    >
      <div class="h-64">
        <USplitter id="showcase-splitter-collapsible" :items="collapsibleItems">
          <template #nav="{ collapsed, collapse, expand }">
            <div class="flex-1 flex items-center justify-center p-2">
              <UButton
                :icon="
                  collapsed
                    ? 'i-lucide-panel-left-open'
                    : 'i-lucide-panel-left-close'
                "
                :label="collapsed ? undefined : 'Collapse'"
                :aria-label="collapsed ? 'Expand' : undefined"
                color="neutral"
                variant="subtle"
                @click="collapsed ? expand() : collapse()"
              />
            </div>
          </template>
          <template #content>Content</template>
        </USplitter>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Nested & Vertical"
      description="Splitters nested inside panels for IDE-style layouts."
      :prop-hints="['orientation']"
    >
      <div class="h-72">
        <USplitter id="showcase-splitter-outer" :items="outerItems">
          <template #files>Files</template>
          <template #workspace>
            <USplitter
              id="showcase-splitter-inner"
              orientation="vertical"
              :items="innerItems"
              class="flex-1"
            >
              <template #editor>Editor</template>
              <template #terminal>Terminal</template>
            </USplitter>
          </template>
        </USplitter>
      </div>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
import type { SplitterItem } from "@nuxt/ui";

const panel =
  "bg-(--ui-bg-elevated)/50 border border-(--ui-border) rounded-(--ui-radius) items-center justify-center text-sm text-(--ui-text-muted) font-medium";

const basicItems: SplitterItem[] = [
  { slot: "sidebar", minSize: 15, maxSize: 45, defaultSize: 30, class: panel },
  { slot: "main", defaultSize: 70, class: panel },
];

const handleClass =
  "data-[orientation=horizontal]:w-px data-[orientation=vertical]:h-px bg-(--ui-border) transition-colors data-[state=hover]:bg-(--ui-primary) data-[state=drag]:bg-(--ui-primary)";

const flushItems: SplitterItem[] = [
  { slot: "list", minSize: 25, defaultSize: 40, class: "items-stretch" },
  { slot: "detail", defaultSize: 60, class: "items-stretch" },
];

const mails = [
  "Theme review: Sunset",
  "Export to app.config.ts",
  "New palette ideas",
  "Radius feedback",
];

const collapsibleItems: SplitterItem[] = [
  {
    slot: "nav",
    minSize: 25,
    defaultSize: 35,
    collapsible: true,
    collapsedSize: 12,
    class: panel,
  },
  { slot: "content", defaultSize: 65, class: panel },
];

const outerItems: SplitterItem[] = [
  { slot: "files", minSize: 15, defaultSize: 25, class: panel },
  { slot: "workspace", defaultSize: 75 },
];

const innerItems: SplitterItem[] = [
  { slot: "editor", minSize: 20, defaultSize: 65, class: panel },
  { slot: "terminal", minSize: 15, defaultSize: 35, class: panel },
];
</script>
