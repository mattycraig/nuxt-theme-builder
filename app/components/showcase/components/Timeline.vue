<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="Default Timeline"
      description="Vertical timeline showing sequential events."
      :prop-hints="['items']"
    >
      <UTimeline :items="events" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Icons"
      description="Timeline items with custom icons."
    >
      <UTimeline :items="iconEvents" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Colored Dots"
      description="Timeline using semantic dot colors for status."
      :prop-hints="['color']"
    >
      <UTimeline :items="coloredEvents" />
    </ShowcaseSpecimen>
  </div>
</template>

<script setup lang="ts">
const events = [
  {
    title: "Order placed",
    description: "Your order #1234 has been confirmed.",
  },
  {
    title: "Processing",
    description: "Payment verified and items being prepared.",
  },
  { title: "Shipped", description: "Package handed off to carrier." },
  { title: "Delivered", description: "Package delivered to your address." },
];

const iconEvents = [
  {
    title: "Account created",
    description: "Welcome aboard!",
    icon: "i-lucide-user-plus",
  },
  {
    title: "Profile completed",
    description: "Added all required information.",
    icon: "i-lucide-check-circle",
  },
  {
    title: "First project",
    description: 'Created "My First Project".',
    icon: "i-lucide-rocket",
  },
  {
    title: "Team invited",
    description: "Added 3 team members.",
    icon: "i-lucide-users",
  },
];

const coloredEvents = [
  {
    title: "Build started",
    description: "2 minutes ago",
    color: "info" as const,
  },
  {
    title: "Tests passed",
    description: "1 minute ago",
    color: "success" as const,
  },
  {
    title: "Lint warning",
    description: "45 seconds ago",
    color: "warning" as const,
  },
  { title: "Deploy failed", description: "Just now", color: "error" as const },
];
</script>
