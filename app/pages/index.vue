<script setup lang="ts">
import { MSG } from "~/utils/iframeProtocol";
import { isInIframe } from "~/utils/helpers";

definePageMeta({ layout: "preview" });

const store = useThemeStore();
const inIframe = isInIframe();

function handleRandomTheme() {
  if (inIframe) {
    window.parent.postMessage({ type: MSG.RANDOMIZE_THEME }, window.location.origin);
  } else {
    store.randomizeTheme();
  }
}

const aiCapabilities = [
  {
    title: "Natural Language Input",
    icon: "i-lucide-message-square",
    description:
      "Type \u201Cwarm SaaS dashboard\u201D or \u201Cneon cyberpunk\u201D \u2014 the AI understands design intent.",
  },
  {
    title: "Complete Theme Output",
    icon: "i-lucide-palette",
    description:
      "Colors, shades, radius, fonts \u2014 every token generated in a single pass.",
  },
  {
    title: "Full Manual Control",
    icon: "i-lucide-sliders-horizontal",
    description:
      "AI gives you the starting point. You refine every detail until it\u2019s perfect.",
  },
];

const painPoints = [
  {
    icon: "i-lucide-clock",
    text: "Hours lost copy-pasting config snippets between files",
  },
  {
    icon: "i-lucide-eye-off",
    text: "Toggling dark mode just to spot visual mismatches",
  },
  {
    icon: "i-lucide-help-circle",
    text: "Guessing which shade of blue \u201Clooks right\u201D on a button",
  },
  {
    icon: "i-lucide-refresh-cw",
    text: "Full rebuilds just to preview a single color change",
  },
];

const solutionPoints = [
  {
    icon: "i-lucide-eye",
    text: "Instant preview across 125+ real components in both modes",
  },
  {
    icon: "i-lucide-sun-moon",
    text: "Independent light & dark mode tokens, side by side",
  },
  {
    icon: "i-lucide-download",
    text: "Export-ready configs in three formats \u2014 or import your own",
  },
  {
    icon: "i-lucide-sparkles",
    text: "AI generation to jumpstart any design direction",
  },
];

const features = [
  {
    title: "Semantic Color System",
    icon: "i-lucide-palette",
    description:
      "Six semantic roles \u2014 primary, secondary, success, warning, error, info \u2014 each with 11 computed shades from a single base.",
  },
  {
    title: "Per-Shade Precision",
    icon: "i-lucide-sliders-horizontal",
    description:
      "Override individual shade stops for pixel-perfect control, independently configurable per light and dark mode.",
  },
  {
    title: "Live Component Preview",
    icon: "i-lucide-layout-grid",
    description:
      "See your theme rendered across buttons, modals, tables, and cards \u2014 instantly, in both color modes.",
  },
  {
    title: "AI Theme Generation",
    icon: "i-lucide-sparkles",
    description:
      "Describe your vision in plain English. AI produces a complete, valid theme config you can fine-tune.",
  },
  {
    title: "One-Click Export",
    icon: "i-lucide-download",
    description:
      "Export as app.config.ts, CSS custom properties, or JSON. Import existing configs to continue where you left off.",
  },
  {
    title: "Presets & History",
    icon: "i-lucide-history",
    description:
      "Built-in preset library to get started fast. Full undo/redo history. Save unlimited custom presets.",
  },
];

const steps = [
  {
    number: "01",
    title: "Pick & Customize",
    icon: "i-lucide-mouse-pointer-click",
    description:
      "Choose a preset or start from scratch. Adjust colors, radius, and fonts with visual controls.",
  },
  {
    number: "02",
    title: "Preview Live",
    icon: "i-lucide-eye",
    description:
      "Watch your theme render across real Nuxt UI components, blocks, and full-page templates.",
  },
  {
    number: "03",
    title: "Export & Ship",
    icon: "i-lucide-rocket",
    description:
      "Export a production-ready config file. Paste it into your project and you\u2019re done.",
  },
];

