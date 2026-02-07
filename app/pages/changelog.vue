<script setup lang="ts">
const versions = [
  {
    version: "v4.4.0",
    date: "January 30, 2026",
    badge: "Latest",
    badgeColor: "primary",
    description:
      "A major update with new Editor components, AI Chat improvements, and Pricing plan components.",
    authors: [
      { name: "Sébastien Chopin", avatar: "SC" },
      { name: "Benjamin Canac", avatar: "BC" },
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
    version: "v4.3.0",
    date: "January 15, 2026",
    badge: "Stable",
    badgeColor: "success",
    description:
      "Introduced the Dashboard component suite and significant performance improvements.",
    authors: [{ name: "Benjamin Canac", avatar: "BC" }],
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
    version: "v4.2.0",
    date: "December 20, 2025",
    badge: "Minor",
    badgeColor: "info",
    description:
      "Added marketing and content page components for building landing pages.",
    authors: [
      { name: "Sébastien Chopin", avatar: "SC" },
      { name: "Alex Kim", avatar: "AK" },
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
          "UButton now supports the `block` prop for full-width buttons",
          "UCard header and footer slots improved",
          "Better responsive behavior for all page components",
        ],
      },
    ],
  },
  {
    version: "v4.1.0",
    date: "November 28, 2025",
    badge: "Minor",
    badgeColor: "info",
    description: "Introduced AI Chat components and improved form validation.",
    authors: [{ name: "Benjamin Canac", avatar: "BC" }],
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
];

const typeConfig: Record<
  string,
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
  fix: { label: "Bug Fixes", icon: "i-lucide-bug", color: "error" },
};
</script>

<template>
  <div class="p-6 sm:p-8 space-y-8 max-w-4xl mx-auto">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h1 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          Changelog
        </h1>
        <p class="text-lg text-(--ui-text-muted) mt-1">
          All the latest updates, improvements, and fixes.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <UButton
          label="RSS Feed"
          icon="i-lucide-rss"
          variant="outline"
          color="neutral"
          size="sm"
        />
        <UButton
          label="Subscribe"
          icon="i-lucide-bell"
          variant="outline"
          color="primary"
          size="sm"
        />
      </div>
    </div>

    <USeparator />

    <!-- Timeline -->
    <div class="relative">
      <!-- Timeline line -->
      <div
        class="absolute left-[15px] sm:left-[19px] top-0 bottom-0 w-px bg-(--ui-border)"
      />

      <div class="space-y-12">
        <div
          v-for="release in versions"
          :key="release.version"
          class="relative pl-10 sm:pl-14"
        >
          <!-- Timeline dot -->
          <div
            class="absolute left-0 sm:left-1 top-1 size-[30px] sm:size-[38px] rounded-full border-4 border-(--ui-bg) flex items-center justify-center z-10"
            :class="`bg-(--ui-${release.badgeColor})`"
          >
            <UIcon name="i-lucide-tag" class="size-3.5 sm:size-4 text-white" />
          </div>

          <div class="space-y-4">
            <!-- Version header -->
            <div
              class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
            >
              <h2 class="text-2xl font-bold text-(--ui-text-highlighted)">
                {{ release.version }}
              </h2>
              <UBadge
                :label="release.badge"
                :color="release.badgeColor as any"
                variant="subtle"
                size="xs"
              />
              <span class="text-sm text-(--ui-text-dimmed)">{{
                release.date
              }}</span>
            </div>

            <!-- Description -->
            <p class="text-(--ui-text-muted)">{{ release.description }}</p>

            <!-- Authors -->
            <div class="flex items-center gap-2">
              <UAvatarGroup :max="3" size="xs">
                <UAvatar
                  v-for="author in release.authors"
                  :key="author.name"
                  :text="author.avatar"
                  color="primary"
                />
              </UAvatarGroup>
              <span class="text-sm text-(--ui-text-muted)">
                {{ release.authors.map((a) => a.name).join(", ") }}
              </span>
            </div>

            <!-- Changes by type -->
            <div class="space-y-4 pt-2">
              <div
                v-for="changeGroup in release.changes"
                :key="changeGroup.type"
                class="space-y-2"
              >
                <div class="flex items-center gap-2">
                  <UIcon
                    :name="typeConfig[changeGroup.type].icon"
                    class="size-4"
                    :class="`text-(--ui-${typeConfig[changeGroup.type].color})`"
                  />
                  <h3
                    class="text-sm font-semibold text-(--ui-text-highlighted)"
                  >
                    {{ typeConfig[changeGroup.type].label }}
                  </h3>
                  <UBadge
                    :label="String(changeGroup.items.length)"
                    :color="typeConfig[changeGroup.type].color as any"
                    variant="subtle"
                    size="xs"
                  />
                </div>
                <ul class="space-y-1.5 ml-6">
                  <li
                    v-for="item in changeGroup.items"
                    :key="item"
                    class="flex items-start gap-2"
                  >
                    <UIcon
                      name="i-lucide-check"
                      class="size-4 text-(--ui-success) shrink-0 mt-0.5"
                    />
                    <span class="text-sm text-(--ui-text)">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <USeparator
              v-if="release !== versions[versions.length - 1]"
              class="!mt-8"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Load more -->
    <div class="text-center pt-4 pl-10 sm:pl-14">
      <UButton
        label="Load Older Versions"
        icon="i-lucide-chevron-down"
        variant="outline"
        color="neutral"
      />
    </div>
  </div>
</template>
