<script setup lang="ts">
import { NAVIGATION_ITEMS } from "~/utils/navigation";

const { currentPageLabel, mobileNavItems } = useLayoutNavigation();
</script>

<template>
  <UDashboardNavbar title="Nuxt UI Theme Builder" class="bg-(--ui-bg)">
    <template #leading>
      <UDashboardSidebarCollapse />
      <USeparator orientation="vertical" class="h-6 mx-2" />
      <UIcon
        name="i-lucide-palette"
        class="size-5 text-(--ui-primary)"
        aria-hidden="true"
      />
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

      <UTooltip text="Help & Documentation">
        <UButton
          icon="i-lucide-circle-help"
          aria-label="Help & Documentation"
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
