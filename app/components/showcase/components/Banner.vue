<script setup lang="ts">
const colors = ["primary", "info", "success", "warning", "error"] as const;
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Semantic Colors"
      description="Banners using semantic color roles."
      :prop-hints="['color', 'icon']"
    >
      <div class="space-y-3">
        <UBanner
          v-for="color in colors"
          :key="color"
          :color="color"
          :title="`${color.charAt(0).toUpperCase() + color.slice(1)} banner with important information.`"
          icon="i-lucide-megaphone"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Close Button"
      description="Dismissible banner with close action."
      :prop-hints="['close']"
    >
      <UBanner
        title="This site uses cookies to improve your experience."
        icon="i-lucide-cookie"
        close
      />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Actions"
      description="Banner with call-to-action links."
      :prop-hints="['actions']"
    >
      <UBanner
        title="New version available! Update now to get the latest features."
        icon="i-lucide-sparkles"
        color="primary"
        :actions="[
          { label: 'Update now', color: 'neutral', variant: 'outline' },
        ]"
        close
      />
    </ShowcaseSpecimen>
  </div>
</template>
