<script setup lang="ts">
const testimonials = [
  {
    title: "Elena Voss",
    description: '"A must-have tool for any Nuxt project."',
    icon: "i-lucide-quote",
    value: "elena",
  },
  {
    title: "Raj Patel",
    description: '"Our team\'s design consistency improved overnight."',
    icon: "i-lucide-quote",
    value: "raj",
  },
  {
    title: "Lena Müller",
    description:
      '"Exporting themes is incredibly smooth. Saves hours every sprint."',
    icon: "i-lucide-quote",
    value: "lena",
  },
  {
    title: "Tom Bailey",
    description: '"The dark mode support is flawless."',
    icon: "i-lucide-quote",
    value: "tom",
  },
];

const roles: Record<string, string> = {
  elena: "Designer",
  raj: "Engineering Lead",
  lena: "Frontend Dev",
  tom: "Product Manager",
};
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <!-- Top decorative line -->
        <div
          class="mx-auto mb-8 w-12 h-px bg-gradient-to-r from-transparent via-[var(--ui-primary)] to-transparent"
          aria-hidden="true"
        />

        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-3"
        >
          What people are saying
        </h2>
        <p class="text-(--ui-text-muted)">
          A timeline of trust from our community.
        </p>
      </div>

      <UTimeline :items="testimonials" color="primary" size="lg">
        <template #description="{ item }">
          <div class="space-y-2 pb-2">
            <p class="text-(--ui-text-muted) leading-relaxed italic">
              {{ item.description }}
            </p>
            <p class="text-xs text-(--ui-text-dimmed)">
              {{ roles[item.value as string] }}
            </p>
          </div>
        </template>
      </UTimeline>
    </div>
  </section>
</template>
