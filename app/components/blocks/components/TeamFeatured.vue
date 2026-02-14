<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p class="text-sm font-semibold text-(--ui-primary) mb-2">
            Leadership
          </p>
          <h2
            class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-6"
          >
            Built by designers and engineers
          </h2>
          <p class="text-lg text-(--ui-text-muted) leading-relaxed mb-6">
            Our founders spent a decade building design tools at companies like
            Google, Figma, and Vercel. They started ThemeBuilder to solve a
            problem they faced every day: bridging design and code.
          </p>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-3">
              <UAvatar text="SC" size="lg" color="primary" />
              <div>
                <p class="font-semibold text-(--ui-text-highlighted)">
                  Sarah Chen
                </p>
                <p class="text-sm text-(--ui-text-muted)">CEO & Co-founder</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <UAvatar text="MR" size="lg" color="primary" />
              <div>
                <p class="font-semibold text-(--ui-text-highlighted)">
                  Marcus Rivera
                </p>
                <p class="text-sm text-(--ui-text-muted)">CTO & Co-founder</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-(--ui-bg-elevated) rounded-xl aspect-square flex items-center justify-center border border-(--ui-border)"
        >
          <UIcon
            name="i-lucide-users"
            class="size-20 text-(--ui-text-muted) opacity-30"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </section>
</template>
