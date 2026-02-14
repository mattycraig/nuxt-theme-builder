<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <UBadge label="Featured" color="primary" class="mb-4" />
          <h2
            class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
          >
            Enterprise Theme Kit
          </h2>
          <p class="text-lg text-(--ui-text-muted) leading-relaxed mb-6">
            Everything you need to build a production-grade application.
            Includes 100+ components, 12 page templates, and a comprehensive
            design system with Figma and code assets.
          </p>
          <div class="flex items-center gap-4 mb-8">
            <span class="text-4xl font-bold text-(--ui-primary)">$199</span>
            <span class="text-lg text-(--ui-text-muted) line-through"
              >$349</span
            >
            <UBadge label="43% off" color="primary" variant="subtle" />
          </div>
          <UButton
            label="Buy Now"
            icon="i-lucide-shopping-cart"
            color="primary"
            size="lg"
          />
        </div>
        <div class="overflow-hidden rounded-xl border border-(--ui-border)">
          <img
            src="https://picsum.photos/seed/featured-product/800/600"
            alt="Enterprise Theme Kit"
            class="w-full h-auto object-cover"
            loading="lazy"
          >
        </div>
      </div>
    </div>
  </section>
</template>
