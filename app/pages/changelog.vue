<script setup lang="ts">
definePageMeta({ layout: "preview" });

interface ChangeItem {
  type: "feature" | "improvement" | "fix";
  items: string[];
}

interface Release {
  title: string;
  date: string;
  badge: string | { label: string; color: string; variant: string };
  description: string;
  authors: {
    name: string;
    description?: string;
    avatar: { src?: string; alt?: string; text?: string };
  }[];
  changes: ChangeItem[];
}

const versions: Release[] = [
  {
    title: "v4.4.0",
    date: "2026-01-30",
    badge: { label: "Latest", color: "primary", variant: "solid" },
    description:
      "A major update with new Editor components, AI Chat improvements, and Pricing plan components.",
    authors: [
      {
        name: "Sébastien Chopin",
        description: "@atinux",
        avatar: {
          src: "https://github.com/atinux.png",
          alt: "Sébastien Chopin",
        },
      },
      {
        name: "Benjamin Canac",
        description: "@benjamincanac",
        avatar: {
          src: "https://github.com/benjamincanac.png",
          alt: "Benjamin Canac",
        },
      },
    ],
    changes: [
      {
        type: "feature",
        items: [
          "New UEditor component with TipTap integration",
          "UEditorToolbar with fixed, bubble, and floating layouts",
          "UEditorSuggestionMenu for slash commands",
          "UEditorMentionMenu for @mentions",
          "UEditorDragHandle for block reordering",
          "UChatPrompt component with autoresize textarea",
          "UChatPromptSubmit with status-aware submit/stop/reload",
          "UPricingPlan, UPricingPlans, UPricingTable components",
        ],
      },
      {
        type: "improvement",
        items: [
          "UTable now supports sortable columns",
          "UModal gained fullscreen mode",
          "UButton loading state animation improved",
          "Better TypeScript generics for form components",
        ],
      },
      {
        type: "fix",
        items: [
          "Fixed UCalendar range selection edge case",
          "Fixed UNavigationMenu highlight position on route change",
          "Fixed USelect placeholder not showing in Safari",
        ],
      },
    ],
  },
  {
    title: "v4.3.0",
    date: "2026-01-15",
    badge: { label: "Stable", color: "success", variant: "solid" },
    description:
      "Introduced the Dashboard component suite and significant performance improvements.",
    authors: [
      {
        name: "Benjamin Canac",
        description: "@benjamincanac",
        avatar: {
          src: "https://github.com/benjamincanac.png",
          alt: "Benjamin Canac",
        },
      },
    ],
    changes: [
      {
        type: "feature",
        items: [
          "UDashboardGroup component for sidebar layouts",
          "UDashboardSidebar with resizable and collapsible support",
          "UDashboardNavbar with slot-based toolbar",
          "UDashboardPanel for complex multi-panel layouts",
          "UDashboardSearch integrating CommandPalette",
          "UDashboardToolbar component",
          "New UUser component for user displays",
        ],
      },
      {
        type: "improvement",
        items: [
          "50% faster component rendering with optimized watchers",
          "Reduced CSS output size by 30%",
          "Improved SSR hydration performance",
        ],
      },
      {
        type: "fix",
        items: [
          "Fixed color mode flash on initial load",
          "Fixed UAccordion animation jitter",
        ],
      },
    ],
  },
  {
    title: "v4.2.0",
    date: "2025-12-20",
    badge: { label: "Minor", color: "info", variant: "subtle" },
    description:
      "Added marketing and content page components for building landing pages.",
    authors: [
      {
        name: "Sébastien Chopin",
        description: "@atinux",
        avatar: {
          src: "https://github.com/atinux.png",
          alt: "Sébastien Chopin",
        },
      },
      {
        name: "Alex Kim",
        description: "@alexkim",
        avatar: { text: "AK" },
      },
    ],
    changes: [
      {
        type: "feature",
        items: [
          "UPageHero, UPageSection, UPageFeature components",
          "UPageCTA for call-to-action sections",
          "UPageCard with spotlight and highlight effects",
          "UPageGrid and UPageColumns for responsive layouts",
          "UBlogPost and UBlogPosts components",
          "UChangelogVersion and UChangelogVersions",
          "UAuthForm for login/register flows",
        ],
      },
      {
        type: "improvement",
        items: [
          'UButton now supports the "block" prop for full-width buttons',
          "UCard header and footer slots improved",
          "Better responsive behavior for all page components",
        ],
      },
    ],
  },
  {
    title: "v4.1.0",
    date: "2025-11-28",
    badge: { label: "Minor", color: "info", variant: "subtle" },
    description: "Introduced AI Chat components and improved form validation.",
    authors: [
      {
        name: "Benjamin Canac",
        description: "@benjamincanac",
        avatar: {
          src: "https://github.com/benjamincanac.png",
          alt: "Benjamin Canac",
        },
      },
    ],
    changes: [
      {
        type: "feature",
        items: [
          "UChatMessage and UChatMessages components",
          "UChatPalette overlay chat interface",
          "UForm now supports Zod v4 schemas",
          "UFormField added hint and help slots",
          "UPinInput for OTP/PIN entry",
        ],
      },
      {
        type: "improvement",
        items: [
          "Improved keyboard navigation across all components",
          "Better screen reader announcements",
          "UTable column resize support",
        ],
      },
      {
        type: "fix",
        items: [
          "Fixed UDropdownMenu positioning near viewport edges",
          "Fixed UToast stacking order",
          "Fixed USlider thumb not draggable on touch devices",
        ],
      },
    ],
  },
  {
    title: "v4.0.0",
    date: "2025-10-01",
    badge: { label: "Major", color: "warning", variant: "solid" },
    description:
      "The initial v4 release — a ground-up rewrite built on Reka UI, Tailwind CSS v4, and Tailwind Variants.",
    authors: [
      {
        name: "Sébastien Chopin",
        description: "@atinux",
        avatar: {
          src: "https://github.com/atinux.png",
          alt: "Sébastien Chopin",
        },
      },
      {
        name: "Benjamin Canac",
        description: "@benjamincanac",
        avatar: {
          src: "https://github.com/benjamincanac.png",
          alt: "Benjamin Canac",
        },
      },
      {
        name: "Hugo Richard",
        description: "@hugorcd__",
        avatar: {
          src: "https://github.com/hugorcd.png",
          alt: "Hugo Richard",
        },
      },
    ],
    changes: [
      {
        type: "feature",
        items: [
          "Complete rewrite with Reka UI primitives (55+ accessible primitives)",
          "Tailwind CSS v4 with CSS-first configuration",
          "Tailwind Variants for dynamic component styling",
          "Full Vue 3 compatibility without Nuxt requirement",
          "New theming system with design tokens and CSS variables",
          "60+ production-ready components",
        ],
      },
      {
        type: "improvement",
        items: [
          "5× faster full builds, 100× faster incremental builds",
          "Full TypeScript support with intelligent auto-completion",
          "First-class accessibility built into every component",
          "Zero-config import handling, vendor prefixing, and syntax transforms",
        ],
      },
    ],
  },
];

