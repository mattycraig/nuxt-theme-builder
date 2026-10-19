<script setup lang="ts">
// Reminds people the preview is filtered, since the control lives in the
// sidebar's Contrast Check section (and the sidebar may be closed).
const { active, setMode } = useColorVision();
</script>

<template>
  <UButton
    v-if="active"
    icon="i-lucide-eye"
    trailing-icon="i-lucide-x"
    :label="active.label"
    :aria-label="`Simulating ${active.label}. Turn off color vision simulation`"
    size="sm"
    variant="soft"
    color="primary"
    @click="setMode('none')"
  />
</template>
