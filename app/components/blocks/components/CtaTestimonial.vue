<script setup lang="ts">
const links = [
  {
    label: "Start Free Trial",
    size: "xl" as const,
    color: "primary" as const,
    icon: "i-lucide-arrow-right",
    trailing: true,
  },
  {
    label: "See Pricing",
    size: "xl" as const,
    variant: "ghost" as const,
    color: "neutral" as const,
  },
];
</script>

<template>
  <section>
    <UPageCTA
      title="Take your projects to the next level"
      description="Get instant access to premium components, templates, and priority support. Built for teams that ship fast."
      orientation="horizontal"
      :links="links"
    >
      <!-- Testimonial card -->
      <div
        class="rounded-xl border border-(--ui-border) bg-(--ui-bg-elevated) p-6 space-y-4"
      >
        <div class="flex gap-1" aria-label="5 out of 5 stars" role="img">
          <UIcon
            v-for="i in 5"
            :key="i"
            name="i-lucide-star"
            class="size-4 text-amber-400"
            aria-hidden="true"
          />
        </div>
        <blockquote class="text-(--ui-text) leading-relaxed">
          "Switched our entire design system. The theming flexibility saved us
          weeks of custom CSS work. Our team ships twice as fast now."
        </blockquote>
        <div class="flex items-center gap-3 pt-2">
          <div
            class="size-10 rounded-full bg-(--ui-primary)/10 flex items-center justify-center shrink-0"
          >
            <UIcon
              name="i-lucide-user"
              class="size-5 text-(--ui-primary)"
              aria-hidden="true"
            />
          </div>
          <div>
            <p class="text-sm font-semibold text-(--ui-text-highlighted)">
              Sarah Chen
            </p>
            <p class="text-xs text-(--ui-text-muted)">
              Lead Engineer, Acme Corp
            </p>
          </div>
        </div>
      </div>
    </UPageCTA>
  </section>
</template>
