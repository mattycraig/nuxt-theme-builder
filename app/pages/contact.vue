<script setup lang="ts">
import contactMd from "~/data/contact.md?raw";

const contactMethods = [
  {
    icon: "i-lucide-message-circle",
    title: "GitHub Issues",
    description: "Report bugs or request features through our issue tracker.",
    href: "https://github.com/mattycraig/nuxt-theme-builder/issues",
    label: "Open an Issue",
  },
  {
    icon: "i-lucide-messages-square",
    title: "GitHub Discussions",
    description:
      "Ask questions, share ideas, or show off your themes with the community.",
    href: "https://github.com/mattycraig/nuxt-theme-builder/discussions",
    label: "Join the Discussion",
  },
  {
    icon: "i-lucide-mail",
    title: "Email",
    description: "For private inquiries or partnership opportunities.",
    href: "mailto:hello@example.com",
    label: "hello@example.com",
  },
];
</script>

<template>
  <UPage>
    <UContainer>
      <UPageHeader
        headline="Contact"
        title="Get in Touch"
        description="Have a question, found a bug, or want to contribute? Here's how to reach us."
        :links="[
          {
            label: 'Back to Home',
            icon: 'i-lucide-arrow-left',
            to: '/',
            variant: 'ghost',
            color: 'neutral',
          },
        ]"
      />

      <UPageBody>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <UCard
            v-for="method in contactMethods"
            :key="method.title"
            class="flex flex-col"
          >
            <div class="flex items-start gap-3">
              <UIcon
                :name="method.icon"
                class="size-6 shrink-0 text-(--ui-primary)"
                aria-hidden="true"
              />
              <div class="min-w-0">
                <h2 class="text-sm font-semibold text-(--ui-text-highlighted)">
                  {{ method.title }}
                </h2>
                <p class="mt-1 text-sm text-(--ui-text-muted)">
                  {{ method.description }}
                </p>
              </div>
            </div>
            <template #footer>
              <UButton
                :to="method.href"
                :label="method.label"
                target="_blank"
                variant="outline"
                color="neutral"
                size="sm"
                block
              />
            </template>
          </UCard>
        </div>

        <USeparator class="my-8" />

        <MDC
          :value="contactMd"
          class="prose prose-sm dark:prose-invert max-w-none"
        />
      </UPageBody>
    </UContainer>
  </UPage>
</template>