const exploreSections = [
  {
    title: "Components",
    icon: "i-lucide-layout-grid",
    to: "/components",
    description:
      "Buttons, inputs, modals, tables, cards \u2014 every Nuxt UI component themed live.",
    count: "50+",
  },
  {
    title: "Blocks",
    icon: "i-lucide-layers",
    to: "/blocks",
    description:
      "Heroes, feature grids, pricing, CTAs, footers \u2014 pre-composed sections ready to preview.",
    count: "90+",
  },
  {
    title: "Templates",
    icon: "i-lucide-file-text",
    to: "/templates",
    description:
      "Full-page layouts \u2014 dashboards, landing pages, SaaS shells, marketing sites.",
    count: "5+",
  },
];

const exportFormats = [
  {
    format: "app.config.ts",
    icon: "i-lucide-file-code",
    description: "Drop-in Nuxt configuration file. Paste and go.",
    badge: "Recommended",
  },
  {
    format: "CSS Variables",
    icon: "i-lucide-paintbrush",
    description: "Standard custom properties. Works with any framework.",
    badge: "Universal",
  },
  {
    format: "JSON",
    icon: "i-lucide-braces",
    description: "Raw token data for tooling, pipelines, or storage.",
    badge: "Flexible",
  },
];

interface TechItem {
  name: string;
  icon: string;
  url: string;
}

const techStack: TechItem[] = [
  { name: "Nuxt", icon: "i-simple-icons-nuxtdotjs", url: "https://nuxt.com" },
  { name: "Vue", icon: "i-simple-icons-vuedotjs", url: "https://vuejs.org" },
  {
    name: "Tailwind CSS",
    icon: "i-simple-icons-tailwindcss",
    url: "https://tailwindcss.com",
  },
  {
    name: "TypeScript",
    icon: "i-simple-icons-typescript",
    url: "https://typescriptlang.org",
  },
  {
    name: "Pinia",
    icon: "i-simple-icons-pinia",
    url: "https://pinia.vuejs.org",
  },
  {
    name: "Nuxt UI",
    icon: "i-simple-icons-nuxtdotjs",
    url: "https://ui.nuxt.com",
  },
];
</script>

