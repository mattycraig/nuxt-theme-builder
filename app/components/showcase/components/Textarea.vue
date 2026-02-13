<script setup lang="ts">
import { ref } from "vue";

const colors = ["primary", "success", "warning", "error"] as const;
const message = ref("");
const bio = ref("");
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Textarea"
      description="Multi-line text input field."
    >
      <UFormField label="Message">
        <UTextarea v-model="message" placeholder="Type your message..." />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Rows & Auto-resize"
      description="Textarea with custom height and auto-resize behavior."
      :prop-hints="['rows', 'autoresize']"
    >
      <UFormField label="Bio">
        <UTextarea
          v-model="bio"
          :rows="3"
          autoresize
          placeholder="Tell us about yourself..."
        />
      </UFormField>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Colors"
      description="Textarea with semantic highlight colors."
      :prop-hints="['color']"
    >
      <div class="grid grid-cols-2 gap-3">
        <UTextarea
          v-for="color in colors"
          :key="color"
          :color="color"
          :placeholder="color"
          :rows="2"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Variants"
      description="Textarea in different visual styles."
      :prop-hints="['variant']"
    >
      <div class="space-y-3">
        <UTextarea
          v-for="variant in [
            'outline',
            'soft',
            'subtle',
            'ghost',
            'none',
          ] as const"
          :key="variant"
          :variant="variant"
          :placeholder="`${variant} variant`"
          :rows="2"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Disabled"
      description="Non-interactive textarea."
      :prop-hints="['disabled']"
    >
      <UTextarea
        model-value="This content cannot be modified."
        disabled
        :rows="2"
      />
    </ShowcaseSpecimen>
  </div>
</template>
