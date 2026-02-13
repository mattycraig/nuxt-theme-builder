<script setup lang="ts">
import { COMPONENT_CATEGORIES } from "~/utils/navigation";

const totalCount = COMPONENT_CATEGORIES.reduce(
  (sum, cat) => sum + cat.items.length,
  0,
);
</script>

<template>
  <UContainer>
    <div class="space-y-8">
      <UPageHeader
        headline="Theme Builder"
        title="Components"
        :links="[
          {
            label: 'Back to Home',
            icon: 'i-lucide-arrow-left',
            to: '/',
            variant: 'ghost',
            color: 'neutral',
          },
        ]"
      >
        <template #description>
          {{ totalCount }} UI components across
          {{ COMPONENT_CATEGORIES.length }}
          categories — showcasing your current theme settings.
        </template>
      </UPageHeader>

      <!-- Category quick-jump -->
      <nav aria-label="Jump to component category" class="flex flex-wrap gap-2">
        <UButton
          v-for="cat in COMPONENT_CATEGORIES"
          :key="cat.slug"
          :label="`${cat.label} (${cat.items.length})`"
          :icon="cat.icon"
          variant="soft"
          color="neutral"
          size="sm"
          :to="`#${cat.slug}`"
        />
      </nav>

      <!-- Category sections -->
      <section
        v-for="cat in COMPONENT_CATEGORIES"
        :id="cat.slug"
        :key="cat.slug"
        class="scroll-mt-6"
      >
        <div class="flex items-center gap-3 mb-6">
          <div>
            <h2 class="text-2xl font-semibold text-(--ui-text-highlighted)">
              {{ cat.label }}
            </h2>
            <p class="text-xs text-(--ui-text-muted)">
              {{ cat.description }} — {{ cat.items.length }} components
            </p>
          </div>
        </div>

        <div
          class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-3"
        >
          <NuxtLink
            v-for="item in cat.items"
            :key="String(item.to)"
            :to="String(item.to)"
            class="block"
          >
            <UCard
              class="h-full hover:ring-2 hover:ring-(--ui-primary)/40 transition-all cursor-pointer"
            >
              <div class="flex items-start gap-3">
                <div
                  class="shrink-0 size-8 rounded-md bg-(--ui-primary)/10 flex items-center justify-center"
                >
                  <UIcon
                    :name="item.icon || cat.icon"
                    class="size-4 text-(--ui-primary)"
                  />
                </div>
                <div class="min-w-0">
                  <h3
                    class="text-sm font-semibold text-(--ui-text-highlighted) truncate"
                  >
                    {{ item.label }}
                  </h3>
                  <p class="text-xs text-(--ui-text-muted) line-clamp-2">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </UCard>
          </NuxtLink>
        </div>

        <USeparator class="my-8" />
      </section>
    </div>
  </UContainer>
</template>
