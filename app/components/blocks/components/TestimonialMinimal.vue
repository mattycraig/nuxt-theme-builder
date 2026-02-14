<script setup lang="ts">
const testimonials = [
  {
    quote: "A must-have tool for any Nuxt project.",
    name: "Elena Voss",
    role: "Designer",
  },
  {
    quote: "Our team's design consistency improved overnight.",
    name: "Raj Patel",
    role: "Engineering Lead",
  },
  {
    quote: "Exporting themes is incredibly smooth. Saves hours every sprint.",
    name: "Lena Müller",
    role: "Frontend Dev",
  },
  {
    quote: "The dark mode support is flawless.",
    name: "Tom Bailey",
    role: "Product Manager",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10">
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
        >
          What people are saying
        </h2>
      </div>
      <UPageList divide>
        <div v-for="t in testimonials" :key="t.name" class="py-6">
          <p class="text-(--ui-text-muted) mb-3 leading-relaxed italic">
            "{{ t.quote }}"
          </p>
          <p class="text-sm font-semibold text-(--ui-text-highlighted)">
            {{ t.name }}
            <span class="font-normal text-(--ui-text-muted)"
              >— {{ t.role }}</span
            >
          </p>
        </div>
      </UPageList>
    </div>
  </section>
</template>
