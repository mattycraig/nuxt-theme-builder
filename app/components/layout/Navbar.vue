<script setup lang="ts">
import { NAVIGATION_ITEMS } from "~/utils/navigation";

const { currentPageLabel, mobileNavItems } = useLayoutNavigation();
</script>

<template>
  <UDashboardNavbar
    title="Nuxt UI Theme Builder"
    class="bg-(--ui-bg)"
    :toggle="{ icon: 'i-lucide:sliders-horizontal' }"
    :ui="{ title: 'hidden sm:block' }"
  >
    <template #leading>
      <UTooltip text="Theme Config">
        <UDashboardSidebarCollapse
          :ui="{ leadingIcon: 'i-lucide:sliders-horizontal' }"
        />
      </UTooltip>
      <USeparator orientation="vertical" class="h-6 mx-2" />
      <SharedAppLogo size="md" class="mr-1" />
    </template>

    <template #right>
      <!-- Desktop: full horizontal navigation menu -->
      <UNavigationMenu
        :items="NAVIGATION_ITEMS"
        class="hidden xl:flex flex-1 min-w-max"
        :ui="{
          link: 'text-sm',
          linkLeadingIcon: 'size-4',
        }"
      />

      <!-- Mobile: compact dropdown -->
      <UDropdownMenu :items="mobileNavItems" class="xl:hidden ml-4">
        <UButton
          :label="currentPageLabel"
          variant="ghost"
          color="neutral"
          trailing-icon="i-lucide-chevron-down"
        />
      </UDropdownMenu>

      <USeparator orientation="vertical" class="h-6 mx-2 hidden sm:block" />

      <UTooltip text="Tools">
        <UButton
          icon="i-lucide-wrench"
          aria-label="Tools"
          variant="ghost"
          color="neutral"
          to="/tools"
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
