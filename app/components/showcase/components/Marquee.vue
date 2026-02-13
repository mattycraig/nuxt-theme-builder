<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Tech Stack Marquee"
      description="Auto-scrolling horizontal marquee of icons."
    >
      <UMarquee>
        <div
          v-for="icon in techIcons"
          :key="icon.name"
          class="flex items-center gap-2 px-4 py-2 mx-2 rounded-md bg-(--ui-bg-elevated) border border-(--ui-border)"
        >
          <UIcon :name="icon.name" class="size-5" />
          <span class="text-sm font-medium">{{ icon.label }}</span>
        </div>
      </UMarquee>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Reverse Direction"
      description="Marquee scrolling in the opposite direction."
      :prop-hints="['reverse']"
    >
      <UMarquee reverse>
        <div
          v-for="item in testimonials"
          :key="item.name"
          class="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg bg-(--ui-bg-elevated) border border-(--ui-border) min-w-[200px]"
        >
          <UAvatar :src="item.avatar" :alt="item.name" size="sm" />
          <div>
            <p class="text-sm font-medium">{{ item.name }}</p>
            <p class="text-xs text-(--ui-text-muted)">{{ item.role }}</p>
          </div>
        </div>
      </UMarquee>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Pause on Hover"
      description="Marquee that pauses when hovered."
      :prop-hints="['pauseOnHover']"
    >
      <UMarquee pause-on-hover>
        <UBadge
          v-for="tag in tags"
          :key="tag"
          :label="tag"
          color="primary"
          variant="subtle"
          class="mx-1"
        />
      </UMarquee>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const techIcons = [
  { name: "i-lucide-code", label: "Vue" },
  { name: "i-lucide-server", label: "Nuxt" },
  { name: "i-lucide-palette", label: "Tailwind" },
  { name: "i-lucide-database", label: "PostgreSQL" },
  { name: "i-lucide-cloud", label: "Vercel" },
  { name: "i-lucide-git-branch", label: "Git" },
];

const testimonials = [
  {
    name: "Alice Chen",
    role: "Designer",
    avatar: "https://i.pravatar.cc/128?u=marquee1",
  },
  {
    name: "Bob Smith",
    role: "Developer",
    avatar: "https://i.pravatar.cc/128?u=marquee2",
  },
  {
    name: "Carol Davis",
    role: "PM",
    avatar: "https://i.pravatar.cc/128?u=marquee3",
  },
  {
    name: "Dan Lee",
    role: "CTO",
    avatar: "https://i.pravatar.cc/128?u=marquee4",
  },
];

const tags = [
  "TypeScript",
  "Vue 3",
  "Nuxt",
  "Tailwind CSS",
  "Vite",
  "Pinia",
  "Vitest",
  "Playwright",
];
</script>
