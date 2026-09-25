<script setup lang="ts">
import {
  BLOCK_ROUTES,
  COMPONENT_ROUTES,
  LEARN_ROUTES,
  TEMPLATE_ROUTES,
  TOOL_ROUTES,
} from "~~/shared/constants/routes";

// Counts come from the route registries so they stay accurate as pages are
// added.
const areas = [
  {
    title: "Components",
    to: "/components",
    count: COMPONENT_ROUTES.length,
    unit: "component pages",
    description: "Buttons, forms, overlays, tables and navigation.",
    preview: "components",
  },
  {
    title: "Blocks",
    to: "/blocks",
    count: BLOCK_ROUTES.length,
    unit: "block types",
    description: "Heroes, pricing, testimonials, footers and more.",
    preview: "blocks",
  },
  {
    title: "Templates",
    to: "/templates",
    count: TEMPLATE_ROUTES.length,
    unit: "full pages",
    description: "Dashboard, chat, landing, pricing, login and more.",
    preview: "templates",
  },
] as const;

const extras = [
  {
    title: "Design tools",
    to: "/tools",
    icon: "i-lucide-wrench",
    description: `${TOOL_ROUTES.length} tools: palette viewer, contrast checker and more`,
  },
  {
    title: "Learn",
    to: "/learn",
    icon: "i-lucide-book-open",
    description: `${LEARN_ROUTES.length} guides on colors, dark mode and CSS variables`,
  },
  {
    title: "AI generator",
    to: "/ai",
    icon: "i-lucide-sparkles",
    description: "Describe a theme and get a full config back",
  },
];
</script>

<template>
  <section
    aria-labelledby="home-explore-heading"
    class="flex flex-col gap-8"
  >
    <div class="flex max-w-2xl flex-col gap-2">
      <h2
        id="home-explore-heading"
        class="text-2xl font-bold tracking-tight text-balance text-(--ui-text-highlighted) sm:text-3xl"
      >
        See your theme on real pages
      </h2>
      <p class="text-(--ui-text-muted)">
        Every demo renders with the theme you're editing, in light and dark
        mode, at any screen width.
      </p>
    </div>

    <ul class="grid gap-4 md:grid-cols-3" role="list">
      <li
        v-for="area in areas"
        :key="area.to"
        class="group relative flex flex-col overflow-hidden rounded-(--ui-radius) border border-(--ui-border) bg-(--ui-bg) transition-colors hover:border-(--ui-primary)/50"
      >
        <!-- Mini previews are built from theme tokens so they repaint too -->
        <div
          class="h-32 border-b border-(--ui-border) bg-(--ui-bg-muted) p-4"
          aria-hidden="true"
        >
          <div
            v-if="area.preview === 'components'"
            class="flex h-full flex-col justify-center gap-3"
          >
            <div class="flex gap-2">
              <span class="h-6 w-16 rounded-(--ui-radius) bg-(--ui-primary)" />
              <span
                class="h-6 w-14 rounded-(--ui-radius) bg-(--ui-primary)/15"
              />
              <span
                class="h-6 w-12 rounded-(--ui-radius) border border-(--ui-border-accented)"
              />
            </div>
            <div class="flex items-center gap-2">
              <span
                class="relative h-4 w-7 rounded-full bg-(--ui-primary) after:absolute after:top-0.5 after:right-0.5 after:size-3 after:rounded-full after:bg-(--ui-bg)"
              />
              <span class="h-2 w-20 rounded-full bg-(--ui-border-accented)" />
            </div>
            <div
              class="h-6 w-3/4 rounded-(--ui-radius) border border-(--ui-primary) ring-2 ring-(--ui-primary)/20"
            />
          </div>

          <div
            v-else-if="area.preview === 'blocks'"
            class="flex h-full flex-col gap-2"
          >
            <div
              class="flex flex-1 flex-col items-center justify-center gap-1.5 rounded-(--ui-radius) bg-(--ui-bg)"
            >
              <span class="h-2 w-24 rounded-full bg-(--ui-text-highlighted)/70" />
              <span class="h-1.5 w-16 rounded-full bg-(--ui-border-accented)" />
              <span class="mt-1 h-3.5 w-12 rounded-(--ui-radius) bg-(--ui-primary)" />
            </div>
            <div class="grid h-8 grid-cols-3 gap-2">
              <span class="rounded-(--ui-radius) bg-(--ui-bg)" />
              <span class="rounded-(--ui-radius) bg-(--ui-primary)/15" />
              <span class="rounded-(--ui-radius) bg-(--ui-bg)" />
            </div>
          </div>

          <div v-else class="flex h-full gap-2">
            <div
              class="flex w-1/4 flex-col gap-1.5 rounded-(--ui-radius) bg-(--ui-bg) p-2"
            >
              <span class="h-1.5 rounded-full bg-(--ui-primary)" />
              <span class="h-1.5 rounded-full bg-(--ui-border-accented)" />
              <span class="h-1.5 rounded-full bg-(--ui-border-accented)" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <div class="grid h-8 grid-cols-3 gap-2">
                <span class="rounded-(--ui-radius) bg-(--ui-bg)" />
                <span class="rounded-(--ui-radius) bg-(--ui-bg)" />
                <span class="rounded-(--ui-radius) bg-(--ui-bg)" />
              </div>
              <div
                class="flex flex-1 items-end gap-1 rounded-(--ui-radius) bg-(--ui-bg) p-2"
              >
                <span
                  v-for="h in [40, 65, 50, 80, 60, 90]"
                  :key="h"
                  class="flex-1 rounded-sm bg-(--ui-primary)/70"
                  :style="{ height: `${h}%` }"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-1 flex-col gap-1 p-5">
          <div class="flex items-baseline justify-between gap-3">
            <h3 class="font-semibold text-(--ui-text-highlighted)">
              <NuxtLink
                :to="area.to"
                class="after:absolute after:inset-0 focus-visible:outline-none after:rounded-(--ui-radius) focus-visible:after:ring-2 focus-visible:after:ring-(--ui-primary)"
              >
                {{ area.title }}
              </NuxtLink>
            </h3>
            <span class="text-sm text-(--ui-text-muted) tabular-nums">
              <strong class="font-semibold text-(--ui-text-highlighted)">{{
                area.count
              }}</strong>
              {{ area.unit }}
            </span>
          </div>
          <p class="text-sm text-(--ui-text-muted)">
            {{ area.description }}
          </p>
        </div>
      </li>
    </ul>

    <ul
      class="grid gap-x-6 gap-y-4 border-t border-(--ui-border) pt-6 sm:grid-cols-3"
      role="list"
    >
      <li v-for="extra in extras" :key="extra.to">
        <NuxtLink
          :to="extra.to"
          class="group flex items-start gap-3 rounded-(--ui-radius) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--ui-primary)"
        >
          <UIcon
            :name="extra.icon"
            class="mt-0.5 size-5 shrink-0 text-(--ui-primary)"
            aria-hidden="true"
          />
          <span class="flex flex-col">
            <span
              class="flex items-center gap-1 text-sm font-semibold text-(--ui-text-highlighted)"
            >
              {{ extra.title }}
              <UIcon
                name="i-lucide-arrow-right"
                class="size-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
            <span class="text-sm text-(--ui-text-muted)">
              {{ extra.description }}
            </span>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
