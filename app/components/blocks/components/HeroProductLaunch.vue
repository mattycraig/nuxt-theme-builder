<script setup lang="ts">
const links = [
  {
    label: "Try it Free",
    icon: "i-lucide-arrow-right",
    trailing: true,
    size: "xl" as const,
    color: "primary" as const,
  },
  {
    label: "Watch Demo",
    icon: "i-lucide-play",
    size: "xl" as const,
    variant: "outline" as const,
    color: "neutral" as const,
  },
];
const logos = ["Vercel", "Netlify", "AWS", "Cloudflare", "GitHub"];
</script>

<template>
  <section>
    <UPageHero
      headline="Now Available — v4.0"
      title="Ship polished products faster than ever"
      description="A complete design system with 125+ components, built-in dark mode, and first-class TypeScript support. From prototype to production in record time."
      :links="links"
    >
      <template #bottom>
        <UPageLogos title="Trusted by teams at">
          <div
            v-for="logo in logos"
            :key="logo"
            class="px-4 py-2 text-sm font-medium text-(--ui-text-muted)"
          >
            {{ logo }}
          </div>
        </UPageLogos>
      </template>
    </UPageHero>
  </section>
</template>
