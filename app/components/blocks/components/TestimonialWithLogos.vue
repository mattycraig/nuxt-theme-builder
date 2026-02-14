<script setup lang="ts">
const logos = ["Vercel", "Netlify", "AWS", "Cloudflare", "Stripe", "GitHub"];
const testimonials = [
  {
    quote:
      "The visual builder cut our design handoff time in half. Worth every penny.",
    name: "Priya Sharma",
    role: "Design Lead at ScaleUp",
    initials: "PS",
  },
  {
    quote:
      "We standardized our component library across 5 products in one afternoon.",
    name: "David Okafor",
    role: "Staff Engineer at CloudBase",
    initials: "DO",
  },
  {
    quote:
      "The AI-generated themes gave us a perfect starting point every time.",
    name: "Mia Santos",
    role: "Creative Director at Pixel Co",
    initials: "MS",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <UPageLogos title="Trusted by industry leaders">
        <div
          v-for="logo in logos"
          :key="logo"
          class="px-6 py-3 text-sm font-medium text-(--ui-text-muted)"
        >
          {{ logo }}
        </div>
      </UPageLogos>
      <UPageGrid>
        <UPageCard v-for="t in testimonials" :key="t.name">
          <div class="space-y-4 p-2">
            <p class="text-(--ui-text-muted) leading-relaxed">
              "{{ t.quote }}"
            </p>
            <div class="flex items-center gap-3">
              <UAvatar :text="t.initials" size="sm" color="primary" />
              <div>
                <p class="text-sm font-semibold text-(--ui-text-highlighted)">
                  {{ t.name }}
                </p>
                <p class="text-xs text-(--ui-text-muted)">{{ t.role }}</p>
              </div>
            </div>
          </div>
        </UPageCard>
      </UPageGrid>
    </div>
  </section>
</template>
