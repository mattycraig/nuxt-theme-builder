<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Shimmer"
      description="Animated text used while an AI response or tool call is in progress."
      :prop-hints="['text']"
    >
      <UChatShimmer text="Thinking..." />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Duration & Spread"
      description="Control the animation speed and the width of the highlight."
      :prop-hints="['duration', 'spread']"
    >
      <div class="space-y-3">
        <div
          v-for="example in speedExamples"
          :key="example.label"
          class="flex items-center gap-3"
        >
          <span class="w-28 text-xs text-(--ui-text-muted)">
            {{ example.label }}
          </span>
          <UChatShimmer
            text="Generating your theme..."
            :duration="example.duration"
            :spread="example.spread"
          />
        </div>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Brand Highlight"
      description="Point the highlight at a semantic color by overriding the text token."
      :prop-hints="['style']"
    >
      <div class="flex flex-col items-start gap-3">
        <UChatShimmer
          v-for="color in colors"
          :key="color"
          :text="`Searching the ${color} palette...`"
          :style="{ '--ui-text-highlighted': `var(--ui-${color})` }"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="In a Message"
      description="Shimmer as a status line under an assistant avatar."
    >
      <div class="flex items-start gap-3">
        <UAvatar icon="i-lucide-sparkles" size="sm" />
        <div class="space-y-1 pt-1">
          <p class="text-sm font-medium text-(--ui-text-highlighted)">
            Assistant
          </p>
          <UChatShimmer text="Picking a palette that passes contrast..." />
        </div>
      </div>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const speedExamples = [
  { label: "fast (1s)", duration: 1, spread: 2 },
  { label: "default", duration: undefined, spread: undefined },
  { label: "slow, wide", duration: 4, spread: 5 },
];

const colors = ["primary", "secondary", "success"] as const;
</script>
