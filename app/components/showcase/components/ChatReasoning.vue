<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Live Reasoning"
      description="Opens while the model is thinking, then collapses to a duration summary."
      :prop-hints="['streaming', 'text']"
    >
      <div class="max-w-md space-y-3">
        <UButton
          label="Replay reasoning"
          icon="i-lucide-play"
          size="sm"
          variant="soft"
          :disabled="streaming"
          @click="replay"
        />
        <UChatReasoning
          :text="streamedText"
          :streaming="streaming"
          :duration="streaming ? undefined : duration"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Icon & Chevron"
      description="Add an icon, and move the chevron so it swaps with the icon on hover."
      :prop-hints="['icon', 'chevron']"
    >
      <div class="max-w-md space-y-3">
        <UChatReasoning
          icon="i-lucide-brain"
          :text="reasoning"
          :duration="4"
        />
        <UChatReasoning
          icon="i-lucide-brain"
          chevron="leading"
          :text="reasoning"
          :duration="12"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Open by Default"
      description="Show the full reasoning trace without a click."
      :prop-hints="['default-open']"
    >
      <UChatReasoning
        :text="reasoning"
        :duration="7"
        default-open
        class="max-w-md"
      />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="In a Conversation"
      description="Reasoning shown above the assistant's answer."
    >
      <div class="flex items-start gap-3 max-w-lg">
        <UAvatar icon="i-lucide-sparkles" size="sm" />
        <div class="flex-1 min-w-0 space-y-2">
          <UChatReasoning :text="reasoning" :duration="4" />
          <p class="text-sm">
            I'd pair a calm
            <span class="font-medium text-(--ui-primary)">primary</span>
            with a warmer
            <span class="font-medium text-(--ui-secondary)">secondary</span>
            for accents. Both pass AA on your neutral background.
          </p>
        </div>
      </div>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const reasoning =
  "The user wants a calm, professional palette.\nIndigo reads as trustworthy and pairs well with a slate neutral.\nAmber adds warmth for secondary actions.\nChecking contrast: both clear 4.5:1 on white and on slate-900.";

const words = reasoning.split(" ");
const streaming = ref(false);
const streamedText = ref(reasoning);
const duration = ref(3);

let index = 0;
const { pause, resume } = useIntervalFn(
  () => {
    index++;
    streamedText.value = words.slice(0, index).join(" ");
    if (index >= words.length) {
      pause();
      streaming.value = false;
    }
  },
  90,
  { immediate: false },
);

function replay() {
  index = 0;
  streamedText.value = "";
  duration.value = Math.round((words.length * 90) / 1000);
  streaming.value = true;
  resume();
}
</script>
