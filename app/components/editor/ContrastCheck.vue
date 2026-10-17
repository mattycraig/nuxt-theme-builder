<script setup lang="ts">
import type { ContrastCheck, ContrastFix } from "~/utils/themeContrast";
import { WCAG_AA } from "~/utils/themeContrast";

const props = defineProps<{
  checks: ContrastCheck[];
}>();

const emit = defineEmits<{
  fix: [fix: ContrastFix];
}>();

const failing = computed(() => props.checks.filter((c) => !c.passes));
const passing = computed(() => props.checks.filter((c) => c.passes));
const showPassing = ref(false);

const RATING_COLOR = {
  AAA: "success",
  AA: "success",
  "AA Large": "warning",
  Fail: "error",
} as const;

function fixLabel(fix: ContrastFix): string {
  return `Use ${fix.shade}`;
}

function fixDescription(label: string, fix: ContrastFix): string {
  const target = fix.kind === "role" ? `${fix.role} shade` : `${fix.token} text`;
  return `Fix ${label}: set ${target} to ${fix.shade}`;
}
</script>

<template>
  <div class="space-y-3">
    <p
      class="flex items-start gap-2 text-xs text-(--ui-text-toned)"
      aria-live="polite"
    >
      <UIcon
        :name="failing.length ? 'i-lucide-triangle-alert' : 'i-lucide-circle-check'"
        :class="[
          'size-4 shrink-0',
          failing.length ? 'text-(--ui-warning)' : 'text-(--ui-success)',
        ]"
        aria-hidden="true"
      />
      <span v-if="failing.length">
        {{ failing.length }} of {{ checks.length }} pairs are below WCAG AA
        ({{ WCAG_AA }}:1).
      </span>
      <span v-else>
        All {{ checks.length }} pairs meet WCAG AA ({{ WCAG_AA }}:1).
      </span>
    </p>

    <ul v-if="failing.length" class="space-y-2" aria-label="Pairs below WCAG AA">
      <li
        v-for="item in failing"
        :key="item.id"
        class="flex items-center gap-2"
        data-testid="contrast-failing"
      >
        <span
          class="flex items-center justify-center size-7 shrink-0 rounded-(--ui-radius) border border-(--ui-border) text-xs font-semibold"
          :style="{ color: item.foreground, backgroundColor: item.background }"
          aria-hidden="true"
        >
          Aa
        </span>
        <span class="flex-1 min-w-0">
          <span class="block truncate text-xs font-medium text-(--ui-text)">
            {{ item.label }}
          </span>
          <span class="block text-xs text-(--ui-text-muted)">
            {{ item.ratio.toFixed(2) }}:1 · {{ item.rating }}
          </span>
        </span>
        <UButton
          v-if="item.fix"
          :label="fixLabel(item.fix)"
          :aria-label="fixDescription(item.label, item.fix)"
          size="xs"
          color="primary"
          variant="soft"
          @click="emit('fix', item.fix)"
        />
      </li>
    </ul>

    <div v-if="passing.length">
      <UButton
        :label="showPassing ? 'Hide passing pairs' : `Show ${passing.length} passing pairs`"
        :trailing-icon="showPassing ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
        :aria-expanded="showPassing"
        aria-controls="contrast-passing"
        size="xs"
        color="neutral"
        variant="link"
        class="px-0"
        @click="showPassing = !showPassing"
      />
      <ul
        v-show="showPassing"
        id="contrast-passing"
        class="mt-2 space-y-1.5"
        aria-label="Pairs that meet WCAG AA"
      >
        <li
          v-for="item in passing"
          :key="item.id"
          class="flex items-center gap-2 text-xs"
        >
          <span
            class="flex items-center justify-center size-6 shrink-0 rounded-(--ui-radius) border border-(--ui-border) text-[10px] font-semibold"
            :style="{ color: item.foreground, backgroundColor: item.background }"
            aria-hidden="true"
          >
            Aa
          </span>
          <span class="flex-1 min-w-0 truncate text-(--ui-text-toned)">
            {{ item.label }}
          </span>
          <UBadge
            :label="`${item.ratio.toFixed(2)}:1 ${item.rating}`"
            :color="RATING_COLOR[item.rating]"
            variant="subtle"
            size="sm"
          />
        </li>
      </ul>
    </div>

    <p class="text-xs text-(--ui-text-muted)">
      Checks text on the page and on cards, solid button labels, and each color
      used as text.
      <ULink
        to="/tools/contrast-checker"
        class="text-(--ui-primary) underline underline-offset-2"
      >
        Check any two colors
      </ULink>
    </p>
  </div>
</template>
