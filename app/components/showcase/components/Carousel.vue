<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Carousel"
      description="Horizontal sliding carousel of content items."
      :prop-hints="['items']"
    >
      <UCarousel :items="items" class="w-full max-w-md">
        <template #default="{ item }">
          <div
            class="flex items-center justify-center h-48 rounded-lg bg-(--ui-bg-elevated) border border-(--ui-border)"
          >
            <div class="text-center">
              <UIcon :name="item.icon" class="size-8 mb-2" />
              <p class="text-sm font-medium">{{ item.label }}</p>
            </div>
          </div>
        </template>
      </UCarousel>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Arrows"
      description="Carousel with previous/next navigation buttons."
      :prop-hints="['arrows']"
    >
      <UCarousel :items="items" arrows class="w-full max-w-md">
        <template #default="{ item }">
          <div
            class="flex items-center justify-center h-48 rounded-lg bg-(--ui-bg-elevated) border border-(--ui-border)"
          >
            <div class="text-center">
              <UIcon :name="item.icon" class="size-8 mb-2" />
              <p class="text-sm font-medium">{{ item.label }}</p>
            </div>
          </div>
        </template>
      </UCarousel>
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Dots"
      description="Carousel with dot indicators for pagination."
      :prop-hints="['dots']"
    >
      <UCarousel :items="items" dots class="w-full max-w-md">
        <template #default="{ item }">
          <div
            class="flex items-center justify-center h-48 rounded-lg bg-(--ui-bg-elevated) border border-(--ui-border)"
          >
            <div class="text-center">
              <UIcon :name="item.icon" class="size-8 mb-2" />
              <p class="text-sm font-medium">{{ item.label }}</p>
            </div>
          </div>
        </template>
      </UCarousel>
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const items = [
  { icon: "i-lucide-image", label: "Photo Gallery" },
  { icon: "i-lucide-video", label: "Video Player" },
  { icon: "i-lucide-music", label: "Audio Stream" },
  { icon: "i-lucide-file-text", label: "Documents" },
  { icon: "i-lucide-presentation", label: "Slides" },
];
</script>
