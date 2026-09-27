<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Single Selection"
      description="Always-visible list of options with a check on the selected item."
      :prop-hints="['items', 'v-model']"
    >
      <div class="max-w-xs">
        <UListbox v-model="region" :items="regions" class="w-full" />
        <p class="text-xs text-(--ui-text-muted) mt-2">
          Selected: {{ region?.label ?? "none" }}
        </p>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Multiple with Filter"
      description="Search the list and pick several items at once."
      :prop-hints="['multiple', 'filter', 'value-key']"
    >
      <div class="max-w-xs">
        <UListbox
          v-model="skills"
          :items="skillItems"
          value-key="value"
          multiple
          :filter="{ placeholder: 'Filter skills...' }"
          class="w-full"
        />
        <p class="text-xs text-(--ui-text-muted) mt-2">
          {{ skills.length }} selected
        </p>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Groups, Avatars & Descriptions"
      description="Grouped items with labels, avatars, and secondary text."
      :prop-hints="['items[][]', 'avatar', 'description']"
    >
      <div class="max-w-sm">
        <UListbox
          :items="people"
          :default-value="people[1]![1]"
          color="secondary"
          class="w-full"
        />
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Colors"
      description="The highlight ring and focus outline follow the semantic color role."
      :prop-hints="['color', 'highlight']"
    >
      <ShowcaseSpecimenGrid :cols="3">
        <div v-for="color in colors" :key="color">
          <p class="text-xs text-(--ui-text-muted) mb-1">{{ color }}</p>
          <UListbox
            :items="statusItems"
            :default-value="statusItems[0]"
            :color="color"
            highlight
            class="w-full"
          />
        </div>
      </ShowcaseSpecimenGrid>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Sizes, Loading & Disabled"
      description="Compact and large lists, a loading state, and a disabled list."
      :prop-hints="['size', 'loading', 'disabled']"
    >
      <ShowcaseSpecimenGrid :cols="4">
        <div>
          <p class="text-xs text-(--ui-text-muted) mb-1">xs</p>
          <UListbox :items="statusItems" size="xs" class="w-full" />
        </div>
        <div>
          <p class="text-xs text-(--ui-text-muted) mb-1">lg</p>
          <UListbox :items="statusItems" size="lg" class="w-full" />
        </div>
        <div>
          <p class="text-xs text-(--ui-text-muted) mb-1">loading</p>
          <UListbox :items="statusItems" loading class="w-full" />
        </div>
        <div>
          <p class="text-xs text-(--ui-text-muted) mb-1">disabled</p>
          <UListbox
            :items="statusItems"
            :default-value="statusItems[1]"
            disabled
            class="w-full"
          />
        </div>
      </ShowcaseSpecimenGrid>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
import type { ListboxItem } from "@nuxt/ui";

const regions = [
  { label: "US East", description: "Virginia", icon: "i-lucide-map-pin" },
  { label: "US West", description: "Oregon", icon: "i-lucide-map-pin" },
  { label: "EU Central", description: "Frankfurt", icon: "i-lucide-map-pin" },
  { label: "Asia Pacific", description: "Singapore", icon: "i-lucide-map-pin" },
] satisfies ListboxItem[];
const region = ref(regions[0]);

const skillItems = [
  { label: "Vue", value: "vue", icon: "i-simple-icons-vuedotjs" },
  { label: "Nuxt", value: "nuxt", icon: "i-simple-icons-nuxtdotjs" },
  { label: "TypeScript", value: "ts", icon: "i-simple-icons-typescript" },
  { label: "Tailwind CSS", value: "tailwind", icon: "i-simple-icons-tailwindcss" },
  { label: "Vite", value: "vite", icon: "i-simple-icons-vite" },
  { label: "Pinia", value: "pinia", icon: "i-lucide-database" },
  { label: "Vitest", value: "vitest", icon: "i-simple-icons-vitest" },
] satisfies ListboxItem[];
const skills = ref<string[]>(["vue", "nuxt"]);

const people = [
  [
    { type: "label" as const, label: "Design" },
    {
      label: "Ava Martinez",
      description: "Product designer",
      avatar: { src: "https://i.pravatar.cc/64?u=ava", alt: "Ava Martinez" },
    },
    {
      label: "Noah Kim",
      description: "Brand designer",
      avatar: { src: "https://i.pravatar.cc/64?u=noah", alt: "Noah Kim" },
    },
  ],
  [
    { type: "label" as const, label: "Engineering" },
    {
      label: "Liam Chen",
      description: "Frontend engineer",
      avatar: { src: "https://i.pravatar.cc/64?u=liam", alt: "Liam Chen" },
    },
    {
      label: "Mia Patel",
      description: "Platform engineer",
      avatar: { src: "https://i.pravatar.cc/64?u=mia", alt: "Mia Patel" },
    },
  ],
] satisfies ListboxItem[][];

const statusItems = [
  { label: "Backlog", icon: "i-lucide-circle-dashed" },
  { label: "In progress", icon: "i-lucide-circle-dot" },
  { label: "Done", icon: "i-lucide-circle-check" },
] satisfies ListboxItem[];

const colors = ["primary", "secondary", "neutral"] as const;
</script>
