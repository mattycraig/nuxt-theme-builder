<script setup lang="ts">
const links = [
  {
    label: "Start Free Trial",
    size: "lg" as const,
    color: "primary" as const,
  },
  {
    label: "Learn More",
    size: "lg" as const,
    variant: "ghost" as const,
    color: "neutral" as const,
  },
];
</script>

<template>
  <section>
    <UPageCta
      title="Take your projects to the next level"
      description="Get instant access to premium components, templates, and priority support. Built for teams that ship fast."
      orientation="horizontal"
      :links="links"
    >
      <div
        class="aspect-video rounded-lg bg-(--ui-bg-elevated) border border-(--ui-border) flex items-center justify-center"
      >
        <div class="text-center text-(--ui-text-muted)">
          <UIcon
            name="i-lucide-play-circle"
            class="size-12 mb-2 mx-auto opacity-40"
            aria-hidden="true"
          />
          <p class="text-sm">Product demo video</p>
        </div>
      </div>
    </UPageCta>
  </section>
</template>
