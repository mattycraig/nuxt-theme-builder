<script setup lang="ts">
const members = [
  { name: "Sarah Chen", role: "CEO", initials: "SC" },
  { name: "Marcus Rivera", role: "CTO", initials: "MR" },
  { name: "Priya Sharma", role: "Design", initials: "PS" },
  { name: "Alex Kim", role: "Engineering", initials: "AK" },
  { name: "Mia Santos", role: "Product", initials: "MS" },
  { name: "David Okafor", role: "DevRel", initials: "DO" },
];
</script>

<template>
  <section class="py-12 sm:py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2
        class="text-2xl font-bold text-(--ui-text-highlighted) text-center mb-8"
      >
        Our team
      </h2>
      <div class="flex flex-wrap items-center justify-center gap-8">
        <div v-for="m in members" :key="m.name" class="flex items-center gap-3">
          <UAvatar :text="m.initials" size="md" color="primary" />
          <div>
            <p class="text-sm font-semibold text-(--ui-text-highlighted)">
              {{ m.name }}
            </p>
            <p class="text-xs text-(--ui-text-muted)">{{ m.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
