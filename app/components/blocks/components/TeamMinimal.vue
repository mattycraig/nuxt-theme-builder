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
        class="text-2xl font-bold text-(--ui-text-highlighted) text-center mb-10"
      >
        Our team
      </h2>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <div
          v-for="m in members"
          :key="m.name"
          class="group flex items-center gap-3 rounded-full border border-(--ui-border)/60 bg-(--ui-bg)/80 backdrop-blur-sm py-2 pl-2 pr-5 transition-all duration-250 hover:border-(--ui-primary)/40 hover:shadow-md hover:shadow-(--ui-primary)/5 cursor-default"
        >
          <UAvatar
            :text="m.initials"
            size="sm"
            color="primary"
            class="ring-1 ring-(--ui-border)/40 group-hover:ring-(--ui-primary)/40 transition-all duration-250"
          />
          <div class="leading-tight">
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
