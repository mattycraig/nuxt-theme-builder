<script setup lang="ts">
const logos = ["Vercel", "Netlify", "AWS", "Cloudflare", "Stripe", "GitHub"];

const row1 = [
  {
    quote:
      "The visual builder cut our design handoff time in half. Worth every penny.",
    name: "Priya Sharma",
    role: "Design Lead",
    initials: "PS",
  },
  {
    quote:
      "We standardized our component library across 5 products in one afternoon.",
    name: "David Okafor",
    role: "Staff Engineer",
    initials: "DO",
  },
  {
    quote:
      "The AI-generated themes gave us a perfect starting point every time.",
    name: "Mia Santos",
    role: "Creative Director",
    initials: "MS",
  },
  {
    quote: "Dark mode and light mode both look incredible out of the box.",
    name: "Leo Andersen",
    role: "Product Designer",
    initials: "LA",
  },
];

const row2 = [
  {
    quote: "Export to CSS variables is a killer feature for our workflow.",
    name: "Daniel Kim",
    role: "Frontend Lead",
    initials: "DK",
  },
  {
    quote: "Real-time preview across components is magical.",
    name: "Faisal Ahmed",
    role: "Fullstack Dev",
    initials: "FA",
  },
  {
    quote: "Our design consistency has never been better since adopting this.",
    name: "Eva Müller",
    role: "Product Designer",
    initials: "EM",
  },
  {
    quote: "We onboarded 3 new devs in an hour — they picked it up instantly.",
    name: "Hiro Yamamoto",
    role: "Tech Lead",
    initials: "HY",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Dot grid texture -->
    <div
      class="absolute inset-0 marquee-dot-grid opacity-[0.04]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <!-- Logo bar -->
      <UPageLogos title="Trusted by industry leaders">
        <div
          v-for="logo in logos"
          :key="logo"
          class="px-6 py-3 text-sm font-medium text-(--ui-text-muted)"
        >
          {{ logo }}
        </div>
      </UPageLogos>

      <!-- Scrolling testimonials row 1 -->
      <UMarquee pause-on-hover class="[--duration:40s]">
        <div
          v-for="t in row1"
          :key="t.name"
          class="w-80 shrink-0 mx-3 rounded-2xl border border-(--ui-border)/50 bg-(--ui-bg)/70 backdrop-blur-sm p-5 space-y-4 transition-shadow duration-200 hover:shadow-lg"
        >
          <p class="text-sm text-(--ui-text-muted) leading-relaxed">
            &ldquo;{{ t.quote }}&rdquo;
          </p>
          <UUser
            :name="t.name"
            :description="t.role"
            :avatar="{ text: t.initials, color: 'primary' as const }"
          />
        </div>
      </UMarquee>

      <!-- Scrolling testimonials row 2 (reversed) -->
      <UMarquee pause-on-hover reverse class="[--duration:45s]">
        <div
          v-for="t in row2"
          :key="t.name"
          class="w-80 shrink-0 mx-3 rounded-2xl border border-(--ui-border)/50 bg-(--ui-bg)/70 backdrop-blur-sm p-5 space-y-4 transition-shadow duration-200 hover:shadow-lg"
        >
          <p class="text-sm text-(--ui-text-muted) leading-relaxed">
            &ldquo;{{ t.quote }}&rdquo;
          </p>
          <UUser
            :name="t.name"
            :description="t.role"
            :avatar="{ text: t.initials, color: 'primary' as const }"
          />
        </div>
      </UMarquee>
    </div>
  </section>
</template>

<style scoped>
.marquee-dot-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}
</style>
