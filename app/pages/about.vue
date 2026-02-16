<script setup lang="ts">
import aboutMd from "~/data/about.md?raw";
</script>

<template>
  <UPage>
    <UContainer>
      <UPageHeader
        headline="About"
        title="Build Nuxt UI Themes — Visually"
        description="Pick colors, preview 125+ components live, and export production-ready code. No guesswork, no trial-and-error deploys."
        :links="[
          {
            label: 'Back to Home',
            icon: 'i-lucide-arrow-left',
            to: '/',
            variant: 'ghost',
            color: 'neutral',
          },
          {
            label: 'View on GitHub',
            icon: 'i-lucide-github',
            to: 'https://github.com/mattycraig/nuxt-theme-builder',
            target: '_blank',
            variant: 'outline',
            color: 'neutral',
          },
        ]"
      />

      <UPageBody>
        <MDC
          :value="aboutMd"
          class="prose prose-sm dark:prose-invert max-w-none"
        />
      </UPageBody>
    </UContainer>
  </UPage>
</template>