<template>
  <div class="min-h-screen overflow-hidden">
    <!-- ============================================ -->
    <!-- SECTION 1: Atmospheric Hero (punchy copy)    -->
    <!-- ============================================ -->
    <section class="relative isolate py-24 sm:py-36 px-6">
      <div
        class="pointer-events-none absolute inset-0 home-grid-lines opacity-[0.03]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[44rem] rounded-full bg-(--ui-primary)/12 blur-[120px]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute -bottom-24 -right-24 size-[28rem] rounded-full bg-(--ui-secondary)/8 blur-[100px]"
        aria-hidden="true"
      />

      <div class="relative max-w-4xl mx-auto text-center">
        <div class="mb-6 hero-stagger">
          <SharedAppLogo size="lg" :linked="false" class="mx-auto" />
        </div>

        <div class="mb-8 inline-flex relative hero-stagger [animation-delay:50ms]">
          <span
            class="absolute inset-0 -m-1 rounded-full bg-(--ui-primary)/20 blur-md home-glow-pulse"
            aria-hidden="true"
          />
          <UBadge
            label="Open Source · Free Forever"
            color="primary"
            variant="subtle"
            size="lg"
            class="relative"
          />
        </div>

        <h1
          class="hero-stagger [animation-delay:100ms] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]"
        >
          <span class="text-(--ui-text-highlighted)"
            >The visual theme editor</span
          >
          <br >
          <span
            class="bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
          >
            for Nuxt UI.
          </span>
        </h1>

        <p
          class="hero-stagger [animation-delay:200ms] text-lg sm:text-xl text-(--ui-text-muted) max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Pick colors. Tweak tokens. Preview live. Export and&nbsp;go.
        </p>

        <div
          class="hero-stagger [animation-delay:300ms] flex flex-wrap items-center justify-center gap-4"
        >
          <UButton
            label="Explore"
            to="/components"
            icon="i-lucide-layout-grid"
            size="xl"
            color="primary"
          />
          <UButton
            label="Try AI Generation"
            to="/ai"
            icon="i-lucide-sparkles"
            size="xl"
            variant="outline"
            color="neutral"
          />
          <UButton
            label="Random Theme"
            icon="i-lucide-dices"
            size="xl"
            variant="ghost"
            color="neutral"
            @click="handleRandomTheme()"
          />
        </div>

        <p
          class="hero-stagger [animation-delay:400ms] text-sm text-(--ui-text-muted) mt-6"
        >
          Or use the
          <UIcon name="i-lucide-sliders-horizontal" class="size-4 inline-block align-middle mx-1" aria-hidden="true" />
          <strong>theme editor sidebar</strong>
          to customize every detail.
        </p>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION 2: Problem → Solution (deeper)       -->
    <!-- ============================================ -->
    <section class="relative isolate py-20 sm:py-28 px-6">
      <div
        class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[36rem] rounded-full bg-(--ui-primary)/5 blur-[120px]"
        aria-hidden="true"
      />

      <div class="relative max-w-5xl mx-auto">
        <div class="text-center mb-14">
          <UBadge
            label="The Problem"
            color="neutral"
            variant="subtle"
            size="sm"
            class="mb-4"
          />
          <h2
            class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-3"
          >
            Theming shouldn't feel like a chore
          </h2>
          <p class="text-lg text-(--ui-text-muted) max-w-2xl mx-auto">
            Nuxt UI is powerful &mdash; but configuring design tokens by hand is
            tedious, error-prone, and&nbsp;time-consuming.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Without Theme Builder -->
          <div
            class="home-card-slide rounded-2xl border border-(--ui-border)/60 bg-(--ui-bg) p-7"
          >
            <div class="flex items-center gap-3 mb-6">
              <div
                class="size-11 rounded-xl bg-(--ui-text-muted)/10 flex items-center justify-center"
              >
                <UIcon
                  name="i-lucide-frown"
                  class="size-5 text-(--ui-text-muted)"
                  aria-hidden="true"
                />
              </div>
              <h3 class="text-lg font-semibold text-(--ui-text-highlighted)">
                Without Theme Builder
              </h3>
            </div>
            <ul class="space-y-4" role="list">
              <li
                v-for="point in painPoints"
                :key="point.text"
                class="flex items-start gap-3"
              >
                <div
                  class="mt-0.5 shrink-0 size-8 rounded-lg bg-(--ui-text-muted)/8 flex items-center justify-center"
                >
                  <UIcon
                    :name="point.icon"
                    class="size-4 text-(--ui-text-muted)"
                    aria-hidden="true"
                  />
                </div>
                <span
                  class="text-sm text-(--ui-text-muted) leading-relaxed pt-1"
                >
                  {{ point.text }}
                </span>
              </li>
            </ul>
          </div>

          <!-- With Theme Builder -->
          <div
            class="home-card-slide [animation-delay:120ms] rounded-2xl border border-(--ui-primary)/20 bg-(--ui-bg) p-7 transition-all duration-300 hover:border-(--ui-primary)/40 hover:shadow-lg hover:shadow-(--ui-primary)/5"
          >
            <div class="flex items-center gap-3 mb-6">
              <div
                class="size-11 rounded-xl bg-(--ui-primary)/10 flex items-center justify-center ring-1 ring-(--ui-primary)/20"
              >
                <UIcon
                  name="i-lucide-smile"
                  class="size-5 text-(--ui-primary)"
                  aria-hidden="true"
                />
              </div>
              <h3 class="text-lg font-semibold text-(--ui-text-highlighted)">
                With Theme Builder
              </h3>
            </div>
            <ul class="space-y-4" role="list">
              <li
                v-for="point in solutionPoints"
                :key="point.text"
                class="flex items-start gap-3"
              >
                <div
                  class="mt-0.5 shrink-0 size-8 rounded-lg bg-(--ui-primary)/10 flex items-center justify-center"
                >
                  <UIcon
                    :name="point.icon"
                    class="size-4 text-(--ui-primary)"
                    aria-hidden="true"
                  />
                </div>
                <span
                  class="text-sm text-(--ui-text-muted) leading-relaxed pt-1"
                >
                  {{ point.text }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION 3: Features (clean 3-col grid)       -->
    <!-- ============================================ -->
    <section class="relative isolate py-20 sm:py-28 px-6">
      <div
        class="absolute inset-0 home-dot-grid opacity-[0.03]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute top-1/4 left-1/3 size-[28rem] rounded-full bg-(--ui-primary)/6 blur-[120px]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute bottom-1/4 right-1/4 size-[20rem] rounded-full bg-(--ui-secondary)/5 blur-[100px]"
        aria-hidden="true"
      />

      <div class="relative max-w-6xl mx-auto">
        <div class="text-center mb-14">
          <UBadge
            label="Features"
            color="primary"
            variant="subtle"
            size="sm"
            class="mb-4"
          />
          <h2
            class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
          >
            Everything your theme needs
          </h2>
          <p class="text-lg text-(--ui-text-muted) max-w-xl mx-auto">
            A focused toolkit covering the full journey &mdash; from first idea
            to shipped&nbsp;config.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(feature, i) in features"
            :key="feature.title"
            class="home-card-enter group relative rounded-2xl border border-(--ui-border)/50 bg-(--ui-bg)/60 backdrop-blur-xl p-6 transition-all duration-300 hover:border-(--ui-primary)/30 hover:shadow-xl hover:shadow-(--ui-primary)/5"
            :style="{ animationDelay: `${i * 80}ms` }"
          >
            <div
              class="pointer-events-none absolute -inset-1 rounded-2xl bg-(--ui-primary)/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
              aria-hidden="true"
            />
            <div class="relative">
              <div
                class="mb-4 size-12 rounded-xl bg-gradient-to-br from-(--ui-primary)/15 to-(--ui-primary)/5 ring-1 ring-(--ui-primary)/15 flex items-center justify-center transition-all duration-300 group-hover:ring-(--ui-primary)/30 group-hover:shadow-md group-hover:shadow-(--ui-primary)/10"
              >
                <UIcon
                  :name="feature.icon"
                  class="size-5 text-(--ui-primary)"
                  aria-hidden="true"
                />
              </div>
              <h3
                class="text-base font-semibold text-(--ui-text-highlighted) mb-2"
              >
                {{ feature.title }}
              </h3>
              <p class="text-sm text-(--ui-text-muted) leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION 4: AI Showcase (hero-level impact)   -->
    <!-- ============================================ -->
    <section class="relative isolate py-24 sm:py-36 px-6">
      <div
        class="pointer-events-none absolute inset-0 home-dot-grid opacity-[0.04]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 size-[36rem] rounded-full bg-(--ui-primary)/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute bottom-0 right-1/4 size-[28rem] rounded-full bg-(--ui-secondary)/8 blur-[100px]"
        aria-hidden="true"
      />

      <div class="relative max-w-5xl mx-auto">
        <div class="text-center mb-14">
          <div class="inline-flex relative mb-6 hero-stagger">
            <span
              class="absolute inset-0 -m-1 rounded-full bg-(--ui-primary)/20 blur-md home-glow-pulse"
              aria-hidden="true"
            />
            <UBadge
              label="AI-Powered"
              color="primary"
              variant="subtle"
              size="lg"
              class="relative"
            />
          </div>

          <h2
            class="hero-stagger [animation-delay:100ms] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5"
          >
            <span
              class="bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
            >
              AI builds your theme.
            </span>
            <br >
            <span class="text-(--ui-text-highlighted)">You make it yours.</span>
          </h2>

          <p
            class="hero-stagger [animation-delay:200ms] text-lg text-(--ui-text-muted) max-w-xl mx-auto leading-relaxed"
          >
            Describe any vibe. Get a complete, production-ready theme
            in&nbsp;seconds.
          </p>
        </div>

        <div class="grid sm:grid-cols-3 gap-6 mb-12">
          <div
            v-for="(item, i) in aiCapabilities"
            :key="item.title"
            class="home-ai-card group relative rounded-2xl border border-(--ui-border)/50 bg-(--ui-bg)/60 backdrop-blur-xl p-6 transition-all duration-300 hover:border-(--ui-primary)/30 hover:shadow-xl hover:shadow-(--ui-primary)/5"
            :style="{ animationDelay: `${i * 120}ms` }"
          >
            <div
              class="pointer-events-none absolute -inset-1 rounded-2xl bg-(--ui-primary)/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
              aria-hidden="true"
            />
            <div class="relative">
              <div
                class="mb-4 size-12 rounded-xl bg-gradient-to-br from-(--ui-primary)/20 to-(--ui-primary)/5 ring-1 ring-(--ui-primary)/20 flex items-center justify-center transition-all duration-300 group-hover:ring-(--ui-primary)/40 group-hover:shadow-lg group-hover:shadow-(--ui-primary)/10"
              >
                <UIcon
                  :name="item.icon"
                  class="size-6 text-(--ui-primary)"
                  aria-hidden="true"
                />
              </div>
              <h3
                class="text-lg font-semibold text-(--ui-text-highlighted) mb-2"
              >
                {{ item.title }}
              </h3>
              <p class="text-sm text-(--ui-text-muted) leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="text-center hero-stagger [animation-delay:400ms]">
          <UButton
            label="Try AI Generation"
            to="/ai"
            icon="i-lucide-sparkles"
            size="xl"
            color="primary"
            class="shadow-lg shadow-(--ui-primary)/20"
          />
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION 5: How It Works (fixed dotted line)  -->
    <!-- ============================================ -->
    <section class="relative isolate py-20 sm:py-28 px-6">
      <div
        class="absolute inset-0 home-dot-grid opacity-[0.04]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[32rem] rounded-full bg-(--ui-primary)/8 blur-[100px]"
        aria-hidden="true"
      />

      <div class="relative max-w-5xl mx-auto">
        <div
          class="mx-auto max-w-2xl rounded-3xl border border-(--ui-border)/50 bg-(--ui-bg)/60 backdrop-blur-xl p-8 sm:p-10 shadow-2xl mb-14 text-center"
        >
          <p
            class="text-sm font-semibold text-(--ui-primary) tracking-wide uppercase mb-2"
          >
            Your Workflow
          </p>
          <h2
            class="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--ui-text-highlighted) leading-[1.15]"
          >
            Three steps to your perfect theme
          </h2>
          <p
            class="mt-3 text-(--ui-text-muted) leading-relaxed max-w-md mx-auto"
          >
            From first click to shipped config &mdash; the whole process
            takes&nbsp;minutes.
          </p>
        </div>

        <div class="relative">
          <!-- Connecting dotted line aligned with orb centers -->
          <div
            class="hidden md:block absolute top-7 left-[calc(100%/6)] right-[calc(100%/6)] border-t-2 border-dashed border-(--ui-primary)/20"
            aria-hidden="true"
          />
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              v-for="(step, i) in steps"
              :key="step.number"
              class="home-glass-stagger relative flex flex-col items-center text-center"
              :style="{ animationDelay: `${i * 140}ms` }"
            >
              <!-- Number orb -->
              <div class="relative z-10 mb-5">
                <div
                  class="size-14 rounded-full border border-(--ui-border)/50 bg-(--ui-bg)/70 backdrop-blur-lg shadow-lg flex items-center justify-center"
                >
                  <span class="text-lg font-extrabold text-(--ui-primary)">
                    {{ step.number }}
                  </span>
                </div>
                <div
                  class="absolute -inset-2 rounded-full bg-(--ui-primary)/10 blur-md -z-10"
                  aria-hidden="true"
                />
              </div>
              <!-- Glass card -->
              <div
                class="w-full rounded-2xl border border-(--ui-border)/40 bg-(--ui-bg)/50 backdrop-blur-lg p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-(--ui-primary)/30"
              >
                <div
                  class="mx-auto mb-4 size-12 rounded-xl bg-(--ui-primary)/10 flex items-center justify-center"
                >
                  <UIcon
                    :name="step.icon"
                    class="size-5 text-(--ui-primary)"
                    aria-hidden="true"
                  />
                </div>
                <h3 class="text-lg font-bold text-(--ui-text-highlighted) mb-2">
                  {{ step.title }}
                </h3>
                <p class="text-sm text-(--ui-text-muted) leading-relaxed">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION 6: Preview & Explore (impactful)      -->
    <!-- ============================================ -->
    <section class="relative isolate py-20 sm:py-28 px-6">
      <div
        class="pointer-events-none absolute top-1/3 -right-24 size-[28rem] rounded-full bg-(--ui-primary)/6 blur-[120px]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute bottom-1/3 -left-24 size-[22rem] rounded-full bg-(--ui-secondary)/5 blur-[100px]"
        aria-hidden="true"
      />

      <div class="relative max-w-5xl mx-auto">
        <div class="text-center mb-14">
          <UBadge
            label="Preview"
            color="primary"
            variant="subtle"
            size="sm"
            class="mb-4"
          />
          <h2
            class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
          >
            See your theme everywhere it&nbsp;matters
          </h2>
          <p class="text-lg text-(--ui-text-muted) max-w-xl mx-auto">
            Every component, block, and template &mdash; rendered live with
            your&nbsp;tokens.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="(section, i) in exploreSections"
            :key="section.title"
            class="home-card-enter group relative rounded-2xl border border-(--ui-border)/50 bg-(--ui-bg)/60 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-(--ui-primary)/30 hover:shadow-xl hover:shadow-(--ui-primary)/5"
            :style="{ animationDelay: `${i * 100}ms` }"
          >
            <!-- Gradient top stripe -->
            <div
              class="h-1 bg-gradient-to-r from-(--ui-primary)/60 via-(--ui-secondary)/40 to-(--ui-primary)/60 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />
            <div
              class="pointer-events-none absolute -inset-1 rounded-2xl bg-(--ui-primary)/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
              aria-hidden="true"
            />

            <div class="relative p-6">
              <div class="flex items-center justify-between mb-4">
                <div
                  class="size-12 rounded-xl bg-gradient-to-br from-(--ui-primary)/15 to-(--ui-primary)/5 flex items-center justify-center ring-1 ring-(--ui-primary)/15 transition-all duration-300 group-hover:ring-(--ui-primary)/30 group-hover:shadow-md group-hover:shadow-(--ui-primary)/10"
                >
                  <UIcon
                    :name="section.icon"
                    class="size-6 text-(--ui-primary)"
                    aria-hidden="true"
                  />
                </div>
                <span
                  class="text-2xl font-extrabold bg-gradient-to-br from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
                >
                  {{ section.count }}
                </span>
              </div>
              <h3
                class="text-lg font-semibold text-(--ui-text-highlighted) mb-2"
              >
                <NuxtLink
                  :to="section.to"
                  class="after:absolute after:inset-0 focus-visible:outline-none"
                >
                  <span
                    class="relative z-10 focus-visible:ring-2 focus-visible:ring-(--ui-primary) focus-visible:outline-none rounded"
                  >
                    {{ section.title }}
                  </span>
                </NuxtLink>
              </h3>
              <p class="text-sm text-(--ui-text-muted) leading-relaxed mb-4">
                {{ section.description }}
              </p>
              <span
                class="text-sm font-medium text-(--ui-primary) flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-1"
              >
                Browse
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-3.5"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION 7: Export & Import (enhanced)          -->
    <!-- ============================================ -->
    <section class="relative isolate py-20 sm:py-28 px-6">
      <div
        class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[32rem] rounded-full bg-(--ui-primary)/5 blur-[120px]"
        aria-hidden="true"
      />

      <div class="relative max-w-4xl mx-auto">
        <div class="text-center mb-14">
          <UBadge
            label="Export & Import"
            color="primary"
            variant="subtle"
            size="sm"
            class="mb-4"
          />
          <h2
            class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
          >
            Your theme. Your format. Your&nbsp;project.
          </h2>
          <p class="text-lg text-(--ui-text-muted) max-w-xl mx-auto">
            Export in one click. Import existing configs to continue where you
            left&nbsp;off.
          </p>
        </div>

        <div class="grid sm:grid-cols-3 gap-6 mb-10">
          <div
            v-for="(fmt, i) in exportFormats"
            :key="fmt.format"
            class="home-card-enter group rounded-2xl border border-(--ui-border)/50 bg-(--ui-bg-elevated)/60 backdrop-blur-sm p-6 text-center transition-all duration-300 hover:border-(--ui-primary)/30 hover:shadow-lg"
            :style="{ animationDelay: `${i * 100}ms` }"
          >
            <div
              class="mx-auto mb-4 size-12 rounded-xl bg-(--ui-primary)/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            >
              <UIcon
                :name="fmt.icon"
                class="size-5 text-(--ui-primary)"
                aria-hidden="true"
              />
            </div>
            <h3
              class="text-base font-semibold text-(--ui-text-highlighted) mb-1"
            >
              {{ fmt.format }}
            </h3>
            <p class="text-sm text-(--ui-text-muted) mb-3">
              {{ fmt.description }}
            </p>
            <UBadge
              :label="fmt.badge"
              variant="subtle"
              color="neutral"
              size="md"
            />
          </div>
        </div>

        <div class="text-center">
          <UButton
            label="Build & Export"
            to="/templates"
            icon="i-lucide-download"
            size="lg"
            color="primary"
            variant="outline"
          />
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION 8: Open Source + Tech Stack (logos)    -->
    <!-- ============================================ -->
    <section class="py-20 sm:py-28 px-6 border-t border-(--ui-border)/50">
      <div class="max-w-4xl mx-auto text-center">
        <div
          class="mx-auto mb-8 w-16 h-px bg-gradient-to-r from-transparent via-[var(--ui-primary)] to-transparent"
          aria-hidden="true"
        />
        <UBadge
          label="Open Source"
          color="primary"
          variant="subtle"
          size="sm"
          class="mb-4"
        />
        <h2
          class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted) mb-4"
        >
          Built with the tools you&nbsp;love
        </h2>
        <p
          class="text-lg text-(--ui-text-muted) max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Community-driven. No accounts. No data leaves your browser. Contribute
          on&nbsp;GitHub.
        </p>

        <!-- Tech stack logos with links -->
        <nav
          class="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-10"
          aria-label="Technology stack"
        >
          <a
            v-for="tech in techStack"
            :key="tech.name"
            :href="tech.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col items-center gap-2.5 p-3 sm:p-4 rounded-xl transition-all duration-300 hover:bg-(--ui-bg-elevated)/80 hover:shadow-md"
            :aria-label="`Visit ${tech.name} website`"
          >
            <div
              class="size-10 sm:size-12 flex items-center justify-center text-(--ui-text-muted) transition-colors duration-300 group-hover:text-(--ui-primary)"
            >
              <UIcon
                :name="tech.icon"
                class="size-8 sm:size-10"
                aria-hidden="true"
              />
            </div>
            <span
              class="text-xs font-medium text-(--ui-text-muted) group-hover:text-(--ui-text-highlighted) transition-colors duration-300"
            >
              {{ tech.name }}
            </span>
          </a>
        </nav>

        <UButton
          label="Star on GitHub"
          icon="i-lucide-github"
          to="https://github.com/mattycraig/nuxt-theme-builder"
          target="_blank"
          size="lg"
          variant="outline"
          color="neutral"
        />
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION 9: Final CTA (atmospheric)            -->
    <!-- ============================================ -->
    <section class="relative isolate overflow-hidden py-24 sm:py-36 px-6">
      <div
        class="pointer-events-none absolute inset-0 home-grid-lines opacity-[0.03]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 size-[40rem] rounded-full bg-(--ui-primary)/12 blur-[120px]"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute top-1/4 -left-24 size-[24rem] rounded-full bg-(--ui-secondary)/6 blur-[100px]"
        aria-hidden="true"
      />

      <div class="relative max-w-3xl mx-auto text-center">
        <div class="inline-flex relative mb-8 hero-stagger">
          <span
            class="absolute inset-0 -m-1 rounded-full bg-(--ui-primary)/20 blur-md home-glow-pulse"
            aria-hidden="true"
          />
          <UBadge
            label="Get Started"
            color="primary"
            variant="subtle"
            size="lg"
            class="relative"
          />
        </div>

        <h2
          class="hero-stagger [animation-delay:100ms] text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 leading-[1.1]"
        >
          <span class="text-(--ui-text-highlighted)">Ready to build</span>
          <br >
          <span
            class="bg-gradient-to-r from-[var(--ui-primary)] to-[var(--ui-secondary)] bg-clip-text text-transparent"
          >
            something beautiful?
          </span>
        </h2>

        <p
          class="hero-stagger [animation-delay:200ms] text-lg text-(--ui-text-muted) max-w-lg mx-auto mb-10 leading-relaxed"
        >
          Pick a preset, customize every token, preview it live, and export.
          Your theme, built in&nbsp;minutes.
        </p>

        <div
          class="hero-stagger [animation-delay:300ms] flex flex-wrap items-center justify-center gap-4"
        >
          <UButton
            label="Explore"
            to="/components"
            icon="i-lucide-arrow-right"
            trailing
            size="xl"
            color="primary"
            class="shadow-lg shadow-(--ui-primary)/20"
          />
          <UButton
            label="Generate with AI"
            to="/ai"
            icon="i-lucide-sparkles"
            size="xl"
            variant="outline"
            color="neutral"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Grid texture */
.home-grid-lines {
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 60px 60px;
}

/* Dot grid texture */
.home-dot-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Hero stagger entrance */
.hero-stagger {
  animation: heroFadeUp 0.7s ease-out both;
}

@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Badge glow pulse */
.home-glow-pulse {
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes glowPulse {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 0.4;
  }
}

/* Problem/Solution card slide */
.home-card-slide {
  animation: cardSlideIn 0.6s ease-out both;
}

@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateX(-12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Feature / Explore / Export card entrance */
.home-card-enter {
  animation: cardEnter 0.6s ease-out both;
}

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* AI cards entrance */
.home-ai-card {
  animation: aiFadeUp 0.5s ease-out both;
}

@keyframes aiFadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Step glass cards entrance */
.home-glass-stagger {
  animation: glassFade 0.6s ease-out both;
}

@keyframes glassFade {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Respect reduced motion for all animations */
@media (prefers-reduced-motion: reduce) {
  .hero-stagger,
  .home-glow-pulse,
  .home-card-slide,
  .home-card-enter,
  .home-ai-card,
  .home-glass-stagger {
    animation: none;
  }
}
</style>
