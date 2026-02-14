<script setup lang="ts">
const members = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    initials: "SC",
    bio: "Former design lead at Google. Passionate about making design accessible to everyone.",
  },
  {
    name: "Marcus Rivera",
    role: "CTO & Co-founder",
    initials: "MR",
    bio: "Full-stack engineer with 15 years of experience building developer tools.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Design",
    initials: "PS",
    bio: "Design systems expert who has built libraries used by millions of developers.",
  },
  {
    name: "Alex Kim",
    role: "Lead Engineer",
    initials: "AK",
    bio: "Open source contributor and Vue.js core team member.",
  },
  {
    name: "Mia Santos",
    role: "Product Manager",
    initials: "MS",
    bio: "Focused on translating user needs into delightful product experiences.",
  },
  {
    name: "David Okafor",
    role: "Developer Relations",
    initials: "DO",
    bio: "Community builder and educator helping developers adopt modern tooling.",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <p class="text-sm font-semibold text-(--ui-primary) mb-2">Our Team</p>
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          Meet the people behind the product
        </h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
        <div v-for="m in members" :key="m.name" class="text-center">
          <UAvatar
            :text="m.initials"
            size="3xl"
            color="primary"
            class="mx-auto mb-4"
          />
          <h3 class="font-semibold text-(--ui-text-highlighted)">
            {{ m.name }}
          </h3>
          <p class="text-sm text-(--ui-primary) mb-2">{{ m.role }}</p>
          <p class="text-sm text-(--ui-text-muted)">{{ m.bio }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
