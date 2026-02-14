<script setup lang="ts">
const testimonials = [
  {
    quote: "The best theming tool for Vue and Nuxt.",
    name: "Ana Torres",
    role: "Senior Developer",
  },
  {
    quote: "Saved us weeks of manual design work.",
    name: "Ben Harper",
    role: "CTO",
  },
  {
    quote: "Dark mode support is flawless.",
    name: "Chloe Liu",
    role: "UI Engineer",
  },
  {
    quote: "Export to CSS variables is a killer feature.",
    name: "Daniel Kim",
    role: "Frontend Lead",
  },
  {
    quote: "Our design consistency has never been better.",
    name: "Eva Müller",
    role: "Product Designer",
  },
  {
    quote: "Real-time preview across components is magical.",
    name: "Faisal Ahmed",
    role: "Fullstack Dev",
  },
  {
    quote: "The AI prompts generated a great starting palette.",
    name: "Grace Obi",
    role: "Creative Director",
  },
  {
    quote: "We onboarded 3 new devs in an hour.",
    name: "Hiro Yamamoto",
    role: "Tech Lead",
  },
  {
    quote: "Undo/redo makes experimentation risk-free.",
    name: "Isla Campbell",
    role: "Junior Dev",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
        >
          Wall of love
        </h2>
        <p class="text-lg text-(--ui-text-muted)">
          Hear from developers and designers around the world.
        </p>
      </div>
      <UPageColumns>
        <UPageCard v-for="t in testimonials" :key="t.name">
          <div class="p-2 space-y-3">
            <p class="text-sm text-(--ui-text-muted) leading-relaxed">
              "{{ t.quote }}"
            </p>
            <p class="text-sm font-semibold text-(--ui-text-highlighted)">
              {{ t.name }}
              <span class="font-normal text-(--ui-text-muted)"
                >— {{ t.role }}</span
              >
            </p>
          </div>
        </UPageCard>
      </UPageColumns>
    </div>
  </section>
</template>
