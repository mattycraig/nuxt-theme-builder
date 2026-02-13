<script setup lang="ts">
import { ref } from "vue";

const colors = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "neutral",
] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const enabled = ref(true);
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Switch"
      description="Toggle switch for boolean settings."
    >
      <div class="space-y-3">
        <USwitch v-model="enabled" label="Enable notifications" />
        <p class="text-xs text-(--ui-text-muted)">
          Status: {{ enabled ? "On" : "Off" }}
        </p>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Colors"
      description="Switches using semantic color roles."
      :prop-hints="['color']"
    >
      <div class="space-y-2">
        <USwitch
          v-for="color in colors"
          :key="color"
          :color="color"
          :label="color.charAt(0).toUpperCase() + color.slice(1)"
          :default-value="true"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Sizes"
      description="Switch at various sizes."
      :prop-hints="['size']"
    >
      <div class="flex items-center gap-6">
        <USwitch
          v-for="size in sizes"
          :key="size"
          :size="size"
          :label="size"
          :default-value="true"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Description"
      description="Switch with supplementary helper text."
      :prop-hints="['description']"
    >
      <USwitch
        label="Dark mode"
        description="Switch between light and dark themes."
      />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Disabled"
      description="Non-interactive switches."
      :prop-hints="['disabled']"
    >
      <div class="space-y-2">
        <USwitch label="Disabled off" disabled />
        <USwitch label="Disabled on" disabled :default-value="true" />
      </div>
    </ShowcaseSpecimen>
  </div>
</template>
