<script setup lang="ts">
import { UTILITY_NAV_ITEMS } from "~/utils/navigation";

const exportPanel = useExportPanel();

const footerLinks = UTILITY_NAV_ITEMS;
</script>

<template>
  <UDashboardSidebar
    resizable
    collapsible
    :collapsed-size="0"
    :min-size="320"
    :max-size="600"
    :default-size="320"
    :ui="{
      root: 'min-w-0 overflow-hidden data-[collapsed=true]:invisible',
      header: 'border-b border-default sm:px-4 lg:hidden',
      body: 'p-0 sm:p-0',
      footer: 'border-t border-default py-4 flex-col',
    }"
  >
    <template #header>
      <SharedAppLogo size="md" class="ml-auto" />
    </template>

    <template #default>
      <EditorPanel />
    </template>

    <template #footer>
      <UButton
        icon="i-lucide-import"
        label="Export / Import Theme"
        block
        size="md"
        variant="solid"
        color="primary"
        @click="exportPanel.open()"
      />
      <nav
        aria-label="Utility pages"
        class="mt-2 flex items-center justify-center gap-1 text-xs text-(--ui-text-muted)"
      >
        <template v-for="(link, index) in footerLinks" :key="String(link.to)">
          <span v-if="index > 0" aria-hidden="true">&middot;</span>
          <NuxtLink
            :to="String(link.to)"
            class="hover:text-(--ui-text-highlighted) transition-colors px-1 py-0.5 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-primary)"
          >
            {{ link.label }}
          </NuxtLink>
        </template>
      </nav>
    </template>
  </UDashboardSidebar>
</template>
