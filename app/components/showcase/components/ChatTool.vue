<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Tool Call States"
      description="Running, finished, and loading tool invocations in an AI chat."
      :prop-hints="['text', 'suffix', 'streaming', 'loading']"
    >
      <div class="max-w-md space-y-3">
        <UChatTool
          text="Searching palettes"
          icon="i-lucide-search"
          streaming
        />
        <UChatTool
          text="Reading component"
          suffix="Button"
          icon="i-lucide-file-text"
        />
        <UChatTool text="Checking contrast ratios" loading />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Inline with Output"
      description="Expand the call to reveal the tool's output."
      :prop-hints="['default slot', 'chevron']"
    >
      <div class="max-w-md space-y-3">
        <UChatTool
          text="Searched components"
          suffix="3 results"
          icon="i-lucide-search"
          chevron="trailing"
          default-open
        >
          {{ searchOutput }}
        </UChatTool>
        <UChatTool
          text="Generated palette"
          icon="i-lucide-palette"
          chevron="leading"
        >
          {{ paletteOutput }}
        </UChatTool>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Card Variant"
      description="A bordered card for richer tool results."
      :prop-hints="['variant']"
    >
      <UChatTool
        variant="card"
        text="Exported theme"
        suffix="app.config.ts"
        icon="i-lucide-file-code"
        chevron="trailing"
        default-open
        class="max-w-md bg-(--ui-bg)"
      >
        <pre class="font-mono text-xs">{{ configOutput }}</pre>
      </UChatTool>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Approval Actions"
      description="Ask the user to approve a tool call before it runs."
      :prop-hints="['actions']"
    >
      <UChatTool
        variant="card"
        :text="approval ? approvalText[approval] : 'Apply the generated theme?'"
        icon="i-lucide-wand-sparkles"
        :actions="approval ? undefined : actions"
        default-open
        class="max-w-md bg-(--ui-bg)"
      >
        Replaces your current primary, secondary, and neutral colors. You can
        undo this from the toolbar.
      </UChatTool>
      <UButton
        v-if="approval"
        label="Reset"
        icon="i-lucide-rotate-ccw"
        size="xs"
        color="neutral"
        variant="ghost"
        class="mt-3"
        @click="approval = null"
      />
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

const searchOutput = "Button, ButtonGroup, FieldGroup";
const paletteOutput =
  "primary: indigo\nsecondary: amber\nneutral: slate\nradius: 0.5rem";
const configOutput = `export default defineAppConfig({
  ui: {
    colors: {
      primary: "indigo",
      neutral: "slate",
    },
  },
});`;

const approval = ref<"approved" | "denied" | null>(null);
const approvalText = {
  approved: "Applied the generated theme",
  denied: "Skipped applying the theme",
};

const actions: ButtonProps[] = [
  {
    label: "Deny",
    color: "neutral",
    variant: "ghost",
    onClick: () => (approval.value = "denied"),
  },
  {
    label: "Approve",
    onClick: () => (approval.value = "approved"),
  },
];
</script>
