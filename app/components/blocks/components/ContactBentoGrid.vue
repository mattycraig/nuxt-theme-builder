<script setup lang="ts">
const quickFields = [
  { name: "name", label: "Name", type: "text", placeholder: "Your name" },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "What can we help with?",
  },
];

const socials = [
  { icon: "i-lucide-twitter", label: "Twitter", handle: "@themebuilder" },
  { icon: "i-lucide-github", label: "GitHub", handle: "themebuilder" },
  { icon: "i-lucide-linkedin", label: "LinkedIn", handle: "themebuilder" },
  { icon: "i-lucide-youtube", label: "YouTube", handle: "Theme Builder" },
];

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
  { day: "Saturday", time: "10:00 AM – 2:00 PM" },
  { day: "Sunday", time: "Closed" },
];
</script>

<template>
  <section class="px-6 py-20 sm:py-28">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12 space-y-3 bento-stagger">
        <h2
          class="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--ui-text-highlighted)"
        >
          Contact us
        </h2>
        <p class="text-lg text-(--ui-text-muted) max-w-md mx-auto">
          Everything you need to reach our team, all in one place.
        </p>
      </div>

      <!-- Bento grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Form cell — spans 2 cols on lg -->
        <div
          class="bento-stagger [animation-delay:100ms] sm:col-span-2 rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) p-6 sm:p-8"
        >
          <div class="space-y-2 mb-6">
            <h3
              class="text-lg font-bold text-(--ui-text-highlighted) flex items-center gap-2"
            >
              <UIcon
                name="i-lucide-pen-line"
                class="size-5 text-(--ui-primary)"
                aria-hidden="true"
              />
              Quick Message
            </h3>
            <p class="text-sm text-(--ui-text-muted)">
              Fill out the form and we'll get back to you shortly.
            </p>
          </div>
          <UAuthForm
            title=""
            :fields="quickFields"
            :submit="{ label: 'Send', color: 'primary', icon: 'i-lucide-send' }"
          />
        </div>

        <!-- Email cell -->
        <div
          class="bento-stagger [animation-delay:200ms] rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) p-6 flex flex-col justify-between"
        >
          <div>
            <div
              class="size-10 rounded-xl bg-(--ui-primary)/10 flex items-center justify-center mb-4"
            >
              <UIcon
                name="i-lucide-mail"
                class="size-5 text-(--ui-primary)"
                aria-hidden="true"
              />
            </div>
            <h3 class="font-bold text-(--ui-text-highlighted) mb-1">Email</h3>
            <p class="text-sm text-(--ui-text-muted) mb-4">
              For general inquiries and support requests.
            </p>
          </div>
          <a
            href="mailto:hello@themebuilder.dev"
            class="text-sm font-semibold text-(--ui-primary) flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200"
          >
            hello@themebuilder.dev
            <UIcon
              name="i-lucide-arrow-right"
              class="size-3.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <!-- Social cell -->
        <div
          class="bento-stagger [animation-delay:300ms] rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) p-6"
        >
          <h3
            class="font-bold text-(--ui-text-highlighted) mb-4 flex items-center gap-2"
          >
            <UIcon
              name="i-lucide-share-2"
              class="size-5 text-(--ui-primary)"
              aria-hidden="true"
            />
            Social
          </h3>
          <div class="space-y-3">
            <div
              v-for="s in socials"
              :key="s.label"
              class="flex items-center gap-3 group cursor-pointer"
            >
              <div
                class="size-8 rounded-lg bg-(--ui-bg) border border-(--ui-border)/60 flex items-center justify-center group-hover:border-(--ui-primary)/40 group-hover:bg-(--ui-primary)/5 transition-colors duration-200"
              >
                <UIcon
                  :name="s.icon"
                  class="size-4 text-(--ui-text-muted) group-hover:text-(--ui-primary) transition-colors"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p class="text-sm font-medium text-(--ui-text-highlighted)">
                  {{ s.label }}
                </p>
                <p class="text-xs text-(--ui-text-muted)">{{ s.handle }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Hours cell -->
        <div
          class="bento-stagger [animation-delay:400ms] rounded-2xl border border-(--ui-border) bg-(--ui-bg-elevated) p-6"
        >
          <h3
            class="font-bold text-(--ui-text-highlighted) mb-4 flex items-center gap-2"
          >
            <UIcon
              name="i-lucide-clock"
              class="size-5 text-(--ui-primary)"
              aria-hidden="true"
            />
            Business Hours
          </h3>
          <div class="space-y-2.5">
            <div
              v-for="h in hours"
              :key="h.day"
              class="flex items-center justify-between text-sm"
            >
              <span class="text-(--ui-text-muted)">{{ h.day }}</span>
              <span class="font-medium text-(--ui-text-highlighted)">{{
                h.time
              }}</span>
            </div>
          </div>
          <USeparator class="my-4" />
          <p class="text-xs text-(--ui-text-muted)">
            All times are in Pacific Standard Time (PST).
          </p>
        </div>

        <!-- Address cell -->
        <div
          class="bento-stagger [animation-delay:500ms] rounded-2xl border border-(--ui-border) bg-gradient-to-br from-[var(--ui-primary)]/5 to-transparent p-6 flex flex-col justify-between"
        >
          <div>
            <div
              class="size-10 rounded-xl bg-(--ui-primary)/10 flex items-center justify-center mb-4"
            >
              <UIcon
                name="i-lucide-map-pin"
                class="size-5 text-(--ui-primary)"
                aria-hidden="true"
              />
            </div>
            <h3 class="font-bold text-(--ui-text-highlighted) mb-1">
              Visit Us
            </h3>
            <p class="text-sm text-(--ui-text-muted) leading-relaxed">
              123 Design Street<br >
              San Francisco, CA 94102<br >
              United States
            </p>
          </div>
          <UButton
            label="Get Directions"
            icon="i-lucide-navigation"
            variant="soft"
            color="primary"
            size="sm"
            class="mt-4"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bento-stagger {
  animation: bentoFadeUp 0.5s ease-out both;
}

@keyframes bentoFadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bento-stagger {
    animation: none;
  }
}
</style>
