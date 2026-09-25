<script setup lang="ts">
import { MSG } from "~/utils/iframeProtocol";
import { isInIframe } from "~/utils/helpers";

const store = useThemeStore();
const inIframe = isInIframe();

function handleRandomTheme() {
  if (inIframe) {
    window.parent.postMessage(
      { type: MSG.RANDOMIZE_THEME },
      window.location.origin,
    );
  } else {
    store.randomizeTheme();
  }
}
</script>

<template>
  <section
    aria-labelledby="home-hero-heading"
    class="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14"
  >
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-5">
        <UBadge
          label="Free and open source · Nuxt UI v4"
          color="primary"
          variant="subtle"
          class="self-start"
        />
        <h1
          id="home-hero-heading"
          class="text-4xl font-extrabold tracking-tight text-balance text-(--ui-text-highlighted) sm:text-5xl leading-[1.08]"
        >
          The visual theme editor for
          <span class="text-(--ui-primary)">Nuxt&nbsp;UI</span>
        </h1>
        <p class="max-w-xl text-lg leading-relaxed text-(--ui-text-muted)">
          Pick colors, shades, radius and fonts for light and dark mode, see
          them on real components, then export a config you can paste into
          your app.
        </p>
        <div class="flex flex-wrap items-center gap-3">
          <UButton
            label="Browse components"
            to="/components"
            icon="i-lucide-layout-grid"
            size="lg"
            color="primary"
          />
          <UButton
            label="Random theme"
            icon="i-lucide-dices"
            size="lg"
            color="neutral"
            variant="outline"
            @click="handleRandomTheme()"
          />
        </div>
      </div>

      <HomePromptDemo />
    </div>

    <HomeSpecimen />
  </section>
</template>
