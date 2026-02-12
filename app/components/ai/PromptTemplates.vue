<script setup lang="ts">
import { PROMPT_TEMPLATES, PROMPT_CATEGORIES } from "~/utils/aiPrompts";

const emit = defineEmits<{
  select: [prompt: string];
}>();

function templatesForCategory(category: string) {
  return PROMPT_TEMPLATES.filter((t) => t.category === category);
}
</script>

<template>
  <div class="space-y-1">
    <UCollapsible
      v-for="category in PROMPT_CATEGORIES"
      :key="category"
      :default-open="true"
    >
      <UButton
        variant="ghost"
        color="neutral"
        block
        class="justify-between"
        :ui="{
          trailingIcon:
            'transition-transform duration-200 group-data-[state=open]:rotate-180',
        }"
        trailing-icon="i-lucide-chevron-down"
      >
        <span class="text-xs font-semibold uppercase tracking-wide">
          <slot name="heading">{{ category }}</slot>
        </span>
      </UButton>
      <template #content>
        <div class="space-y-1 pb-2">
          <button
            v-for="template in templatesForCategory(category)"
            :key="template.id"
            class="flex items-start gap-2.5 w-full px-2 py-2 rounded-[var(--ui-radius)] hover:bg-(--ui-bg-elevated) transition-colors text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)"
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
              <p class="text-xs text-(--ui-text-muted) line-clamp-2">
                {{ template.description }}
              </p>
            </div>
          </button>
        </div>
      </template>
    </UCollapsible>
  </div>
</template>
