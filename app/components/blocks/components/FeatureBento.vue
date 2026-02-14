<script setup lang="ts">
interface BentoFeature {
  icon: string;
  title: string;
  description: string;
  area: string;
  bullets?: string[];
  tags?: string[];
}

const features: BentoFeature[] = [
  {
    icon: "i-lucide-palette",
    title: "Visual Theme Editor",
    description:
      "Fine-tune every detail of your design system with an intuitive visual editor. See changes reflected instantly across real component pages.",
    area: "dash",
    bullets: [
      "Semantic color palettes with per-role shade control",
      "Independent light & dark mode configurations",
      "Typography, radius, and spacing tokens",
    ],
  },
  {
    icon: "i-lucide-monitor",
    title: "Live Preview",
    description:
      "Every edit renders instantly in a sandboxed iframe with real Nuxt UI components — no refresh needed.",
    area: "ai",
  },
  {
    icon: "i-lucide-download",
    title: "One-Click Export",
    description:
      "Export your theme as app.config.ts, CSS variables, or JSON — ready to drop into any Nuxt UI project.",
    area: "git",
  },
  {
    icon: "i-lucide-sparkles",
    title: "AI-Powered Generation",
    description:
      "Describe the mood you want — professional, playful, bold — and let AI generate a complete theme for you. Supports OpenAI, Anthropic, and Google models with your own API key.",
    area: "i18n",
    bullets: [
      "Natural language prompts for theme creation",
      "Multi-provider support (BYOK)",
      "Refine results with follow-up instructions",
      "Full schema validation before applying",
    ],
  },
  {
    icon: "i-lucide-layers",
    title: "Presets & History",
    description:
      "Start from curated presets or save your own. Full undo/redo history means you never lose a design iteration.",
    area: "plug",
    tags: ["Ocean", "Forest", "Sunset", "Slate", "Custom…"],
  },
];

const areaMap: Record<string, string> = {
  dash: "bento-dash",
  ai: "bento-ai",
  git: "bento-git",
  i18n: "bento-i18n",
  plug: "bento-plug",
};

const heroAreas = new Set(["dash", "i18n"]);
</script>

<template>
  <section class="relative isolate overflow-hidden py-16 sm:py-24">
    <!-- Dot grid background texture -->
    <div
      class="absolute inset-0 feat-bento-dots opacity-[0.03]"
      aria-hidden="true"
    />

    <!-- Dual glow spots -->
    <div
      class="pointer-events-none absolute top-1/4 left-1/3 size-[28rem] rounded-full bg-(--ui-primary)/6 blur-[120px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute bottom-1/4 right-1/4 size-[20rem] rounded-full bg-(--ui-secondary)/5 blur-[100px]"
      aria-hidden="true"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <UBadge
          label="Platform"
          color="primary"
          variant="subtle"
          size="sm"
          class="mb-4"
        />
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
        >
          A feature for every need
        </h2>
      </div>

      <!-- Bento grid with named areas for true asymmetry -->
      <div class="bento-grid">
        <div
          v-for="(feature, i) in features"
          :key="feature.title"
          class="feat-bento-card group relative rounded-2xl border border-(--ui-border)/50 bg-(--ui-bg)/60 backdrop-blur-xl transition-all duration-300 hover:border-(--ui-primary)/30 hover:shadow-xl hover:shadow-(--ui-primary)/5"
          :class="heroAreas.has(feature.area) ? 'p-7' : 'p-6'"
          :style="{
            gridArea: areaMap[feature.area],
            animationDelay: `${i * 80}ms`,
          }"
        >
          <!-- Gradient shimmer on hero cards -->
          <div
            v-if="heroAreas.has(feature.area)"
            class="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-(--ui-primary)/4 via-transparent to-(--ui-secondary)/3 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />

          <div
            class="relative"
            :class="
              heroAreas.has(feature.area)
                ? 'space-y-4'
                : 'flex items-start gap-4'
            "
          >
            <div
              class="shrink-0 flex items-center justify-center rounded-xl transition-all duration-300"
              :class="
                heroAreas.has(feature.area)
                  ? 'size-14 bg-gradient-to-br from-(--ui-primary)/20 to-(--ui-primary)/5 ring-1 ring-(--ui-primary)/20 group-hover:ring-(--ui-primary)/40 group-hover:shadow-lg group-hover:shadow-(--ui-primary)/10'
                  : 'size-11 bg-(--ui-bg-elevated) ring-1 ring-(--ui-border) group-hover:ring-(--ui-primary)/30'
              "
            >
              <UIcon
                :name="feature.icon"
                :class="heroAreas.has(feature.area) ? 'size-6' : 'size-5'"
                class="text-(--ui-primary)"
                aria-hidden="true"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h3
                class="font-semibold text-(--ui-text-highlighted) mb-1.5"
                :class="heroAreas.has(feature.area) ? 'text-lg' : 'text-base'"
              >
                {{ feature.title }}
              </h3>
              <p class="text-sm text-(--ui-text-muted) leading-relaxed">
                {{ feature.description }}
              </p>

              <!-- Bullet sub-features for hero-sized cards -->
              <ul v-if="feature.bullets" class="mt-3 space-y-1.5" role="list">
                <li
                  v-for="bullet in feature.bullets"
                  :key="bullet"
                  class="flex items-start gap-2 text-sm text-(--ui-text-muted)"
                >
                  <UIcon
                    name="i-lucide-check"
                    class="size-4 shrink-0 mt-0.5 text-(--ui-primary)/70"
                    aria-hidden="true"
                  />
                  <span>{{ bullet }}</span>
                </li>
              </ul>

              <!-- Preset tags for the wide card -->
              <div v-if="feature.tags" class="mt-3 flex flex-wrap gap-2">
                <UBadge
                  v-for="tag in feature.tags"
                  :key="tag"
                  :label="tag"
                  variant="subtle"
                  color="neutral"
                  size="sm"
                  class="transition-all duration-200 hover:ring-1 hover:ring-(--ui-primary)/30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feat-bento-dots {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 20px 20px;
}

/*
  Bento named-area grid:
  Desktop (lg):
    ┌──────────┬──────┬──────┐
    │  dash    │  ai  │ i18n │
    │  dash    │  git │ i18n │
    ├──────────┴──────┼──────┤
    │      plug       │ i18n │
    └─────────────────┴──────┘
*/
.bento-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  grid-template-areas:
    "bento-dash"
    "bento-ai"
    "bento-git"
    "bento-i18n"
    "bento-plug";
}

@media (min-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "bento-dash bento-ai"
      "bento-dash bento-git"
      "bento-i18n bento-plug";
  }
}

@media (min-width: 1024px) {
  .bento-grid {
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "bento-dash bento-ai  bento-i18n"
      "bento-dash bento-git bento-i18n"
      "bento-plug bento-plug bento-i18n";
    gap: 1.25rem;
  }
}

.feat-bento-card {
  animation: featBentoUp 0.6s ease-out both;
}

@keyframes featBentoUp {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .feat-bento-card {
    animation: none;
  }
}
</style>
