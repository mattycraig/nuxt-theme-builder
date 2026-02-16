<script setup lang="ts">
import privacyMd from "~/data/privacy.md?raw";
</script>

<template>
  <UPage>
    <UContainer>
      <UPageHeader
        headline="Legal"
        title="Privacy Policy"
        description="Last updated: February 15, 2026"
        :links="[
          {
            label: 'Back to Home',
            icon: 'i-lucide-arrow-left',
            to: '/',
            variant: 'ghost',
            color: 'neutral',
          },
        ]"
      />

      <UPageBody>
        <MDC
          :value="privacyMd"
          class="prose prose-sm dark:prose-invert max-w-none"
        />
      </UPageBody>
    </UContainer>
  </UPage>
</template>
