<script setup lang="ts">
const sections = [
  {
    headline: "Design",
    title: "Visual theme editor",
    description:
      "Point-and-click controls for every design token — colors, typography, spacing, and radius. See results in real time without writing a single line of CSS.",
    icon: "i-lucide-palette",
    mockType: "editor",
    links: [
      {
        label: "Learn more",
        icon: "i-lucide-arrow-right",
        trailing: true,
        variant: "link" as const,
        color: "primary" as const,
      },
    ],
  },
  {
    headline: "Preview",
    title: "Live component previews",
    description:
      "Browse 125+ real components, blocks, and full-page templates — all rendered live with your active theme. Toggle dark mode and viewport size instantly.",
    icon: "i-lucide-eye",
    mockType: "preview",
    links: [
      {
        label: "Learn more",
        icon: "i-lucide-arrow-right",
        trailing: true,
        variant: "link" as const,
        color: "primary" as const,
      },
    ],
  },
  {
    headline: "Export",
    title: "One-click export",
    description:
      "Generate app.config.ts, CSS variables, or JSON with a single click. Copy the output and paste it into any Nuxt UI project for instant theming.",
    icon: "i-lucide-download",
    mockType: "export",
    links: [
      {
        label: "Learn more",
        icon: "i-lucide-arrow-right",
        trailing: true,
        variant: "link" as const,
        color: "primary" as const,
      },
    ],
  },
];

const editorRows = [
  { label: "Primary", color: "bg-(--ui-primary)" },
  { label: "Secondary", color: "bg-(--ui-secondary)" },
  { label: "Neutral", color: "bg-(--ui-bg-inverted)" },
];

const previewItems = [
  { label: "Button", badge: "Active", badgeColor: "success" as const },
  { label: "Card", badge: "Styled", badgeColor: "info" as const },
  { label: "Modal", badge: "Ready", badgeColor: "warning" as const },
];
</script>

