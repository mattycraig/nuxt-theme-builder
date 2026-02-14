<script setup lang="ts">
const members = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    initials: "SC",
    bio: "Former design lead at Google. Making design accessible to everyone.",
  },
  {
    name: "Marcus Rivera",
    role: "CTO & Co-founder",
    initials: "MR",
    bio: "Full-stack engineer with 15 years building developer tools.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Design",
    initials: "PS",
    bio: "Design systems expert used by millions of developers.",
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
    bio: "Translating user needs into delightful experiences.",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Gradient strip backdrop -->
    <div
      class="pointer-events-none absolute top-1/2 left-0 right-0 -translate-y-1/2 h-48 bg-gradient-to-r from-(--ui-primary)/5 via-(--ui-secondary)/8 to-(--ui-primary)/5"
      aria-hidden="true"
    />

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="text-center mb-14">
        <p
          class="text-sm font-semibold tracking-wide uppercase text-(--ui-primary) mb-3"
        >
          Who We Are
        </p>
        <h2
          class="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--ui-text-highlighted)"
        >
          The faces behind the code
        </h2>
      </div>

      <!-- Overlapping horizontal card stack -->
      <div class="flex justify-center">
        <div class="flex items-center -space-x-3 sm:-space-x-4">
          <div
            v-for="(m, i) in members"
            :key="m.name"
            class="team-card group relative transition-all duration-300 hover:z-20 hover:scale-105"
            :style="{
              zIndex: members.length - i,
              animationDelay: `${i * 100}ms`,
            }"
          >
            <div
              class="w-44 sm:w-52 rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg)/90 backdrop-blur-md p-5 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-(--ui-primary)/10 group-hover:border-(--ui-primary)/40"
            >
              <div class="text-center">
                <UAvatar
                  :text="m.initials"
                  size="2xl"
                  color="primary"
                  class="mx-auto mb-3 ring-2 ring-(--ui-bg) group-hover:ring-(--ui-primary)/30 transition-all duration-300"
                />
                <h3
                  class="font-semibold text-sm text-(--ui-text-highlighted) truncate"
                >
                  {{ m.name }}
                </h3>
                <p class="text-xs text-(--ui-primary) font-medium mb-2">
                  {{ m.role }}
                </p>
                <p
                  class="text-xs text-(--ui-text-muted) leading-relaxed line-clamp-2 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-300 overflow-hidden"
                >
                  {{ m.bio }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-card {
  animation: teamSlideUp 0.5s ease-out both;
}

@keyframes teamSlideUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .team-card {
    animation: none;
  }
}
</style>
