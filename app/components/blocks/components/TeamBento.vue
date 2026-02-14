<script setup lang="ts">
const featured = {
  name: "Sarah Chen",
  role: "CEO & Co-founder",
  initials: "SC",
  bio: "Former design lead at Google with a decade of experience building tools that empower millions of creators. She founded ThemeBuilder to bridge the gap between design intent and production code.",
};

const members = [
  {
    name: "Marcus Rivera",
    role: "CTO & Co-founder",
    initials: "MR",
    bio: "Full-stack architect building scalable systems.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Design",
    initials: "PS",
    bio: "Design systems expert and visual thinker.",
  },
  {
    name: "Alex Kim",
    role: "Lead Engineer",
    initials: "AK",
    bio: "Open source contributor and Vue.js enthusiast.",
  },
  {
    name: "Mia Santos",
    role: "Product Manager",
    initials: "MS",
    bio: "Translates user needs into product reality.",
  },
  {
    name: "David Okafor",
    role: "Developer Relations",
    initials: "DO",
    bio: "Community builder and developer educator.",
  },
];
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Mesh gradient backdrop -->
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-br from-(--ui-primary)/5 via-transparent to-(--ui-secondary)/5"
      aria-hidden="true"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="text-center mb-14">
        <UBadge
          label="The Team"
          color="primary"
          variant="subtle"
          size="lg"
          class="mb-4"
        />
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          People who make it happen
        </h2>
      </div>

      <!-- Bento grid: featured large tile + smaller tiles -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr"
      >
        <!-- Featured member — spans 2 rows on large screens -->
        <div
          class="group relative rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg)/70 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-(--ui-primary)/40 hover:shadow-xl hover:shadow-(--ui-primary)/5 sm:col-span-2 lg:col-span-1 lg:row-span-2"
        >
          <div
            class="absolute inset-0 bg-gradient-to-b from-(--ui-primary)/8 to-transparent opacity-60"
            aria-hidden="true"
          />
          <div
            class="relative h-full flex flex-col items-center justify-center p-8 text-center"
          >
            <UAvatar
              :text="featured.initials"
              size="3xl"
              color="primary"
              class="mb-5 ring-3 ring-(--ui-primary)/20 ring-offset-2 ring-offset-(--ui-bg)"
            />
            <h3 class="text-xl font-bold text-(--ui-text-highlighted) mb-1">
              {{ featured.name }}
            </h3>
            <UBadge
              :label="featured.role"
              variant="subtle"
              color="primary"
              size="xs"
              class="mb-3"
            />
            <p class="text-sm text-(--ui-text-muted) leading-relaxed max-w-xs">
              {{ featured.bio }}
            </p>
            <div class="flex gap-2 mt-5">
              <UButton
                icon="i-lucide-github"
                size="xs"
                variant="ghost"
                color="neutral"
                aria-label="GitHub profile"
              />
              <UButton
                icon="i-lucide-linkedin"
                size="xs"
                variant="ghost"
                color="neutral"
                aria-label="LinkedIn profile"
              />
              <UButton
                icon="i-lucide-twitter"
                size="xs"
                variant="ghost"
                color="neutral"
                aria-label="Twitter profile"
              />
            </div>
          </div>
        </div>

        <!-- Smaller member tiles -->
        <div
          v-for="m in members"
          :key="m.name"
          class="group relative rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg)/70 backdrop-blur-sm p-5 transition-all duration-300 hover:border-(--ui-primary)/30 hover:shadow-lg hover:shadow-(--ui-primary)/5"
        >
          <div class="flex items-start gap-4">
            <UAvatar
              :text="m.initials"
              size="lg"
              color="primary"
              class="shrink-0 ring-1 ring-(--ui-border)/50 group-hover:ring-(--ui-primary)/40 transition-all duration-300"
            />
            <div class="min-w-0">
              <h3 class="font-semibold text-(--ui-text-highlighted) truncate">
                {{ m.name }}
              </h3>
              <p class="text-xs font-medium text-(--ui-primary) mb-1">
                {{ m.role }}
              </p>
              <p
                class="text-sm text-(--ui-text-muted) leading-relaxed line-clamp-2"
              >
                {{ m.bio }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
