<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  to: string;
  date?: string;
  category?: string;
  format?: string;
  icon?: string;
  featured?: boolean;
}>();

const formatLabels: Record<string, string> = {
  guide: "Guide",
  reference: "Reference",
  tip: "Quick Tip",
};

const categoryLabels: Record<string, string> = {
  theming: "Theming",
  components: "Components",
  tailwind: "Tailwind CSS",
  "best-practices": "Best Practices",
};

const formatIcons: Record<string, string> = {
  guide: "i-lucide-book-open",
  reference: "i-lucide-file-text",
  tip: "i-lucide-lightbulb",
};
</script>

<template>
  <NuxtLink
    :to="to"
    class="block h-full"
    :aria-label="`Read: ${title}. ${description}`"
  >
    <UCard
      class="h-full hover:ring-2 hover:ring-(--ui-primary)/40 transition-all cursor-pointer"
    >
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2 flex-wrap">
          <UBadge
            v-if="format"
            :label="formatLabels[format] ?? format"
            :icon="formatIcons[format]"
            variant="subtle"
            color="primary"
            size="sm"
          />
          <UBadge
            v-if="category"
            :label="categoryLabels[category] ?? category"
            variant="soft"
            color="neutral"
            size="sm"
          />
          <UBadge
            v-if="featured"
            label="Featured"
            icon="i-lucide-star"
            variant="soft"
            color="warning"
            size="sm"
          />
        </div>

        <div>
          <h3
            class="font-semibold text-(--ui-text-highlighted) mb-1 line-clamp-2"
          >
            {{ title }}
          </h3>
          <p class="text-sm text-(--ui-text-muted) line-clamp-3">
            {{ description }}
          </p>
        </div>

        <div v-if="date" class="mt-auto pt-2 text-xs text-(--ui-text-dimmed)">
          <time :datetime="date">
            {{
              new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </time>
        </div>
      </div>
    </UCard>
  </NuxtLink>
</template>
