<script setup lang="ts">
import { NAVIGATION_ITEMS } from "~/utils/navigation";

const { currentPageLabel, mobileNavItems } = useLayoutNavigation();
</script>

<template>
  <UDashboardNavbar title="Nuxt UI Theme Builder" class="bg-(--ui-bg)">
    <template #leading>
      <UDashboardSidebarCollapse />
      <USeparator orientation="vertical" class="h-6 mx-2" />
      <div
        class="size-7 rounded-sm bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-secondary)] flex items-center justify-center shadow-md shadow-(--ui-primary)/15 mr-1"
      >
        <span
          class="iconify i-lucide:palette size-5 text-inverted"
          aria-hidden="true"
        />
      </div>
    </template>

    <template #right>
      <!-- Desktop: full horizontal navigation menu -->
      <UNavigationMenu
        :items="NAVIGATION_ITEMS"
        class="hidden lg:flex flex-1 min-w-max"
      />

      <!-- Mobile: compact dropdown -->
      <UDropdownMenu :items="mobileNavItems" class="lg:hidden ml-4">
        <UButton
          :label="currentPageLabel"
          variant="ghost"
          color="neutral"
          trailing-icon="i-lucide-chevron-down"
        />
      </UDropdownMenu>

      <!-- <UTooltip text="Help & Documentation">
        <UButton
          icon="i-lucide-circle-help"
          aria-label="Help & Documentation"
          variant="ghost"
          color="neutral"
          to="/help"
        />
      </UTooltip> -->

      <UTooltip text="Tools">
        <UButton
          icon="i-lucide-wrench"
          aria-label="Tools"
          variant="ghost"
          color="neutral"
          to="/help"
        />
      </UTooltip>

      <UTooltip text="Search pages & actions">
        <UDashboardSearchButton collapsed />
      </UTooltip>

      <USeparator orientation="vertical" class="h-6 mx-2 hidden sm:block" />

      <div class="hidden sm:block">
        <UColorModeSwitch />
      </div>
    </template>
  </UDashboardNavbar>
</template>
