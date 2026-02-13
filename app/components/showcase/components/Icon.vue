<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Common Icons"
      description="Icons from the Lucide set used throughout the UI."
      :prop-hints="['name']"
    >
      <div class="flex flex-wrap gap-4">
        <div
          v-for="icon in commonIcons"
          :key="icon.name"
          class="flex flex-col items-center gap-1"
        >
          <div class="p-3 rounded-md bg-(--ui-bg-elevated)">
            <UIcon :name="icon.name" class="size-5" />
          </div>
          <span class="text-[10px] text-(--ui-text-muted)">{{
            icon.label
          }}</span>
        </div>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Sizes"
      description="Icons scaled to different sizes via utility classes."
    >
      <div class="flex items-end gap-6">
        <div
          v-for="size in sizes"
          :key="size.class"
          class="flex flex-col items-center gap-1"
        >
          <UIcon name="i-lucide-star" :class="size.class" />
          <span class="text-[10px] text-(--ui-text-muted)">{{
            size.label
          }}</span>
        </div>
      </div>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Colored Icons"
      description="Icons inheriting text color from parent."
    >
      <div class="flex flex-wrap gap-4">
        <UIcon name="i-lucide-heart" class="size-6 text-red-500" />
        <UIcon name="i-lucide-shield-check" class="size-6 text-green-500" />
        <UIcon name="i-lucide-alert-triangle" class="size-6 text-yellow-500" />
        <UIcon name="i-lucide-info" class="size-6 text-blue-500" />
        <UIcon name="i-lucide-zap" class="size-6 text-purple-500" />
      </div>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const commonIcons = [
  { name: "i-lucide-home", label: "home" },
  { name: "i-lucide-search", label: "search" },
  { name: "i-lucide-settings", label: "settings" },
  { name: "i-lucide-user", label: "user" },
  { name: "i-lucide-bell", label: "bell" },
  { name: "i-lucide-mail", label: "mail" },
  { name: "i-lucide-calendar", label: "calendar" },
  { name: "i-lucide-file", label: "file" },
  { name: "i-lucide-trash", label: "trash" },
  { name: "i-lucide-edit", label: "edit" },
  { name: "i-lucide-check", label: "check" },
  { name: "i-lucide-x", label: "close" },
];

const sizes = [
  { class: "size-3", label: "12px" },
  { class: "size-4", label: "16px" },
  { class: "size-5", label: "20px" },
  { class: "size-6", label: "24px" },
  { class: "size-8", label: "32px" },
  { class: "size-10", label: "40px" },
];
</script>
