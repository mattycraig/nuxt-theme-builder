<script setup lang="ts">
const faqItems = [
  {
    label: "What is Nuxt UI?",
    content:
      "Nuxt UI is a module that provides a set of Vue components and composables built with Tailwind CSS and Headless UI to help you build beautiful and accessible user interfaces.",
  },
  {
    label: "How do I customize the theme?",
    content:
      "You can customize the theme by modifying your app.config.ts file, overriding CSS variables, or using the design tokens provided by Nuxt UI. The theme editor on the left lets you adjust colors, fonts, and radii in real-time.",
  },
  {
    label: "Is it compatible with dark mode?",
    content:
      "Yes! Nuxt UI supports dark mode out of the box. All components automatically adapt to the current color mode.",
  },
  {
    label: "Can I use custom icons?",
    content:
      "Absolutely. Nuxt UI uses Iconify under the hood, giving you access to over 200,000 icons from 100+ icon sets.",
  },
];

const settingsItems = [
  {
    label: "General",
    icon: "i-lucide-settings",
    content:
      "Configure display name, language preference, and timezone settings for your account.",
  },
  {
    label: "Notifications",
    icon: "i-lucide-bell",
    content:
      "Choose which email and push notifications you receive. Set quiet hours and digest frequency.",
  },
  {
    label: "Privacy",
    icon: "i-lucide-shield",
    content:
      "Control who can see your profile, activity status, and shared projects. Manage data export and deletion.",
  },
  {
    label: "Integrations",
    icon: "i-lucide-plug",
    content:
      "Connect third-party services like GitHub, Slack, and Figma. Manage API keys and webhooks.",
  },
];
</script>

<template>
  <div class="space-y-6">
    <ShowcaseSpecimen
      title="FAQ Style"
      description="Standard accordion for frequently asked questions."
    >
      <UAccordion :items="faqItems" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="With Icons"
      description="Accordion items with leading icons for settings-style navigation."
    >
      <UAccordion :items="settingsItems" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Single Open"
      description="Only one item can be expanded at a time."
      :prop-hints="['type=single']"
    >
      <UAccordion :items="faqItems.slice(0, 3)" type="single" />
    </ShowcaseSpecimen>

    <ShowcaseSpecimen
      title="Default Open"
      description="Accordion initialized with the first item expanded."
      :prop-hints="['default-value']"
    >
      <UAccordion
        :items="faqItems.slice(0, 2)"
        :default-value="[faqItems[0]!.label]"
      />
    </ShowcaseSpecimen>
  </div>
</template>