const typeConfig: Record<
  ChangeItem["type"],
  { label: string; icon: string; color: string }
> = {
  feature: {
    label: "New Features",
    icon: "i-lucide-sparkles",
    color: "primary",
  },
  improvement: {
    label: "Improvements",
    icon: "i-lucide-trending-up",
    color: "success",
  },
  fix: {
    label: "Bug Fixes",
    icon: "i-lucide-bug",
    color: "error",
  },
};

type ChangeType = "all" | "feature" | "improvement" | "fix";
const activeFilter = ref<ChangeType>("all");

const filterOptions = [
  { label: "All Changes", value: "all" as ChangeType, icon: "i-lucide-layers" },
  {
    label: "Features",
    value: "feature" as ChangeType,
    icon: "i-lucide-sparkles",
  },
  {
    label: "Improvements",
    value: "improvement" as ChangeType,
    icon: "i-lucide-trending-up",
  },
  { label: "Bug Fixes", value: "fix" as ChangeType, icon: "i-lucide-bug" },
];

const filteredVersions = computed(() => {
  if (activeFilter.value === "all") return versions;
  return versions
    .map((v) => ({
      ...v,
      changes: v.changes.filter((c) => c.type === activeFilter.value),
    }))
    .filter((v) => v.changes.length > 0);
});

const totalChanges = computed(() =>
  versions.reduce(
    (acc, v) => acc + v.changes.reduce((a, c) => a + c.items.length, 0),
    0,
  ),
);

const totalFeatures = computed(() =>
  versions.reduce(
    (acc, v) =>
      acc +
      v.changes
        .filter((c) => c.type === "feature")
        .reduce((a, c) => a + c.items.length, 0),
    0,
  ),
);

const totalFixes = computed(() =>
  versions.reduce(
    (acc, v) =>
      acc +
      v.changes
        .filter((c) => c.type === "fix")
        .reduce((a, c) => a + c.items.length, 0),
    0,
  ),
);
</script>

