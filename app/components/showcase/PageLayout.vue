<script setup lang="ts">
import { COMPONENT_CATEGORIES } from "~/utils/navigation";
import type { NavigationMenuItem } from "@nuxt/ui";

const props = defineProps<{
  title: string;
  description: string;
  category?: string;
  docsUrl?: string;
}>();

const route = useRoute();
const isPreview = computed(() => "preview" in route.query);

const sidebarNavItems = computed<NavigationMenuItem[][]>(() => {
  return COMPONENT_CATEGORIES.map((cat) => {
    const isActiveCategory = cat.label === props.category;
    return [
      {
        label: cat.label,
        icon: cat.icon,
        defaultOpen: isActiveCategory,
        children: cat.items.map((item) => ({
          label: item.label,
          icon: item.icon,
          to: item.to,
          active: route.path === item.to || route.path === `${item.to}/`,
        })),
      },
    ] as NavigationMenuItem[];
  });
});
</script>

<template>
  <div v-if="!isPreview" />
  <UDashboardGroup v-else unit="px">
    <UDashboardSidebar
      id="components-sidebar"
      collapsible
      class="bg-elevated/50"
      :collapsed-size="0"
      :ui="{
        root: 'min-w-[250px] overflow-hidden data-[collapsed=true]:invisible data-[collapsed=true]:min-w-0',
      }"
    >
      <template #header="{ collapsed }">
        <NuxtLink to="/components" class="flex items-center gap-2 min-w-0">
          <UIcon
            name="i-lucide-layout-grid"
            class="size-5 text-(--ui-primary) shrink-0"
          />
          <span
            v-if="!collapsed"
            class="font-bold text-(--ui-text-highlighted) truncate"
          >
            Components
          </span>
        </NuxtLink>
      </template>

      <template #default>
        <UNavigationMenu :items="sidebarNavItems" orientation="vertical" />
      </template>

      <template #footer>
        <UButton
          label="Component Index"
          icon="i-lucide-arrow-left"
          to="/components"
          color="neutral"
          variant="ghost"
          class="w-full"
        />
      </template>
    </UDashboardSidebar>

    <UDashboardPanel id="components-main">
      <template #header>
        <UDashboardNavbar :title="title">
          <template #leading>
            <div class="flex items-center gap-2">
              <UDashboardSidebarCollapse />
            </div>
          </template>

          <template #right>
            <UButton
              v-if="docsUrl"
              :to="docsUrl"
              target="_blank"
              label="Nuxt UI Docs"
              icon="i-lucide-external-link"
              color="neutral"
              variant="ghost"
              size="sm"
            />
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <UContainer>
          <div class="space-y-6">
            <div>
              <UPageHeader headline="Components" :title="title">
                <template #description>
                  {{ description }}
                </template>
              </UPageHeader>
            </div>

            <slot />
          </div>
        </UContainer>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
