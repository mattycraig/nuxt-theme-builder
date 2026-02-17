<script setup lang="ts">
const images = [
  {
    src: "https://picsum.photos/seed/min1/900/600",
    alt: "Serene coastal landscape",
    title: "Stillness",
    caption: "The quieter you become, the more you can hear.",
  },
  {
    src: "https://picsum.photos/seed/min2/900/600",
    alt: "Architectural concrete form",
    title: "Form",
    caption: "Structure, stripped to its essence.",
  },
  {
    src: "https://picsum.photos/seed/min3/900/600",
    alt: "Single leaf on white surface",
    title: "Solitude",
    caption: "Beauty in isolation.",
  },
  {
    src: "https://picsum.photos/seed/min4/900/600",
    alt: "Shadow patterns on wall",
    title: "Passage",
    caption: "Light writes its own story on the wall.",
  },
];
</script>

<template>
  <section class="py-20 sm:py-32">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header — ultra-minimal -->
      <div class="mb-20">
        <h2
          class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-(--ui-text-highlighted) leading-[1.1]"
        >
          Gallery
        </h2>
      </div>

      <!-- Editorial image list -->
      <div class="space-y-16 sm:space-y-24">
        <article
          v-for="(img, i) in images"
          :key="img.src"
          class="minimal-entrance group"
          :style="{ animationDelay: `${i * 120}ms` }"
        >
          <div class="overflow-hidden rounded-2xl">
            <img
              :src="img.src"
              :alt="img.alt"
              class="w-full h-56 sm:h-80 lg:h-[26rem] object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
              loading="lazy"
              width="800"
              height="600"
            >
          </div>
          <div class="mt-5 sm:mt-6 flex items-baseline justify-between gap-4">
            <div>
              <h3
                class="text-lg sm:text-xl font-bold text-(--ui-text-highlighted) tracking-tight"
              >
                {{ img.title }}
              </h3>
              <p
                class="mt-1 text-sm sm:text-base text-(--ui-text-muted) leading-relaxed max-w-lg"
              >
                {{ img.caption }}
              </p>
            </div>
            <span
              class="text-xs text-(--ui-text-dimmed) font-mono shrink-0 tabular-nums"
            >
              {{ String(i + 1).padStart(2, "0") }}
            </span>
          </div>
          <!-- Thin separator -->
          <div
            v-if="i < images.length - 1"
            class="mt-10 sm:mt-14 border-t border-(--ui-border)/40"
            aria-hidden="true"
          />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.minimal-entrance {
  animation: minimalFadeIn 0.9s ease-out both;
}

@keyframes minimalFadeIn {
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
  .minimal-entrance {
    animation: none;
  }
}
</style>
