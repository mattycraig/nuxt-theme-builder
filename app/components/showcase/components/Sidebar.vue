<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Collapsible App Shell"
      description="Toggle between expanded and icon-only states with the button or the rail."
      :prop-hints="['collapsible', 'variant', 'rail', 'v-model:open']"
    >
      <div class="flex flex-wrap gap-2 mb-4">
        <UFieldGroup size="sm">
          <UButton
            v-for="option in collapsibleOptions"
            :key="option"
            :label="option"
            color="neutral"
            :variant="collapsible === option ? 'solid' : 'outline'"
            @click="collapsible = option"
          />
        </UFieldGroup>
        <UFieldGroup size="sm">
          <UButton
            v-for="option in variantOptions"
            :key="option"
            :label="option"
            color="neutral"
            :variant="variant === option ? 'solid' : 'outline'"
            @click="variant = option"
          />
        </UFieldGroup>
      </div>

      <!-- transform-gpu contains the sidebar's fixed positioning inside this frame -->
      <div
        class="flex h-[420px] overflow-hidden rounded-lg border border-(--ui-border) contain-[paint] transform-gpu"
        :class="variant === 'inset' ? 'bg-(--ui-bg-muted)' : 'bg-(--ui-bg)'"
      >
        <USidebar
          :key="`${collapsible}-${variant}`"
          v-model:open="open"
          :collapsible="collapsible"
          :variant="variant"
          rail
          :ui="{ root: 'block', container: 'absolute flex h-full' }"
        >
          <template #header="{ state }">
            <UIcon
              name="i-lucide-palette"
              class="size-6 shrink-0 text-(--ui-primary)"
              aria-hidden="true"
            />
            <span
              v-if="state === 'expanded'"
              class="font-semibold text-(--ui-text-highlighted) truncate"
            >
              Acme Studio
            </span>
          </template>

          <UNavigationMenu
            :items="navItems"
            orientation="vertical"
            :ui="{ link: 'p-1.5 overflow-hidden' }"
          />

          <template #footer="{ state }">
            <UUser
              :name="state === 'expanded' ? 'Ava Martinez' : undefined"
              :description="state === 'expanded' ? 'ava@acme.dev' : undefined"
              :avatar="{
                src: 'https://i.pravatar.cc/64?u=ava',
                alt: 'Ava Martinez',
              }"
              size="sm"
            />
          </template>
        </USidebar>

        <div
          class="flex-1 min-w-0 flex flex-col overflow-hidden bg-(--ui-bg) peer-data-[variant=floating]:my-4 peer-data-[variant=inset]:m-4 peer-data-[variant=inset]:not-peer-data-[collapsible=offcanvas]:ms-0 peer-data-[variant=inset]:rounded-(--ui-radius) peer-data-[variant=inset]:shadow-sm peer-data-[variant=inset]:ring peer-data-[variant=inset]:ring-(--ui-border)"
        >
          <div
            class="h-14 shrink-0 flex items-center gap-2 px-4"
            :class="variant !== 'floating' && 'border-b border-(--ui-border)'"
          >
            <UButton
              icon="i-lucide-panel-left"
              color="neutral"
              variant="ghost"
              aria-label="Toggle sidebar"
              @click="open = !open"
            />
            <span class="text-sm font-medium text-(--ui-text-highlighted)">
              Dashboard
            </span>
          </div>
          <div class="flex-1 p-4 grid grid-cols-2 gap-3 content-start">
            <div
              v-for="i in 4"
              :key="i"
              class="h-20 rounded-(--ui-radius) bg-(--ui-bg-elevated)"
            />
          </div>
        </div>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Static Sidebar"
      description="A non-collapsible sidebar with a title, description, and grouped navigation."
      :prop-hints="['collapsible', 'title', 'description']"
    >
      <div
        class="flex h-[360px] overflow-hidden rounded-lg border border-(--ui-border) bg-(--ui-bg)"
      >
        <USidebar
          collapsible="none"
          title="Workspace"
          description="Acme Studio"
        >
          <UNavigationMenu
            :items="groupedNavItems"
            orientation="vertical"
            :ui="{ link: 'p-1.5' }"
          />
        </USidebar>
        <div class="flex-1 min-w-0 p-4 space-y-3">
          <div class="h-6 w-1/3 rounded-(--ui-radius) bg-(--ui-bg-elevated)" />
          <div class="h-24 rounded-(--ui-radius) bg-(--ui-bg-elevated)" />
          <div class="h-24 rounded-(--ui-radius) bg-(--ui-bg-elevated)" />
        </div>
      </div>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem, SidebarProps } from "@nuxt/ui";

const collapsibleOptions = ["icon", "offcanvas"] as const;
const variantOptions = ["sidebar", "floating", "inset"] as const;

const open = ref(true);
const collapsible = ref<NonNullable<SidebarProps["collapsible"]>>("icon");
const variant = ref<NonNullable<SidebarProps["variant"]>>("sidebar");

const navItems: NavigationMenuItem[] = [
  { label: "Home", icon: "i-lucide-house", active: true },
  { label: "Inbox", icon: "i-lucide-inbox", badge: "4" },
  { label: "Projects", icon: "i-lucide-folder" },
  { label: "Team", icon: "i-lucide-users" },
  { label: "Settings", icon: "i-lucide-settings" },
];

const groupedNavItems: NavigationMenuItem[][] = [
  [
    { label: "Overview", icon: "i-lucide-layout-dashboard", active: true },
    { label: "Analytics", icon: "i-lucide-chart-line" },
    { label: "Reports", icon: "i-lucide-file-text" },
  ],
  [
    { label: "Members", icon: "i-lucide-users" },
    { label: "Billing", icon: "i-lucide-credit-card" },
  ],
];
</script>
