<script setup lang="ts">
const members = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    initials: "SC",
    bio: "Visionary leader transforming design tooling for the modern web.",
    github: "#",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Marcus Rivera",
    role: "CTO & Co-founder",
    initials: "MR",
    bio: "Architect of scalable systems powering thousands of design teams.",
    github: "#",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Priya Sharma",
    role: "Head of Design",
    initials: "PS",
    bio: "Creates design systems that bridge creativity and engineering.",
    github: "#",
    linkedin: "#",
  },
  {
    name: "Alex Kim",
    role: "Lead Engineer",
    initials: "AK",
    bio: "Passionate about open-source and component-driven architecture.",
    github: "#",
    linkedin: "#",
    twitter: "#",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Dot grid pattern background -->
    <div
      class="absolute inset-0 team-dot-grid opacity-[0.03]"
      aria-hidden="true"
    />
    <!-- Centered glow -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[35rem] rounded-full bg-(--ui-primary)/8 blur-[120px]"
      aria-hidden="true"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="text-center mb-14">
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          Our team
        </h2>
        <p class="mt-3 text-lg text-(--ui-text-muted) max-w-xl mx-auto">
          A small, focused group building the best theming experience.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="m in members"
          :key="m.name"
          class="group relative rounded-2xl border border-(--ui-border)/50 bg-(--ui-bg)/60 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-(--ui-primary)/5 hover:border-(--ui-primary)/30"
        >
          <!-- Colored accent bar at top -->
          <div
            class="h-1 bg-gradient-to-r from-(--ui-primary) to-(--ui-secondary) opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />

          <div class="p-6 text-center">
            <UAvatar
              :text="m.initials"
              size="3xl"
              color="primary"
              class="mx-auto mb-4"
            />
            <h3 class="font-semibold text-(--ui-text-highlighted)">
              {{ m.name }}
            </h3>
            <p class="text-sm text-(--ui-primary) font-medium mb-2">
              {{ m.role }}
            </p>
            <p class="text-sm text-(--ui-text-muted) leading-relaxed mb-4">
              {{ m.bio }}
            </p>

            <!-- Social links -->
            <div class="flex items-center justify-center gap-1">
              <UButton
                v-if="m.github"
                icon="i-lucide-github"
                size="xs"
                variant="ghost"
                color="neutral"
                aria-label="GitHub profile"
                :to="m.github"
              />
              <UButton
                v-if="m.linkedin"
                icon="i-lucide-linkedin"
                size="xs"
                variant="ghost"
                color="neutral"
                aria-label="LinkedIn profile"
                :to="m.linkedin"
              />
              <UButton
                v-if="m.twitter"
                icon="i-lucide-twitter"
                size="xs"
                variant="ghost"
                color="neutral"
                aria-label="Twitter profile"
                :to="m.twitter"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-dot-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}
</style>
