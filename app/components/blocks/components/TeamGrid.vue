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
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Decorative gradient orbs for atmospheric depth -->
    <div
      class="pointer-events-none absolute -top-32 left-1/4 size-[30rem] rounded-full bg-(--ui-primary)/10 blur-[100px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-24 right-1/4 size-[22rem] rounded-full bg-(--ui-secondary)/8 blur-[80px]"
      aria-hidden="true"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="text-center mb-14">
        <p
          class="team-stagger text-sm font-semibold tracking-wide uppercase text-(--ui-primary) mb-3"
        >
          Our Team
        </p>
        <h2
          class="team-stagger [animation-delay:80ms] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-(--ui-text-highlighted) leading-[1.15]"
        >
          Meet the people behind the product
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(m, i) in members"
          :key="m.name"
          class="team-stagger group relative rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg)/70 backdrop-blur-sm p-6 text-center transition-all duration-300 hover:border-(--ui-primary)/40 hover:shadow-lg hover:shadow-(--ui-primary)/5 hover:-translate-y-1"
          :style="{ animationDelay: `${150 + i * 80}ms` }"
        >
          <!-- Hover gradient overlay -->
          <div
            class="absolute inset-0 rounded-2xl bg-gradient-to-b from-(--ui-primary)/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
          <div class="relative">
            <UAvatar
              :text="m.initials"
              size="3xl"
              color="primary"
              class="mx-auto mb-4 ring-2 ring-(--ui-border)/50 ring-offset-2 ring-offset-(--ui-bg) transition-all duration-300 group-hover:ring-(--ui-primary)/50"
            />
            <h3 class="font-semibold text-lg text-(--ui-text-highlighted)">
              {{ m.name }}
            </h3>
            <p class="text-sm font-medium text-(--ui-primary) mb-2">
              {{ m.role }}
            </p>
            <p class="text-sm text-(--ui-text-muted) leading-relaxed">
              {{ m.bio }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-stagger {
  animation: teamFadeUp 0.6s ease-out both;
}

@keyframes teamFadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .team-stagger {
    animation: none;
  }
}
</style>
