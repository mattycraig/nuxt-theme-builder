<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 gap-8">
        <div class="overflow-hidden rounded-xl border border-(--ui-border)">
          <img
            src="https://picsum.photos/seed/product-detail/600/600"
            alt="Pro Design System"
            class="w-full aspect-square object-cover"
            loading="lazy"
          >
        </div>
        <div class="flex flex-col justify-center">
          <UBadge label="Best Seller" color="primary" class="w-fit mb-3" />
          <h2
            class="text-2xl sm:text-3xl font-bold text-(--ui-text-highlighted) mb-2"
          >
            Pro Design System
          </h2>
          <p class="text-3xl font-bold text-(--ui-primary) mb-4">$79</p>
          <p class="text-(--ui-text-muted) leading-relaxed mb-6">
            A comprehensive design system with 50+ themed components, Figma
            file, and production-ready Nuxt UI configuration. Perfect for SaaS
            and dashboard projects.
          </p>
          <ul class="space-y-2 mb-8">
            <li
              v-for="feat in [
                '50+ themed components',
                'Figma design file',
                'Dark mode included',
                'Free updates',
              ]"
              :key="feat"
              class="flex items-center gap-2 text-sm text-(--ui-text-muted)"
            >
              <UIcon
                name="i-lucide-check"
                class="size-4 text-(--ui-primary)"
                aria-hidden="true"
              />
              {{ feat }}
            </li>
          </ul>
          <div class="flex items-center gap-3">
            <UButton
              label="Add to Cart"
              icon="i-lucide-shopping-cart"
              color="primary"
              size="lg"
            />
            <UButton label="Preview" variant="outline" size="lg" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
