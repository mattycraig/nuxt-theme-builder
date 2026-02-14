<script setup lang="ts">
const members = [
  { name: "Sarah Chen", role: "CEO & Co-founder", initials: "SC" },
  { name: "Marcus Rivera", role: "CTO & Co-founder", initials: "MR" },
  { name: "Priya Sharma", role: "Head of Design", initials: "PS" },
  { name: "Alex Kim", role: "Lead Engineer", initials: "AK" },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          Our team
        </h2>
        <p class="mt-2 text-lg text-(--ui-text-muted)">
          A small, focused group building the best theming experience.
        </p>
      </div>
      <UPageGrid>
        <UPageCard
          v-for="m in members"
          :key="m.name"
          :title="m.name"
          :description="m.role"
        >
          <template #header>
            <div
              class="flex items-center justify-center py-8 bg-(--ui-bg-elevated)"
            >
              <UAvatar :text="m.initials" size="3xl" color="primary" />
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </div>
  </section>
</template>
