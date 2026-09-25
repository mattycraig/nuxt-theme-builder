<script setup lang="ts">
import { BUILT_IN_PRESETS } from "~/utils/presets";
import { HOME_EXAMPLE_PROMPTS } from "~/utils/homePrompts";
import type { HomeExamplePrompt } from "~/utils/homePrompts";

/**
 * Example AI prompts that load a matching built-in preset. Real generation
 * needs an API key, so this shows the idea and links to /ai for the real
 * thing.
 */
const store = useThemeStore();
const reducedMotion = usePreferredReducedMotion();

const activeExample = computed(() =>
  HOME_EXAMPLE_PROMPTS.find((ex) => ex.preset === store.activePresetName),
);

// Starts on the prompt matching the persisted preset, so SSR and the
// client agree; only a click types a new one out.
const typedText = ref(activeExample.value?.prompt ?? "");
let typingTimer: ReturnType<typeof setInterval> | undefined;

function stopTyping() {
  if (typingTimer) clearInterval(typingTimer);
  typingTimer = undefined;
}

function typeOut(text: string) {
  stopTyping();
  if (reducedMotion.value === "reduce") {
    typedText.value = text;
    return;
  }
  typedText.value = "";
  let i = 0;
  typingTimer = setInterval(() => {
    i += 1;
    typedText.value = text.slice(0, i);
    if (i >= text.length) stopTyping();
  }, 18);
}

// Keep the field in sync when the preset changes elsewhere (sidebar, undo).
watch(activeExample, (example) => {
  if (!typingTimer) typedText.value = example?.prompt ?? "";
});

onBeforeUnmount(stopTyping);

// The typed field is visual only; screen readers get one message per click.
const announcement = ref("");

function applyExample(example: HomeExamplePrompt) {
  const preset = BUILT_IN_PRESETS.find((p) => p.name === example.preset);
  if (!preset) return;
  store.loadPreset(preset);
  typeOut(example.prompt);
  announcement.value = `Applied the ${preset.name} preset.`;
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <p
      class="text-xs font-medium uppercase tracking-wider text-(--ui-text-muted)"
    >
      Describe a theme
    </p>

    <div
      class="flex flex-wrap items-center gap-3 rounded-(--ui-radius) border border-(--ui-border-accented) bg-(--ui-bg) p-2 pl-3.5 sm:flex-nowrap"
    >
      <p
        class="min-w-0 flex-1 text-sm"
        :class="
          typedText
            ? 'text-(--ui-text-highlighted)'
            : 'text-(--ui-text-dimmed)'
        "
        aria-hidden="true"
      >
        {{ typedText || "Pick an example below" }}
      </p>
      <UButton
        label="Try it yourself"
        to="/ai"
        icon="i-lucide-sparkles"
        color="primary"
        variant="soft"
        class="shrink-0"
      />
    </div>

    <div class="flex flex-wrap gap-2" role="group" aria-label="Example prompts">
      <UButton
        v-for="example in HOME_EXAMPLE_PROMPTS"
        :key="example.preset"
        :label="example.prompt"
        :aria-pressed="activeExample?.preset === example.preset"
        size="xs"
        color="neutral"
        :variant="activeExample?.preset === example.preset ? 'soft' : 'outline'"
        class="rounded-full"
        @click="applyExample(example)"
      />
    </div>

    <p class="sr-only" aria-live="polite">{{ announcement }}</p>

    <p class="text-xs text-(--ui-text-dimmed)">
      Examples load a matching built-in preset. Write your own prompt on the AI
      page.
    </p>
  </div>
</template>