<template>
  <UPage>
    <!-- Hero -->
    <UPageHero
      title="Changelog"
      description="All the latest updates, improvements, and fixes to Nuxt UI."
    >
      <template #links>
        <div class="flex flex-wrap items-center gap-2">
          <UButton
            label="RSS Feed"
            icon="i-lucide-rss"
            variant="outline"
            color="neutral"
            size="md"
          />
          <UButton
            label="Subscribe"
            icon="i-lucide-bell"
            variant="solid"
            color="primary"
            size="md"
          />
        </div>
      </template>
    </UPageHero>

    <UPageBody>
      <div class="max-w-4xl mx-auto space-y-8 px-6">
        <!-- Stats bar -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <UCard :ui="{ root: 'text-center', body: 'p-3 sm:p-4 sm:gap-1' }">
            <div class="text-2xl font-bold text-(--ui-primary)">
              {{ versions.length }}
            </div>
            <div class="text-xs text-(--ui-text-muted)">Releases</div>
          </UCard>
          <UCard :ui="{ root: 'text-center', body: 'p-3 sm:p-4 sm:gap-1' }">
            <div class="text-2xl font-bold text-(--ui-text-highlighted)">
              {{ totalChanges }}
            </div>
            <div class="text-xs text-(--ui-text-muted)">Total Changes</div>
          </UCard>
          <UCard :ui="{ root: 'text-center', body: 'p-3 sm:p-4 sm:gap-1' }">
            <div class="text-2xl font-bold text-(--ui-success)">
              {{ totalFeatures }}
            </div>
            <div class="text-xs text-(--ui-text-muted)">Features Added</div>
          </UCard>
          <UCard :ui="{ root: 'text-center', body: 'p-3 sm:p-4 sm:gap-1' }">
            <div class="text-2xl font-bold text-(--ui-error)">
              {{ totalFixes }}
            </div>
            <div class="text-xs text-(--ui-text-muted)">Bugs Fixed</div>
          </UCard>
        </div>

        <!-- Category filter -->
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <div class="flex flex-wrap gap-1.5">
            <UButton
              v-for="opt in filterOptions"
              :key="opt.value"
              :label="opt.label"
              :icon="opt.icon"
              :variant="activeFilter === opt.value ? 'solid' : 'ghost'"
              :color="activeFilter === opt.value ? 'primary' : 'neutral'"
              size="sm"
              @click="activeFilter = opt.value"
            />
          </div>
          <UBadge
            :label="`Showing ${filteredVersions.length} of ${versions.length} releases`"
            variant="subtle"
            color="neutral"
            size="md"
          />
        </div>

        <USeparator />

        <!-- Changelog timeline -->
        <UChangelogVersions>
          <UChangelogVersion
            v-for="release in filteredVersions"
            :key="release.title"
            :title="release.title"
            :description="release.description"
            :date="release.date"
            :badge="release.badge as any"
            :authors="release.authors as any[]"
            :ui="{
              container: 'sm:max-w-2/3',
            }"
          >
            <template #body>
              <div class="space-y-5">
                <div
                  v-for="changeGroup in release.changes"
                  :key="changeGroup.type"
                >
                  <!-- Change type heading -->
                  <div class="flex items-center gap-2 mb-2.5">
                    <UIcon
                      :name="typeConfig[changeGroup.type].icon"
                      class="size-4"
                      :class="`text-(--ui-${typeConfig[changeGroup.type].color})`"
                    />
                    <span
                      class="text-sm font-semibold text-(--ui-text-highlighted)"
                    >
                      {{ typeConfig[changeGroup.type].label }}
                    </span>
                    <UBadge
                      :label="String(changeGroup.items.length)"
                      :color="typeConfig[changeGroup.type].color as any"
                      variant="subtle"
                      size="xs"
                    />
                  </div>

                  <!-- Change items -->
                  <ul class="space-y-1.5 ml-1 mb-6">
                    <li
                      v-for="item in changeGroup.items"
                      :key="item"
                      class="flex items-start gap-2.5"
                    >
                      <UIcon
                        name="i-lucide-check"
                        class="size-4 shrink-0 mt-0.5"
                        :class="`text-(--ui-${typeConfig[changeGroup.type].color})`"
                      />
                      <span class="text-sm text-(--ui-text)">{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </UChangelogVersion>
        </UChangelogVersions>

        <!-- Load more -->
        <div class="text-center py-6">
          <UButton
            label="Load Older Versions"
            icon="i-lucide-chevron-down"
            variant="outline"
            color="neutral"
            size="lg"
          />
        </div>
      </div>
    </UPageBody>
  </UPage>
</template>
