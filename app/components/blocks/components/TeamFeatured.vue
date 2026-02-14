<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Decorative geometric rings -->
    <div
      class="pointer-events-none absolute -top-20 -right-20 size-80 rounded-full border border-(--ui-primary)/10"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-10 -left-10 size-60 rounded-full border border-(--ui-secondary)/8"
      aria-hidden="true"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div class="team-stagger">
          <p
            class="text-sm font-semibold tracking-wide uppercase bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent mb-3"
          >
            Leadership
          </p>
          <h2
            class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-(--ui-text-highlighted) leading-[1.1] mb-6"
          >
            Built by designers<br >and engineers
          </h2>
          <p class="text-lg text-(--ui-text-muted) leading-relaxed mb-8">
            Our founders spent a decade building design tools at companies like
            Google, Figma, and Vercel. They started ThemeBuilder to solve a
            problem they faced every day.
          </p>

          <div class="space-y-4">
            <div
              class="group flex items-start gap-4 p-4 -mx-4 rounded-xl transition-colors duration-200 hover:bg-(--ui-bg-elevated)/60"
            >
              <UAvatar
                text="SC"
                size="xl"
                color="primary"
                class="shrink-0 ring-2 ring-(--ui-primary)/20"
              />
              <div>
                <h3 class="font-semibold text-(--ui-text-highlighted)">
                  Sarah Chen
                </h3>
                <UBadge
                  label="CEO & Co-founder"
                  variant="subtle"
                  color="primary"
                  size="xs"
                  class="mb-2"
                />
                <p class="text-sm text-(--ui-text-muted) leading-relaxed">
                  Former design lead at Google. Passionate about making design
                  accessible to everyone through open-source tooling.
                </p>
              </div>
            </div>
            <div
              class="group flex items-start gap-4 p-4 -mx-4 rounded-xl transition-colors duration-200 hover:bg-(--ui-bg-elevated)/60"
            >
              <UAvatar
                text="MR"
                size="xl"
                color="primary"
                class="shrink-0 ring-2 ring-(--ui-secondary)/20"
              />
              <div>
                <h3 class="font-semibold text-(--ui-text-highlighted)">
                  Marcus Rivera
                </h3>
                <UBadge
                  label="CTO & Co-founder"
                  variant="subtle"
                  color="neutral"
                  size="xs"
                  class="mb-2"
                />
                <p class="text-sm text-(--ui-text-muted) leading-relaxed">
                  Full-stack architect with 15 years building developer tools.
                  Believes great DX starts with great design tokens.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Visual showcase card -->
        <div class="team-stagger [animation-delay:200ms] relative">
          <div
            class="rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg-elevated) overflow-hidden shadow-2xl"
          >
            <div
              class="bg-gradient-to-br from-(--ui-primary)/10 via-transparent to-(--ui-secondary)/10 p-8 sm:p-12 flex flex-col items-center justify-center aspect-square"
            >
              <div class="mb-6 flex -space-x-3">
                <UAvatar
                  text="SC"
                  size="2xl"
                  color="primary"
                  class="ring-4 ring-(--ui-bg-elevated)"
                />
                <UAvatar
                  text="MR"
                  size="2xl"
                  color="primary"
                  class="ring-4 ring-(--ui-bg-elevated)"
                />
              </div>
              <p class="text-sm font-semibold text-(--ui-primary) mb-1">
                Est. 2024
              </p>
              <p
                class="text-2xl font-bold text-(--ui-text-highlighted) text-center"
              >
                Bridging design<br >and code
              </p>
              <div class="flex gap-2 mt-6">
                <UBadge
                  label="Design Systems"
                  variant="subtle"
                  color="primary"
                />
                <UBadge label="Open Source" variant="subtle" color="neutral" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-stagger {
  animation: teamFadeUp 0.7s ease-out both;
}

@keyframes teamFadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .team-stagger {
    animation: none;
  }
}
</style>
