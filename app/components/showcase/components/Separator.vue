<script setup lang="ts">
const colors = ["primary", "success", "warning", "error", "neutral"] as const;
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Horizontal Separator"
      description="Default horizontal divider between content sections."
    >
      <div class="space-y-4">
        <p class="text-sm">Section above</p>
        <USeparator />
        <p class="text-sm">Section below</p>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Label"
      description="Separator with centered text label."
      :prop-hints="['label']"
    >
      <div class="space-y-4">
        <p class="text-sm text-(--ui-text-muted)">Or continue with</p>
        <USeparator label="OR" />
        <div class="flex gap-2">
          <UButton
            icon="i-lucide-github"
            color="neutral"
            variant="outline"
            label="GitHub"
          />
          <UButton
            icon="i-lucide-chrome"
            color="neutral"
            variant="outline"
            label="Google"
          />
        </div>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Icon"
      description="Separator using an icon element."
      :prop-hints="['icon']"
    >
      <USeparator icon="i-lucide-star" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Vertical"
      description="Vertical separator between inline elements."
      :prop-hints="['orientation']"
    >
      <div class="flex items-center gap-4 h-6">
        <span class="text-sm">Home</span>
        <USeparator orientation="vertical" />
        <span class="text-sm">Products</span>
        <USeparator orientation="vertical" />
        <span class="text-sm">Contact</span>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Colors"
      description="Separators using semantic colors."
      :prop-hints="['color']"
    >
      <div class="space-y-3">
        <USeparator
          v-for="color in colors"
          :key="color"
          :color="color"
          :label="color"
        />
      </div>
    </ShowcaseSpecimen>
  </div>
</template>