<template>
  <div class="space-y-0">
    <UPageSection
      v-for="(section, i) in sections"
      :key="section.title"
      :headline="section.headline"
      :title="section.title"
      :description="section.description"
      :icon="section.icon"
      :links="section.links"
      orientation="horizontal"
      :reverse="i % 2 === 1"
    >
      <!-- Editor mock card -->
      <div
        v-if="section.mockType === 'editor'"
        class="feat-alt-slide rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) shadow-xl overflow-hidden"
        :style="{ animationDelay: `${i * 150}ms` }"
      >
        <div
          class="flex items-center gap-2 px-4 py-2.5 border-b border-(--ui-border) bg-(--ui-bg-elevated)/80"
        >
          <span
            class="size-2.5 rounded-full bg-red-400/80"
            aria-hidden="true"
          />
          <span
            class="size-2.5 rounded-full bg-yellow-400/80"
            aria-hidden="true"
          />
          <span
            class="size-2.5 rounded-full bg-green-400/80"
            aria-hidden="true"
          />
          <span class="ml-2 text-xs text-(--ui-text-muted) font-mono"
            >theme.config</span
          >
        </div>
        <div class="p-5 space-y-3">
          <div
            v-for="row in editorRows"
            :key="row.label"
            class="flex items-center gap-3"
          >
            <div
              class="size-8 rounded-lg shrink-0"
              :class="row.color"
              aria-hidden="true"
            />
            <div class="flex-1 space-y-1">
              <div class="text-xs font-medium text-(--ui-text-highlighted)">
                {{ row.label }}
              </div>
              <div
                class="h-1.5 w-full rounded-full bg-(--ui-border)"
                aria-hidden="true"
              >
                <div
                  class="h-1.5 rounded-full bg-(--ui-primary)/40"
                  :style="{ width: `${60 + Math.random() * 30}%` }"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview mock card -->
      <div
        v-else-if="section.mockType === 'preview'"
        class="feat-alt-slide rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) shadow-xl overflow-hidden"
        :style="{ animationDelay: `${i * 150}ms` }"
      >
        <div
          class="flex items-center gap-2 px-4 py-2.5 border-b border-(--ui-border) bg-(--ui-bg-elevated)/80"
        >
          <span
            class="size-2.5 rounded-full bg-red-400/80"
            aria-hidden="true"
          />
          <span
            class="size-2.5 rounded-full bg-yellow-400/80"
            aria-hidden="true"
          />
          <span
            class="size-2.5 rounded-full bg-green-400/80"
            aria-hidden="true"
          />
          <span class="ml-2 text-xs text-(--ui-text-muted) font-mono"
            >preview</span
          >
        </div>
        <div class="p-5 space-y-3">
          <div
            v-for="item in previewItems"
            :key="item.label"
            class="flex items-center justify-between py-2 px-3 rounded-lg bg-(--ui-bg)/60"
          >
            <div class="flex items-center gap-2">
              <div
                class="size-7 rounded-md bg-(--ui-primary)/10 flex items-center justify-center"
              >
                <UIcon
                  name="i-lucide-component"
                  class="size-3.5 text-(--ui-primary)"
                  aria-hidden="true"
                />
              </div>
              <span class="text-sm font-medium text-(--ui-text-highlighted)">{{
                item.label
              }}</span>
            </div>
            <UBadge
              :label="item.badge"
              :color="item.badgeColor"
              variant="subtle"
              size="xs"
            />
          </div>
        </div>
      </div>

      <!-- Export mock card -->
      <div
        v-else
        class="relative feat-alt-slide"
        :style="{ animationDelay: `${i * 150}ms` }"
      >
        <div
          class="rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) shadow-xl overflow-hidden"
        >
          <div
            class="flex items-center gap-2 px-4 py-2.5 border-b border-(--ui-border) bg-(--ui-bg-elevated)/80"
          >
            <span
              class="size-2.5 rounded-full bg-red-400/80"
              aria-hidden="true"
            />
            <span
              class="size-2.5 rounded-full bg-yellow-400/80"
              aria-hidden="true"
            />
            <span
              class="size-2.5 rounded-full bg-green-400/80"
              aria-hidden="true"
            />
            <span class="ml-2 text-xs text-(--ui-text-muted) font-mono"
              >app.config.ts</span
            >
          </div>
          <div class="p-5 font-mono text-xs space-y-1 text-(--ui-text-muted)">
            <p>
              <span class="text-(--ui-primary)">export default</span>
              defineAppConfig({
            </p>
            <p class="pl-4">ui: {</p>
            <p class="pl-8">colors: {</p>
            <p class="pl-12">
              primary: <span class="text-(--ui-primary)">'green'</span>,
            </p>
            <p class="pl-12">
              neutral: <span class="text-(--ui-text-highlighted)">'slate'</span>
            </p>
            <p class="pl-8">}</p>
            <p class="pl-4">}</p>
            <p>})</p>
          </div>
        </div>
        <!-- Floating success toast -->
        <div
          class="absolute -bottom-3 -right-3 rounded-xl border border-(--ui-border) bg-(--ui-bg) shadow-lg px-3 py-2 flex items-center gap-2 feat-alt-float"
        >
          <UIcon
            name="i-lucide-clipboard-check"
            class="size-4 text-green-500 shrink-0"
            aria-hidden="true"
          />
          <span class="text-xs font-medium text-(--ui-text-highlighted)"
            >Copied!</span
          >
        </div>
      </div>
    </UPageSection>
  </div>
</template>

<style scoped>
.feat-alt-slide {
  animation: featAltSlide 0.7s ease-out both;
}

.feat-alt-float {
  animation: featAltFloat 0.5s ease-out both;
  animation-delay: 0.8s;
}

@keyframes featAltSlide {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes featAltFloat {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .feat-alt-slide,
  .feat-alt-float {
    animation: none;
  }
}
</style>
