<script setup lang="ts">
import aboutMd from "~/data/about.md?raw";
</script>

<template>
  <UPage>
    <UContainer>
      <UPageHeader
        headline="About"
        title="Nuxt UI Theme Builder"
        description="A free, open-source visual editor for Nuxt UI v4 design tokens."
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
            to: 'https://github.com/your-org/nuxt-theme-builder',
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
