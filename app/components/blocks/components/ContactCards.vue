<script setup lang="ts">
const channels = [
  {
    icon: "i-lucide-mail",
    title: "Email",
    description: "Send us a message any time.",
    action: "hello@themebuilder.dev",
  },
  {
    icon: "i-lucide-message-circle",
    title: "Live Chat",
    description: "Chat with our team in real time.",
    action: "Start a conversation",
  },
  {
    icon: "i-lucide-book-open",
    title: "Documentation",
    description: "Find answers in our help center.",
    action: "Browse docs",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-(--ui-text-highlighted)">
          How can we help?
        </h2>
      </div>
      <UPageGrid>
        <UPageCard
          v-for="ch in channels"
          :key="ch.title"
          :icon="ch.icon"
          :title="ch.title"
          :description="ch.description"
        >
          <template #footer>
            <p class="text-sm font-medium text-(--ui-primary)">
              {{ ch.action }}
            </p>
          </template>
        </UPageCard>
      </UPageGrid>
    </div>
  </section>
</template>
