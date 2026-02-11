<script setup lang="ts">
import { PROMPT_TEMPLATES, PROMPT_CATEGORIES } from "~/utils/aiPrompts";

const emit = defineEmits<{
  select: [prompt: string];
}>();

const expandedCategories = ref<Set<string>>(new Set(PROMPT_CATEGORIES));

function toggle(category: string) {
  const updated = new Set(expandedCategories.value);
  if (updated.has(category)) {
    updated.delete(category);
  } else {
    updated.add(category);
  }
  expandedCategories.value = updated;
}

function templatesForCategory(category: string) {
  return PROMPT_TEMPLATES.filter((t) => t.category === category);
}
</script>

<template>
  <div class="space-y-1">
    <div v-for="category in PROMPT_CATEGORIES" :key="category">
      <button
        class="flex items-center justify-between w-full px-2 py-1.5 text-xs font-semibold text-(--ui-text-muted) uppercase tracking-wider hover:text-(--ui-text-highlighted) transition-colors rounded"
        :aria-expanded="expandedCategories.has(category)"
        @click="toggle(category)"
      >
        {{ category }}
        <UIcon
          :name="
            expandedCategories.has(category)
              ? 'i-lucide-chevron-down'
              : 'i-lucide-chevron-right'
          "
          class="size-3.5"
          aria-hidden="true"
        />
      </button>

      <div v-if="expandedCategories.has(category)" class="space-y-1 pb-2">
        <button
          v-for="template in templatesForCategory(category)"
          :key="template.id"
          class="flex items-start gap-2.5 w-full px-2 py-2 rounded-[var(--ui-radius)] hover:bg-(--ui-bg-elevated) transition-colors text-left group"
          @click="emit('select', template.prompt)"
        >
          <UIcon
            :name="template.icon"
            class="size-4 mt-0.5 shrink-0 text-(--ui-text-muted) group-hover:text-(--ui-primary)"
            aria-hidden="true"
          />
          <div class="min-w-0">
            <p
              class="text-sm font-medium text-(--ui-text-highlighted) truncate"
            >
              {{ template.label }}
            </p>
            <p class="text-xs text-(--ui-text-dimmed) line-clamp-2">
              {{ template.description }}
            </p>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
