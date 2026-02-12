<script setup lang="ts">
import type { NeutralShade } from "~/types/theme";
import { NUMERIC_SHADE_KEYS } from "~/types/theme";

const props = withDefaults(
  defineProps<{
    modelValue: NeutralShade;
    hexMap: Record<string, string>;
    ariaLabel?: string;
    showWhiteBlack?: boolean;
  }>(),
  {
    ariaLabel: "Select shade",
    showWhiteBlack: true,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: NeutralShade];
}>();

function getHex(shade: string): string {
  return props.hexMap[shade] ?? "#888888";
}
</script>

<template>
  <div
    class="flex items-center gap-1 mt-2"
    role="radiogroup"
    :aria-label="ariaLabel"
  >
    <!-- White -->
    <UTooltip v-if="showWhiteBlack" text="White">
      <button
        type="button"
        role="radio"
        :aria-checked="modelValue === 'white'"
        aria-label="White"
        class="size-5 shrink-0 rounded-sm border border-default cursor-pointer transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
        :class="modelValue === 'white' ? 'ring-2 ring-primary-500' : ''"
        :style="{ backgroundColor: '#ffffff' }"
        @click="emit('update:modelValue', 'white')"
      />
    </UTooltip>

    <!-- Numeric shades 50–950 -->
    <div class="flex flex-1 min-w-0">
      <UTooltip
        v-for="s in NUMERIC_SHADE_KEYS"
        :key="s"
        :text="String(s)"
        class="flex-1"
      >
        <button
          type="button"
          role="radio"
          :aria-checked="modelValue === s"
          :aria-label="`Shade ${s} — ${getHex(s)}`"
          class="w-full h-5 first:rounded-l-sm last:rounded-r-sm relative cursor-pointer transition-transform hover:scale-y-125 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none mx-[0.5px]"
          :class="[
            modelValue === s
              ? 'ring-2 z-10 ring-primary-500 hover:scale-none'
              : '',
          ]"
          :style="{ backgroundColor: getHex(s) }"
          @click="emit('update:modelValue', s)"
        />
      </UTooltip>
    </div>

    <!-- Black -->
    <UTooltip v-if="showWhiteBlack" text="Black">
      <button
        type="button"
        role="radio"
        :aria-checked="modelValue === 'black'"
        aria-label="Black"
        class="size-5 shrink-0 rounded-sm border border-black cursor-pointer transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
        :class="modelValue === 'black' ? 'ring-2 ring-primary-500' : ''"
        :style="{ backgroundColor: '#000000' }"
        @click="emit('update:modelValue', 'black')"
      />
    </UTooltip>
  </div>
</template>
